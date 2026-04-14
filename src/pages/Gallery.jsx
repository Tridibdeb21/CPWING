import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const iupcPhotos = [
  { img: 'iupc1.jpg', title: 'ICPC 2025' },
  { img: 'iupc2.jpg', title: 'CUET IUPC 2025' },
  { img: 'iupc3.jpg', title: 'BUET IUPC 2026' },
  { img: 'iupc4.jpg', title: 'DUET IUPC 2025' },
  { img: 'iupc5.jpg', title: 'AUST IUPC 2025' },
  { img: 'iupc6.jpg', title: 'IIUC IUPC 2025' },
  { img: 'icpc2024.jpg', title: 'ICPC 2024' },
  { img: 'icpc2023.jpg', title: 'ICPC 2023' },
  { img: 'ncpc2020.jpg', title: 'NCPC 2020' }
];

const Gallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedPhoto(null);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

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
        <h1 style={{ fontSize: 'clamp(2rem, 8vw, 3.5rem)', marginBottom: '1.5rem', lineHeight: '1.2' }}>
          Participation in different <span className="text-gradient">IUPC and ICPC</span>
        </h1>
        <p style={{ fontSize: 'clamp(1rem, 3.6vw, 1.25rem)', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto' }}>
          Commemorating our participation and excellence in various national programming competitions, reflecting the dedication and collaborative spirit of the Premier University Computer Club competitive programming community.
        </p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', 
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
            <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', height: 'clamp(220px, 55vw, 300px)', background: 'rgba(9, 16, 26, 0.88)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img 
                src={`/gallery/${photo.img}`} 
                alt={photo.title} 
                className="gallery-photo"
                loading="lazy"
                decoding="async"
                onClick={() => setSelectedPhoto(photo)}
                style={{ width: '100%', height: '100%', objectFit: 'contain', transition: 'transform 0.4s ease' }} 
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.01)'}
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

      {selectedPhoto && (
        <div className="gallery-lightbox" onClick={() => setSelectedPhoto(null)}>
          <div className="gallery-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="gallery-lightbox-close" onClick={() => setSelectedPhoto(null)} aria-label="Close image preview">
              x
            </button>
            <img
              src={`/gallery/${selectedPhoto.img}`}
              alt={selectedPhoto.title}
              className="gallery-lightbox-image"
            />
            <div className="gallery-lightbox-title">{selectedPhoto.title}</div>
          </div>
        </div>
      )}

      <style>{`
        .gallery-photo {
          backface-visibility: hidden;
          transform: translateZ(0);
          image-rendering: auto;
          will-change: transform;
          cursor: zoom-in;
        }

        .gallery-lightbox {
          position: fixed;
          inset: 0;
          z-index: 100;
          background: rgba(2, 6, 23, 0.84);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }

        .gallery-lightbox-content {
          width: min(1100px, 96vw);
          max-height: 94vh;
          border-radius: 14px;
          border: 1px solid rgba(255, 255, 255, 0.16);
          background: rgba(15, 23, 42, 0.9);
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 2.8rem 1rem 0.5rem;
        }

        .gallery-lightbox-close {
          position: absolute;
          top: 0.7rem;
          right: 0.7rem;
          width: 2rem;
          height: 2rem;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.26);
          background: rgba(15, 23, 42, 0.75);
          color: #fff;
          cursor: pointer;
          font-weight: 700;
        }

        .gallery-lightbox-image {
          width: auto;
          height: auto;
          max-width: min(92vw, 980px);
          max-height: min(76vh, 760px);
          margin: 0;
          object-fit: contain;
          background: #09101a;
          border-radius: 10px;
        }

        .gallery-lightbox-title {
          padding: 0.65rem 1rem 0.75rem;
          text-align: center;
          color: var(--accent-blue);
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          font-size: 0.9rem;
        }

        @media (max-width: 768px) {
          .gallery-lightbox-content {
            padding-top: 2.5rem;
          }

          .gallery-lightbox-image {
            max-width: 90vw;
            max-height: 68vh;
          }

          .gallery-lightbox-title {
            font-size: 0.82rem;
            padding: 0.65rem 0.7rem 0.8rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Gallery;
