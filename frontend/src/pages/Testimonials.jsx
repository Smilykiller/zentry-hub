import React from 'react';
import { Star, Quote, MessageSquarePlus } from 'lucide-react';

// Placeholder data representing your actual project successes
const reviews = [
  {
    id: 1,
    client: "Dr. A. Sharma",
    role: "Department Head, Computer Science",
    project: "Smart Campus Attendance System",
    text: "Limalkavinesh delivered an institutional-grade system. The database architecture was flawless, and the real-time syncing capabilities exceeded our university's strict technical requirements.",
    rating: 5
  },
  {
    id: 2,
    client: "TechFlow Retail",
    role: "E-commerce Operations",
    project: "Custom Web Application",
    text: "Zentry Hub didn't just build a website; they engineered a high-converting digital storefront. The backend API is incredibly fast, and the UI design process was transparent and highly professional.",
    rating: 5
  },
  {
    id: 3,
    client: "Rahul M.",
    role: "BSc CS Final Year Student",
    project: "Diagnostic AI Model Mentorship",
    text: "The academic consulting service is unmatched. The guidance on implementing complex machine learning algorithms in Python helped me secure top marks on my final year thesis.",
    rating: 5
  },
  {
    id: 4,
    client: "Vanguard Logistics",
    role: "Operations Director",
    project: "Automated WhatsApp Bot",
    text: "Our manual data entry workflow was completely eliminated. The custom bot deployed by Zentry Hub handles our client inquiries 24/7 with zero latency. A massive ROI.",
    rating: 5
  }
];

const Testimonials = () => {
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

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white/[0.02] border border-white/5 p-8 md:p-10 rounded-2xl hover:bg-white/[0.04] transition-colors duration-500 relative group">
              <Quote className="absolute top-8 right-8 w-12 h-12 text-white/5 group-hover:text-zentry-copper/10 transition-colors duration-500" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-zentry-copper text-zentry-copper" />
                ))}
              </div>
              
              <p className="text-gray-300 text-lg font-light leading-relaxed mb-8 relative z-10">
                "{review.text}"
              </p>
              
              <div className="border-t border-white/10 pt-6 mt-auto">
                <h4 className="text-white font-medium text-lg">{review.client}</h4>
                <p className="text-zentry-copper text-sm font-mono tracking-wider uppercase mt-1">{review.role}</p>
                <p className="text-gray-500 text-sm mt-2">Project: {review.project}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Submit Review Section (To be wired to backend later) */}
        <div className="max-w-3xl mx-auto bg-white/[0.01] border border-white/5 p-8 md:p-12 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-zentry-copper to-zentry-slate"></div>
          
          <div className="text-center mb-10">
            <MessageSquarePlus className="w-10 h-10 text-zentry-copper mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-white mb-3">Submit Your Feedback</h3>
            <p className="text-gray-400 font-light">Have we recently deployed a system for you? Leave a review to be featured on our platform.</p>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-mono text-gray-500 mb-2 uppercase tracking-widest">Client Name</label>
                <input type="text" className="w-full bg-black/50 border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-zentry-copper transition-colors" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-mono text-gray-500 mb-2 uppercase tracking-widest">Project Name</label>
                <input type="text" className="w-full bg-black/50 border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-zentry-copper transition-colors" placeholder="e.g., E-commerce Platform" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-mono text-gray-500 mb-2 uppercase tracking-widest">Your Review</label>
              <textarea rows="4" className="w-full bg-black/50 border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-zentry-copper transition-colors resize-none" placeholder="Detail your experience with Zentry Hub..."></textarea>
            </div>

            <button type="button" className="w-full bg-white/5 hover:bg-zentry-copper hover:text-black text-white border border-white/10 hover:border-zentry-copper font-medium py-4 px-6 rounded-md transition-all duration-300 tracking-widest uppercase">
              Submit for Approval
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Testimonials;