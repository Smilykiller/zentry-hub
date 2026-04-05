import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loader from './components/Loader'; 
import ScrollToTop from './components/ScrollToTop';
import RouteLoader from './components/RouteLoader'; // <-- 1. Import it
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Work from './pages/Work';
import About from './pages/About';
import Services from './pages/Services';
import Testimonials from './pages/Testimonials';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <Loader /> {/* The heavy 4s boot sequence */}
      <RouteLoader /> {/* <-- 2. The lightning-fast 0.4s route transition */}
      <ScrollToTop />
      
      <div className="min-h-screen flex flex-col bg-zentry-dark text-white font-sans">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/work" element={<Work />} />
            <Route path="/about" element={<About />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;