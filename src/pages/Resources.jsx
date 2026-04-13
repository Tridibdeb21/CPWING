import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Book, Globe, Code, Layers, FileText, PlayCircle, GitFork, MonitorPlay } from 'lucide-react';

const resources = [
  {
    title: "CP-Algorithms",
    description: "The gold standard for learning competitive programming algorithms with detailed theory and code examples.",
    url: "https://cp-algorithms.com/",
    icon: <Globe size={28} />,
    color: "var(--accent-blue)",
    tag: "Website"
  },
  {
    title: "USACO Guide",
    description: "A highly structured, curriculum-based learning platform that focuses on problem-solving quality and progression.",
    url: "https://usaco.guide/",
    icon: <Book size={28} />,
    color: "var(--accent-purple)",
    tag: "Website"
  },
  {
    title: "CS Academy",
    description: "Features a great algorithm library, online contests, and excellent visualization tools for graphs and trees.",
    url: "https://csacademy.com/",
    icon: <Layers size={28} />,
    color: "#10b981",
    tag: "Website"
  },
  {
    title: "Programiz",
    description: "The best place for beginners to master C and C++ syntax through simple, step-by-step tutorials.",
    url: "https://www.programiz.com/cpp-programming",
    icon: <Code size={28} />,
    color: "#6366f1",
    tag: "Website"
  },
  {
    title: "GeeksforGeeks",
    description: "A colossal library covering almost every coding problem, data structure, and technical concept imaginable.",
    url: "https://www.geeksforgeeks.org/competitive-programming-a-complete-guide/",
    icon: <FileText size={28} />,
    color: "#22c55e",
    tag: "Website"
  }
];

const videoTutorials = [
  {
    title: "C++ Full Course for Beginners",
    description: "A complete, beginner-friendly playlist for learning C++ from scratch — the essential language for competitive programming. Covers syntax, OOP, STL, and more.",
    url: "https://www.youtube.com/watch?v=0T4mPpbNs_8&list=PLgH5QX0i9K3q0ZKeXtF--CZ0PdH1sSbYL",
    icon: <PlayCircle size={28} />,
    color: "#EF4444",
    tag: "Learn C++",
    label: "YouTube Playlist"
  },
  {
    title: "DSA Full Course",
    description: "Master Data Structures & Algorithms step by step with this in-depth playlist. Perfect for building the problem-solving foundation needed in contests.",
    url: "https://www.youtube.com/watch?v=0bHoB32fuj0&list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz",
    icon: <MonitorPlay size={28} />,
    color: "#f59e0b",
    tag: "Learn DSA",
    label: "YouTube Playlist"
  },
  {
    title: "iamluv — CP Channel",
    description: "A dedicated competitive programming channel covering problem-solving techniques, contest strategies, and editorial walkthroughs. Great for improving your CP mindset.",
    url: "https://www.youtube.com/@iamluv",
    icon: <PlayCircle size={28} />,
    color: "#FF9072",
    tag: "Follow",
    label: "YouTube Channel"
  }
];

const codeResources = [
  {
    title: "Competitive Programmer's Code Library",
    description: "A comprehensive code template library by Shahjalal Shohag — one of Bangladesh's top competitive programmers. Contains ready-to-use implementations of almost every algorithm you'll ever need in a contest.",
    url: "https://github.com/ShahjalalShohag/code-library",
    icon: <GitFork size={28} />,
    color: "#c0c0c0",
    tag: "Code Templates",
    label: "GitHub Repository"
  }
];

const Resources = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const ResourceCard = ({ res, btnLabel = "Visit Website" }) => (
    <motion.div
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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '16px',
            background: `${res.color}20`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: res.color
          }}>
            {res.icon}
          </div>
          {res.tag && (
            <span style={{
              fontSize: '0.75rem',
              fontWeight: '700',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: res.color,
              background: `${res.color}15`,
              border: `1px solid ${res.color}30`,
              padding: '0.3rem 0.75rem',
              borderRadius: '999px'
            }}>
              {res.tag}
            </span>
          )}
        </div>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>{res.title}</h3>
        {res.label && (
          <p style={{ fontSize: '0.8rem', fontWeight: '600', color: res.color, marginBottom: '0.75rem', opacity: 0.9 }}>
            📌 {res.label}
          </p>
        )}
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '2rem' }}>
          {res.description}
        </p>
      </div>

      <a
        href={res.url}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-secondary"
        style={{ padding: '0.875rem', width: '100%', justifyContent: 'center', gap: '0.75rem', display: 'flex', alignItems: 'center' }}
        onMouseOver={(e) => {
          e.currentTarget.style.borderColor = res.color;
          e.currentTarget.style.color = res.color;
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.borderColor = 'var(--glass-border)';
          e.currentTarget.style.color = 'var(--text-primary)';
        }}
      >
        {btnLabel} <ExternalLink size={16} />
      </a>
    </motion.div>
  );

  return (
    <div className="container animate-fade-in" style={{ paddingTop: '4rem', paddingBottom: '6rem' }}>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 8vw, 3.5rem)', marginBottom: '1rem' }}><span className="text-gradient">Resources</span></h1>
        <p style={{ fontSize: 'clamp(1rem, 3.4vw, 1.125rem)', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto' }}>
          We've curated the best platforms, video tutorials, and code templates to accelerate your competitive programming journey.
        </p>
      </div>

      {/* Section: Video Tutorials */}
      <div style={{ marginBottom: '4rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ width: '4px', height: '36px', background: '#EF4444', borderRadius: '4px' }} />
          <h2 style={{ fontSize: 'clamp(1.35rem, 5.8vw, 2rem)', color: 'var(--text-primary)', margin: 0 }}>
            🎥 Video Tutorials
          </h2>
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '2rem' }}
        >
          {videoTutorials.map((res, idx) => (
            <ResourceCard key={idx} res={res} btnLabel="Watch Now" />
          ))}
        </motion.div>
      </div>

      {/* Section: Code Templates */}
      <div style={{ marginBottom: '4rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ width: '4px', height: '36px', background: '#c0c0c0', borderRadius: '4px' }} />
          <h2 style={{ fontSize: 'clamp(1.35rem, 5.8vw, 2rem)', color: 'var(--text-primary)', margin: 0 }}>
            📦 Code Templates
          </h2>
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '2rem' }}
        >
          {codeResources.map((res, idx) => (
            <ResourceCard key={idx} res={res} btnLabel="Open on GitHub" />
          ))}
        </motion.div>
      </div>

      {/* Section: Websites & Platforms */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ width: '4px', height: '36px', background: 'var(--accent-blue)', borderRadius: '4px' }} />
          <h2 style={{ fontSize: 'clamp(1.35rem, 5.8vw, 2rem)', color: 'var(--text-primary)', margin: 0 }}>
            🌐 Websites & Platforms
          </h2>
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '2rem' }}
        >
          {resources.map((res, idx) => (
            <ResourceCard key={idx} res={res} btnLabel="Visit Website" />
          ))}
        </motion.div>
      </div>

    </div>
  );
};

export default Resources;
