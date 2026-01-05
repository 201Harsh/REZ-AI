import { useState } from 'react'
import { FaMicrophone, FaMicrophoneSlash, FaPlay, FaStop } from 'react-icons/fa'
import { LuSettings, LuActivity } from 'react-icons/lu'

const RezAI = () => {
  const [isLive, setIsLive] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  return (
    <div className="relative h-screen w-full bg-black overflow-hidden selection:bg-cyan-500/30">
      {/* --- BACKGROUND EFFECTS --- */}
      {/* Subtle Grid */}
      <div className="absolute inset-0 bg-[url('https://grainy-linears.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      <div className="absolute inset-0 bg-linear-to-br from-gray-950 via-black to-gray-900 z-0"></div>

      {/* Ambient Light Spots */}
      <div
        className={`absolute top-[-10%] left-[-10%] w-125 h-125 bg-cyan-500/20 rounded-full blur-[120px] transition-all duration-1000 ${isLive ? 'opacity-100 scale-110' : 'opacity-40 scale-100'}`}
      ></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-125 h-125 bg-sky-500/10 rounded-full blur-[120px]"></div>

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10 h-[calc(100vh-100px)] w-full flex items-center justify-center flex-col gap-8">
        {/* THE ORB (The "Real" Glob) */}
        <div className="relative group cursor-pointer">
          {/* Outer Atmosphere Glow */}
          <div
            className={`absolute inset-0 rounded-full blur-[60px] transition-all duration-700 
            ${isLive ? 'bg-cyan-500/40 animate-pulse' : 'bg-gray-800/20'}`}
          ></div>

          {/* The 3D Sphere Container */}
          <div
            className={`w-64 h-64 rounded-full relative flex items-center justify-center transition-all duration-700
            bg-linear-to-b from-gray-800 via-gray-950 to-black
            shadow-[inset_0px_-20px_60px_rgba(0,0,0,0.9),inset_0px_10px_20px_rgba(255,255,255,0.1),0px_0px_50px_rgba(0,0,0,0.5)]
            ${isLive ? 'shadow-cyan-500/20 scale-105 border border-cyan-500/30' : 'scale-100 border border-white/5'}
          `}
          >
            {/* The Inner "Core" linear */}
            <div
              className={`absolute inset-4 rounded-full opacity-60 bg-linear-to-tr 
              ${isLive ? 'from-cyan-600/20 via-transparent to-cyan-600/20' : 'from-gray-700/10 via-transparent to-gray-800/10'}`}
            ></div>

            {/* Reflection / Shine (Makes it look glass) */}
            <div className="absolute top-8 left-12 w-20 h-10 bg-white/5 rounded-full blur-md transform -rotate-45"></div>

            {/* Center Content */}
            <div className="flex flex-col items-center justify-center gap-2">
              <span
                className={`text-4xl font-black tracking-widest transition-colors duration-500 
                ${isLive ? 'text-cyan-100 drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]' : 'text-gray-600'}`}
              >
                REZ AI
              </span>
              <span
                className={`text-xs font-mono tracking-[0.3em] uppercase transition-colors duration-500
                 ${isLive ? 'text-cyan-400' : 'text-gray-700'}`}
              >
                {isLive ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>
        </div>

        {/* Text Area */}
        <div className="text-center space-y-2">
          {/* Dynamic Status Text */}
          <p
            className={`text-sm font-mono tracking-wider transition-all duration-500
             ${isLive ? 'text-cyan-400 animate-pulse' : 'text-gray-500'}`}
          >
            {isLive ? '/// LISTENING FOR INPUT ///' : '/// REZ AI IS OFFLINE ///'}
          </p>
        </div>
      </div>

      {/* --- DOCK (Bottom Navigation) --- */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex items-center gap-4 bg-gray-900/80 backdrop-blur-2xl border border-white/10 rounded-2xl px-3 py-3 shadow-[0_0_40px_rgba(0,0,0,0.5)] ring-1 ring-white/5">
          {/* Settings Button (Left) */}
          <button className="p-4 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200 group">
            <LuSettings className="w-6 h-6 group-hover:rotate-90 transition-transform duration-500" />
          </button>

          {/* MAIN TOGGLE: Start / Stop */}
          <button
            onClick={() => setIsLive(!isLive)}
            className={`cursor-pointer flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg transform active:scale-95
            ${
              isLive
                ? 'bg-red-500/10 text-red-400 border border-red-500/50 hover:bg-red-500 hover:text-white shadow-red-900/20'
                : 'bg-cyan-500 text-black hover:bg-cyan-400 shadow-cyan-500/20 hover:shadow-cyan-400/40'
            }`}
          >
            {isLive ? <FaStop className="w-5 h-5" /> : <FaPlay className="w-5 h-5 ml-1" />}
            {isLive ? 'END' : 'START'}
          </button>

          {/* Mute Button (Right) */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            disabled={!isLive}
            className={`p-4 rounded-xl transition-all duration-200 
            ${
              !isLive
                ? 'opacity-30 cursor-not-allowed text-gray-500'
                : isMuted
                  ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 hover:bg-yellow-500 hover:text-black cursor-pointer'
                  : 'text-gray-300 hover:text-white hover:bg-white/10 cursor-pointer'
            }`}
          >
            {isMuted ? (
              <FaMicrophoneSlash className="w-6 h-6" />
            ) : (
              <FaMicrophone className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* --- TOP RIGHT STATUS --- */}
      <div className="fixed top-8 right-8 z-50">
        <div
          className={`flex items-center gap-3 px-4 py-2 rounded-full border backdrop-blur-md transition-all duration-500
          ${isLive ? 'border-cyan-500/30 bg-cyan-950/30' : 'border-white/5 bg-gray-900/30'}`}
        >
          <LuActivity className={`w-4 h-4 ${isLive ? 'text-cyan-400' : 'text-gray-500'}`} />
          <span
            className={`text-xs font-mono font-bold tracking-widest ${isLive ? 'text-cyan-100' : 'text-gray-500'}`}
          >
            {isLive ? 'CONNECTED' : 'OFFLINE'}
          </span>
          <div
            className={`w-2 h-2 rounded-full ${isLive ? 'bg-cyan-400 animate-pulse' : 'bg-gray-600'}`}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default RezAI
