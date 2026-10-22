import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { Plus, Sprout, AlertCircle, Calendar, ArrowRight, Loader2, Sparkles, History } from 'lucide-react';

interface PastSessionItem {
  date: string;
  suggestions: string[];
}

interface UserSession {
  sessionId: string;
  userId: string;
  plant: {
    cropName: string;
    diseaseName?: string;
  };
  pastSessions?: PastSessionItem[];
  createdAt: string;
  lastActivityAt: string;
}

export default function PlantScan() {
  const { user, userId, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [sessions, setSessions] = useState<UserSession[]>([]);
  const [loadingSessions, setLoadingSessions] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [plantName, setPlantName] = useState('');
  const [diseaseName, setDiseaseName] = useState('');
  const [formError, setFormError] = useState('');
  const [formSubmitting, setFormSubmitting] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

  // Load user sessions
  const fetchUserSessions = async () => {
    if (!userId) {
      setLoadingSessions(false);
      return;
    }
    try {
      setLoadingSessions(true);
      const res = await fetch(`${backendUrl}/api/sessions/user/${userId}`);
      if (res.ok) {
        const data = await res.json();
        setSessions(data);
      }
    } catch (err) {
      console.error('Failed to fetch sessions:', err);
    } finally {
      setLoadingSessions(false);
    }
  };

  useEffect(() => {
    if (!authLoading) {
      if (!userId) {
        navigate('/login');
      } else {
        fetchUserSessions();
      }
    }
  }, [userId, authLoading]);

  // Handle New Session Submission
  const handleCreateSession = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    const cleanPlant = plantName.trim();
    const cleanDisease = diseaseName.trim();

    if (!cleanPlant || !cleanDisease) {
      setFormError('Please enter both plant name and disease name.');
      return;
    }

    setFormSubmitting(true);

    try {
      // Step 6 & 7: Check if disease & plant are in the database
      const checkRes = await fetch(
        `${backendUrl}/api/sessions/check?plantName=${encodeURIComponent(cleanPlant)}&diseaseName=${encodeURIComponent(cleanDisease)}`
      );

      const checkData = await checkRes.json();

      if (!checkRes.ok || !checkData.found) {
        setFormError(checkData.message || "We don't have information about that plant disease in our database.");
        setFormSubmitting(false);
        return;
      }

      // Step 8: Generate UUID v4 for sessionId
      const newSessionId = crypto.randomUUID();

      // Step 8 & 10: Create session in DB and set runtime
      const startRes = await fetch(`${backendUrl}/api/sessions/start`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          sessionId: newSessionId,
          initialData: {
            plantName: checkData.crop?.name || cleanPlant,
            diseaseName: checkData.disease?.name || cleanDisease
          }
        })
      });

      if (!startRes.ok) {
        const startErr = await startRes.json();
        throw new Error(startErr.error || 'Failed to initialize session');
      }

      // Step 10: Navigate to live voice communication page with sessionId
      setIsModalOpen(false);
      navigate(`/agent?sessionId=${newSessionId}`);
    } catch (err: any) {
      console.error('Session start error:', err);
      setFormError(err.message || 'Error creating session');
    } finally {
      setFormSubmitting(false);
    }
  };

  // Handle clicking an existing session
  const handleSelectSession = (sessionId: string) => {
    navigate(`/agent?sessionId=${sessionId}`);
  };

  return (
    <div className="min-h-screen bg-[#071c14] text-[#f4f1e8] flex flex-col justify-between selection:bg-[#42d369]/30">
      <Navbar />

      {/* Ambient background glow */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#3cda78]/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#123c28]/40 blur-[130px] rounded-full" />
      </div>

      <main className="relative z-10 flex-1 max-w-6xl w-full mx-auto px-5 pt-32 pb-16">
        
        {/* Page Top Heading */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1 text-xs font-medium text-[#55df7d] backdrop-blur-md mb-3">
              <Sprout className="w-3.5 h-3.5" />
              <span>Plant Disease Consultation Sessions</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
              Plant<span className="text-[#42d369]">Scan</span> Hub
            </h1>
            <p className="mt-2 text-sm md:text-base text-[#a3b899]">
              Welcome, {user?.name || 'Farmer'}. Manage your diagnostic voice sessions and treatment history.
            </p>
          </div>

          <button
            onClick={() => {
              setFormError('');
              setIsModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#42d369] to-[#28a745] hover:from-[#3ec261] hover:to-[#218838] text-white font-semibold shadow-lg shadow-[#42d369]/25 hover:shadow-[0_0_25px_rgba(66,211,105,0.4)] transition-all cursor-pointer shrink-0"
          >
            <Plus className="w-5 h-5" />
            <span>New Session</span>
          </button>
        </div>

        {/* Sessions List Section */}
        {loadingSessions ? (
          <div className="flex flex-col items-center justify-center py-24 text-[#a3b899]">
            <Loader2 className="w-8 h-8 animate-spin text-[#42d369] mb-3" />
            <p className="text-sm">Loading your consultations...</p>
          </div>
        ) : sessions.length === 0 ? (
          <div className="text-center py-20 px-6 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-xl max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#42d369]/10 text-[#42d369] flex items-center justify-center mx-auto mb-4">
              <Sprout className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">No Active Sessions Yet</h2>
            <p className="text-sm text-[#a3b899] mb-6">
              Start a new session to consult with PhytoScan AI about plant diseases, symptoms, and 2-day immediate treatment steps.
            </p>
            <button
              onClick={() => {
                setFormError('');
                setIsModalOpen(true);
              }}
              className="px-6 py-3 rounded-2xl bg-[#42d369] text-white font-medium hover:bg-green-600 transition-colors cursor-pointer"
            >
              Start Your First Session
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sessions.map((session) => {
              const latestPast = session.pastSessions && session.pastSessions.length > 0 
                ? session.pastSessions[session.pastSessions.length - 1] 
                : null;

              return (
                <div
                  key={session.sessionId}
                  onClick={() => handleSelectSession(session.sessionId)}
                  className="group relative bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-[#42d369]/50 rounded-3xl p-6 transition-all duration-300 backdrop-blur-xl shadow-lg cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    {/* Plant and Disease Badges */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div>
                        <span className="text-xs uppercase tracking-wider text-[#a3b899] font-semibold">Plant</span>
                        <h2 className="text-xl font-bold text-white group-hover:text-[#42d369] transition-colors">
                          {session.plant?.cropName || 'Unknown Plant'}
                        </h2>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 border border-emerald-500/30 text-[#55df7d]">
                        {session.plant?.diseaseName || 'General Health'}
                      </span>
                    </div>

                    {/* Past Suggestions Info */}
                    {latestPast && (
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <div className="flex items-center gap-1.5 text-xs text-[#a3b899] mb-2 font-medium">
                          <History className="w-3.5 h-3.5 text-[#42d369]" />
                          <span>Latest Action Plan ({new Date(latestPast.date).toLocaleDateString()}):</span>
                        </div>
                        <ul className="space-y-1 text-xs text-white/80 line-clamp-3">
                          {latestPast.suggestions.slice(0, 2).map((sugg, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-[#42d369] mt-0.5">•</span>
                              <span className="truncate">{sugg}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Card Footer */}
                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#a3b899]">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{new Date(session.lastActivityAt || session.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#42d369] font-medium group-hover:translate-x-1 transition-transform">
                      <span>Resume</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal: Create New Session */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <div className="relative w-full max-w-md bg-[#0a2319] border border-white/15 rounded-3xl p-7 shadow-2xl animate-in fade-in duration-200">
              
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2 text-white">
                  <Sparkles className="w-5 h-5 text-[#42d369]" />
                  <h2 className="text-xl font-bold">Start New Session</h2>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-white/50 hover:text-white transition-colors cursor-pointer text-xl leading-none"
                >
                  &times;
                </button>
              </div>

              <p className="text-xs text-[#a3b899] mb-6">
                Specify the plant and observed disease to load its knowledge context and initiate your AI consultation.
              </p>

              {formError && (
                <div className="mb-5 p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-start gap-2.5 text-red-300 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                  <span>{formError}</span>
                </div>
              )}

              <form onSubmit={handleCreateSession} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#a3b899] uppercase tracking-wider mb-1.5">
                    Plant Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Potato, Tomato"
                    value={plantName}
                    onChange={(e) => setPlantName(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/30 focus:outline-none focus:border-[#42d369] focus:ring-1 focus:ring-[#42d369] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#a3b899] uppercase tracking-wider mb-1.5">
                    Disease Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Early Blight, Late Blight"
                    value={diseaseName}
                    onChange={(e) => setDiseaseName(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/30 focus:outline-none focus:border-[#42d369] focus:ring-1 focus:ring-[#42d369] text-sm"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-3 rounded-2xl border border-white/10 text-white/70 hover:text-white hover:bg-white/5 text-sm font-medium transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={formSubmitting}
                    className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-[#42d369] to-[#28a745] hover:from-[#3ec261] hover:to-[#218838] text-white font-semibold text-sm shadow-md shadow-[#42d369]/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {formSubmitting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <span>Verify & Enter</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
