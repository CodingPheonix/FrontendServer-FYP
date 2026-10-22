import { GeminiLive, type LiveTool } from '@codingpheonix/gemini-live-wrapper';

export interface FrontendToolOptions {
    backendUrl: string;
    userId: string;
    sessionId: string;
    onTaskUpdate?: (task: string) => void;
    onSessionEnded?: (farewellMessage?: string) => void;
    onTriggerSendText?: (text: string) => void;
}

export function createAgriculturalTools(options: FrontendToolOptions): LiveTool[] {
    const { backendUrl, userId, sessionId, onTaskUpdate, onTriggerSendText } = options;

    const executeBackendTool = async (name: string, args: Record<string, any>) => {
        const response = await fetch(`${backendUrl}/api/live/tools/execute`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                args: { ...args, userId, sessionId },
                userId,
                sessionId
            })
        });

        if (!response.ok) {
            throw new Error(`Tool execution failed with status ${response.status}`);
        }

        const data = await response.json();
        return data.result;
    };

    return [
        {
            name: 'fetch_userId_sessionId',
            description: 'Fetches the current userId and sessionId. Always run this first if you do not know them.',
            parameters: {
                type: 'OBJECT',
                properties: {}
            },
            handler: async () => {
                onTaskUpdate?.('Gathering credentials');
                return { userId, sessionId };
            }
        },
        {
            name: 'fetch_plant_details',
            description: 'Fetches the details of the plant currently being discussed.',
            parameters: {
                type: 'OBJECT',
                properties: {
                    userId: { type: 'string', description: 'User identifier' },
                    sessionId: { type: 'string', description: 'Session identifier' }
                }
            },
            handler: async (args) => {
                onTaskUpdate?.('Gathering plant details');
                return await executeBackendTool('fetch_plant_details', args);
            }
        },
        {
            name: 'fetch_plant_disease',
            description: 'Fetches the disease affecting the plant currently being discussed.',
            parameters: {
                type: 'OBJECT',
                properties: {
                    userId: { type: 'string', description: 'User identifier' },
                    sessionId: { type: 'string', description: 'Session identifier' }
                }
            },
            handler: async (args) => {
                onTaskUpdate?.('Checking diseases');
                return await executeBackendTool('fetch_plant_disease', args);
            }
        },
        {
            name: 'perform_rag_search',
            description: 'Performs a RAG search in the background for a given query. Updates the session data when complete.',
            parameters: {
                type: 'OBJECT',
                properties: {
                    query: { type: 'string', description: 'The search query.', required: true },
                    userId: { type: 'string', description: 'User identifier' },
                    sessionId: { type: 'string', description: 'Session identifier' }
                },
                required: ['query']
            },
            handler: async (args) => {
                onTaskUpdate?.('Initiating knowledge search');
                const res = await executeBackendTool('perform_rag_search', args);
                
                // Trigger 2: Send text to AI after RAG results arrive so it speaks the retrieved answer
                if (onTriggerSendText && res?.context) {
                    setTimeout(() => {
                        onTriggerSendText(
                            `[SYSTEM EVENT]: Background RAG retrieval is complete for query "${args?.query}". ` +
                            `Retrieved Agricultural Knowledge:\n${res.context}\n\n` +
                            `Please present the practical remedy, treatment, and immediate next steps directly to the grower.`
                        );
                    }, 500);
                }
                return res;
            }
        },
        {
            name: 'fetch_rag_details',
            description: 'Fetches the current RAG (Retrieval-Augmented Generation) details for this session.',
            parameters: {
                type: 'OBJECT',
                properties: {
                    userId: { type: 'string', description: 'User identifier' },
                    sessionId: { type: 'string', description: 'Session identifier' }
                }
            },
            handler: async (args) => {
                onTaskUpdate?.('Fetching retrieved context');
                return await executeBackendTool('fetch_rag_details', args);
            }
        },
        {
            name: 'fetch_past_sessions',
            description: 'Fetches past consultation sessions, previous suggestions, and dates for this plant and disease.',
            parameters: {
                type: 'OBJECT',
                properties: {
                    userId: { type: 'string', description: 'User identifier' },
                    sessionId: { type: 'string', description: 'Session identifier' }
                }
            },
            handler: async (args) => {
                onTaskUpdate?.('Reviewing past consultations');
                return await executeBackendTool('fetch_past_sessions', args);
            }
        },
        {
            name: 'save_session_suggestions',
            description: 'Saves 3-5 concrete immediate aid suggestions (including fertilizer names, 2-day steps) for this session to the database.',
            parameters: {
                type: 'OBJECT',
                properties: {
                    suggestions: {
                        type: 'ARRAY',
                        items: { type: 'string' },
                        description: '3 to 5 clear, actionable immediate-aid steps and fertilizer suggestions for the next 2 days.'
                    },
                    userId: { type: 'string', description: 'User identifier' },
                    sessionId: { type: 'string', description: 'Session identifier' }
                },
                required: ['suggestions']
            },
            handler: async (args) => {
                onTaskUpdate?.('Saving treatment suggestions');
                const res = await executeBackendTool('save_session_suggestions', args);

                // Trigger 3: Send text after saving 2-day treatment suggestions so AI summarizes and prepares wrap up
                if (onTriggerSendText && res?.status === 'success') {
                    setTimeout(() => {
                        onTriggerSendText(
                            `[SYSTEM EVENT]: The immediate 2-day treatment suggestions have been saved successfully to the database. ` +
                            `Summarize the key 2-day steps clearly for the grower, ask if they have any remaining questions, ` +
                            `and inform them they can follow up in a 1-week interval.`
                        );
                    }, 500);
                }
                return res;
            }
        },
        {
            name: 'close_consultation_session',
            description: 'Closes the current session after all advice and user questions are resolved, saying goodbye and returning the user to the sessions dashboard.',
            parameters: {
                type: 'OBJECT',
                properties: {
                    farewellMessage: { type: 'string', description: 'Farewell message' }
                }
            },
            handler: async (args) => {
                onTaskUpdate?.('Concluding consultation');
                const res = await executeBackendTool('close_consultation_session', args);
                if (options.onSessionEnded) {
                    options.onSessionEnded(args?.farewellMessage || res?.message);
                }
                return res;
            }
        }
    ];
}

export class GeminiLiveClient {
    private geminiLive: GeminiLive | null = null;
    private mediaStream: MediaStream | null = null;
    private backendUrl: string;
    private userId: string;
    private sessionId: string;

    public onStatusChange?: (status: string, details?: any) => void;
    public onTextOutput?: (text: string) => void;
    public onWarning?: (warning: string) => void;
    public onTaskUpdate?: (task: string) => void;
    public onVolumeChange?: (volume: number) => void;
    public onSessionEnded?: (farewellMessage?: string) => void;

    constructor(
        backendUrl: string = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000',
        userId: string = 'default-user',
        sessionId: string = 'default-session'
    ) {
        this.backendUrl = backendUrl;
        this.userId = userId;
        this.sessionId = sessionId;
    }

    async startSession(): Promise<void> {
        // 1. Fetch ephemeral token and configuration from backend
        const tokenRes = await fetch(`${this.backendUrl}/api/live/token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: this.userId, sessionId: this.sessionId })
        });

        if (!tokenRes.ok) {
            const errData = await tokenRes.json().catch(() => ({}));
            throw new Error(errData.error || `Failed to fetch ephemeral token: ${tokenRes.statusText}`);
        }

        const { token, model, systemPrompt } = await tokenRes.json();

        // 2. Prepare agricultural tools that bridge back to backend services
        const tools = createAgriculturalTools({
            backendUrl: this.backendUrl,
            userId: this.userId,
            sessionId: this.sessionId,
            onTaskUpdate: (task) => this.onTaskUpdate?.(task),
            onSessionEnded: (farewell) => this.onSessionEnded?.(farewell),
            onTriggerSendText: (text) => this.sendText(text)
        });

        // 3. Initialize GeminiLive client with ephemeral token
        // Constructor signature:
        // (apiKey, model, useEphemeralToken, ephemeralToken, prompt, tools, enableLogs, enableSessionResumption, enableCompression)
        this.geminiLive = new GeminiLive(
            '',                               // apiKey empty when using ephemeral token
            model || 'gemini-3.1-flash-live-preview',
            true,                             // useEphemeralToken = true
            token,                            // ephemeral token from backend
            systemPrompt,
            tools,
            true,                             // enableLogs
            true,                             // enableSessionResumption
            true                              // enableCompression
        );

        this.geminiLive.onStatusChange = (status, details) => {
            console.log('Gemini Live status change:', status, details);
            this.onStatusChange?.(status, details);

            if (status === 'Connection expiring soon' && details?.timeLeft) {
                this.onWarning?.(`Connection expiring in ${details.timeLeft}`);
            }
        };

        // 4. Connect to Gemini Live WebSocket
        this.geminiLive.connect();

        // 5. Acquire microphone stream with clean audio preprocessing
        this.mediaStream = await navigator.mediaDevices.getUserMedia({
            audio: {
                echoCancellation: true,
                noiseSuppression: true,
                autoGainControl: true,
                sampleRate: 16000,
                channelCount: 1
            }
        });

        // 6. Start recording and streaming PCM audio directly to Gemini
        await this.geminiLive.startRecording(this.mediaStream, (volume) => {
            this.onVolumeChange?.(volume);
        });
    }

    sendText(text: string): void {
        this.geminiLive?.sendText(text);
    }

    sendVideo(frame: ArrayBuffer | Uint8Array, mimeType: string = 'image/jpeg'): void {
        this.geminiLive?.sendVideo(frame, mimeType);
    }

    stopSession(): void {
        if (this.geminiLive) {
            this.geminiLive.stopRecording();
            this.geminiLive.disconnect();
            this.geminiLive = null;
        }

        if (this.mediaStream) {
            this.mediaStream.getTracks().forEach((track) => track.stop());
            this.mediaStream = null;
        }
    }
}
