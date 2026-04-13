import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Trophy } from 'lucide-react';

const judges = [
  {
    title: "Codeforces",
    description: "The world's leading competitive programming platform for weekly contests and high-quality problem sets.",
    url: "https://codeforces.com/",
    logo: "https://cdn.simpleicons.org/codeforces/white",
    color: "#1F8ACB"
  },
  {
    title: "CodeChef",
    description: "A popular platform based in India hosting monthly Long Challenges, Lunchtimes, and Cook-offs.",
    url: "https://www.codechef.com/",
    logo: "https://cdn.simpleicons.org/codechef/white",
    color: "#5B4638"
  },
  {
    title: "AtCoder",
    description: "Highly rated Japanese contest site known for its beginner-to-expert balanced problem sets and smooth UI.",
    url: "https://atcoder.jp/",
    logo: "https://img.atcoder.jp/assets/favicon.png",
    color: "#121212"
  },
  {
    title: "VJudge",
    description: "A Virtual Judge that pulls problems from dozens of OJs, perfect for university training and custom contests.",
    url: "https://vjudge.net/",
    logo: "/logos/vjudge_logo.png",
    color: "#03B4BC"
  },
  {
    title: "LightOJ",
    description: "A legendary platform for Bangladeshi coders, featuring a massive collection of categorized classic problems.",
    url: "https://lightoj.com/",
    logo: "https://static.lightoj.com/assets/loj-logo-inverted.png",
    color: "#00ABB3"
  },
  {
    category: 'practice',
    title: "LeetCode",
    description: "The standard platform for mastering algorithms and data structures for technical job interviews.",
    url: "https://leetcode.com/",
    logo: "https://cdn.simpleicons.org/leetcode/white",
    color: "#FFA116"
  },
  {
    title: "Toph",
    description: "A modern Bangladeshi OJ hosting many prestigious university and national contests.",
    url: "https://toph.co/",
    logo: "https://static.toph.co/images/blog-emblem_96p.png",
    color: "#3b82f6"
  },
  {
    title: "HackerRank",
    description: "A popular platform for practicing coding skills and preparing for technical interviews with a wide variety of domain-specific challenges.",
    url: "https://www.hackerrank.com/",
    logo: "https://cdn.simpleicons.org/hackerrank/white",
    color: "#2ec866"
  }
];



const OnlineJudges = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <div className="container animate-fade-in" style={{ paddingTop: '4rem', paddingBottom: '6rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}><span className="text-gradient">Online Judges</span></h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto 2rem' }}>
          Put your skills to the test on these world-class practicing platforms and start competing today.
        </p>
        
        {/* Important Note Section */}
        <div style={{ 
          maxWidth: '800px', 
          margin: '0 auto', 
          padding: '1.5rem', 
          background: 'rgba(255, 144, 114, 0.1)', 
          border: '1px solid var(--accent-purple)', 
          borderRadius: 'var(--radius-md)',
          color: 'var(--text-primary)',
          fontSize: '1.1rem',
          lineHeight: '1.6'
        }}>
          <span style={{ color: 'var(--accent-purple)', fontWeight: 'bold' }}>Important:</span> Try to participate in <strong>Codeforces</strong>, <strong>CodeChef</strong>, and <strong>AtCoder</strong> contests regularly. These three judges are the most important among them for your growth as a competitive programmer.
        </div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '2rem' 
        }}
      >
        {judges.map((res, idx) => (
          <motion.div 
            key={idx} 
            variants={itemVariants}
            className="glass-panel"
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between',
              height: '100%',
              transition: 'transform 0.3s ease, border-color 0.3s ease'
            }}
          >
            <div>
              <div style={{ 
                width: '64px', 
                height: '64px', 
                borderRadius: '16px', 
                background: `${res.color}15`, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                marginBottom: '1.5rem',
                border: `1px solid ${res.color}30`
              }}>
                <img 
                  src={res.logo} 
                  alt={`${res.title} logo`} 
                  style={{ 
                    width: '40px', 
                    height: '40px', 
                    objectFit: 'contain'
                  }} 
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement.innerHTML = '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: grey"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>';
                  }}
                />
              </div>
              <h3 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>{res.title}</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '2rem' }}>
                {res.description}
              </p>
            </div>
            
            <a 
              href={res.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-secondary" 
              style={{ padding: '0.875rem', width: '100%', justifyContent: 'center', gap: '0.75rem' }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = res.color;
                e.currentTarget.style.color = res.color;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = 'var(--glass-border)';
                e.currentTarget.style.color = 'var(--text-primary)';
              }}
            >
              Start Practicing <ExternalLink size={18} />
            </a>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default OnlineJudges;
