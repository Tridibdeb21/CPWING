import React from 'react';
import { motion } from 'framer-motion';
import { Swords, Timer, ShieldCheck, Rocket, Trophy, ExternalLink, Users, GitBranch, BarChart3, MessageSquareHeart } from 'lucide-react';

const steps = [
  'Go to Arena and create or join a room.',
  'Share the room ID. When both players are ready, press Start.',
  'Open the shown Codeforces problem and submit there.',
  'First accepted solution locks that problem for everyone.',
  'A 1-minute break starts, then the next problem appears with updated scores.'
];

const fairPlay = [
  'Both players always see the same problem at the same time.',
  'Once a player solves, that problem is locked and no more points can be gained on it.',
  'Every solve triggers a 1-minute cooldown before the next problem arrives.',
  'Scores sync live from Codeforces submissions with no manual judging.'
];

const beginnerFriendly = [
  'Simple flow: join a room, read one problem, submit on Codeforces.',
  'Use any language accepted by Codeforces.',
  'Timers and locks are automatic, so you focus only on solving.'
];

const sections = [
  {
    title: 'Arena',
    icon: <Swords size={20} />,
    text: 'Create rooms and play head-to-head Codeforces duels in real time.'
  },
  {
    title: 'Bracket',
    icon: <GitBranch size={20} />,
    text: 'Chain multiple duels into tournament style progression.'
  },
  {
    title: 'Head-to-Head',
    icon: <Users size={20} />,
    text: 'Compare any two handles based on past blitz battles.'
  },
  {
    title: 'Results and Profiles',
    icon: <BarChart3 size={20} />,
    text: 'Track archives, streaks, and per-handle performance history.'
  },
  {
    title: 'Feedback',
    icon: <MessageSquareHeart size={20} />,
    text: 'Report issues directly. Fixes are prioritized quickly.'
  }
];

const Blitz = () => {
  return (
    <div className="container blitz-page" style={{ paddingTop: '4rem', paddingBottom: '6rem' }}>
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="glass-panel blitz-hero"
        style={{ marginBottom: '2rem' }}
      >
        <span className="blitz-kicker"><Rocket size={15} /> Live Duel Platform</span>
        <h1>
          Blitz1v1
          <span> Codeforces duels, one shared problem at a time.</span>
        </h1>
        <p>
          Quick, fair Codeforces face-offs with nothing to install or configure. Two players get the same problem
          at the same moment, race to solve first, and move through timed rounds with live score sync.
        </p>
        <div className="blitz-cta-row">
          <a
            href="https://blitz1v1.onrender.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ padding: '0.95rem 1.4rem' }}
          >
            Open Blitz1v1 <ExternalLink size={18} />
          </a>
          <div className="blitz-meta">
            <Timer size={16} />
            1-minute cooldown between locked rounds
          </div>
        </div>
      </motion.section>

      <div className="blitz-grid">
        <motion.article initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="glass-panel blitz-card">
          <h2><Swords size={20} /> What Blitz1v1 Is</h2>
          <p>
            Two players see the same Codeforces problem, automatically picked at the same time. Whoever solves first
            gets the point. Once solved, that problem is locked and no later submissions count on that round.
          </p>
        </motion.article>

        <motion.article initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="glass-panel blitz-card">
          <h2><Trophy size={20} /> How a Duel Runs</h2>
          <ol>
            {steps.map((step) => <li key={step}>{step}</li>)}
          </ol>
        </motion.article>
      </div>

      <div className="blitz-grid" style={{ marginTop: '1.2rem' }}>
        <motion.article initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }} className="glass-panel blitz-card">
          <h2><ShieldCheck size={20} /> Fair-Play Rules</h2>
          <ul>
            {fairPlay.map((rule) => <li key={rule}>{rule}</li>)}
          </ul>
        </motion.article>

        <motion.article initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-panel blitz-card">
          <h2><Rocket size={20} /> Why Beginners Can Play</h2>
          <ul>
            {beginnerFriendly.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </motion.article>
      </div>

      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.24 }}
        className="glass-panel"
        style={{ marginTop: '1.2rem' }}
      >
        <h2 className="section-title">Where Everything Lives</h2>
        <div className="section-grid">
          {sections.map((section) => (
            <article key={section.title} className="section-mini-card">
              <div className="section-mini-head">{section.icon}<span>{section.title}</span></div>
              <p>{section.text}</p>
            </article>
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28 }}
        className="blitz-note"
      >
        This platform is developed by some competitive programmers of CP Wing.
      </motion.section>

      <style>{`
        .blitz-page {
          font-family: 'Plus Jakarta Sans', 'Inter', 'Segoe UI', sans-serif;
        }

        .blitz-hero {
          background:
            radial-gradient(circle at 85% 14%, rgba(255, 144, 114, 0.2), transparent 36%),
            radial-gradient(circle at 14% 20%, rgba(3, 180, 188, 0.18), transparent 36%),
            var(--glass-bg);
        }

        .blitz-kicker {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          margin-bottom: 0.9rem;
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.09em;
          color: #9ef5f8;
          border: 1px solid rgba(3, 180, 188, 0.35);
          background: rgba(3, 180, 188, 0.13);
          border-radius: 999px;
          padding: 0.34rem 0.72rem;
        }

        .blitz-hero h1 {
          margin: 0;
          font-family: 'Sora', 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(1.8rem, 5.6vw, 3rem);
          line-height: 1.17;
          letter-spacing: -0.02em;
          color: var(--text-primary);
        }

        .blitz-hero h1 span {
          display: block;
          margin-top: 0.55rem;
          font-size: clamp(1rem, 3.6vw, 1.35rem);
          color: var(--text-secondary);
          font-weight: 600;
          letter-spacing: 0;
        }

        .blitz-hero p {
          margin: 1rem 0 0;
          max-width: 900px;
          color: var(--text-secondary);
          line-height: 1.85;
          font-size: 1.03rem;
        }

        .blitz-cta-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.9rem;
          margin-top: 1.3rem;
        }

        .blitz-meta {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          color: #ffd9cf;
          border: 1px solid rgba(255, 144, 114, 0.35);
          background: rgba(255, 144, 114, 0.13);
          border-radius: 999px;
          padding: 0.55rem 0.8rem;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .blitz-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
          gap: 1.2rem;
        }

        .blitz-card h2 {
          margin: 0 0 0.95rem;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.25rem;
          color: var(--accent-blue);
          font-family: 'Sora', 'Plus Jakarta Sans', sans-serif;
        }

        .blitz-card p {
          margin: 0;
          color: var(--text-secondary);
          line-height: 1.8;
        }

        .blitz-card ul,
        .blitz-card ol {
          margin: 0;
          padding-left: 1.15rem;
          color: var(--text-secondary);
          line-height: 1.75;
        }

        .blitz-card li {
          margin-bottom: 0.65rem;
        }

        .section-title {
          margin: 0 0 1rem;
          font-size: clamp(1.26rem, 3.8vw, 1.58rem);
          font-family: 'Sora', 'Plus Jakarta Sans', sans-serif;
          color: var(--text-primary);
        }

        .section-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
          gap: 0.95rem;
        }

        .section-mini-card {
          border: 1px solid rgba(3, 180, 188, 0.24);
          background: rgba(3, 180, 188, 0.07);
          border-radius: 12px;
          padding: 0.85rem;
          transition: transform 0.2s ease, border-color 0.2s ease;
        }

        .section-mini-card:hover {
          transform: translateY(-2px);
          border-color: rgba(255, 144, 114, 0.44);
        }

        .section-mini-head {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          color: var(--text-primary);
          font-weight: 700;
          margin-bottom: 0.45rem;
        }

        .section-mini-card p {
          margin: 0;
          color: var(--text-secondary);
          line-height: 1.66;
          font-size: 0.95rem;
        }

        .blitz-note {
          margin-top: 1rem;
          text-align: center;
          color: #ffd8cd;
          font-weight: 600;
          font-size: 0.96rem;
          border: 1px dashed rgba(255, 144, 114, 0.45);
          background: rgba(255, 144, 114, 0.1);
          border-radius: 12px;
          padding: 0.95rem;
        }

        [data-theme='light'] .blitz-kicker {
          color: #0c6d72;
          background: rgba(3, 180, 188, 0.12);
        }

        [data-theme='light'] .blitz-meta {
          color: #9a3f2a;
          background: rgba(255, 144, 114, 0.12);
        }

        [data-theme='light'] .blitz-note {
          color: #9a3f2a;
          background: rgba(255, 144, 114, 0.09);
        }
      `}</style>
    </div>
  );
};

export default Blitz;
