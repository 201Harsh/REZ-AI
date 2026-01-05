import { ElectronAPI } from '@electron-toolkit/preload'

// 1. Define the shape of our new API
interface RezAPI {
  toggleSession: (isActive: boolean) => Promise<boolean>
  toggleMute: (isMuted: boolean) => Promise<boolean>

  // Listeners
  onStatus: (callback: (status: string) => void) => void
  onVisualize: (callback: (level: number) => void) => void // <--- Added this line
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
    // 2. Add it to the Window interface
    rezAPI: RezAPI
  }
}
