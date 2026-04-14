import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { roadmapData } from './roadmapData';

const topicGuideLibrary = [
  {
    key: 'complexity',
    guide: {
      theory: 'Complexity analysis estimates how runtime and memory grow with input size. In CP, this lets you reject slow approaches before coding.',
      whenToUse: 'Use this mindset before every implementation. Map constraints to feasible complexity first.',
      complexity: 'Target O(N), O(N log N), or O(log N) when N is large.',
      snippet: `// Quick complexity sanity check
long long operations = 1LL * n * log2(max(2, n));
if (operations > 1e8) {
    // probably too slow for 1 second
}`
    }
  },
  {
    key: 'binary search',
    guide: {
      theory: 'Binary search works on monotonic truth values. It can search values directly or search the answer space in optimization problems.',
      whenToUse: 'Use when the predicate changes from false to true exactly once over an ordered range.',
      complexity: 'O(log N) checks, each with predicate cost.',
      snippet: `int lo = 0, hi = 1e9, ans = -1;
while (lo <= hi) {
    int mid = lo + (hi - lo) / 2;
    if (ok(mid)) ans = mid, hi = mid - 1;
    else lo = mid + 1;
}`
    }
  },
  {
    key: 'prefix sum',
    guide: {
      theory: 'Prefix sums precompute cumulative values, turning range-sum queries into constant time subtractions.',
      whenToUse: 'Use for many static range queries or as a building block in counting problems.',
      complexity: 'Build O(N), query O(1).',
      snippet: `vector<long long> pref(n + 1, 0);
for (int i = 1; i <= n; i++) pref[i] = pref[i - 1] + a[i];
auto rangeSum = [&](int l, int r) {
    return pref[r] - pref[l - 1];
};`
    }
  },
  {
    key: 'two pointers',
    guide: {
      theory: 'Two pointers maintain a dynamic window or two indices to avoid repeated scans and reduce quadratic loops.',
      whenToUse: 'Use on sorted arrays, subarray windows, and pair-constraint problems.',
      complexity: 'Usually O(N) because each pointer moves forward at most N times.',
      snippet: `int l = 0;
for (int r = 0; r < n; r++) {
    add(a[r]);
    while (!valid()) remove(a[l++]);
    best = max(best, r - l + 1);
}`
    }
  },
  {
    key: 'sliding window',
    guide: {
      theory: 'Sliding window reuses previous work when moving from one subarray to the next.',
      whenToUse: 'Use for max/min length subarray, fixed-size window sums, and frequency-constrained substrings.',
      complexity: 'O(N) in most valid/invalid window patterns.',
      snippet: `long long cur = 0, best = LLONG_MIN;
for (int i = 0; i < k; i++) cur += a[i];
best = cur;
for (int i = k; i < n; i++) {
    cur += a[i] - a[i - k];
    best = max(best, cur);
}`
    }
  },
  {
    key: 'sieve',
    guide: {
      theory: 'Sieve of Eratosthenes marks composite numbers in batches, enabling prime queries quickly.',
      whenToUse: 'Use when many primality checks or factor queries are needed up to a limit.',
      complexity: 'O(N log log N) preprocessing.',
      snippet: `vector<bool> isPrime(N + 1, true);
isPrime[0] = isPrime[1] = false;
for (int p = 2; p * p <= N; p++) if (isPrime[p]) {
    for (int x = p * p; x <= N; x += p) isPrime[x] = false;
}`
    }
  },
  {
    key: 'gcd',
    guide: {
      theory: 'Euclid uses repeated remainder reduction. GCD and LCM are central for divisibility and fraction normalization.',
      whenToUse: 'Use in number theory, modular math, and ratio simplification.',
      complexity: 'O(log min(a, b)).',
      snippet: `long long gcd(long long a, long long b) {
    while (b) {
        a %= b;
        swap(a, b);
    }
    return a;
}`
    }
  },
  {
    key: 'dfs',
    guide: {
      theory: 'Depth-first search explores a path deeply before backtracking. It is ideal for structure and reachability analysis.',
      whenToUse: 'Use for components, cycle checks, bridges/articulation, and tree DP prep.',
      complexity: 'O(V + E).',
      snippet: `void dfs(int u) {
    vis[u] = true;
    for (int v : adj[u]) if (!vis[v]) dfs(v);
}`
    }
  },
  {
    key: 'bfs',
    guide: {
      theory: 'Breadth-first search expands by distance layers. In unweighted graphs, it gives shortest path length directly.',
      whenToUse: 'Use for shortest steps in grids/graphs and multi-source spread simulations.',
      complexity: 'O(V + E).',
      snippet: `queue<int> q;
dist[src] = 0;
q.push(src);
while (!q.empty()) {
    int u = q.front(); q.pop();
    for (int v : adj[u]) if (dist[v] == -1) {
        dist[v] = dist[u] + 1;
        q.push(v);
    }
}`
    }
  },
  {
    key: 'dijkstra',
    guide: {
      theory: 'Dijkstra repeatedly fixes the closest unresolved node using a min-heap. Works only with non-negative edges.',
      whenToUse: 'Use for weighted shortest paths with non-negative weights.',
      complexity: 'O((V + E) log V).',
      snippet: `priority_queue<pair<long long,int>, vector<pair<long long,int>>, greater<>> pq;
dist[src] = 0;
pq.push({0, src});
while (!pq.empty()) {
    auto [d, u] = pq.top(); pq.pop();
    if (d != dist[u]) continue;
    for (auto [v, w] : g[u]) if (d + w < dist[v]) {
        dist[v] = d + w;
        pq.push({dist[v], v});
    }
}`
    }
  },
  {
    key: 'segment tree',
    guide: {
      theory: 'Segment tree stores interval summaries in a binary tree to answer and update ranges efficiently.',
      whenToUse: 'Use for dynamic range min/max/sum and lazy range updates.',
      complexity: 'Build O(N), query/update O(log N).',
      snippet: `long long query(int node, int l, int r, int ql, int qr) {
    if (qr < l || r < ql) return 0;
    if (ql <= l && r <= qr) return seg[node];
    int mid = (l + r) / 2;
    return query(node*2, l, mid, ql, qr) + query(node*2+1, mid+1, r, ql, qr);
}`
    }
  },
  {
    key: 'fenwick',
    guide: {
      theory: 'Fenwick tree compresses prefix sums using lowbit jumps, giving compact and fast updates/queries.',
      whenToUse: 'Use for frequent point updates and prefix/range sums.',
      complexity: 'O(log N) update/query.',
      snippet: `void add(int i, long long v) {
    for (; i <= n; i += i & -i) bit[i] += v;
}
long long sum(int i) {
    long long s = 0;
    for (; i > 0; i -= i & -i) s += bit[i];
    return s;
}`
    }
  },
  {
    key: 'dp',
    guide: {
      theory: 'Dynamic Programming stores solved states to avoid recomputation and build optimal answers incrementally.',
      whenToUse: 'Use when problem has overlapping subproblems and a clear transition relation.',
      complexity: 'States x transition-cost.',
      snippet: `vector<long long> dp(n + 1, INF);
dp[0] = 0;
for (int i = 1; i <= n; i++) {
    for (int take : choices(i)) {
        dp[i] = min(dp[i], dp[i - take] + cost(i, take));
    }
}`
    }
  },
  {
    key: 'modular',
    guide: {
      theory: 'Modular arithmetic keeps huge values bounded and prevents overflow while preserving algebraic operations.',
      whenToUse: 'Use when answers are requested modulo M, especially with combinatorics or DP counts.',
      complexity: 'Each operation is O(1), fast power O(log exp).',
      snippet: `const long long MOD = 1000000007LL;
long long modPow(long long a, long long e) {
    long long r = 1;
    while (e) {
        if (e & 1) r = (r * a) % MOD;
        a = (a * a) % MOD;
        e >>= 1;
    }
    return r;
}`
    }
  },
  {
    key: 'combinatorics',
    guide: {
      theory: 'Combinatorics counts structures without brute force by using identities, recurrence, and combinational decomposition.',
      whenToUse: 'Use for counting ways, arrangements, distributions, and constructive probability tasks.',
      complexity: 'O(N) or O(1) per query after factorial precomputation.',
      snippet: `fact[0] = 1;
for (int i = 1; i <= N; i++) fact[i] = fact[i - 1] * i % MOD;
auto nCr = [&](int n, int r) {
    if (r < 0 || r > n) return 0LL;
    return fact[n] * invFact[r] % MOD * invFact[n - r] % MOD;
};`
    }
  },
  {
    key: 'catalan',
    guide: {
      theory: 'Catalan numbers count balanced recursive structures like valid bracket sequences and binary tree shapes.',
      whenToUse: 'Use when problems involve non-crossing pairings or balanced recursive decomposition.',
      complexity: 'O(N^2) DP or O(1) per query with combinatorics precompute.',
      snippet: `vector<long long> cat(n + 1, 0);
cat[0] = 1;
for (int i = 1; i <= n; i++) {
    for (int j = 0; j < i; j++) cat[i] += cat[j] * cat[i - 1 - j];
}`
    }
  },
  {
    key: 'burnside',
    guide: {
      theory: 'Burnside averages the number of colorings fixed by each symmetry transformation.',
      whenToUse: 'Use for counting distinct circular/symmetric objects where rotations/reflections are equivalent.',
      complexity: 'Depends on symmetry group size, usually O(|G| log N).',
      snippet: `long long total = 0;
for (int rot = 0; rot < n; rot++) {
    total += modPow(k, gcd(rot, n));
}
long long uniqueNecklaces = total / n;`
    }
  },
  {
    key: 'lca',
    guide: {
      theory: 'LCA answers ancestor queries by lifting nodes upward with binary powers of two.',
      whenToUse: 'Use in tree path queries, distance queries, and subtree computations.',
      complexity: 'Preprocess O(N log N), each query O(log N).',
      snippet: `for (int j = 1; j < LOG; j++) up[v][j] = up[up[v][j - 1]][j - 1];
int lift(int v, int k) {
    for (int j = 0; j < LOG; j++) if (k & (1 << j)) v = up[v][j];
    return v;
}`
    }
  },
  {
    key: 'kmp',
    guide: {
      theory: 'KMP avoids re-checking matched prefixes by reusing border information from failure links.',
      whenToUse: 'Use for exact pattern search in linear time.',
      complexity: 'O(N + M).',
      snippet: `vector<int> pi(m, 0);
for (int i = 1, j = 0; i < m; i++) {
    while (j > 0 && p[i] != p[j]) j = pi[j - 1];
    if (p[i] == p[j]) j++;
    pi[i] = j;
}`
    }
  },
  {
    key: 'hashing',
    guide: {
      theory: 'Rolling hash maps substrings to numeric fingerprints for fast comparisons.',
      whenToUse: 'Use in substring equality, palindrome checks, and duplicate-pattern detection.',
      complexity: 'Build O(N), substring hash O(1).',
      snippet: `h[i + 1] = (h[i] * BASE + s[i]) % MOD;
pw[i + 1] = pw[i] * BASE % MOD;
auto getHash = [&](int l, int r) {
    return (h[r + 1] - h[l] * pw[r - l + 1] % MOD + MOD) % MOD;
};`
    }
  },
  {
    key: 'geometry',
    guide: {
      theory: 'Geometry in CP relies on vectors, orientation tests, and robust handling of precision.',
      whenToUse: 'Use for line intersections, convex hull, area, and point-location problems.',
      complexity: 'Often O(N log N) for hull/sweep-line style tasks.',
      snippet: `double cross(Point a, Point b, Point c) {
    return (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
}
bool ccw = cross(a, b, c) > 0;`
    }
  },
  {
    key: 'knapsack',
    guide: {
      theory: 'Knapsack models choose-or-skip decisions with capacity constraints and value optimization.',
      whenToUse: 'Use when each item contributes weight/cost and objective is maximize/minimize value.',
      complexity: 'O(N * Capacity).',
      snippet: `vector<long long> dp(W + 1, 0);
for (int i = 0; i < n; i++) {
    for (int w = W; w >= wt[i]; w--) {
        dp[w] = max(dp[w], dp[w - wt[i]] + val[i]);
    }
}`
    }
  },
  {
    key: 'bitmask',
    guide: {
      theory: 'Bitmasking represents subsets as integers so transitions over subsets become fast and compact.',
      whenToUse: 'Use when N is small (usually <= 20) and states depend on selected set elements.',
      complexity: 'Commonly O(N * 2^N).',
      snippet: `for (int mask = 0; mask < (1 << n); mask++) {
    for (int bit = 0; bit < n; bit++) {
        if (mask & (1 << bit)) {
            // bit is selected in this subset
        }
    }
}`
    }
  },
  {
    key: 'sparse table',
    guide: {
      theory: 'Sparse table precomputes overlapping powers-of-two intervals for immutable range queries.',
      whenToUse: 'Use for static RMQ/min/max/gcd queries with many requests.',
      complexity: 'Build O(N log N), query O(1).',
      snippet: `int k = lg[r - l + 1];
int ans = min(st[l][k], st[r - (1 << k) + 1][k]);`
    }
  },
  {
    key: 'greedy',
    guide: {
      theory: 'Greedy methods choose the best local option, then prove global optimality with an invariant or exchange argument.',
      whenToUse: 'Use when order/selection can be sorted by one key and local choice remains safe.',
      complexity: 'Often dominated by sorting O(N log N).',
      snippet: `sort(items.begin(), items.end(), byKey);
for (auto &it : items) {
    if (canTake(it)) take(it);
}`
    }
  },
  {
    key: 'pbds',
    guide: {
      theory: 'Policy-based data structures add order statistics support to balanced trees.',
      whenToUse: 'Use for kth-element and rank queries with dynamic insertion/deletion.',
      complexity: 'O(log N) insert, erase, find_by_order, order_of_key.',
      snippet: `#include <ext/pb_ds/assoc_container.hpp>
using namespace __gnu_pbds;
tree<int, null_type, less<int>, rb_tree_tag, tree_order_statistics_node_update> os;
os.insert(10);
int k0 = *os.find_by_order(0);      // kth element (0-indexed)
int lessThan10 = os.order_of_key(10);`
    }
  },
  {
    key: 'ternary',
    guide: {
      theory: 'Ternary search locates extremum in unimodal functions by shrinking search interval from both sides.',
      whenToUse: 'Use for continuous/unimodal optimization tasks.',
      complexity: 'O(log(range/eps)).',
      snippet: `while (hi - lo > eps) {
    double m1 = lo + (hi - lo) / 3.0;
    double m2 = hi - (hi - lo) / 3.0;
    if (f(m1) < f(m2)) hi = m2;
    else lo = m1;
}`
    }
  },
  {
    key: 'pascal',
    guide: {
      theory: 'Pascal triangle gives combinational coefficients by local addition identity.',
      whenToUse: 'Use for small nCr tables and combinational DP transitions.',
      complexity: 'O(N^2) preprocessing.',
      snippet: `for (int n = 0; n <= N; n++) {
    C[n][0] = C[n][n] = 1;
    for (int r = 1; r < n; r++) C[n][r] = C[n - 1][r - 1] + C[n - 1][r];
}`
    }
  }
];

const defaultGuide = {
  theory: 'This topic builds your ability to model constraints, derive patterns, and map them to efficient algorithmic structures.',
  whenToUse: 'Use after reading constraints, then design invariants and data flow before writing implementation.',
  complexity: 'Start with the target complexity from constraints, then back-solve your approach.',
  snippet: `// Structured CP solve template
// 1) Read constraints
// 2) Pick data structure
// 3) Prove transition/invariant
// 4) Implement and test edge cases`
};

const getTopicGuide = (topic) => {
  const normalized = topic.toLowerCase();
  const matched = topicGuideLibrary.find(({ key }) => normalized.includes(key));
  return matched ? matched.guide : defaultGuide;
};

const RoadmapDetail = () => {
  const { phaseId } = useParams();
  const phase = roadmapData.find(p => p.id === phaseId);

  if (!phase) {
    return <Navigate to="/roadmap" />;
  }

  return (
    <div className="container animate-fade-in" style={{ paddingTop: '4rem', paddingBottom: '6rem', maxWidth: '1200px' }}>
      <Link to="/roadmap" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '2rem', transition: 'color 0.2s' }} className="hover-white">
        <ArrowLeft size={20} /> Back to Roadmap
      </Link>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel roadmap-detail-content"
      >
        <div className="phase-header" style={{ marginBottom: '2rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1.5rem' }}>
          <span className="phase-chip">{phase.title.split(':')[0]}</span>
          <h1 style={{ fontSize: '2.5rem', color: 'var(--accent-blue)', marginBottom: '0.5rem' }}>
            {phase.title}
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>{phase.description}</p>
        </div>
        
        <div className="markdown-body">
          <ReactMarkdown>{phase.elaborateContent}</ReactMarkdown>
        </div>

        <section className="deep-dive-wrapper">
          <div className="deep-dive-title-row">
            <h2>Topic Deep Dive Modules</h2>
            <span>theory + complexity + starter code</span>
          </div>

          <div className="deep-dive-grid">
            {phase.topics.map((topic) => {
              const guide = getTopicGuide(topic);
              return (
                <article key={topic} className="deep-card">
                  <h3>{topic}</h3>
                  <p><strong>Theory:</strong> {guide.theory}</p>
                  <p><strong>When to Use:</strong> {guide.whenToUse}</p>
                  <p><strong>Complexity Goal:</strong> {guide.complexity}</p>
                  <pre><code>{guide.snippet}</code></pre>
                </article>
              );
            })}
          </div>
        </section>
      </motion.div>

      <style>{`
        .hover-white:hover { color: var(--accent-blue) !important; }

        .roadmap-detail-content {
          font-family: 'Plus Jakarta Sans', 'Inter', 'Segoe UI', sans-serif;
          background:
            radial-gradient(circle at top right, rgba(255, 144, 114, 0.16), transparent 40%),
            radial-gradient(circle at 15% 10%, rgba(3, 180, 188, 0.14), transparent 45%),
            var(--glass-bg);
        }

        .phase-header h1 {
          font-family: 'Sora', 'Plus Jakarta Sans', 'Inter', sans-serif;
          letter-spacing: -0.02em;
        }

        .phase-chip {
          display: inline-flex;
          margin-bottom: 0.8rem;
          padding: 0.32rem 0.75rem;
          border-radius: 999px;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-weight: 700;
          color: #ffe0d7;
          background: rgba(255, 144, 114, 0.2);
          border: 1px solid rgba(255, 144, 114, 0.4);
        }
        
        .markdown-body {
          color: var(--text-secondary);
          font-size: 1.08rem;
          line-height: 1.85;
          letter-spacing: 0.01em;
        }

        .markdown-body h2 {
          color: var(--text-primary);
          font-size: clamp(1.55rem, 3.8vw, 2rem);
          margin: 2.8rem 0 1.3rem 0;
          padding: 0.5rem 0 0.7rem;
          border-bottom: 1px solid rgba(88, 166, 255, 0.28);
          font-family: 'Sora', 'Plus Jakarta Sans', sans-serif;
        }

        .markdown-body h3 {
          color: var(--accent-blue);
          font-size: clamp(1.18rem, 3vw, 1.45rem);
          margin: 1.8rem 0 0.9rem 0;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(3, 180, 188, 0.09);
          border-left: 3px solid var(--accent-blue);
          border-radius: 0 10px 10px 0;
          padding: 0.65rem 0.9rem;
        }

        .markdown-body h4 {
          color: #FF9072;
          font-size: 1.06rem;
          margin: 1.5rem 0 0.5rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .markdown-body p {
          margin-bottom: 1.1rem;
        }

        .markdown-body p strong {
          color: var(--text-primary);
          font-weight: 600;
        }

        .markdown-body ul {
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
        }

        .markdown-body li {
          margin-bottom: 0.75rem;
          position: relative;
        }

        .markdown-body li::before {
          content: '•';
          color: var(--accent-blue);
          position: absolute;
          left: -1.25rem;
          font-weight: bold;
        }

        .markdown-body hr {
          border: none;
          border-top: 1px solid rgba(88, 166, 255, 0.15);
          margin: 2.2rem 0;
        }

        .deep-dive-wrapper {
          margin-top: 2.8rem;
          border-top: 1px solid var(--glass-border);
          padding-top: 2rem;
        }

        .deep-dive-title-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 1.2rem;
        }

        .deep-dive-title-row h2 {
          margin: 0;
          color: var(--text-primary);
          font-family: 'Sora', 'Plus Jakarta Sans', sans-serif;
          font-size: clamp(1.25rem, 3.4vw, 1.65rem);
        }

        .deep-dive-title-row span {
          color: var(--text-secondary);
          font-size: 0.92rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-weight: 600;
        }

        .deep-dive-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 1rem;
        }

        .deep-card {
          background: rgba(9, 24, 26, 0.56);
          border: 1px solid rgba(3, 180, 188, 0.2);
          border-radius: 14px;
          padding: 1rem;
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
        }

        .deep-card:hover {
          transform: translateY(-3px);
          border-color: rgba(255, 144, 114, 0.46);
          box-shadow: 0 10px 20px rgba(5, 14, 18, 0.34);
        }

        .deep-card h3 {
          margin: 0 0 0.7rem;
          font-size: 1.04rem;
          color: #d9fcff;
          line-height: 1.45;
        }

        .deep-card p {
          margin: 0 0 0.56rem;
          color: #c9d9dd;
          font-size: 0.94rem;
          line-height: 1.62;
        }

        .deep-card p strong {
          color: #fff2ee;
        }

        .deep-card pre {
          margin: 0.75rem 0 0;
          border-radius: 10px;
          border: 1px solid #2f3847;
          background: #0d1117;
          padding: 0.75rem;
          overflow-x: auto;
        }

        .deep-card code {
          font-family: 'Fira Code', 'JetBrains Mono', 'Courier New', monospace;
          font-size: 0.8rem;
          line-height: 1.62;
          color: #e6edf3;
        }

        [data-theme='light'] .phase-chip {
          color: #bf4b30;
          background: rgba(255, 144, 114, 0.16);
        }

        [data-theme='light'] .deep-card {
          background: rgba(255, 255, 255, 0.85);
          border-color: rgba(2, 142, 147, 0.22);
        }

        [data-theme='light'] .deep-card h3 {
          color: #15313a;
        }

        [data-theme='light'] .deep-card p {
          color: #3b5560;
        }

        [data-theme='light'] .deep-card p strong {
          color: #112028;
        }

        /* ── Tables ── */
        .markdown-body table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0 2rem;
          font-size: 1rem;
        }
        .markdown-body th {
          background: rgba(88, 166, 255, 0.12);
          color: #58a6ff;
          padding: 0.75rem 1rem;
          text-align: left;
          border: 1px solid rgba(88, 166, 255, 0.2);
          font-weight: 700;
        }
        .markdown-body td {
          padding: 0.65rem 1rem;
          border: 1px solid rgba(120,120,180,0.15);
          color: var(--text-secondary);
        }
        .markdown-body tr:nth-child(even) td {
          background: rgba(255,255,255,0.03);
        }

        /* ── Code blocks: ALWAYS dark — never affected by theme ── */
        .markdown-body pre {
          background: #0d1117 !important;
          border: 1px solid #30363d !important;
          border-radius: 12px;
          padding: 1.5rem 1.75rem;
          margin: 1.5rem 0 2rem;
          overflow-x: auto;
          position: relative;
          box-shadow: 0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06);
        }

        /* "C++" badge on every code block */
        .markdown-body pre::before {
          content: 'C++';
          position: absolute;
          top: 0.55rem;
          right: 1rem;
          font-size: 0.7rem;
          font-family: 'Courier New', monospace;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #58a6ff;
          opacity: 0.6;
          text-transform: uppercase;
        }

        .markdown-body pre code {
          background: transparent !important;
          padding: 0 !important;
          border: none !important;
          font-family: 'Fira Code', 'JetBrains Mono', 'Courier New', monospace;
          font-size: 0.91rem;
          line-height: 1.75;
          color: #e6edf3 !important;
          display: block;
          white-space: pre;
        }

        /* ── Inline code: dark pill always ── */
        .markdown-body code:not(pre code) {
          font-family: 'Fira Code', 'JetBrains Mono', 'Courier New', monospace;
          background: #161b22 !important;
          color: #79c0ff !important;
          border: 1px solid #30363d;
          padding: 0.15rem 0.45rem;
          border-radius: 6px;
          font-size: 0.88em;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .deep-dive-title-row {
            flex-direction: column;
            align-items: flex-start;
          }

          .deep-dive-title-row span {
            font-size: 0.78rem;
          }
        }
      `}</style>
    </div>
  );
};

export default RoadmapDetail;
