import React, { useState } from 'react';
import { Mail, MapPin, Phone, ArrowRight, Loader2, CheckCircle } from 'lucide-react';

const Contact = () => {
  // 1. State for form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    budget: 'Academic Consultation (Student Rate)',
    requirements: ''
  });
  
  // 2. State for UI feedback
  const [status, setStatus] = useState('idle'); // 'idle', 'loading', 'success', 'error'

  // 3. Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 4. Submit payload to the Zentry Engine
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // NOTE: When deploying to production, replace this with your live server URL
      const response = await fetch('https://zentry-hub-backend.vercel.app/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        // Clear the form fields
        setFormData({ 
          name: '', 
          email: '', 
          budget: 'Academic Consultation (Student Rate)', 
          requirements: '' 
        });
        
        // Reset the button state after 3 seconds
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (error) {
      console.error('Error transmitting directive:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-zentry-dark pt-32 pb-24 px-6 relative overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-[20%] right-[10%] w-[50vw] h-[50vw] bg-zentry-copper/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="mb-20 text-center md:text-left">
          <p className="text-zentry-copper tracking-[0.3em] text-sm font-semibold mb-4 uppercase">Initiate Protocol</p>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white mb-6">
            ARCHITECT YOUR <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zentry-copper to-zentry-slate">
              NEXT SYSTEM.
            </span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl font-light">
            Secure a consultation. Detail your operational requirements, and we will engineer the architecture to support it.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Side: Contact Information */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-12">
            
            <div className="group flex items-start space-x-6">
              <div className="bg-white/[0.02] border border-white/10 p-4 rounded-xl group-hover:border-zentry-copper/50 transition-colors duration-500">
                <Mail className="text-zentry-copper w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-mono text-gray-500 tracking-widest uppercase mb-1">Direct Comms</h3>
                <p className="text-xl font-medium text-white">hello@zentryhub.com</p>
              </div>
            </div>

            <div className="group flex items-start space-x-6">
              <div className="bg-white/[0.02] border border-white/10 p-4 rounded-xl group-hover:border-zentry-copper/50 transition-colors duration-500">
                <MapPin className="text-zentry-slate w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-mono text-gray-500 tracking-widest uppercase mb-1">Headquarters</h3>
                <p className="text-xl font-medium text-white">India<br/><span className="text-gray-400 text-base font-light">Deploying Globally</span></p>
              </div>
            </div>

            <div className="group flex items-start space-x-6">
              <div className="bg-white/[0.02] border border-white/10 p-4 rounded-xl group-hover:border-zentry-copper/50 transition-colors duration-500">
                <Phone className="text-zentry-copper w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-mono text-gray-500 tracking-widest uppercase mb-1">Emergency / Priority</h3>
                <p className="text-xl font-medium text-white">+91 (Client Access Only)</p>
              </div>
            </div>

          </div>

          {/* Right Side: The Inquiry Form */}
          <div className="lg:col-span-7 bg-white/[0.02] border border-white/5 p-8 md:p-12 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-zentry-copper to-zentry-slate"></div>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-mono text-gray-500 mb-3 uppercase tracking-widest">Identifier (Name)</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/40 border-b border-white/20 px-0 py-3 text-white focus:outline-none focus:border-zentry-copper transition-colors placeholder-gray-700" 
                    placeholder="John Doe" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-mono text-gray-500 mb-3 uppercase tracking-widest">Return Node (Email)</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/40 border-b border-white/20 px-0 py-3 text-white focus:outline-none focus:border-zentry-copper transition-colors placeholder-gray-700" 
                    placeholder="john@enterprise.com" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-mono text-gray-500 mb-3 uppercase tracking-widest">Capital Allocation (Budget)</label>
                <select 
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full bg-black/40 border-b border-white/20 px-0 py-3 text-white focus:outline-none focus:border-zentry-copper transition-colors appearance-none cursor-pointer"
                >
                  <option className="bg-zentry-dark text-white" value="Academic Consultation (Student Rate)">Academic Consultation (Student Rate)</option>
                  <option className="bg-zentry-dark text-white" value="Startup MVP (₹50k - ₹1.5L)">Startup MVP (₹50k - ₹1.5L)</option>
                  <option className="bg-zentry-dark text-white" value="Enterprise Architecture (₹1.5L - ₹5L+)">Enterprise Architecture (₹1.5L - ₹5L+)</option>
                  <option className="bg-zentry-dark text-white" value="Retainer / Ongoing Maintenance">Retainer / Ongoing Maintenance</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-mono text-gray-500 mb-3 uppercase tracking-widest">System Requirements</label>
                <textarea 
                  rows="4" 
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  required
                  className="w-full bg-black/40 border-b border-white/20 px-0 py-3 text-white focus:outline-none focus:border-zentry-copper transition-colors resize-none placeholder-gray-700" 
                  placeholder="Define the core features, AI requirements, or scaling needs of your project..."
                ></textarea>
              </div>

              {/* Dynamic Button State */}
              <button 
                type="submit" 
                disabled={status === 'loading' || status === 'success'}
                className="w-full group flex justify-center items-center gap-3 bg-white/5 hover:bg-zentry-copper text-white hover:text-black font-semibold py-5 px-6 rounded-md transition-all duration-300 tracking-widest uppercase border border-white/10 hover:border-zentry-copper mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'idle' && <>Transmit Directive <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" /></>}
                {status === 'loading' && <><Loader2 className="w-5 h-5 animate-spin" /> Transmitting...</>}
                {status === 'success' && <><CheckCircle className="w-5 h-5 text-green-500" /> Directive Received</>}
                {status === 'error' && <>Transmission Failed - Retry</>}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;