import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { roadmapData } from './roadmapData';

const Roadmap = () => {
  return (
    <div className="container" style={{ paddingTop: '4rem', paddingBottom: '6rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}><span className="text-gradient">Beginner's Roadmap</span></h1>
        <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
          An interactive, step-by-step path from writing your first "Hello World" down to mastering advanced graph algorithms. Click on any phase to learn more.
        </p>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {roadmapData.map((phase, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <Link to={`/roadmap/${phase.id}`} className="glass-panel hover-card" style={{ display: 'block', position: 'relative', overflow: 'hidden', textDecoration: 'none' }}>
              {/* Phase Badge */}
              <div style={{ 
                  position: 'absolute', top: 0, right: 0, 
                  background: 'var(--accent-gradient)', padding: '0.5rem 1.5rem', 
                  borderBottomLeftRadius: 'var(--radius-lg)', fontWeight: 'bold',
                  boxShadow: '0 4px 12px rgba(3, 180, 188, 0.3)'
                }}>
                Phase {idx + 1}
              </div>
              
              <h2 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {phase.title}
                <ArrowRight size={20} className="arrow-icon" style={{ opacity: 0, transition: 'all 0.3s' }} />
              </h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>{phase.description}</p>
              
              <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                {phase.topics.map((topic, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-primary)' }}>
                    <CheckCircle2 size={18} color="var(--accent-blue)" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: '0.95rem' }}>{topic}</span>
                  </li>
                ))}
              </ul>
            </Link>
          </motion.div>
        ))}
      </div>

      <style>{`
        .hover-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: 1px solid var(--glass-border);
        }
        
        .hover-card:hover {
          transform: translateY(-5px);
          border-color: var(--accent-blue);
          box-shadow: 0 10px 30px rgba(3, 180, 188, 0.15);
          background: rgba(255, 255, 255, 0.05);
        }

        .hover-card:hover .arrow-icon {
          opacity: 1 !important;
          transform: translateX(5px);
          color: var(--accent-blue);
        }

        .hover-card:hover h2 {
          color: var(--accent-blue) !important;
        }
      `}</style>
    </div>
  );
};

export default Roadmap;
