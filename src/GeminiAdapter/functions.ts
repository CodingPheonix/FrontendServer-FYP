import { GeminiLiveClient } from './GeminiLiveClient';

let liveClientInstance: GeminiLiveClient | null = null;

export interface GeminiLiveCallbacks {
    onStatusChange?: (status: string, details?: any) => void;
    onTextOutput?: (text: string) => void;
    onWarning?: (msg: string) => void;
    onTaskUpdate?: (task: string) => void;
    onVolumeChange?: (volume: number) => void;
}

/**
 * Starts the Gemini Live Session using @codingpheonix/gemini-live-wrapper and ephemeral tokens.
 * 
 * @param callbacks Object containing UI callbacks for events
 * @param backendUrl Optional backend URL (defaults to env or localhost:3000)
 * @param userId Optional userId
 * @param sessionId Optional sessionId
 */
export async function startGeminiLiveSession(
    callbacks: GeminiLiveCallbacks = {},
    backendUrl?: string,
    userId: string = 'default-user',
    sessionId: string = 'default-session'
) {
    if (liveClientInstance) {
        liveClientInstance.stopSession();
    }
    
    liveClientInstance = new GeminiLiveClient(backendUrl, userId, sessionId);
    
    // Attach callbacks
    liveClientInstance.onStatusChange = callbacks.onStatusChange;
    liveClientInstance.onTextOutput = callbacks.onTextOutput;
    liveClientInstance.onWarning = callbacks.onWarning;
    liveClientInstance.onTaskUpdate = callbacks.onTaskUpdate;
    liveClientInstance.onVolumeChange = callbacks.onVolumeChange;

    await liveClientInstance.startSession();
    console.log("Gemini Live Session Started via @codingpheonix/gemini-live-wrapper");
}

/**
 * Stops the current Gemini Live Session and disconnects.
 */
export function stopGeminiLiveSession() {
    if (liveClientInstance) {
        liveClientInstance.stopSession();
        liveClientInstance = null;
        console.log("Gemini Live Session Stopped");
    }
}
