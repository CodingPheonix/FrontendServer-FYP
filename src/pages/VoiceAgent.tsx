import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { GeminiLiveClient } from '../GeminiAdapter/GeminiLiveClient';
import { useAuth } from '../context/AuthContext';
import { Sprout, ArrowLeft } from 'lucide-react';

export default function VoiceAgent() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { userId: authUserId, isLoading: authLoading } = useAuth();

  const [isRecording, setIsRecording] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<string>('Disconnected');
  const [messages, setMessages] = useState<Array<{ sender: 'agent' | 'user' | 'system' | 'action'; text: string; time: string }>>([]);
  const [warning, setWarning] = useState<string>('');
  const [activeTask, setActiveTask] = useState<string>('');
  const [volume, setVolume] = useState<number>(0);
  const [sessionDetails, setSessionDetails] = useState<{ plant?: { cropName: string; diseaseName?: string }; pastSessions?: any[] } | null>(null);
  const sessionDetailsRef = useRef<{ plant?: { cropName: string; diseaseName?: string }; pastSessions?: any[] } | null>(null);

  const clientRef = useRef<GeminiLiveClient | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const sessionId = searchParams.get('sessionId') || 'default-session';
  const userId = authUserId || 'default-user';
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

  const formatCurrentTime = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const addMessage = (sender: 'agent' | 'user' | 'system' | 'action', text: string) => {
    setMessages((prev) => [...prev, { sender, text, time: formatCurrentTime() }]);
  };

  useEffect(() => {
    sessionDetailsRef.current = sessionDetails;
  }, [sessionDetails]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!authLoading && !authUserId) {
      navigate('/login');
    }
  }, [authLoading, authUserId, navigate]);

  useEffect(() => {
    const initSession = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/sessions/init`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId, sessionId }),
        });

        if (!response.ok) {
          console.error('Failed to initialize session');
          setWarning('Failed to initialize backend session');
        } else {
          const resData = await response.json();
          setSessionDetails(resData.data);
          sessionDetailsRef.current = resData.data;
          console.log('Session initialized successfully:', resData.data);
        }
      } catch (error) {
        console.error('Error initializing session:', error);
        setWarning('Error connecting to backend');
      }
    };

    if (userId && sessionId) {
      initSession();
    }
  }, [userId, sessionId, backendUrl]);

  useEffect(() => {
    const client = new GeminiLiveClient(backendUrl, userId, sessionId);
    clientRef.current = client;

    client.onStatusChange = (status) => {
      setConnectionStatus(status);
      if (status === 'Connected') {
        addMessage('system', 'Connected to PhytoScan Live Voice Assistant.');

        // Trigger 1: Proactively send text to make AI speak first immediately upon connecting
        const details = sessionDetailsRef.current;
        const cropName = details?.plant?.cropName || 'plant';
        const diseaseName = details?.plant?.diseaseName || 'detected leaf condition';
        const pastSessions = details?.pastSessions || [];

        setTimeout(() => {
          if (pastSessions.length > 0) {
            client.sendText(
              `[SYSTEM EVENT]: Consultation session started. This is an existing session for crop "${cropName}" and condition "${diseaseName}". ` +
              `There are past consultation entries. Greet the farmer warmly, mention their ${cropName}, and ask how the recovery and treatment have been going since the last session.`
            );
          } else {
            client.sendText(
              `[SYSTEM EVENT]: Consultation session started. This is a brand new session for crop "${cropName}" with detected condition "${diseaseName}". ` +
              `Greet the farmer, state the detected condition, and ask about the current stage of the plant and what visible symptoms they are observing.`
            );
          }
        }, 600);
      } else if (status === 'Disconnected') {
        setIsRecording(false);
      }
    };

    client.onTextOutput = (text) => {
      addMessage('agent', text);
    };

    client.onWarning = (msg) => {
      setWarning(msg);
    };

    client.onTaskUpdate = (task) => {
      setActiveTask(task);
      addMessage('action', task);
    };

    client.onVolumeChange = (vol) => {
      setVolume(Math.min(Math.round(vol * 100), 100));
    };

    // When the LLM closes the consultation session, notify user & redirect back to PlantScan
    client.onSessionEnded = (farewell) => {
      addMessage('agent', farewell || "Thank you for consulting PhytoScan. You can follow up in a 1-week interval. Take care!");
      setIsRecording(false);
      setTimeout(() => {
        navigate('/plantscan');
      }, 3500);
    };

    return () => {
      if (clientRef.current) {
        clientRef.current.stopSession();
      }
    };
  }, [backendUrl, userId, sessionId, navigate]);

  const toggleRecording = async () => {
    if (!clientRef.current) return;

    if (isRecording) {
      clientRef.current.stopSession();
      setIsRecording(false);
      setActiveTask('');
      setVolume(0);
      addMessage('system', 'Voice session ended.');
    } else {
      try {
        setWarning('');
        setActiveTask('Initializing voice link...');
        await clientRef.current.startSession();
        setIsRecording(true);
        setActiveTask('');
        addMessage('system', 'Listening... Ask anything about plant health, diseases, or fertilizer treatments.');
      } catch (err: any) {
        console.error("Error starting session:", err);
        setWarning(err?.message || 'Failed to start session. Please allow microphone access.');
        setIsRecording(false);
        setActiveTask('');
      }
    }
  };

  // Quick prompt suggestions
  const suggestions = [
    "How can I treat yellowing tomato leaves?",
    "Recommend organic fertilizer for indoor succulents",
    "How do I prevent fungal root rot?",
  ];

  return (
    <div className="min-h-screen bg-[#071c14] text-[#f4f1e8] flex flex-col justify-between selection:bg-[#42d369]/30">
      {/* Floating navigation bar */}
      <Navbar />

      {/* Ambient background glow & radial gradient effects */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#3cda78]/10 blur-[130px] rounded-full" />
        <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#123c28]/40 blur-[120px] rounded-full" />
      </div>

      {/* Main Container */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center max-w-4xl w-full mx-auto px-5 pt-28 pb-16">
        
        {/* Navigation & Session Context Info */}
        <div className="w-full max-w-2xl flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/plantscan')}
            className="inline-flex items-center gap-2 text-xs text-[#a3b899] hover:text-[#42d369] transition-colors cursor-pointer px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>PlantScan Sessions</span>
          </button>

          {sessionDetails?.plant?.cropName && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs text-[#55df7d]">
              <Sprout className="w-3.5 h-3.5" />
              <span className="font-semibold">{sessionDetails.plant.cropName}</span>
              {sessionDetails.plant.diseaseName && (
                <>
                  <span className="text-white/40">•</span>
                  <span>{sessionDetails.plant.diseaseName}</span>
                </>
              )}
            </div>
          )}
        </div>

        {/* Minimalist Header */}
        <div className="text-center mb-6 max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-xs font-medium text-[#55df7d] backdrop-blur-md mb-3 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isRecording ? 'bg-red-400 opacity-75' : 'bg-emerald-400 opacity-75'}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isRecording ? 'bg-red-500' : 'bg-emerald-500'}`}></span>
            </span>
            {isRecording ? 'Live Voice Active' : connectionStatus === 'Connected' ? 'Assistant Ready' : 'PhytoScan AI Voice'}
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
            Consult <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#42d369] via-[#8bdd22] to-[#55d979]">PhytoScan AI</span>
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-[#a3b899] font-normal leading-relaxed">
            Discuss your plant condition and symptoms to receive a 2-day immediate aid plan and fertilizer advice.
          </p>
        </div>

        {/* Voice Sphere & Interaction Hub */}
        <div className="w-full max-w-2xl flex flex-col items-center mb-8">
          
          {/* Animated Interactive Voice Orb */}
          <div className="relative flex items-center justify-center my-4">
            {/* Outer pulse waves when recording */}
            {isRecording && (
              <>
                <div 
                  className="absolute rounded-full bg-[#42d369]/10 border border-[#42d369]/30 transition-all duration-300 pointer-events-none"
                  style={{
                    width: `${160 + volume * 1.4}px`,
                    height: `${160 + volume * 1.4}px`,
                  }}
                />
                <div 
                  className="absolute rounded-full bg-[#8bdd22]/15 blur-md transition-all duration-200 pointer-events-none"
                  style={{
                    width: `${130 + volume * 1.0}px`,
                    height: `${130 + volume * 1.0}px`,
                  }}
                />
              </>
            )}

            {/* Main Orb Button */}
            <button
              onClick={toggleRecording}
              aria-label={isRecording ? 'Stop voice session' : 'Start voice session'}
              className={`relative z-10 flex items-center justify-center w-28 h-28 sm:w-32 sm:h-32 rounded-full transition-all duration-300 focus:outline-none shadow-2xl ${
                isRecording 
                  ? 'bg-gradient-to-tr from-red-600 to-rose-400 shadow-[0_0_40px_rgba(239,68,68,0.4)] scale-105' 
                  : 'bg-gradient-to-tr from-[#173628] via-[#224b37] to-[#3cda78]/40 border border-[#55d979]/40 hover:border-[#55d979] hover:shadow-[0_0_35px_rgba(66,211,105,0.35)] hover:scale-105 active:scale-95'
              }`}
            >
              {isRecording ? (
                /* Stop Icon */
                <svg className="w-10 h-10 text-white drop-shadow" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="6" y="6" width="12" height="12" rx="2" />
                </svg>
              ) : (
                /* Microphone Icon */
                <svg className="w-10 h-10 text-[#55df7d] transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-14 0m14 0a7 7 0 01-14 0m7 7v4m-4 0h8m-4-8a3 3 0 003-3V5a3 3 0 10-6 0v6a3 3 0 003 3z" />
                </svg>
              )}
            </button>
          </div>

          {/* Status & Audio Visualizer Bars */}
          <div className="flex flex-col items-center gap-2 mt-2">
            <span className="text-xs font-medium tracking-wide text-[#8ba592] uppercase">
              {isRecording ? 'Listening to your voice...' : 'Tap the microphone to speak'}
            </span>

            {isRecording && (
              <div className="flex items-center gap-1.5 h-6 px-4 py-1 rounded-full bg-black/30 border border-white/5">
                {[...Array(9)].map((_, i) => {
                  const barHeight = Math.max(
                    4,
                    Math.min(24, Math.sin(i * 0.8 + Date.now() / 200) * 8 + (volume / 100) * 22)
                  );
                  return (
                    <div
                      key={i}
                      className="w-1 rounded-full bg-gradient-to-t from-[#42d369] to-[#8bdd22] transition-all duration-75"
                      style={{ height: `${barHeight}px` }}
                    />
                  );
                })}
              </div>
            )}

            {activeTask && (
              <span className="text-xs text-[#55df7d] font-medium bg-[#123c28]/60 px-3 py-1 rounded-full border border-[#55df7d]/20 animate-pulse">
                {activeTask}
              </span>
            )}
          </div>
        </div>

        {/* Warning notification */}
        {warning && (
          <div className="w-full max-w-2xl mb-4 flex items-center gap-3 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs backdrop-blur-md">
            <svg className="w-5 h-5 shrink-0 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="flex-1">{warning}</p>
          </div>
        )}

        {/* Conversation Stream Card */}
        <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-5 shadow-2xl flex flex-col h-[340px] sm:h-[380px]">
          {/* Card Topbar */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs text-[#8ba592]">
            <span className="font-semibold text-white/90 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#42d369]"></span>
              Live Conversation Feed
            </span>
            <span className="text-[11px] font-mono tracking-wider opacity-80">
              STATUS: {connectionStatus.toUpperCase()}
            </span>
          </div>

          {/* Transcript / Output list */}
          <div className="flex-1 overflow-y-auto my-3 space-y-3.5 pr-1.5 scrollbar-thin scrollbar-thumb-white/10">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center px-4">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/5 flex items-center justify-center mb-3 text-[#55df7d]">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <p className="text-sm text-[#c8d5bd] font-medium">Ready for your plant questions</p>
                <p className="text-xs text-white/40 mt-1 max-w-xs">
                  Press the mic to start. Real-time agent answers will stream directly into this window.
                </p>

                {/* Example prompts */}
                <div className="mt-5 flex flex-wrap gap-2 justify-center">
                  {suggestions.map((s, idx) => (
                    <span 
                      key={idx}
                      className="text-[11px] px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-[#a3b899] cursor-default hover:border-[#42d369]/40 transition"
                    >
                      "{s}"
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((msg, index) => {
                if (msg.sender === 'system') {
                  return (
                    <div key={index} className="flex justify-center my-2">
                      <span className="text-[11px] px-3 py-1 rounded-full bg-white/[0.05] border border-white/5 text-[#8ba592]">
                        {msg.text}
                      </span>
                    </div>
                  );
                }

                if (msg.sender === 'action') {
                  return (
                    <div key={index} className="flex items-center gap-2 text-xs text-[#8bdd22] bg-[#123c28]/40 border border-[#55df7d]/20 px-3 py-1.5 rounded-xl">
                      <span className="text-xs">⚡</span>
                      <span className="font-mono text-[11px]">{msg.text}</span>
                    </div>
                  );
                }

                const isAgent = msg.sender === 'agent';
                return (
                  <div
                    key={index}
                    className={`flex flex-col ${isAgent ? 'items-start' : 'items-end'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                        isAgent
                          ? 'bg-[#123c28]/90 text-[#f4f1e8] border border-[#55df7d]/30 rounded-tl-sm'
                          : 'bg-[#42d369] text-[#071c14] font-medium rounded-tr-sm shadow-md'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                    </div>
                    <span className="text-[10px] text-white/30 px-1 mt-1">
                      {isAgent ? 'PhytoScan' : 'You'} • {msg.time}
                    </span>
                  </div>
                );
              })
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Clear Chat Control if messages exist */}
          {messages.length > 0 && (
            <div className="pt-2 border-t border-white/5 flex justify-end">
              <button
                onClick={() => setMessages([])}
                className="text-[11px] text-[#8ba592] hover:text-[#f4f1e8] transition"
              >
                Clear History
              </button>
            </div>
          )}
        </div>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
