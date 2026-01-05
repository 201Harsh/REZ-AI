import { useState } from 'react'
import RezAI from './components/RezAI'

const App = () => {
  const [isConnected, setisConnected] = useState<boolean>(false)

  return (
    <div className="h-screen w-full bg-gray-950 text-white overflow-hidden">
      {!isConnected ? (
        <>
          {/* Animated Background */}
          <div className="absolute inset-0 bg-linear-to-br from-gray-950 via-black to-cyan-950">
            {/* Cyber grid pattern */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `linear-linear(to right, #00f7ff 1px, transparent 1px),
                              linear-linear(to bottom, #00f7ff 1px, transparent 1px)`,
                backgroundSize: '50px 50px'
              }}
            ></div>

            {/* Glowing orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          </div>

          <div className="relative h-full w-full flex items-center justify-center flex-col gap-8">
            {/* Logo/Title with glow effect */}
            <div className="text-center">
              <h1 className="text-7xl font-bold tracking-tighter mb-2">
                <span className="bg-linear-to-r from-cyan-400 via-sky-500 to-emerald-500 bg-clip-text text-transparent">
                  REZ AI
                </span>
              </h1>
              <p className="text-xl text-cyan-300/80 font-light tracking-wider">
                CYBER VOICE INTERFACE
              </p>
            </div>

            {/* Connection Status */}
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_#ef4444]"></div>
              <span className="text-gray-400 font-mono text-sm">DISCONNECTED</span>
            </div>

            {/* Connect Button */}
            <button
              className="group relative px-16 py-5 bg-linear-to-r from-cyan-600 to-blue-700 rounded-xl text-xl font-bold tracking-wider transition-all duration-300 cursor-pointer overflow-hidden"
              onClick={() => setisConnected(true)}
            >
              {/* Button glow effect */}
              <div className="absolute inset-0 bg-linear-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>

              {/* Button border glow */}
              <div className="absolute -inset-1 bg-linear-to-r from-cyan-400 to-blue-500 rounded-xl blur opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>

              {/* Button content */}
              <span className="relative flex items-center gap-3">
                <svg
                  className="w-6 h-6 group-hover:rotate-90 transition-transform duration-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                INITIATE CONNECTION
              </span>

              {/* Cyber line effect */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-cyan-400 to-transparent transform translate-y-1 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            </button>

            {/* Terminal-like text */}
            <div className="mt-12 p-6 bg-black/30 backdrop-blur-sm border border-cyan-500/30 rounded-lg max-w-lg">
              <div className="font-mono text-sm">
                <div className="flex items-center gap-2 text-cyan-400 mb-2">
                  <span className="animate-pulse">▶</span>
                  <span>$ SYSTEM READY</span>
                </div>
                <div className="text-gray-400 ml-4">Awaiting neural interface connection...</div>
                <div className="text-gray-500 ml-4 mt-1">Protocol: NeuroSync v2.0</div>
              </div>
            </div>

            {/* Footer text */}
            <div className="absolute bottom-8 text-center">
              <p className="text-gray-500 text-sm tracking-wider">
                SECURE CONNECTION • ENCRYPTED • v2.4.1
              </p>
            </div>
          </div>
        </>
      ) : (
        <RezAI />
      )}
    </div>
  )
}

export default App
