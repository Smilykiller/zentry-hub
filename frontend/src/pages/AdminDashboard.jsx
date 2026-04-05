import React, { useState, useEffect } from 'react';
import { Lock, ShieldAlert } from 'lucide-react';

const AdminDashboard = () => {
  // --- SECURITY STATE ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState(false);

  // --- DATABASE STATE ---
  const [comments, setComments] = useState([]);
  
  // Replace with your Vercel URL
  const API_URL = "https://your-vercel-url.vercel.app/api"; 
  
  // The Master Password (You can change this to anything you want)
  const MASTER_KEY = "ZENTRY2026";

  // --- AUTHENTICATION HANDLER ---
  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === MASTER_KEY) {
      setIsAuthenticated(true);
      setAuthError(false);
      fetchData(); // Only fetch data AFTER the lock is bypassed
    } else {
      setAuthError(true);
      setPasscode('');
    }
  };

  // --- DATABASE FETCH (Only runs when called) ---
  const fetchData = () => {
    fetch(`${API_URL}/admin/comments`)
      .then(res => res.json())
      .then(data => setComments(data))
      .catch(err => console.error("Access denied by server", err));
  };

  // --- CRUD OPERATIONS ---
  const approveComment = async (id) => {
    await fetch(`${API_URL}/admin/comments/${id}/approve`, { method: 'PATCH' });
    setComments(comments.map(c => c.id === id ? { ...c, isApproved: true } : c));
  };

  const deleteComment = async (id) => {
    await fetch(`${API_URL}/admin/comments/${id}`, { method: 'DELETE' });
    setComments(comments.filter(c => c.id !== id));
  };

  // ==========================================
  // RENDER 1: THE LOCK SCREEN (If not authenticated)
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex flex-col justify-center items-center px-6 relative overflow-hidden">
        {/* Ambient Red Glow for Security Screen */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-red-900/10 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="relative z-10 w-full max-w-md bg-white/[0.02] border border-white/10 p-10 rounded-2xl backdrop-blur-md">
          <div className="flex flex-col items-center mb-8">
            <Lock className="w-12 h-12 text-zentry-copper mb-4" />
            <h1 className="text-2xl font-bold tracking-[0.2em] text-white">RESTRICTED AREA</h1>
            <p className="text-gray-500 font-mono text-sm mt-2 tracking-widest uppercase">Admin clearance required</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input 
                type="password" 
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className={`w-full bg-black/50 border ${authError ? 'border-red-500/50 text-red-400' : 'border-white/10 text-white'} rounded-md px-4 py-3 focus:outline-none focus:border-zentry-copper text-center tracking-[0.5em] font-mono`}
                placeholder="ENTER PASSCODE"
                autoFocus
              />
              {authError && (
                <p className="text-red-500 text-xs font-mono tracking-widest mt-3 flex items-center justify-center gap-2">
                  <ShieldAlert className="w-4 h-4" /> ACCESS DENIED
                </p>
              )}
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-zentry-copper/10 hover:bg-zentry-copper hover:text-black text-zentry-copper border border-zentry-copper/30 hover:border-zentry-copper font-medium py-3 px-6 rounded-md transition-all duration-300 tracking-widest uppercase"
            >
              Authenticate
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ==========================================
  // RENDER 2: THE COMMAND CENTER (If authenticated)
  // ==========================================
  return (
    <div className="min-h-screen bg-black text-white p-10 pt-32">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-widest text-zentry-copper mb-2">COMMAND CENTER</h1>
            <p className="font-mono text-gray-500 text-sm tracking-widest">SYSTEM: SECURE // DATABASE: CONNECTED</p>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-900/20 text-green-400 border border-green-900/50 rounded-full text-xs font-mono tracking-widest">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              LIVE
            </span>
          </div>
        </div>
        
        <div className="space-y-4">
          {comments.length === 0 ? (
            <p className="text-gray-500 font-mono tracking-widest text-center py-10 border border-dashed border-white/10 rounded-lg">
              [ NO DIRECTIVES FOUND IN DATABASE ]
            </p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="p-6 border border-white/5 rounded-lg bg-white/[0.02] flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:border-white/10 transition-colors">
                
                <div>
                  <p className="font-bold text-gray-200 tracking-wider mb-1">{comment.author}</p>
                  <p className="text-gray-400 font-light leading-relaxed">"{comment.text}"</p>
                  
                  <span className={`inline-block mt-3 px-3 py-1 text-xs font-mono tracking-widest rounded border ${comment.isApproved ? 'bg-green-900/20 text-green-400 border-green-900/50' : 'bg-yellow-900/20 text-yellow-400 border-yellow-900/50'}`}>
                    {comment.isApproved ? "STATUS: LIVE" : "STATUS: PENDING REVIEW"}
                  </span>
                </div>

                <div className="flex gap-3 w-full md:w-auto">
                  {!comment.isApproved && (
                    <button onClick={() => approveComment(comment.id)} className="flex-1 md:flex-none px-6 py-2 bg-green-600/10 text-green-400 border border-green-600/30 rounded hover:bg-green-600 hover:text-black font-mono tracking-widest transition-all text-xs">
                      APPROVE
                    </button>
                  )}
                  <button onClick={() => deleteComment(comment.id)} className="flex-1 md:flex-none px-6 py-2 bg-red-600/10 text-red-400 border border-red-600/30 rounded hover:bg-red-600 hover:text-black font-mono tracking-widest transition-all text-xs">
                    DELETE
                  </button>
                </div>
                
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;