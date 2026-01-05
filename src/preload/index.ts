import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {}

contextBridge.exposeInMainWorld('rezAPI', {
  toggleSession: (isActive: boolean) => ipcRenderer.invoke('ai:toggle-session', isActive),
  toggleMute: (isMuted: boolean) => ipcRenderer.invoke('audio:toggle-mute', isMuted),
  onStatus: (callback: (status: string) => void) =>
    ipcRenderer.on('status:update', (_e, status) => callback(status)),
  // New Visualizer Listener
  onVisualize: (callback: (level: number) => void) =>
    ipcRenderer.on('audio:visualize', (_e, level) => callback(level))
})

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
