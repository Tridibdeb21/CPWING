import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

const Level0 = () => {
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

	const level0Data = {
		cycle1: {
			title: 'Cycle 1: C++ Fundamentals & Operators',
			topics: ['Variables', 'Data Types', 'Operators', 'Input/Output', 'Conditional Statements'],
			resources: [
				{ title: 'C++ Programming Intro - GeeksforGeeks', url: 'https://www.geeksforgeeks.org/cpp-programming-intro/' },
				{ title: 'Basic Input and Output in C++', url: 'https://www.geeksforgeeks.org/basic-input-output-c/' },
				{ title: 'C++ Bangla Tutorials 7 : keyword, variable & data type (part-1)', url: 'https://www.youtube.com/watch?v=TmsuuRwg9Hc&list=PLgH5QX0i9K3q0ZKeXtF--CZ0PdH1sSbYL&index=7&ab_channel=AnisulIslam' },
				{ title: 'C++ Bangla Tutorials 8 : keyword, variable & data type (part-2)', url: 'https://www.youtube.com/watch?v=QLhpDDon7vA&list=PLgH5QX0i9K3q0ZKeXtF--CZ0PdH1sSbYL&index=8&ab_channel=AnisulIslam' },
				{ title: 'Operators in C++', url: 'https://www.geeksforgeeks.org/operators-in-cpp/' },
                { title: 'Precedence & Associativity of All Operators | Funny & Easiest Way to Remember', url: 'https://www.youtube.com/watch?v=-H8NNi-Kox0' },
				{ title: 'C++ Bangla Tutorials 22 : if statement', url: 'https://www.youtube.com/watch?v=YGLGpYucXn4&list=PLgH5QX0i9K3q0ZKeXtF--CZ0PdH1sSbYL&index=22&ab_channel=AnisulIslam' },
				{ title: 'C++ Bangla Tutorials 23 : if else-if statement', url: 'https://www.youtube.com/watch?v=bUl8zAxMzUE&list=PLgH5QX0i9K3q0ZKeXtF--CZ0PdH1sSbYL&index=23&ab_channel=AnisulIslam' },
				{ title: 'C++ Bangla Tutorials 24 : if else-if else statement', url: 'https://www.youtube.com/watch?v=70LSj7k-TdU&list=PLgH5QX0i9K3q0ZKeXtF--CZ0PdH1sSbYL&index=24&t=7s&ab_channel=AnisulIslam' },
				{ title: 'C++ Bangla Tutorials 31 : nested if', url: 'https://www.youtube.com/watch?v=MWc1VL3k7pI&list=PLgH5QX0i9K3q0ZKeXtF--CZ0PdH1sSbYL&index=32&ab_channel=AnisulIslam' },
                { title: 'switch statement', url: 'https://www.youtube.com/watch?v=Yasp3_cydQs&list=PLgH5QX0i9K3q0ZKeXtF--CZ0PdH1sSbYL&index=34&ab_channel=AnisulIslam' }
			],
			contest: 'https://vjudge.net/contest/805665'
		},
		cycle2: {
			title: 'Cycle 2: Loops and Arrays',
			topics: ['For Loop', 'While Loop', 'Do-While', '1D Arrays', '2D Arrays'],
			resources: [
				{ title: 'C++ Bangla Tutorials 35 : for loop', url: 'https://www.youtube.com/watch?v=GyYHZzGuYUc&list=PLgH5QX0i9K3q0ZKeXtF--CZ0PdH1sSbYL&index=35&ab_channel=AnisulIslam' },
				{ title: 'C++ Bangla Tutorials 36 : while Loop', url: 'https://www.youtube.com/watch?v=dFmR1EEwMPM&list=PLgH5QX0i9K3q0ZKeXtF--CZ0PdH1sSbYL&index=36&ab_channel=AnisulIslam' },
				{ title: 'C++ Bangla Tutorials 37 : do while loop', url: 'https://www.youtube.com/watch?v=cxf7b0-udfM&list=PLgH5QX0i9K3q0ZKeXtF--CZ0PdH1sSbYL&index=37&ab_channel=AnisulIslam' },
				{ title: 'C++ Bangla Tutorials 38 : while vs do while', url: 'https://www.youtube.com/watch?v=mbMW3pdMPdA&list=PLgH5QX0i9K3q0ZKeXtF--CZ0PdH1sSbYL&index=38&ab_channel=AnisulIslam' },
				{ title: 'C++ Bangla Tutorials 39 : break and continue keyword', url: 'https://www.youtube.com/watch?v=7qcuZAvtt0k&list=PLgH5QX0i9K3q0ZKeXtF--CZ0PdH1sSbYL&index=39&ab_channel=AnisulIslam' },
				{ title: 'C++ Bangla Tutorials 40 : Multiplication table', url: 'https://www.youtube.com/watch?v=EwHbqUOQN0s&list=PLgH5QX0i9K3q0ZKeXtF--CZ0PdH1sSbYL&index=40&ab_channel=AnisulIslam' },
				{ title: 'C++ Bangla Tutorials 41 : series', url: 'https://www.youtube.com/watch?v=KQpncOdiQzo&list=PLgH5QX0i9K3q0ZKeXtF--CZ0PdH1sSbYL&index=41&ab_channel=AnisulIslam' },
				{ title: 'C++ Bangla Tutorials 48 : Types of array', url: 'https://www.youtube.com/watch?v=ai1Ap0fkyk0&list=PLgH5QX0i9K3q0ZKeXtF--CZ0PdH1sSbYL&index=48&ab_channel=AnisulIslam' },
				{ title: 'One Dimensional Arrays in C++', url: 'https://www.geeksforgeeks.org/cpp/one-dimensional-arrays-in-cpp/' },
				{ title: 'C++ Bangla Tutorials 48 : Introduction to 2D Array', url: 'https://www.youtube.com/watch?v=iXU0U2roem4&list=PLgH5QX0i9K3q0ZKeXtF--CZ0PdH1sSbYL&index=48&ab_channel=AnisulIslam' },
				{ title: 'C++ Bangla Tutorials 49 : Getting input for 2D Array', url: 'https://www.youtube.com/watch?v=U8GvEO3tl64&list=PLgH5QX0i9K3q0ZKeXtF--CZ0PdH1sSbYL&index=49&ab_channel=AnisulIslam' }
			],
			contest: 'https://vjudge.net/contest/805666'
		},
		unlimited: 'https://vjudge.net/contest/808639'
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

					<div style={{
						textAlign: 'center',
						padding: '1.25rem',
						borderRadius: '12px',
						border: '1px solid rgba(3, 180, 188, 0.25)',
						background: 'linear-gradient(135deg, rgba(3, 180, 188, 0.1) 0%, rgba(255, 144, 114, 0.08) 100%)'
					}}>
						<h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--accent-blue)' }}>Contest</h3>
						<a
							href={data.contest}
							target="_blank"
							rel="noopener noreferrer"
							style={{
								display: 'inline-flex',
								alignItems: 'center',
								justifyContent: 'center',
								gap: '0.5rem',
								padding: '0.95rem 1.5rem',
								minWidth: '180px',
								textDecoration: 'none',
								color: '#ffffff',
								background: 'linear-gradient(135deg, var(--accent-blue) 0%, rgba(255, 144, 114, 0.9) 100%)',
								borderRadius: '999px',
								fontWeight: 600,
								boxShadow: '0 10px 24px rgba(3, 180, 188, 0.28)',
								transition: 'transform 0.2s ease, box-shadow 0.2s ease'
							}}
						>
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
				<h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', marginBottom: '1rem' }}><span className="text-gradient">Level 0</span></h1>
				<p style={{ fontSize: 'clamp(1rem, 3.6vw, 1.25rem)', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto 2rem' }}>
					Build core C++ fundamentals from scratch with guided resources, cycle-wise topics, and beginner contest practice.
				</p>
			</motion.div>

			<motion.div variants={containerVariants} initial="hidden" animate="visible" style={{ maxWidth: '1000px', margin: '0 auto' }}>
				<CycleSection cycle={1} data={level0Data.cycle1} />
				<CycleSection cycle={2} data={level0Data.cycle2} />

				<motion.div variants={itemVariants} style={{ marginTop: '2rem' }} className="glass-panel">
					<h3 style={{ marginBottom: '1rem' }}>Unlimited Contest</h3>
					<p style={{ marginBottom: '1rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
						After completing both cycles, start the unlimited contest for full practice.
					</p>
					<a href={level0Data.unlimited} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.9rem 1.2rem', textDecoration: 'none', color: '#fff', background: 'linear-gradient(135deg, var(--accent-blue), rgba(255, 144, 114, 0.8))', borderRadius: '8px', fontWeight: 600 }}>
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

export default Level0;

