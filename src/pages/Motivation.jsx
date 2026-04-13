import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Target, Zap, TrendingUp, Users, Quote, Coffee } from 'lucide-react';

const Motivation = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  };

  const sections = [
    {
      icon: <Heart size={32} color="#22c55e" />,
      title: "Reward for Codeforces Streak",
      content: `If anyone maintains a Codeforces streak, he/she will be rewarded by the authority. This is not only a prize system, it is a commitment to discipline and consistency. In competitive programming, daily effort matters more than occasional bursts of hard work, and a streak proves that you are showing up even on difficult days.\n\nA streak means you are continuously training your brain to think algorithmically under pressure. Some days you may solve easy problems, and some days you may struggle for hours, but the habit itself builds momentum. Over time, this consistency improves your speed, confidence, and contest performance in a way that random practice never can.\n\nThe authority wants to recognize that mindset. Keep your streak alive, stay honest with your progress, and treat each day as one small step forward. The reward is both symbolic and practical: it celebrates your dedication and encourages others in the community to build the same winning routine.`
    },
    {
      icon: <Zap size={32} color="#f59e0b" />,
      title: "Confronting The 'Wrong Answer' Blues",
      content: `Getting a "Wrong Answer" after three hours of intense concentration is one of the most painful feelings in CP. But here is the secret: **Every 'WA' is an invitation to think deeper.**\n\nWhen your logic fails, your brain is actually mapping out the boundaries of the problem. You aren't "failing"—you are performing a search through the space of possible solutions. Most beginners quit here, but the masters know that the "Acceptance" is just a byproduct of staying in the struggle for 10 minutes longer than everyone else.`
    },
    {
      icon: <TrendingUp size={32} color="var(--accent-blue)" />,
      title: "Breaking the 'Rating Plateau'",
      content: `Is your Codeforces rating flat? Good. That means you've reached a baseline of stability. Skill growth in CP doesn't look like a straight line; it looks like a **Staircase**.\n\nYou spend weeks or months on a flat "plateau" where it feels like you're learning nothing. In reality, your subconscious is gathering patterns. One day, everything will "click," and your rating will skyrocket in a single contest. Do not mistake a plateau for a lack of progress. You are just building the foundation for the next jump.`
    },
    {
      icon: <Users size={32} color="var(--accent-purple)" />,
      title: "The 'Grandmaster' Illusion",
      content: `It's easy to look at a 15-year-old Grandmaster and feel completely inadequate. **Comparison is the thief of joy.**\n\nYou are seeing their Chapter 20, while you are only on your Chapter 1. Most legends have been solving puzzles since they were in primary school. Your only competition is the person you were yesterday. If you can solve one problem today that you couldn't solve yesterday, you are winning at life.`
    },
    {
      icon: <Target size={32} color="#EF4444" />,
      title: "The Infinite Value of Failure",
      content: `In Competitive Programming, failure is **Information**. A Time Limit Exceeded (TLE) isn't a rejection; it's the computer telling you: *"Your logic is beautiful, but I need it to be faster."*\n\nA Runtime Error isn't a crash; it's a hint: *"You're looking outside the box, but you forgot to check the boundaries."*\n\nIf you solve 10 problems on your first try, you learned nothing. If you solve 1 problem on your 50th try, you just gained a skill you will keep for the rest of your life.`
    },
    {
      icon: <Coffee size={32} color="#8B4513" />,
      title: "Beyond the Code: A Life Skill",
      content: `Competitive Programming isn't just about coding; it's about developing a high-performance brain. The ability to sit for hours, stay calm under pressure, and break down seemingly impossible tasks into small steps is a superpower.\n\nWhether you become a Software Engineer, a Data Scientist, or an Entrepreneur, the grit you build here will make you successful in any career path. You aren't just solving puzzles—you are training yourself to be an elite, resilient thinker.`
    }
  ];

  return (
    <div className="container animate-fade-in" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem' }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '999px', fontSize: '0.875rem', fontWeight: '500', color: '#EF4444', marginBottom: '1.5rem' }}>
          <Sparkles size={16} /> For the days when the code won't run
        </div>
        <h1 style={{ fontSize: 'clamp(2rem, 8vw, 3.5rem)', marginBottom: '1.5rem' }}>
          Code with <span className="text-gradient">Passion</span>, <br />
          Conquer with <span style={{ color: 'var(--accent-blue)' }}>Logic</span>
        </h1>
        <p style={{ fontSize: 'clamp(1rem, 3.6vw, 1.25rem)', color: 'var(--text-secondary)' }}>
          Competitive Programming is a marathon, not a sprint. When the verdicts are red and your rating is down, remember why you started.
        </p>
      </motion.div>

      {/* Motivational Sections */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem', maxWidth: '900px', margin: '0 auto' }}
      >
        {sections.map((section, idx) => (
          <motion.div 
            key={idx} 
            variants={itemVariants}
            className="glass-panel motivation-card"
            style={{ display: 'flex', gap: '2rem', alignItems: 'start', padding: '2.5rem' }}
          >
            <div style={{ 
              background: 'rgba(255, 255, 255, 0.03)', 
              padding: '1rem', 
              borderRadius: '1rem', 
              border: '1px solid var(--glass-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {section.icon}
            </div>
            <div>
              <h2 style={{ fontSize: 'clamp(1.3rem, 5.2vw, 1.75rem)', marginBottom: '1rem', color: 'var(--text-primary)' }}>{section.title}</h2>
              <div style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.98rem, 3.4vw, 1.125rem)', lineHeight: '1.8', whiteSpace: 'pre-line' }}>
                {section.content}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Quote Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{ marginTop: '6rem', textAlign: 'center' }}
      >
        <div className="glass-panel motivation-quote" style={{ display: 'inline-block', maxWidth: '700px', padding: '3rem', position: 'relative' }}>
          <Quote size={48} style={{ position: 'absolute', top: '1rem', left: '1rem', opacity: 0.1, color: 'var(--accent-blue)' }} />
          <p style={{ fontSize: 'clamp(1.1rem, 4.2vw, 1.5rem)', fontStyle: 'italic', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
            "It is not that I'm so smart. But I stay with the questions much longer."
          </p>
          <p style={{ fontWeight: '600', color: 'var(--accent-blue)' }}>— Albert Einstein</p>
        </div>
      </motion.div>

      {/* Call to action */}
      <div style={{ marginTop: '5rem', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Ready to give it one more try?</p>
        <button 
          onClick={() => window.location.href = 'https://codeforces.com'} 
          className="btn-primary" 
          style={{ padding: '1rem 2.5rem', fontSize: '1.125rem', display: 'inline-flex', alignItems: 'center', gap: '0.75rem' }}
        >
          Open Codeforces <Zap size={18} />
        </button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .motivation-card {
            flex-direction: column !important;
            gap: 1rem !important;
            padding: 1.25rem !important;
          }
          .motivation-quote {
            padding: 1.5rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Motivation;
