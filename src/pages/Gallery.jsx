import React from 'react';
import { motion } from 'framer-motion';

const iupcPhotos = [
  { img: 'iupc1.jpg', title: 'ICPC 2025' },
  { img: 'iupc2.jpg', title: 'CUET IUPC 2025' },
  { img: 'iupc3.jpg', title: 'BUET IUPC 2026' },
  { img: 'iupc4.jpg', title: 'DUET IUPC 2025' },
  { img: 'iupc5.jpg', title: 'AUST IUPC 2025' },
  { img: 'iupc6.jpg', title: 'IIUC IUPC 2025' }
];

const Gallery = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <div className="container animate-fade-in" style={{ paddingTop: '4rem', paddingBottom: '6rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>
          Participation in different <span className="text-gradient">IUPC and ICPC</span>
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto' }}>
          Commemorating our participation and excellence in various national programming competitions, reflecting the dedication and collaborative spirit of the Premier University Computer Club competitive programming community.
        </p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
          gap: '2rem' 
        }}
      >
        {/* Featured IUPC Photos First */}
        {iupcPhotos.map((photo, idx) => (
          <motion.div 
            key={`iupc-${idx}`} 
            variants={itemVariants}
            className="glass-panel"
            style={{ padding: '0.75rem', overflow: 'hidden' }}
          >
            <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', height: '300px' }}>
              <img 
                src={`/gallery/${photo.img}`} 
                alt={photo.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} 
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
            </div>
            <div style={{ padding: '1rem 0.5rem 0.5rem', textAlign: 'center' }}>
              <span style={{ color: 'var(--accent-blue)', fontWeight: '600', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                {photo.title}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Gallery;
