import React, { useState, useEffect } from 'react';
import { Star, Quote, MessageSquarePlus, CheckCircle } from 'lucide-react';

const Testimonials = () => {
  // 1. React State for Database Data and Form Inputs
  const [liveReviews, setLiveReviews] = useState([]);
  const [formData, setFormData] = useState({ name: '', project: '', text: '' });
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error

  // The Vercel API URL (Make sure to paste your actual URL here!)
  const API_URL = "https://your-vercel-url.vercel.app/api";

  // 2. Fetch only APPROVED reviews when the page loads
  useEffect(() => {
    fetch(`${API_URL}/comments`)
      .then(res => res.json())
      .then(data => setLiveReviews(data))
      .catch(err => console.error("Database connection failed", err));
  }, []);

  // 3. Handle Form Submission to the Moderation Queue
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      // Formatting the data to match our Prisma Schema
      const payload = {
        author: `${formData.name} | ${formData.project}`,
        text: formData.text
      };

      await fetch(`${API_URL}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      setStatus('success');
      setFormData({ name: '', project: '', text: '' }); // Clear the form
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error("Transmission failed", error);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-zentry-dark pt-32 pb-24 px-6 relative overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-[30%] right-[50%] translate-x-1/2 w-[60vw] h-[60vw] bg-zentry-slate/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="mb-24 text-center">
          <p className="text-zentry-copper tracking-[0.3em] text-sm font-semibold mb-4 uppercase">Client Endorsements</p>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white mb-8">
            PROVEN <span className="text-transparent bg-clip-text bg-gradient-to-r from-zentry-copper to-zentry-slate">IMPACT.</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            The true measure of our architectural capabilities is the success and scalability of the clients who deploy them.
          </p>
        </div>

        {/* LIVE Reviews Grid from PostgreSQL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          {liveReviews.length === 0 ? (
            <p className="text-gray-500 font-mono tracking-widest text-center col-span-1 md:col-span-2 py-10">
              [ AWAITING DATABASE SYNC... ]
            </p>
          ) : (
            liveReviews.map((review) => (
              <div key={review.id} className="bg-white/[0.02] border border-white/5 p-8 md:p-10 rounded-2xl hover:bg-white/[0.04] transition-colors duration-500 relative group">
                <Quote className="absolute top-8 right-8 w-12 h-12 text-white/5 group-hover:text-zentry-copper/10 transition-colors duration-500" />
                
                <div className="flex gap-1 mb-6">
                  {/* Defaulting to 5 stars for all approved DB comments */}
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-zentry-copper text-zentry-copper" />
                  ))}
                </div>
                
                <p className="text-gray-300 text-lg font-light leading-relaxed mb-8 relative z-10">
                  "{review.text}"
                </p>
                
                <div className="border-t border-white/10 pt-6 mt-auto">
                  {/* We split the author string to show Name and Project separately */}
                  <h4 className="text-white font-medium text-lg">{review.author.split(' | ')[0]}</h4>
                  <p className="text-zentry-copper text-sm font-mono tracking-wider uppercase mt-1">
                    Project: {review.author.split(' | ')[1] || "Consulting"}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Submit Review Form (Wired to Moderation Queue) */}
        <div className="max-w-3xl mx-auto bg-white/[0.01] border border-white/5 p-8 md:p-12 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-zentry-copper to-zentry-slate"></div>
          
          <div className="text-center mb-10">
            <MessageSquarePlus className="w-10 h-10 text-zentry-copper mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-white mb-3">Submit Your Feedback</h3>
            <p className="text-gray-400 font-light">Have we recently deployed a system for you? Leave a review to be featured on our platform.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-mono text-gray-500 mb-2 uppercase tracking-widest">Client Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-zentry-copper transition-colors" 
                  placeholder="John Doe" 
                />
              </div>
              <div>
                <label className="block text-sm font-mono text-gray-500 mb-2 uppercase tracking-widest">Project Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.project}
                  onChange={(e) => setFormData({...formData, project: e.target.value})}
                  className="w-full bg-black/50 border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-zentry-copper transition-colors" 
                  placeholder="e.g., E-commerce Platform" 
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-mono text-gray-500 mb-2 uppercase tracking-widest">Your Review</label>
              <textarea 
                rows="4" 
                required
                value={formData.text}
                onChange={(e) => setFormData({...formData, text: e.target.value})}
                className="w-full bg-black/50 border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-zentry-copper transition-colors resize-none" 
                placeholder="Detail your experience with Zentry Hub..."
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={status === 'submitting'}
              className="w-full bg-white/5 hover:bg-zentry-copper hover:text-black text-white border border-white/10 hover:border-zentry-copper font-medium py-4 px-6 rounded-md transition-all duration-300 tracking-widest uppercase disabled:opacity-50 flex justify-center items-center gap-2"
            >
              {status === 'submitting' ? 'Transmitting...' : 
               status === 'success' ? <><CheckCircle className="w-5 h-5"/> Protocol Received</> : 
               'Submit for Approval'}
            </button>
            
            {status === 'success' && (
              <p className="text-green-400 text-sm font-mono text-center mt-4">
                Transmission successful. Awaiting admin clearance.
              </p>
            )}
          </form>
        </div>

      </div>
    </div>
  );
};

export default Testimonials;