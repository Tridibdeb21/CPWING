import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const galleryImages = ['first.jpg','second.jpg','third.jpg','fourth.jpg','fifth.jpg','sixth.jpg','seventh.jpg','eightt.jpg','ninth.jpg','tenth.jpg'];

const Home = () => {
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);

  const nextSlide = () => setCurrentGalleryIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentGalleryIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentGalleryIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <div className="container animate-fade-in" style={{ paddingTop: 'clamp(3rem, 8vw, 6rem)', paddingBottom: 'clamp(3rem, 8vw, 6rem)' }}>
      {/* Hero Section */}
      <div style={{ textAlign: 'center', maxWidth: '1000px', margin: '0 auto 5rem', position: 'relative' }}>
        
        {/* Floating Developer Platform Logos */}
        <motion.img className="floating-logo" src="https://cdn.simpleicons.org/codeforces/03B4BC" alt="Codeforces" style={{ position: 'absolute', top: '5%', left: '-5%', width: '55px', opacity: 0.5, zIndex: -1, filter: 'drop-shadow(0 0 10px rgba(3, 180, 188, 0.4))' }} animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} />
        <motion.img className="floating-logo" src="https://cdn.simpleicons.org/codechef/FF9072" alt="CodeChef" style={{ position: 'absolute', top: '15%', right: '-5%', width: '65px', opacity: 0.5, zIndex: -1, filter: 'drop-shadow(0 0 10px rgba(255, 144, 114, 0.4))' }} animate={{ y: [0, 20, 0], rotate: [0, -5, 5, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }} />
        <motion.img className="floating-logo" src="https://cdn.simpleicons.org/leetcode/03B4BC" alt="LeetCode" style={{ position: 'absolute', bottom: '10%', left: '5%', width: '45px', opacity: 0.5, zIndex: -1, filter: 'drop-shadow(0 0 10px rgba(3, 180, 188, 0.4))' }} animate={{ y: [0, -15, 0], rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }} />
        <motion.img className="floating-logo" src="https://cdn.simpleicons.org/cplusplus/FF9072" alt="C++" style={{ position: 'absolute', bottom: '15%', right: '5%', width: '50px', opacity: 0.5, zIndex: -1, filter: 'drop-shadow(0 0 10px rgba(255, 144, 114, 0.4))' }} animate={{ y: [0, 15, 0], rotate: [0, -10, 10, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1.5 }} />

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'rgba(3, 180, 188, 0.1)', border: '1px solid var(--glass-border)', borderRadius: '999px', fontSize: '0.875rem', fontWeight: '500', color: 'var(--accent-blue)', marginBottom: '2rem' }}>
            <Zap size={16} /> Welcome to the ultimate CP resource
          </div>
        </motion.div>
        
        <motion.h1 style={{ fontSize: 'clamp(2rem, 9vw, 4rem)', marginBottom: '1.5rem', lineHeight: '1.1' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          Master <span className="text-gradient">Problem Solving</span>
        </motion.h1>
        
        <motion.p style={{ fontSize: 'clamp(1rem, 3.8vw, 1.25rem)', color: 'var(--text-secondary)', marginBottom: '3rem' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          The official Competitive Programming Wing of Premier University Computer Club. Join a community of problem solvers, elevate your coding skills, and conquer programming contests.
        </motion.p>
        
        <motion.div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Link to="/learn" className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
            Start Learning
          </Link>
          <Link to="/roadmap" className="btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
            View Roadmap
          </Link>
        </motion.div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '2rem', marginBottom: '6rem' }}>
        {[
          { icon: <Code size={32} color="var(--accent-purple)" />, title: 'Structured Roadmap', desc: "Follow a curated learning path that tells you exactly what to learn and when, optimizing your journey to becoming a master." },
          { icon: <Zap size={32} color="#f59e0b" />, title: 'Online Judges', desc: "Get familiar with top online practicing platforms like Codeforces, AtCoder, and LeetCode to sharpen your logical thinking." }
        ].map((feature, idx) => (
          <motion.div key={idx} variants={itemVariants} className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ background: 'var(--accent-blue)', opacity: 0.1, width: '64px', height: '64px', borderRadius: '16px', position: 'absolute', top: '2rem', left: '2rem' }}></div>
            <div style={{ width: '64px', height: '64px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
              {feature.icon}
            </div>
            <h3 style={{ fontSize: '1.5rem', marginTop: '0.5rem' }}>{feature.title}</h3>
            <p style={{ color: 'var(--text-secondary)' }}>{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Gallery Slider Section */}
      <div style={{ marginBottom: '6rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: 'clamp(1.4rem, 6vw, 2rem)', color: 'var(--accent-blue)' }}>
          Moment of CP Wing Activity
        </h2>
        <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--glass-border)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', background: 'rgba(0,0,0,0.2)' }}>
          <div style={{ display: 'flex', transform: `translateX(-${currentGalleryIndex * 100}%)`, transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }}>
            {galleryImages.map((img, idx) => (
              <img key={idx} src={`/gallery/${img}`} alt={`Gallery image ${idx}`} style={{ minWidth: '100%', height: 'clamp(220px, 62vw, 450px)', objectFit: 'cover' }} />
            ))}
          </div>
          
          <button onClick={prevSlide} style={{ position: 'absolute', top: '50%', left: '1rem', transform: 'translateY(-50%)', background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '50%', padding: '0.75rem', cursor: 'pointer', zIndex: 10, backdropFilter: 'blur(4px)', transition: 'background 0.2s' }} onMouseOver={(e)=>e.currentTarget.style.background='var(--accent-blue)'} onMouseOut={(e)=>e.currentTarget.style.background='rgba(15, 23, 42, 0.7)'}>
            <ChevronLeft size={24} />
          </button>
          
          <button onClick={nextSlide} style={{ position: 'absolute', top: '50%', right: '1rem', transform: 'translateY(-50%)', background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '50%', padding: '0.75rem', cursor: 'pointer', zIndex: 10, backdropFilter: 'blur(4px)', transition: 'background 0.2s' }} onMouseOver={(e)=>e.currentTarget.style.background='var(--accent-blue)'} onMouseOut={(e)=>e.currentTarget.style.background='rgba(15, 23, 42, 0.7)'}>
            <ChevronRight size={24} />
          </button>
          
          <div style={{ position: 'absolute', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '0.75rem', background: 'rgba(0,0,0,0.4)', padding: '0.5rem 1rem', borderRadius: '99px', backdropFilter: 'blur(4px)' }}>
            {galleryImages.map((_, idx) => (
              <div key={idx} onClick={() => setCurrentGalleryIndex(idx)} style={{ width: '12px', height: '12px', borderRadius: '50%', background: idx === currentGalleryIndex ? 'var(--accent-blue)' : 'rgba(255,255,255,0.4)', cursor: 'pointer', transition: 'all 0.3s' }} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .floating-logo {
            display: none !important;
          }
        }
      `}</style>


    </div>
  );
};

export default Home;
