import React, { useState } from 'react';
import { Lock, ShieldAlert, FolderGit2, MessageSquare, Plus, Trash2, ExternalLink } from 'lucide-react';

const AdminDashboard = () => {
  // --- SECURITY STATE ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState(false);
  const MASTER_KEY = "ZENTRY2026";

  // Replace with your Vercel URL!
  const API_URL = "https://zentry-hub-backend.vercel.app//api"; 

  // --- DASHBOARD STATE ---
  const [activeTab, setActiveTab] = useState('projects'); // 'projects' or 'comments'
  const [comments, setComments] = useState([]);
  const [projects, setProjects] = useState([]);
  
  // Form State for New Project
  const [projectForm, setProjectForm] = useState({
    title: '', category: 'Web Application', description: '', techStack: '', imageUrl: '', liveLink: '', githubLink: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- AUTHENTICATION ---
  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === MASTER_KEY) {
      setIsAuthenticated(true);
      setAuthError(false);
      fetchComments();
      fetchProjects();
    } else {
      setAuthError(true);
      setPasscode('');
    }
  };

  // --- API FETCHERS ---
  const fetchComments = () => {
    fetch(`${API_URL}/admin/comments`)
      .then(res => res.json())
      .then(data => setComments(data))
      .catch(err => console.error("Comment fetch failed", err));
  };

  const fetchProjects = () => {
    fetch(`${API_URL}/projects`)
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error("Project fetch failed", err));
  };

  // --- COMMENT ACTIONS ---
  const approveComment = async (id) => {
    await fetch(`${API_URL}/admin/comments/${id}/approve`, { method: 'PATCH' });
    setComments(comments.map(c => c.id === id ? { ...c, isApproved: true } : c));
  };

  const deleteComment = async (id) => {
    await fetch(`${API_URL}/admin/comments/${id}`, { method: 'DELETE' });
    setComments(comments.filter(c => c.id !== id));
  };

  // --- PROJECT ACTIONS ---
  const handleDeployProject = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/admin/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectForm)
      });
      
      if (response.ok) {
        const newProject = await response.json();
        setProjects([newProject, ...projects]); // Add to UI instantly
        setProjectForm({ title: '', category: 'Web Application', description: '', techStack: '', imageUrl: '', liveLink: '', githubLink: '' }); // Clear form
      }
    } catch (error) {
      console.error("Deployment failed", error);
    }
    setIsSubmitting(false);
  };

  const deleteProject = async (id) => {
    if (window.confirm("Are you sure you want to permanently delete this project from the database?")) {
      await fetch(`${API_URL}/admin/projects/${id}`, { method: 'DELETE' });
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  // ==========================================
  // RENDER: LOCK SCREEN
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex flex-col justify-center items-center px-6 relative overflow-hidden">
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
            <button type="submit" className="w-full bg-zentry-copper/10 hover:bg-zentry-copper hover:text-black text-zentry-copper border border-zentry-copper/30 hover:border-zentry-copper font-medium py-3 px-6 rounded-md transition-all duration-300 tracking-widest uppercase">
              Authenticate
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ==========================================
  // RENDER: COMMAND CENTER
  // ==========================================
  return (
    <div className="min-h-screen bg-black text-white p-6 pt-32 md:p-10 md:pt-32">
      <div className="max-w-6xl mx-auto">
        
        {/* Header & Navigation */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-white/10 pb-6 gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-widest text-zentry-copper mb-2">COMMAND CENTER</h1>
            <p className="font-mono text-gray-500 text-sm tracking-widest uppercase">Database Sync: Active</p>
          </div>
          
          <div className="flex bg-white/[0.02] border border-white/10 rounded-lg p-1">
            <button 
              onClick={() => setActiveTab('projects')}
              className={`flex items-center gap-2 px-6 py-2 rounded-md font-mono text-sm tracking-widest transition-all ${activeTab === 'projects' ? 'bg-zentry-copper text-black font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              <FolderGit2 className="w-4 h-4" /> PROJECTS
            </button>
            <button 
              onClick={() => setActiveTab('comments')}
              className={`flex items-center gap-2 px-6 py-2 rounded-md font-mono text-sm tracking-widest transition-all ${activeTab === 'comments' ? 'bg-zentry-copper text-black font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              <MessageSquare className="w-4 h-4" /> REVIEWS
            </button>
          </div>
        </div>

        {/* ============================== */}
        {/* TAB 1: PROJECT DEPLOYMENT */}
        {/* ============================== */}
        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* The Upload Engine Form */}
            <div className="lg:col-span-1 bg-white/[0.02] border border-white/5 p-6 rounded-xl h-fit">
              <h2 className="text-xl font-bold tracking-widest mb-6 flex items-center gap-2 text-white">
                <Plus className="w-5 h-5 text-zentry-copper" /> DEPLOY NEW
              </h2>
              
              <form onSubmit={handleDeployProject} className="space-y-5">
                <div>
                  <label className="block text-xs font-mono text-gray-500 mb-2 tracking-widest uppercase">Title *</label>
                  <input type="text" required value={projectForm.title} onChange={e => setProjectForm({...projectForm, title: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-white font-mono text-sm focus:border-zentry-copper outline-none" placeholder="Hushpod" />
                </div>
                
                <div>
                  <label className="block text-xs font-mono text-gray-500 mb-2 tracking-widest uppercase">Category *</label>
                  <input type="text" required value={projectForm.category} onChange={e => setProjectForm({...projectForm, category: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-white font-mono text-sm focus:border-zentry-copper outline-none" placeholder="Multimedia Logic" />
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-500 mb-2 tracking-widest uppercase">Tech Stack (Comma Separated) *</label>
                  <input type="text" required value={projectForm.techStack} onChange={e => setProjectForm({...projectForm, techStack: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-white font-mono text-sm focus:border-zentry-copper outline-none" placeholder="React, Node.js, Vercel" />
                </div>
                
                <div>
                  <label className="block text-xs font-mono text-gray-500 mb-2 tracking-widest uppercase">Description *</label>
                  <textarea required rows="4" value={projectForm.description} onChange={e => setProjectForm({...projectForm, description: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-white font-mono text-sm focus:border-zentry-copper outline-none resize-none" placeholder="System architecture details..."></textarea>
                </div>

                <div>
                  <label className="block text-xs font-mono text-gray-500 mb-2 tracking-widest uppercase">Image URL (Optional)</label>
                  <input type="text" value={projectForm.imageUrl} onChange={e => setProjectForm({...projectForm, imageUrl: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-white font-mono text-sm focus:border-zentry-copper outline-none" placeholder="https://..." />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-gray-500 mb-2 tracking-widest uppercase">Live Link</label>
                    <input type="text" value={projectForm.liveLink} onChange={e => setProjectForm({...projectForm, liveLink: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-white font-mono text-sm focus:border-zentry-copper outline-none" placeholder="Leave blank if private" />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-gray-500 mb-2 tracking-widest uppercase">GitHub Link</label>
                    <input type="text" value={projectForm.githubLink} onChange={e => setProjectForm({...projectForm, githubLink: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-white font-mono text-sm focus:border-zentry-copper outline-none" placeholder="Leave blank if private" />
                  </div>
                </div>

                <button type="submit" disabled={isSubmitting} className="w-full bg-zentry-copper/10 hover:bg-zentry-copper hover:text-black text-zentry-copper border border-zentry-copper/30 hover:border-zentry-copper font-medium py-3 px-6 rounded transition-all tracking-widest uppercase mt-4 disabled:opacity-50">
                  {isSubmitting ? "Transmitting..." : "Initiate Deployment"}
                </button>
              </form>
            </div>

            {/* Live Database Feed */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-xl font-bold tracking-widest mb-6 text-white border-b border-white/10 pb-4">LIVE DATABASE GRID</h2>
              
              {projects.length === 0 ? (
                 <p className="text-gray-500 font-mono tracking-widest text-center py-10 border border-dashed border-white/10 rounded-lg">
                 [ NO PROJECTS IN DATABASE ]
               </p>
              ) : (
                projects.map((project) => (
                  <div key={project.id} className="p-5 border border-white/5 rounded-lg bg-white/[0.02] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 hover:border-white/20 transition-colors">
                    <div>
                      <h3 className="font-bold text-gray-200 tracking-wider mb-1 text-lg">{project.title}</h3>
                      <p className="text-zentry-copper font-mono text-xs uppercase tracking-widest mb-3">{project.category}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.split(',').slice(0, 3).map((tech, i) => (
                          <span key={i} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] font-mono text-gray-400">
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      {project.liveLink && (
                        <a href={project.liveLink} target="_blank" rel="noreferrer" className="p-2 bg-white/5 text-gray-400 rounded hover:text-white transition-colors" title="View Live">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      <button onClick={() => deleteProject(project.id)} className="flex-1 sm:flex-none flex justify-center items-center gap-2 px-4 py-2 bg-red-900/20 text-red-400 border border-red-900/50 rounded hover:bg-red-600 hover:text-black font-mono tracking-widest transition-all text-xs">
                        <Trash2 className="w-3 h-3" /> DELETE
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            
          </div>
        )}

        {/* ============================== */}
        {/* TAB 2: COMMENT MODERATION */}
        {/* ============================== */}
        {activeTab === 'comments' && (
           <div className="space-y-4">
           {comments.length === 0 ? (
             <p className="text-gray-500 font-mono tracking-widest text-center py-10 border border-dashed border-white/10 rounded-lg">
               [ NO REVIEWS IN QUEUE ]
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
        )}

      </div>
    </div>
  );
};

export default AdminDashboard;