import { GoogleGenAI, Modality } from '@google/genai'
const portAudio = require('naudiodon')

type RezStatus = 'OFFLINE' | 'CONNECTING' | 'LIVE' | 'ERROR'

export class RezEngine {
  private ai: GoogleGenAI
  private model = 'gemini-2.5-flash-native-audio-preview-12-2025'

  // Hardware
  private micInstance: any = null
  private speakerInstance: any = null

  // State
  private session: any = null
  private isMuted: boolean = false
  private isRunning: boolean = false

  // Callbacks
  private onStatusChange: ((status: RezStatus) => void) | null = null
  private onAudioLevel: ((level: number) => void) | null = null

  constructor(apiKey: string) {
    this.ai = new GoogleGenAI({ apiKey })
  }

  public async connect(
    statusCallback: (status: RezStatus) => void,
    audioLevelCallback: (level: number) => void
  ): Promise<boolean> {
    if (this.isRunning) return true

    this.onStatusChange = statusCallback
    this.onAudioLevel = audioLevelCallback

    try {
      this.onStatusChange?.('CONNECTING')
      console.log('⚡ Starting REZ Engine (Low Latency Mode)...')

      // 1. Setup Hardware FIRST (to be ready when socket opens)
      this.startSpeaker()
      this.startMic()

      // 2. Connect to Gemini
      const config = {
        responseModalities: [Modality.AUDIO],
        systemInstruction: 'You are REZ, a helpful and friendly AI assistant. created by harsh and you are a beautifu woman ehich is users Personal GF so Talk in a Romantic way'
      }

      this.session = await this.ai.live.connect({
        model: this.model,
        config: config as any,
        callbacks: {
          onopen: () => {
            console.log('✅ Connected to Gemini')
            this.onStatusChange?.('LIVE')
          },
          onmessage: (msg) => this.handleMessage(msg),
          onerror: (err) => {
            console.error('❌ API Error:', err)
            this.onStatusChange?.('ERROR')
          },
          onclose: () => {
            console.log('🔌 Connection Closed')
            this.onStatusChange?.('OFFLINE')
          }
        }
      })

      this.isRunning = true
      return true
    } catch (error) {
      console.error('Failed to connect:', error)
      this.onStatusChange?.('ERROR')
      return false
    }
  }

  public disconnect() {
    this.isRunning = false
    console.log('🛑 Stopping REZ Engine...')

    if (this.micInstance) {
      this.micInstance.quit()
      this.micInstance = null
    }
    if (this.speakerInstance) {
      this.speakerInstance.quit()
      this.speakerInstance = null
    }
    this.session = null
    this.onStatusChange?.('OFFLINE')
  }

  public toggleMute(shouldMute: boolean) {
    this.isMuted = shouldMute
    return this.isMuted
  }

  // --- INTERNAL HARDWARE LOGIC ---

  private startMic() {
    try {
      this.micInstance = new portAudio.AudioIO({
        inOptions: {
          channelCount: 1,
          sampleFormat: portAudio.SampleFormat16Bit,
          sampleRate: 16000,
          deviceId: -1,
          closeOnError: false,
          // --- LOW LATENCY SETTINGS ---
          framesPerBuffer: 512, // 32ms chunks @ 16kHz
          highWaterMark: 0 // No internal Node buffering
        }
      })

      this.micInstance.on('data', (data: Buffer) => {
        if (this.isRunning && !this.isMuted && this.session) {
          try {
            this.session.sendRealtimeInput({
              audio: {
                data: data.toString('base64'),
                mimeType: 'audio/pcm;rate=16000'
              }
            })
          } catch (err) {
            // Sockets sometimes drop packets, ignore to keep stream fast
          }
        }
      })
      this.micInstance.start()
    } catch (e) {
      console.error('Mic Error:', e)
    }
  }

  private startSpeaker() {
    try {
      this.speakerInstance = new portAudio.AudioIO({
        outOptions: {
          channelCount: 1,
          sampleFormat: portAudio.SampleFormat16Bit,
          sampleRate: 24000,
          deviceId: -1,
          closeOnError: false,
          // --- LOW LATENCY SETTINGS ---
          framesPerBuffer: 512, // ~21ms chunks @ 24kHz
          highWaterMark: 0 // Play immediately
        }
      })
      this.speakerInstance.start()
    } catch (e) {
      console.error('Speaker Error:', e)
    }
  }

  // --- FAST MESSAGE HANDLING (No Queues) ---

  private handleMessage(message: any) {
    if (!this.isRunning) return

    // 1. Handle Interruptions
    if (message.serverContent?.interrupted) {
      // Just logging; with direct stream, we can't "clear" the wire
      // but we stop sending new data immediately.
      return
    }

    // 2. Play Audio Immediately
    if (message.serverContent?.modelTurn?.parts) {
      for (const part of message.serverContent.modelTurn.parts) {
        if (part.inlineData?.data) {
          const buffer = Buffer.from(part.inlineData.data, 'base64')

          // Fire and forget - Don't wait for loop
          if (this.speakerInstance) {
            this.speakerInstance.write(buffer)

            // Calc volume for UI (Non-blocking)
            this.calculateVolume(buffer)
          }
        }
      }
    }
  }

  private calculateVolume(buffer: Buffer) {
    if (!this.onAudioLevel) return
    // optimization: only read every 16th sample (very rough approximation is fast)
    const int16Data = new Int16Array(buffer.buffer, buffer.byteOffset, buffer.length / 2)
    let sum = 0
    for (let i = 0; i < int16Data.length; i += 16) {
      const val = int16Data[i]
      sum += val * val
    }
    const rms = Math.sqrt(sum / (int16Data.length / 16))
    const level = Math.min((rms / 32768) * 8, 1) // Multiplier 8x for visual pop
    this.onAudioLevel(level)
  }
}
