import {
    disconnectGeminiSocket,
    setupGeminiListeners,
    removeGeminiListeners,
    emitStartLiveSession,
    emitAudioInput
} from "../websocket/geminiSocket";

export class GeminiLiveClient {
    private audioContext: AudioContext | null = null;
    private mediaStream: MediaStream | null = null;
    private workletNode: AudioWorkletNode | null = null;

    private audioQueue: AudioBuffer[] = [];
    private isPlaying = false;

    // Callbacks for the UI
    public onTextOutput?: (text: string) => void;
    public onInterrupted?: () => void;
    public onWarning?: (warning: string) => void;

    constructor() {
        setupGeminiListeners(
            async (data: ArrayBuffer) => {
                await this.handleAudioOutput(data);
            },
            (text: string) => {
                this.onTextOutput?.(text);
            },
            () => {
                // Clear audio queue on interruption (VAD triggered)
                this.audioQueue = [];
                this.isPlaying = false;
                this.onInterrupted?.();
            },
            (msg: string) => {
                this.onWarning?.(msg);
            }
        );
    }

    async startSession() {
        emitStartLiveSession();
        await this.startMicrophone();
    }

    stopSession() {
        removeGeminiListeners();
        disconnectGeminiSocket();
        this.stopMicrophone();
    }

    private async startMicrophone() {
        this.mediaStream = await navigator.mediaDevices.getUserMedia({
            audio: {
                sampleRate: 16000,
                channelCount: 1,
            }
        });

        this.audioContext = new window.AudioContext({ sampleRate: 16000 });
        
        // Note: You may need to serve AudioProcessor.js from your 'public' folder
        // or configure your bundler to import it as a worklet. 
        await this.audioContext.audioWorklet.addModule('/AudioProcessor.js');

        const source = this.audioContext.createMediaStreamSource(this.mediaStream);
        this.workletNode = new AudioWorkletNode(this.audioContext, 'audio-processor');

        this.workletNode.port.onmessage = (event) => {
            // Sent from the AudioProcessor (Int16Array buffer)
            const arrayBuffer = event.data;
            emitAudioInput(arrayBuffer);
        };

        source.connect(this.workletNode);
        // Do not connect workletNode to destination unless you want loopback audio.
    }

    private stopMicrophone() {
        if (this.mediaStream) {
            this.mediaStream.getTracks().forEach(track => track.stop());
        }
        if (this.audioContext) {
            this.audioContext.close();
        }
        this.workletNode = null;
    }

    // Handles playing 24kHz 16-bit PCM received from the backend
    private async handleAudioOutput(pcmData: ArrayBuffer) {
        if (!this.audioContext) return;
        
        const int16Array = new Int16Array(pcmData);
        const float32Array = new Float32Array(int16Array.length);
        
        for (let i = 0; i < int16Array.length; i++) {
            float32Array[i] = int16Array[i] / 32768.0;
        }

        // Gemini returns 24kHz audio
        const audioBuffer = this.audioContext.createBuffer(1, float32Array.length, 24000);
        audioBuffer.getChannelData(0).set(float32Array);
        
        this.audioQueue.push(audioBuffer);
        this.playNextAudio();
    }

    private playNextAudio() {
        if (this.isPlaying || this.audioQueue.length === 0 || !this.audioContext) {
            return;
        }
        
        this.isPlaying = true;
        const buffer = this.audioQueue.shift()!;
        
        const source = this.audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(this.audioContext.destination);
        
        source.onended = () => {
            this.isPlaying = false;
            this.playNextAudio();
        };
        
        source.start();
    }
}
