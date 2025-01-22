import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Send } from 'lucide-react';
import toast from 'react-hot-toast';

export default function RoastPage() {
  const { sessionId } = useParams();
  const [roast, setRoast] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitRoast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roast.trim()) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, `sessions/${sessionId}/roasts`), {
        content: roast,
        timestamp: new Date().toISOString()
      });
      
      setRoast('');
      toast.success('Roast submitted! Watch the magic happen...');
    } catch (error) {
      toast.error('Failed to submit roast. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Drop Your Roast</h1>
          <p className="text-white/80">Keep it funny and friendly!</p>
        </div>

        <form onSubmit={submitRoast} className="space-y-4">
          <textarea
            value={roast}
            onChange={(e) => setRoast(e.target.value)}
            placeholder="Type your roast here..."
            className="w-full p-4 rounded-lg bg-white/10 text-white placeholder-white/50 
                     border border-white/20 focus:border-white/40 focus:ring-0
                     resize-none h-32"
          />
          
          <button
            type="submit"
            disabled={isSubmitting || !roast.trim()}
            className="w-full py-4 px-6 bg-white text-purple-600 rounded-lg font-semibold 
                     shadow-lg hover:bg-purple-50 transition-colors flex items-center 
                     justify-center space-x-2 disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
            <span>{isSubmitting ? 'Submitting...' : 'Send Roast'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}