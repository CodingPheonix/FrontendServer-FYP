import { useState, useEffect, useRef } from 'react';
import { GeminiLiveClient } from '../GeminiAdapter/GeminiLiveClient';

export default function VoiceAgent() {
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [warning, setWarning] = useState<string>('');
  const clientRef = useRef<GeminiLiveClient | null>(null);

  // Hardcoded for now, but will eventually come from URL parameters
  const userId = "default-user";
  const sessionId = "default-session";

  useEffect(() => {
    const initSession = async () => {
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
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
          console.log('Session initialized successfully');
        }
      } catch (error) {
        console.error('Error initializing session:', error);
        setWarning('Error connecting to backend');
      }
    };

    initSession();
  }, [userId, sessionId]);

  useEffect(() => {
    // Initialize the Gemini Live Client
    clientRef.current = new GeminiLiveClient();

    // Set up UI callbacks
    clientRef.current.onTextOutput = (text) => {
      setMessages((prev) => [...prev, `Agent: ${text}`]);
    };

    clientRef.current.onWarning = (msg) => {
      setWarning(msg);
    };

    clientRef.current.onInterrupted = () => {
      setMessages((prev) => [...prev, '[Audio Interrupted]']);
    };

    // Cleanup when component unmounts
    return () => {
      if (clientRef.current) {
        clientRef.current.stopSession();
      }
    };
  }, []);

  const toggleRecording = async () => {
    if (!clientRef.current) return;

    if (isRecording) {
      clientRef.current.stopSession();
      setIsRecording(false);
      setMessages((prev) => [...prev, '[Session Ended]']);
    } else {
      try {
        console.log('enter');
        setWarning('');
        await clientRef.current.startSession();
        setIsRecording(true);
        setMessages((prev) => [...prev, '[Session Started. Speak now...]']);
      } catch (err) {
        console.error("Error starting session:", err);
        setWarning('Failed to start session. Please check microphone permissions and console.');
      }
    }
  };

  console.log(isRecording)

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif', textAlign: 'left' }}>
      <h1 style={{ color: '#2c3e50', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
        Gemini Voice Agent
      </h1>

      <div style={{ margin: '20px 0', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <button
          onClick={toggleRecording}
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            fontWeight: 'bold',
            backgroundColor: isRecording ? '#e74c3c' : '#2ecc71',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}
        >
          {isRecording ? 'Stop Session' : 'Start Session'}
        </button>
        {isRecording && (
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#e74c3c', fontWeight: 'bold' }}>
            <span style={{
              width: '10px',
              height: '10px',
              backgroundColor: '#e74c3c',
              borderRadius: '50%',
              display: 'inline-block',
              animation: 'pulse 1.5s infinite'
            }}></span>
            Live
          </span>
        )}
      </div>

      {warning && (
        <div style={{
          backgroundColor: '#fdf3d8',
          color: '#d68b00',
          padding: '10px 15px',
          borderRadius: '5px',
          marginBottom: '20px',
          borderLeft: '4px solid #f1c40f'
        }}>
          <strong>Warning:</strong> {warning}
        </div>
      )}

      <div style={{
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '20px',
        height: '400px',
        overflowY: 'auto',
        backgroundColor: '#ffffff',
        color: '#333',
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        {messages.length === 0 ? (
          <div style={{ color: '#999', fontStyle: 'italic', textAlign: 'center', marginTop: '150px' }}>
            No messages yet. Click "Start Session" and begin speaking.
          </div>
        ) : (
          messages.map((msg, i) => (
            <div key={i} style={{
              padding: '10px 15px',
              backgroundColor: msg.startsWith('Agent:') ? '#f0f7ff' : '#f8f9fa',
              borderLeft: msg.startsWith('Agent:') ? '4px solid #3498db' : '4px solid #95a5a6',
              borderRadius: '4px',
              fontFamily: 'monospace'
            }}>
              {msg}
            </div>
          ))
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.4; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
