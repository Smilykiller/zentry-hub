import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [comments, setComments] = useState([]);
  // Use your Vercel URL here!
  const API_URL = "https://your-vercel-url.vercel.app/api";

  // Fetch the master list on load
  useEffect(() => {
    fetch(`${API_URL}/admin/comments`)
      .then(res => res.json())
      .then(data => setComments(data));
  }, []);

  // The Approval Action
  const approveComment = async (id) => {
    await fetch(`${API_URL}/admin/comments/${id}/approve`, { method: 'PATCH' });
    // Update UI instantly
    setComments(comments.map(c => c.id === id ? { ...c, isApproved: true } : c));
  };

  // The Delete Action
  const deleteComment = async (id) => {
    await fetch(`${API_URL}/admin/comments/${id}`, { method: 'DELETE' });
    // Remove from UI instantly
    setComments(comments.filter(c => c.id !== id));
  };

  return (
    <div className="min-h-screen bg-black text-white p-10 pt-24">
      <h1 className="text-3xl font-bold tracking-widest text-zentry-copper mb-8">COMMAND CENTER // COMMENTS</h1>
      
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="p-4 border border-white/10 rounded-lg bg-white/5 flex justify-between items-center">
            
            <div>
              <p className="font-bold text-gray-300">{comment.author}</p>
              <p className="text-gray-400 text-sm mt-1">{comment.text}</p>
              
              {/* Status Badge */}
              <span className={`inline-block mt-2 px-2 py-1 text-xs rounded ${comment.isApproved ? 'bg-green-900/50 text-green-400' : 'bg-yellow-900/50 text-yellow-400'}`}>
                {comment.isApproved ? "LIVE" : "PENDING REVIEW"}
              </span>
            </div>

            <div className="flex gap-3">
              {!comment.isApproved && (
                <button onClick={() => approveComment(comment.id)} className="px-4 py-2 bg-green-600/20 text-green-400 border border-green-600/50 rounded hover:bg-green-600/40 transition">
                  APPROVE
                </button>
              )}
              <button onClick={() => deleteComment(comment.id)} className="px-4 py-2 bg-red-600/20 text-red-400 border border-red-600/50 rounded hover:bg-red-600/40 transition">
                DELETE
              </button>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;