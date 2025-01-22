import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, onSnapshot, query, orderBy, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { generateStory } from '../lib/gemini';
import { Share2, Copy, Download, X, Flame, Instagram } from 'lucide-react';
import html2canvas from 'html2canvas';
import toast from 'react-hot-toast';

interface Story {
  id: string;
  content: string;
  timestamp: string;
  roastId: string;
}

interface Roast {
  id: string;
  content: string;
  timestamp: string;
  hasStory?: boolean;
}

export default function DashboardPage() {
  const { sessionId } = useParams();
  const [stories, setStories] = useState<Story[]>([]);
  const [roastCount, setRoastCount] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  useEffect(() => {
    const storiesQuery = query(
      collection(db, `sessions/${sessionId}/stories`),
      orderBy('timestamp', 'desc')
    );

    const storiesUnsubscribe = onSnapshot(storiesQuery, (snapshot) => {
      const newStories = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Story));
      setStories(newStories);
    });

    const roastsQuery = query(
      collection(db, `sessions/${sessionId}/roasts`),
      orderBy('timestamp', 'desc')
    );

    const roastsUnsubscribe = onSnapshot(roastsQuery, async (snapshot) => {
      setRoastCount(snapshot.size);

      // Get all existing stories to check which roasts already have stories
      const existingStories = await getDocs(collection(db, `sessions/${sessionId}/stories`));
      const roastsWithStories = new Set(existingStories.docs.map(doc => doc.data().roastId));

      // Only process new roasts that don't have stories
      const newRoasts = snapshot.docs
        .filter(doc => !roastsWithStories.has(doc.id))
        .map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Roast));

      if (newRoasts.length > 0) {
        setIsGenerating(true);
        for (const roast of newRoasts) {
          try {
            const storyContent = await generateStory(roast.content);
            await addDoc(collection(db, `sessions/${sessionId}/stories`), {
              content: storyContent,
              timestamp: new Date().toISOString(),
              roastId: roast.id
            });
          } catch (error) {
            console.error('Failed to generate story:', error);
            toast.error('Failed to generate story');
          }
        }
        setIsGenerating(false);
      }
    });

    return () => {
      storiesUnsubscribe();
      roastsUnsubscribe();
    };
  }, [sessionId]);

  const copyRoastLink = () => {
    const link = `${window.location.origin}/roast/${sessionId}`;
    navigator.clipboard.writeText(link);
    toast.success('Roast link copied to clipboard!');
  };

  const copyDashboardId = () => {
    navigator.clipboard.writeText(sessionId || '');
    toast.success('Dashboard ID copied to clipboard!');
  };

  const saveImage = async (storyElement: HTMLElement) => {
    try {
      const canvas = await html2canvas(storyElement, {
        backgroundColor: null,
        scale: 2,
      });
      
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'roast-story.png';
      link.click();
      
      toast.success('Image saved successfully!');
    } catch (error) {
      console.error('Failed to save image:', error);
      toast.error('Failed to save image');
    }
  };

  const shareStory = async (storyElement: HTMLElement) => {
    try {
      const canvas = await html2canvas(storyElement, {
        backgroundColor: null,
        scale: 2,
      });
      
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => {
          resolve(blob!);
        }, 'image/png');
      });

      const file = new File([blob], 'roast-story.png', { type: 'image/png' });
      
      if (navigator.share) {
        try {
          await navigator.share({
            files: [file],
            title: 'Roast2Story',
            text: 'Check out this hilarious AI-generated story!'
          });
          toast.success('Opening share dialog...');
        } catch (error) {
          if (error instanceof Error && error.name !== 'AbortError') {
            throw error;
          }
        }
      } else {
        // Fallback for browsers that don't support Web Share API
        const shareUrl = URL.createObjectURL(blob);
        const shareWindow = window.open('');
        if (shareWindow) {
          shareWindow.document.write(`
            <html>
              <body style="margin:0;display:flex;justify-content:center;align-items:center;background:#f0f0f0;">
                <img src="${shareUrl}" style="max-width:100%;max-height:100vh;" />
              </body>
            </html>
          `);
          toast.success('Image opened in new tab. Right-click to save or share!');
        } else {
          throw new Error('Popup blocked');
        }
      }
    } catch (error) {
      console.error('Failed to share:', error);
      toast.error('Failed to share image');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 p-4 md:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 md:p-6 text-white">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">Your Roast Session</h1>
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-2">
              <p className="text-white/80">
                {roastCount} roast{roastCount !== 1 ? 's' : ''} received
              </p>
              {isGenerating && (
                <p className="text-yellow-300 text-sm animate-pulse">
                  Generating new story...
                </p>
              )}
            </div>
            
            <div className="flex flex-wrap gap-3">
              <button
                onClick={copyRoastLink}
                className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-lg
                         hover:bg-white/30 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>Copy Roast Link</span>
              </button>
              
              <button
                onClick={copyDashboardId}
                className="flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-lg
                         hover:bg-white/30 transition-colors"
              >
                <Copy className="w-4 h-4" />
                <span>Copy Dashboard ID</span>
              </button>
            </div>
          </div>
        </div>

        {/* Story Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {stories.map((story) => (
            <div
              key={story.id}
              onClick={() => setSelectedStory(story)}
              className="bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg p-4 md:p-6 
                       cursor-pointer transform transition-all duration-200 
                       hover:scale-105 hover:shadow-xl"
            >
              <p className="text-white text-base md:text-lg line-clamp-4">
                {story.content}
              </p>
              <div className="mt-4 text-white/80 text-sm">
                Click to view and share
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedStory && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="relative w-full max-w-lg">
              {/* Close Button */}
              <button
                onClick={() => setSelectedStory(null)}
                className="absolute -top-12 right-0 text-white hover:text-white/80"
              >
                <X className="w-8 h-8" />
              </button>

              {/* Instagram Story View */}
              <div
                id={`story-${selectedStory.id}`}
                className="bg-gradient-to-br from-pink-500 to-purple-600 
                         aspect-[9/16] rounded-lg overflow-hidden relative w-full"
              >
                <div className="absolute inset-0 p-8 flex flex-col">
                  {/* Logo and Branding */}
                  <div className="flex items-center space-x-2 mb-8">
                    <Flame className="w-6 h-6 text-yellow-400" />
                    <span className="text-white font-bold">Roast2Story</span>
                  </div>
                  
                  {/* Story Content */}
                  <div className="flex-1 flex items-center justify-center">
                    <p className="text-xl font-medium text-center text-white px-4 leading-relaxed
                                [text-shadow:_0_1px_2px_rgba(0,0,0,0.3)]">
                      {selectedStory.content}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 
                            flex flex-col md:flex-row gap-4 w-full md:w-auto">
                <button
                  onClick={() => shareStory(document.getElementById(`story-${selectedStory.id}`)!)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 
                           rounded-full shadow-lg hover:opacity-90 transition-opacity 
                           flex items-center justify-center space-x-2"
                >
                  <Share2 className="w-5 h-5" />
                  <span>Share Story</span>
                </button>
                
                <button
                  onClick={() => saveImage(document.getElementById(`story-${selectedStory.id}`)!)}
                  className="bg-white text-purple-600 px-6 py-3 rounded-full shadow-lg
                           hover:bg-purple-50 transition-colors flex items-center justify-center space-x-2"
                >
                  <Download className="w-5 h-5" />
                  <span>Save Image</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}