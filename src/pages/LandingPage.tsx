import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Flame, ArrowRight, Sparkles, Zap, Share2 } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-blue-500 opacity-90">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
        </div>

        {/* Content */}
        <div className="relative flex-1 flex flex-col">
          {/* Header */}
          <header className="w-full py-6 px-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Flame className="w-8 h-8 text-yellow-400" />
                <span className="text-2xl font-bold text-white">Roast2Story</span>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 flex items-center justify-center px-4 py-12">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
                Turn Friendly Roasts into
                <span className="block bg-gradient-to-r from-yellow-300 to-pink-300 text-transparent bg-clip-text">
                  Epic Stories
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                Watch as AI transforms playful roasts into hilarious tales, ready to share on Instagram.
              </p>

              <div className="pt-8">
                <button
                  onClick={() => navigate('/app')}
                  className="group relative inline-flex items-center justify-center px-8 py-4 text-lg
                           font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600
                           rounded-full overflow-hidden shadow-lg transition-all duration-300
                           hover:scale-105 hover:shadow-xl"
                >
                  <span className="relative z-10 flex items-center">
                    Let's Go
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 
                                opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </div>
            </div>
          </main>
        </div>

        {/* Features Grid */}
        <div className="relative bg-black/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 rounded-2xl
                            bg-white/5 backdrop-blur-sm">
                <div className="p-3 bg-purple-500/20 rounded-full mb-4">
                  <Sparkles className="w-6 h-6 text-purple-300" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">AI Magic</h3>
                <p className="text-white/80">
                  Our AI transforms simple roasts into creative, engaging stories instantly
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 rounded-2xl
                            bg-white/5 backdrop-blur-sm">
                <div className="p-3 bg-pink-500/20 rounded-full mb-4">
                  <Zap className="w-6 h-6 text-pink-300" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Real-Time</h3>
                <p className="text-white/80">
                  Watch stories generate instantly as friends submit their roasts
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 rounded-2xl
                            bg-white/5 backdrop-blur-sm">
                <div className="p-3 bg-blue-500/20 rounded-full mb-4">
                  <Share2 className="w-6 h-6 text-blue-300" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Share Instantly</h3>
                <p className="text-white/80">
                  Export stories directly to Instagram with beautiful templates
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}