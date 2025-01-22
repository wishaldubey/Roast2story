import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flame, Share2, Search, ArrowRight } from 'lucide-react';
import { nanoid } from 'nanoid';

export default function HomePage() {
  const navigate = useNavigate();
  const [dashboardId, setDashboardId] = useState('');

  const createRoastSession = () => {
    const sessionId = nanoid(10);
    navigate(`/dashboard/${sessionId}`);
  };

  const goToDashboard = (e: React.FormEvent) => {
    e.preventDefault();
    if (dashboardId.trim()) {
      navigate(`/dashboard/${dashboardId.trim()}`);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="min-h-screen flex flex-col relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-500 opacity-90" />
        
        <div className="relative flex-1 flex flex-col items-center justify-center p-4 md:p-8">
          <div className="text-center space-y-8 max-w-3xl mx-auto">
            <div className="flex items-center justify-center space-x-3 mb-8">
              <Flame className="w-16 h-16 text-yellow-400" />
              <h1 className="text-5xl md:text-6xl font-bold text-white">Roast2Story</h1>
            </div>
            
            <p className="text-white/90 text-xl md:text-2xl leading-relaxed">
              Transform friendly roasts into hilarious AI-generated stories. Share with friends and watch as each roast becomes an epic tale!
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-8">
              <button
                onClick={createRoastSession}
                className="w-full md:w-auto py-4 px-8 bg-white text-purple-600 rounded-lg font-semibold 
                         shadow-lg hover:bg-purple-50 transition-colors flex items-center justify-center space-x-2"
              >
                <Share2 className="w-5 h-5" />
                <span>Start a Roast Session</span>
              </button>
            </div>

            <div className="pt-8">
              <p className="text-white/80 mb-4">Or check your existing dashboard</p>
              <form onSubmit={goToDashboard} className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter your dashboard ID"
                    value={dashboardId}
                    onChange={(e) => setDashboardId(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 text-white placeholder-white/50 
                             border border-white/20 focus:border-white/40 focus:ring-0"
                  />
                </div>
                <button
                  type="submit"
                  className="py-3 px-6 bg-white/20 text-white rounded-lg hover:bg-white/30 
                           transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Go to Dashboard</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="relative bg-white/10 backdrop-blur-sm py-16 px-4 md:px-8">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center text-white p-6">
              <h3 className="text-xl font-semibold mb-4">Create & Share</h3>
              <p className="text-white/80">Generate a unique roast session and share it with friends instantly</p>
            </div>
            <div className="text-center text-white p-6">
              <h3 className="text-xl font-semibold mb-4">AI Magic</h3>
              <p className="text-white/80">Watch as our AI transforms roasts into creative, engaging stories</p>
            </div>
            <div className="text-center text-white p-6">
              <h3 className="text-xl font-semibold mb-4">Share on Instagram</h3>
              <p className="text-white/80">Export stories directly to Instagram with our beautiful templates</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}