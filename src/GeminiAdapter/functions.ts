import { GeminiLiveClient } from './GeminiLiveClient';

let liveClientInstance: GeminiLiveClient | null = null;

export interface GeminiLiveCallbacks {
    onTextOutput?: (text: string) => void;
    onInterrupted?: () => void;
    onWarning?: (msg: string) => void;
}

/**
 * Starts the Gemini Live Session.
 * 
 * @param callbacks Object containing UI callbacks for events
 */
export async function startGeminiLiveSession(callbacks: GeminiLiveCallbacks = {}) {
    if (liveClientInstance) {
        liveClientInstance.stopSession();
    }
    
    liveClientInstance = new GeminiLiveClient();
    
    // Attach callbacks
    liveClientInstance.onTextOutput = callbacks.onTextOutput;
    liveClientInstance.onInterrupted = callbacks.onInterrupted;
    liveClientInstance.onWarning = callbacks.onWarning;

    await liveClientInstance.startSession();
    console.log("Gemini Live Session Started");
}

/**
 * Stops the current Gemini Live Session and disconnects from the backend.
 */
export function stopGeminiLiveSession() {
    if (liveClientInstance) {
        liveClientInstance.stopSession();
        liveClientInstance = null;
        console.log("Gemini Live Session Stopped");
    }
}
