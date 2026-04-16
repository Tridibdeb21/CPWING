import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

const Level1 = () => {
	const [expandedCycle, setExpandedCycle] = useState(1);

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

	const level1Data = {
		cycle1: {
			title: 'Cycle 1: Prefix Sum, Two Pointer, & STL Techniques',
			topics: ['Prefix Sum', 'Two Pointer', 'Sliding Window', 'Difference Array', 'STL'],
			resources: [
				{ title: 'Prefix Sum in 4 minutes | LeetCode Pattern', url: 'https://www.youtube.com/watch?v=yuws7YK0Yng&ab_channel=AlgoMasterIO' },
				{ title: 'Prefix Sums and Difference Array: 20 minutes of EVERYTHING you need to know', url: 'https://www.youtube.com/watch?v=DSQyjutKbfk&ab_channel=CompetitiveProgrammingwithShayan' },
				{ title: 'Difference Array Technique | Tutorial | Range Updates | Competitive Programming Tricks Part 1', url: 'https://www.youtube.com/watch?v=96RG7EBF8LI&ab_channel=TLEEliminators-byPriyansh' },
				{ title: 'Two Pointers Technique - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/dsa/two-pointers-technique/' },
				{ title: 'Two Pointers Playlist - Striver', url: 'https://www.youtube.com/playlist?list=PLgUwDviBIf0q7vrFA_HEWcqRqMpCXzYAL' },
				{ title: 'Two Pointers Method', url: 'https://codeforces.com/edu/course/2/lesson/9' },
				{ title: '[L1]Class - 1 ( Almost Everything about STL Vector )[Bangla]', url: 'https://www.youtube.com/watch?v=W1McvE4a910&list=PLoa_roVVsxA0D1Kv_T7rbGHtSdYIUo4f5&index=1' },
				{ title: '[L1]Class - 8 ( Almost everything about STL Set ) [Bangla]', url: 'https://www.youtube.com/watch?v=cH_w5xNGEco&list=PLoa_roVVsxA0D1Kv_T7rbGHtSdYIUo4f5&index=8' },
				{ title: '[L1]Class - 10 ( STL Multiset and practice problem ) [Bangla]', url: 'https://www.youtube.com/watch?v=7nSN1SM4fRs&list=PLoa_roVVsxA0D1Kv_T7rbGHtSdYIUo4f5&index=10' },
				{ title: '[L1]Class - 6 (Almost everything about STL Map with practice problems : Part-1)[Bangla]', url: 'https://www.youtube.com/watch?v=-YdMpcEfojY&list=PLoa_roVVsxA0D1Kv_T7rbGHtSdYIUo4f5&index=6' }
			],
			contest: 'https://vjudge.net/contest/805659'
		},
		cycle2: {
			title: 'Cycle 2: Number Theory & Divisors',
			topics: ['Prime Numbers', 'Sieve of Eratosthenes', 'Divisors', 'GCD/LCM', 'Prime Factorization'],
			resources: [
				{ title: 'L6. Sieve of Eratosthenes | Maths Playlist', url: 'https://www.youtube.com/watch?v=g5Fuxn_AvSk&ab_channel=takeUforward' },
				{ title: 'L8. Smallest Prime Factor (SPF) | Prime Factorisation | Query Based Problem | Maths Playlist', url: 'https://www.youtube.com/watch?v=glKWkmKFlMw&ab_channel=takeUforward' },
				{ title: 'Print all Divisors of a Given Number - TakeUforward', url: 'https://takeuforward.org/data-structure/print-all-divisors-of-a-given-number/' },
				{ title: 'All Divisors of a Number - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/problems/all-divisors-of-a-number/' },
				{ title: 'CSES 1082: Sum of Divisors - USACO Guide', url: 'https://usaco.guide/problems/cses-1082-sum-of-divisors/solution' },
				{ title: 'L2. Print all Divisors of a Number | Maths Playlist', url: 'https://www.youtube.com/watch?v=Ae_Ag_saG9s&t=21s&ab_channel=takeUforward' },
				{ title: 'GCD and LCM using Euclid\'s Algorithm With Applications | CP Course | EP 53', url: 'https://www.youtube.com/watch?v=utZcJ0leZ_g&ab_channel=Luv' },
				{ title: 'Prime Factorization Problems - CodeChef', url: 'https://www.codechef.com/learn/course/number-theory/LINTDSA03/problems/PRIMFACT08A' }
			],
			contest: 'https://vjudge.net/contest/805661'
		},
		unlimited: 'https://vjudge.net/contest/805663'
	};

	const ResourceLink = ({ resource }) => (
		<motion.a
			href={resource.url}
			target="_blank"
			rel="noopener noreferrer"
			variants={itemVariants}
			className="glass-panel"
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				padding: '1rem 1.25rem',
				textDecoration: 'none',
				color: 'var(--text-primary)',
				transition: 'all 0.2s ease',
				cursor: 'pointer'
			}}
		>
			<span style={{ fontSize: '0.95rem' }}>{resource.title}</span>
			<ExternalLink size={16} style={{ color: 'var(--accent-blue)', flexShrink: 0 }} />
		</motion.a>
	);

	const CycleSection = ({ cycle, data }) => (
		<motion.div variants={itemVariants} style={{ marginBottom: '2rem' }}>
			<button
				onClick={() => setExpandedCycle(expandedCycle === cycle ? null : cycle)}
				style={{
					width: '100%',
					padding: '1.5rem',
					background: 'linear-gradient(135deg, rgba(3, 180, 188, 0.1) 0%, rgba(255, 144, 114, 0.05) 100%)',
					border: '1px solid var(--glass-border)',
					borderRadius: '12px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					cursor: 'pointer',
					fontSize: '1.25rem',
					fontWeight: '600',
					color: 'var(--text-primary)'
				}}
			>
				<span>{data.title}</span>
			{expandedCycle === cycle ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
			</button>

			{expandedCycle === cycle && (
				<motion.div
					initial={{ opacity: 0, height: 0 }}
					animate={{ opacity: 1, height: 'auto' }}
					transition={{ duration: 0.3 }}
					style={{ marginTop: '1rem', padding: '2rem', background: 'rgba(128, 128, 128, 0.05)', borderRadius: '12px', border: '1px solid var(--glass-border)' }}
				>
					<div style={{ marginBottom: '2rem' }}>
						<h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--accent-blue)' }}>Topics to Learn</h3>
						<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
							{data.topics.map((topic, idx) => (
								<div key={idx} style={{ padding: '0.75rem 1rem', background: 'rgba(3, 180, 188, 0.1)', border: '1px solid var(--accent-blue)', borderRadius: '8px', color: 'var(--accent-blue)', fontSize: '0.95rem', fontWeight: '500' }}>
									- {topic}
								</div>
							))}
						</div>
					</div>

					<div style={{ marginBottom: '2rem' }}>
						<h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--accent-blue)' }}>Resources</h3>
						<motion.div variants={containerVariants} initial="hidden" animate="visible" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
							{data.resources.map((resource, idx) => (
								<ResourceLink key={idx} resource={resource} />
							))}
						</motion.div>
					</div>

					<div>
						<h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--accent-blue)' }}>Contest</h3>
						<a href={data.contest} target="_blank" rel="noopener noreferrer" className="glass-panel" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 1.2rem', textDecoration: 'none', color: 'var(--text-primary)', background: 'rgba(3, 180, 188, 0.08)' }}>
							Join Contest
							<ExternalLink size={16} />
						</a>
					</div>
				</motion.div>
			)}
		</motion.div>
	);

	return (
		<div className="container animate-fade-in" style={{ paddingTop: '4rem', paddingBottom: '6rem' }}>
			<motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ textAlign: 'center', marginBottom: '4rem' }}>
				<h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', marginBottom: '1rem' }}><span className="text-gradient">Level 1</span></h1>
				<p style={{ fontSize: 'clamp(1rem, 3.6vw, 1.25rem)', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto 2rem' }}>
					Develop contest-ready skills with core problem-solving techniques, STL practice, and number theory resources.
				</p>
			</motion.div>

			<motion.div variants={containerVariants} initial="hidden" animate="visible" style={{ maxWidth: '1000px', margin: '0 auto' }}>
<CycleSection cycle={1} data={level1Data.cycle1} />
			<CycleSection cycle={2} data={level1Data.cycle2} />

				<motion.div variants={itemVariants} style={{ marginTop: '2rem' }} className="glass-panel">
					<h3 style={{ marginBottom: '1rem' }}>Unlimited Contest</h3>
					<a href={level1Data.unlimited} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.9rem 1.2rem', textDecoration: 'none', color: '#fff', background: 'linear-gradient(135deg, var(--accent-blue), rgba(255, 144, 114, 0.8))', borderRadius: '8px', fontWeight: 600 }}>
						Start Unlimited Practice
						<ExternalLink size={16} />
					</a>
				</motion.div>

				<motion.div variants={itemVariants} className="glass-panel" style={{ marginTop: '2rem' }}>
					<h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--accent-blue)' }}>Tips for Success</h3>
					<ul style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '0.95rem' }}>
						<li>Master one topic at a time before moving to the next</li>
						<li>Practice the contest problems daily - consistency is key</li>
						<li>Watch all the resource videos for deep understanding</li>
						<li>Do not skip topics - they build on each other</li>
						<li>Use the unlimited contest to reinforce your learning</li>
					</ul>
				</motion.div>
			</motion.div>
		</div>
	);
};

export default Level1;

