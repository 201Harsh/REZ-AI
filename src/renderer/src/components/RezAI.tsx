const RezAI = () => {
  return (
    <div className="h-screen w-full bg-black bg-gradient-to-br from-gray-900 via-gray-950 to-sky-500/10">
      {/* Main Content Area */}
      <div className="h-[calc(100vh-100px)] w-full flex items-center justify-center flex-col gap-6">
        {/* Globe/Glob Element */}
        <div className="relative w-64 h-64">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl"></div>
          <div className="absolute inset-4 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full"></div>
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="w-48 h-48 bg-gradient-to-br from-blue-500/40 to-purple-500/40 rounded-full animate-pulse-slow">
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-4xl font-bold text-white/80">AI</div>
              </div>
            </div>
          </div>
        </div>

        <h1 className="text-5xl font-bold text-white">Rez AI</h1>
        <p className="text-gray-400 text-lg">Voice-activated assistant</p>
      </div>

      {/* Bottom Navigation Floating Dock */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="flex items-center gap-2 bg-gray-900/90 backdrop-blur-lg border border-gray-700/50 rounded-full px-4 py-3 shadow-2xl">
          {/* Start/End Button */}
          <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            Start
          </button>

          {/* Mic Mute/Unmute Button */}
          <button className="flex items-center justify-center w-12 h-12 bg-gray-800 hover:bg-gray-700 text-white rounded-full transition-all duration-300 hover:scale-105 active:scale-95">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
            </svg>
          </button>

          {/* Additional Navigation Items (optional) */}
          <button className="flex items-center justify-center w-12 h-12 text-gray-400 hover:text-white rounded-full hover:bg-gray-800 transition-colors duration-300">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      {/* Status Indicator */}
      <div className="fixed top-6 right-6">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>Ready</span>
        </div>
      </div>
    </div>
  );
};

export default RezAI;