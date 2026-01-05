import { useState } from 'react'
import RezAI from './components/RezAI'

const App = () => {
  const [isConnected, setisConnected] = useState<boolean>(false)

  return (
    <div className="h-screen w-full bg-gray-900 text-white">
      {!isConnected ? (
        <>
          <div className="h-full w-full">
            <div className="h-full w-full flex items-center justify-center flex-col gap-4">
              <h1 className="text-5xl font-bold">Connect to Rez AI</h1>
              <button
                className="px-14 py-4 bg-red-400 rounded-2xl text-lg font-bold hover:bg-red-500 transition-all duration-300 cursor-pointer"
                onClick={() => setisConnected(true)}
              >
                Connect
              </button>
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