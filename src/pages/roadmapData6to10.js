export const phases6to10 = [
  {
    id: "phase-6",
    title: "Phase 6: Advanced Combinatorics",
    description: "Solve complex counting problems with specialized mathematical theorems.",
    topics: [
      "Inclusion-Exclusion Principle",
      "Stars and Bars Method",
      "Catalan Numbers",
      "Burnside's Lemma (Intro)",
      "Generating Functions (Basic Concepts)"
    ],
    elaborateContent: `## Master of Counting
Advanced combinatorics problems are often the hardest to recognize. Once you identify the pattern, the formula is straightforward.

---

### 1. Inclusion-Exclusion Principle

#### The Formula
|A ∪ B ∪ C| = |A| + |B| + |C| - |A∩B| - |A∩C| - |B∩C| + |A∩B∩C|

**Rule:** Add individuals, subtract pairs, add triples, subtract quadruples...

#### Classic Problem: Count numbers from 1 to N divisible by 2, 3, or 5
\`\`\`cpp
long long countDivisible(long long n, long long a, long long b, long long c) {
    // Inclusion-Exclusion
    long long ab = a * b / __gcd(a, b);  // LCM(a, b)
    long long ac = a * c / __gcd(a, c);
    long long bc = b * c / __gcd(b, c);
    long long abc = ab * c / __gcd(ab, c);  // LCM(a, b, c)

    return n/a + n/b + n/c
         - n/ab - n/ac - n/bc
         + n/abc;
}

// Numbers from 1 to 30 divisible by 2, 3, or 5:
cout << countDivisible(30, 2, 3, 5);  // 22
\`\`\`

#### Derangements — Arrangements where nothing is in its original place
A derangement is a permutation where no element appears in its original position.
\`\`\`cpp
// D(n) = n! * sum of (-1)^k / k! for k from 0 to n
// Recurrence: D(n) = (n-1) * (D(n-1) + D(n-2))
long long derangement(int n) {
    vector<long long> D(n+1);
    D[0] = 1; D[1] = 0;
    for (int i = 2; i <= n; i++)
        D[i] = (long long)(i-1) * (D[i-1] + D[i-2]);
    return D[n];
}
// D(5) = 44 (44 ways to shuffle 5 items so none returns home)
\`\`\`

---

### 2. Stars and Bars

#### The Question
How many ways can you distribute N identical items into K distinct bins?

**Answer:** C(N + K - 1, K - 1)

#### Examples
\`\`\`
Distribute 5 candies among 3 children (empty hands allowed):
C(5+3-1, 3-1) = C(7, 2) = 21 ways

Distribute 5 candies among 3 children (each must get ≥ 1):
Give 1 to each first: 5-3=2 left. Then C(2+3-1, 3-1) = C(4, 2) = 6 ways
\`\`\`

\`\`\`cpp
// Solve: x1 + x2 + ... + xk = n, where xi >= 0
long long starsAndBars(int n, int k) {
    return nCr(n + k - 1, k - 1);  // Using precomputed nCr from Phase 4
}

// Solve: x1 + x2 + ... + xk = n, where xi >= lower[i]
// Substitute yi = xi - lower[i], then sum of yi = n - sum(lower)
long long starsAndBarsWithLower(int n, int k, vector<int>& lower) {
    int remaining = n;
    for (int lo : lower) remaining -= lo;
    if (remaining < 0) return 0;
    return starsAndBars(remaining, k);
}
\`\`\`

---

### 3. Catalan Numbers

#### What are Catalan Numbers?
Catalan numbers appear in many counting problems: balanced brackets, binary trees, polygon triangulations...

C(0)=1, C(1)=1, C(2)=2, C(3)=5, C(4)=14, C(5)=42...

**Formula:** Cₙ = (2n)! / ((n+1)! × n!) = C(2n, n) / (n+1)

#### Recurrence: Cₙ = Σ C(i) × C(n-1-i) for i from 0 to n-1

\`\`\`cpp
// Precompute Catalan numbers using DP
vector<long long> catalan(int n) {
    vector<long long> cat(n+1, 0);
    cat[0] = cat[1] = 1;
    for (int i = 2; i <= n; i++)
        for (int j = 0; j < i; j++)
            cat[i] += cat[j] * cat[i-1-j];
    return cat;
}

// OR using the formula C(2n, n) / (n+1)
long long catalanFormula(int n) {
    return nCr(2*n, n) / (n + 1);  // may need modular inverse for large n
}
\`\`\`

#### Applications
\`\`\`
C(3) = 5: Number of valid bracket sequences of length 6: ()()(), ((())), (()()), (())(), ()((()))
C(4) = 14: Number of full binary trees with 5 leaves
C(n) = Number of ways to triangulate a convex polygon with n+2 sides
\`\`\`

---

### 4. Burnside's Lemma (Counting under Symmetry)

#### When to use: Counting distinct objects where rotations/reflections are considered the same

**Formula:** Number of distinct objects = (1/|G|) × Σ |Fix(g)|

Where G is the group of symmetries and Fix(g) is the number of objects fixed by symmetry g.

\`\`\`cpp
// Count distinct necklaces with n beads and k colors
// (rotating the necklace gives the same necklace)
long long necklaces(int n, int k) {
    long long total = 0;
    for (int d = 0; d < n; d++) {
        // gcd(d, n) is the number of independent cycles in rotation by d
        total += (long long)pow(k, __gcd(d, n));
    }
    return total / n;
}
\`\`\``
  },

  {
    id: "phase-7",
    title: "Phase 7: Graphs & Tree Theory",
    description: "Model relationships and hierarchies with nodes and edges.",
    topics: [
      "Graph Representation (Adjacency Matrix/List)",
      "DFS & BFS Traversals",
      "Tree Theory & Tree Diameters",
      "Dijkstra's Shortest Path Algorithm",
      "LCA (Lowest Common Ancestor)"
    ],
    elaborateContent: `## Mapping the Connections
After mastering graphs, a huge class of problems suddenly becomes solvable. Graphs model everything from social networks to road maps to dependencies.

---

### 1. Graph Representation

#### Adjacency List — Most Common in CP
\`\`\`cpp
const int MAXN = 1e5 + 5;
vector<int> adj[MAXN];      // Unweighted graph
vector<pair<int,int>> wadj[MAXN];  // Weighted: (neighbor, weight)

// Add undirected edge between u and v
void addEdge(int u, int v) {
    adj[u].push_back(v);
    adj[v].push_back(u);
}

// Add weighted undirected edge
void addWeightedEdge(int u, int v, int w) {
    wadj[u].push_back({v, w});
    wadj[v].push_back({u, w});
}
\`\`\`

#### Adjacency Matrix — For small dense graphs
\`\`\`cpp
int g[1005][1005] = {};  // g[u][v] = weight of edge u-v, 0 if no edge
g[1][2] = 5;
g[2][1] = 5;  // Undirected
\`\`\`

---

### 2. DFS — Depth First Search

DFS explores as deeply as possible before backtracking. Used for: connected components, cycle detection, topological sort, finding bridges.

\`\`\`cpp
bool visited[MAXN];

void dfs(int u) {
    visited[u] = true;
    cout << u << " ";  // Process node u

    for (int v : adj[u]) {
        if (!visited[v]) {
            dfs(v);
        }
    }
}

// Count connected components
int components = 0;
for (int i = 1; i <= n; i++) {
    if (!visited[i]) {
        dfs(i);
        components++;
    }
}
cout << "Connected components: " << components;
\`\`\`

#### Detect Cycle in Undirected Graph
\`\`\`cpp
bool hasCycle(int u, int parent) {
    visited[u] = true;
    for (int v : adj[u]) {
        if (!visited[v]) {
            if (hasCycle(v, u)) return true;
        } else if (v != parent) {
            return true;  // Back edge found => cycle!
        }
    }
    return false;
}
\`\`\`

---

### 3. BFS — Breadth First Search

BFS explores all neighbors at distance 1, then distance 2, etc. **Naturally finds shortest path in unweighted graphs.**

\`\`\`cpp
int dist[MAXN];

void bfs(int start) {
    fill(dist, dist + MAXN, -1);
    queue<int> q;
    dist[start] = 0;
    q.push(start);

    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int v : adj[u]) {
            if (dist[v] == -1) {         // Not visited
                dist[v] = dist[u] + 1;
                q.push(v);
            }
        }
    }
}

// After BFS from start: dist[i] = shortest path from start to i
\`\`\`

---

### 4. Tree Theory

A Tree is a connected graph with N nodes and N-1 edges (no cycles).

#### Tree Diameter (Longest path in tree)
\`\`\`cpp
// Step 1: BFS from any node to find farthest node u
// Step 2: BFS from u to find farthest node v
// Step 3: Diameter = dist(u, v)

int n;
vector<int> adj[MAXN];

pair<int,int> bfsTree(int start) {
    vector<int> dist(n+1, -1);
    queue<int> q;
    dist[start] = 0; q.push(start);
    int farthest = start, maxDist = 0;

    while (!q.empty()) {
        int u = q.front(); q.pop();
        if (dist[u] > maxDist) {
            maxDist = dist[u];
            farthest = u;
        }
        for (int v : adj[u])
            if (dist[v] == -1) { dist[v] = dist[u]+1; q.push(v); }
    }
    return {farthest, maxDist};
}

int treeDiameter() {
    auto [u, _] = bfsTree(1);       // From node 1, find farthest
    auto [v, diam] = bfsTree(u);    // From u, find farthest = diameter
    return diam;
}
\`\`\`

---

### 5. Dijkstra's Algorithm — Shortest Path in Weighted Graph

**Condition:** All edge weights must be non-negative.
**Complexity:** O(E log V) with priority queue.

\`\`\`cpp
const long long INF = 1e18;

vector<long long> dijkstra(int src, int n) {
    vector<long long> dist(n+1, INF);
    priority_queue<pair<long long,int>, vector<pair<long long,int>>, greater<>> pq;
    // Min heap: {distance, node}

    dist[src] = 0;
    pq.push({0, src});

    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();

        if (d > dist[u]) continue;  // Outdated entry, skip

        for (auto [v, w] : wadj[u]) {
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }

    return dist;  // dist[i] = shortest path from src to i
}
\`\`\`

---

### 6. LCA — Lowest Common Ancestor

The LCA of two nodes u and v in a tree is the deepest node that is an ancestor of both u and v.

\`\`\`cpp
const int LOG = 20;
int depth[MAXN], up[MAXN][LOG];

void dfsLCA(int u, int p, int d) {
    depth[u] = d;
    up[u][0] = p;  // Direct parent
    for (int i = 1; i < LOG; i++)
        up[u][i] = up[up[u][i-1]][i-1];  // 2^i-th ancestor
    for (int v : adj[u])
        if (v != p) dfsLCA(v, u, d+1);
}

int lca(int u, int v) {
    if (depth[u] < depth[v]) swap(u, v);
    int diff = depth[u] - depth[v];
    // Bring u to same depth as v
    for (int i = 0; i < LOG; i++)
        if ((diff >> i) & 1) u = up[u][i];
    if (u == v) return u;
    // Jump both up until they meet
    for (int i = LOG-1; i >= 0; i--)
        if (up[u][i] != up[v][i]) {
            u = up[u][i];
            v = up[v][i];
        }
    return up[u][0];
}

// Setup
dfsLCA(1, 1, 0);  // Root at node 1
cout << lca(5, 7);  // LCA of nodes 5 and 7
\`\`\``
  },

  {
    id: "phase-8",
    title: "Phase 8: Advanced Data Structures",
    description: "Manage and query data efficiently with tree-based structures.",
    topics: [
      "Disjoint Set Union (DSU)",
      "Segment Tree (Point & Range Updates)",
      "Fenwick Tree (Binary Indexed Tree)",
      "Sparse Table (RMQ)",
      "Policy Based Data Structures (PBDS)"
    ],
    elaborateContent: `## Beyond the Basics
When your problem requires millions of range queries and updates, standard arrays are too slow. These data structures bring complexity down to O(log N).

---

### 1. Disjoint Set Union (DSU / Union-Find)

#### Use case: Find connected components, detect cycles, Kruskal's MST

\`\`\`cpp
struct DSU {
    vector<int> parent, rank_;
    int components;

    DSU(int n) : parent(n+1), rank_(n+1, 0), components(n) {
        iota(parent.begin(), parent.end(), 0);  // parent[i] = i
    }

    int find(int x) {
        if (parent[x] != x)
            parent[x] = find(parent[x]);  // Path compression
        return parent[x];
    }

    bool unite(int x, int y) {
        int rx = find(x), ry = find(y);
        if (rx == ry) return false;  // Same component, cycle!
        // Union by rank
        if (rank_[rx] < rank_[ry]) swap(rx, ry);
        parent[ry] = rx;
        if (rank_[rx] == rank_[ry]) rank_[rx]++;
        components--;
        return true;
    }

    bool connected(int x, int y) {
        return find(x) == find(y);
    }
};

// Usage: Build minimal spanning tree (Kruskal's)
struct Edge { int u, v, w; };
long long kruskal(int n, vector<Edge>& edges) {
    sort(edges.begin(), edges.end(), [](Edge& a, Edge& b){ return a.w < b.w; });
    DSU dsu(n);
    long long cost = 0;
    for (auto& [u, v, w] : edges)
        if (dsu.unite(u, v)) cost += w;
    return cost;
}
\`\`\`

---

### 2. Segment Tree — Range Queries and Updates

#### Point Update, Range Query (Sum)
\`\`\`cpp
struct SegTree {
    int n;
    vector<long long> tree;

    SegTree(int n) : n(n), tree(4*n, 0) {}

    void build(vector<int>& arr, int node, int start, int end) {
        if (start == end) { tree[node] = arr[start]; return; }
        int mid = (start + end) / 2;
        build(arr, 2*node, start, mid);
        build(arr, 2*node+1, mid+1, end);
        tree[node] = tree[2*node] + tree[2*node+1];
    }

    // Update position idx to value val
    void update(int node, int start, int end, int idx, long long val) {
        if (start == end) { tree[node] = val; return; }
        int mid = (start + end) / 2;
        if (idx <= mid) update(2*node, start, mid, idx, val);
        else update(2*node+1, mid+1, end, idx, val);
        tree[node] = tree[2*node] + tree[2*node+1];
    }

    // Query sum in range [l, r]
    long long query(int node, int start, int end, int l, int r) {
        if (r < start || end < l) return 0;  // Out of range
        if (l <= start && end <= r) return tree[node];  // Fully in range
        int mid = (start + end) / 2;
        return query(2*node, start, mid, l, r)
             + query(2*node+1, mid+1, end, l, r);
    }

    void update(int idx, long long val) { update(1, 1, n, idx, val); }
    long long query(int l, int r) { return query(1, 1, n, l, r); }
};
\`\`\`

---

### 3. Fenwick Tree (BIT) — Simpler Range Queries

Fenwick Tree is a simpler alternative to Segment Tree for sum queries.

\`\`\`cpp
struct BIT {
    int n;
    vector<long long> tree;

    BIT(int n) : n(n), tree(n+1, 0) {}

    // Add val to position i
    void update(int i, long long val) {
        for (; i <= n; i += i & (-i))
            tree[i] += val;
    }

    // Query prefix sum [1, i]
    long long query(int i) {
        long long sum = 0;
        for (; i > 0; i -= i & (-i))
            sum += tree[i];
        return sum;
    }

    // Query range sum [l, r]
    long long query(int l, int r) {
        return query(r) - query(l-1);
    }
};
\`\`\`

---

### 4. Sparse Table — O(1) Range Minimum Query

**Use case:** Read-only arrays. Preprocess in O(N log N), query in O(1).

\`\`\`cpp
const int MAXN = 1e5 + 5, LOG = 20;
int sparse[MAXN][LOG], lg[MAXN];

void buildSparse(vector<int>& arr, int n) {
    for (int i = 1; i <= n; i++) sparse[i][0] = arr[i];
    for (int j = 1; j < LOG; j++)
        for (int i = 1; i + (1<<j) - 1 <= n; i++)
            sparse[i][j] = min(sparse[i][j-1], sparse[i + (1<<(j-1))][j-1]);

    lg[1] = 0;
    for (int i = 2; i <= n; i++) lg[i] = lg[i/2] + 1;
}

// Query minimum in [l, r] in O(1)
int queryMin(int l, int r) {
    int k = lg[r - l + 1];
    return min(sparse[l][k], sparse[r - (1<<k) + 1][k]);
}
\`\`\``
  },

  {
    id: "phase-9",
    title: "Phase 9: Dynamic Programming",
    description: "Solve complex problems by breaking them into overlapping subproblems.",
    topics: [
      "1D DP & Fibonacci Style Problems",
      "2D Matrix DP & Path Finding",
      "Knapsack (0/1 and Unbounded)",
      "Bitmask DP Foundations",
      "DP on Trees (Introduction)"
    ],
    elaborateContent: `## The Power of Memoization
DP is often called the "hardest" topic in CP, but it's really just "smart recursion with memory." Master the pattern and you'll unlock hundreds of problem types.

---

### 1. The Core Idea

**Overlapping Subproblems:** Same sub-calculation is needed many times.
**Optimal Substructure:** Optimal solution can be built from optimal solutions of subproblems.

#### Fibonacci with Memoization (Top-Down DP)
\`\`\`cpp
map<int, long long> memo;
long long fib(int n) {
    if (n <= 1) return n;
    if (memo.count(n)) return memo[n];
    return memo[n] = fib(n-1) + fib(n-2);
}
\`\`\`

#### Fibonacci with Tabulation (Bottom-Up DP)
\`\`\`cpp
long long fib(int n) {
    vector<long long> dp(n+1);
    dp[0] = 0; dp[1] = 1;
    for (int i = 2; i <= n; i++)
        dp[i] = dp[i-1] + dp[i-2];
    return dp[n];
}
\`\`\`

---

### 2. 1D DP Problems

#### Longest Increasing Subsequence (LIS) — O(N log N)
\`\`\`cpp
int lis(vector<int>& arr) {
    vector<int> tails;  // tails[i] = smallest tail of LIS with length i+1
    for (int x : arr) {
        auto it = lower_bound(tails.begin(), tails.end(), x);
        if (it == tails.end()) tails.push_back(x);
        else *it = x;
    }
    return tails.size();
}
\`\`\`

#### Coin Change — Minimum coins to make amount
\`\`\`cpp
int coinChange(vector<int>& coins, int amount) {
    vector<int> dp(amount+1, INT_MAX);
    dp[0] = 0;
    for (int v = 1; v <= amount; v++) {
        for (int coin : coins) {
            if (coin <= v && dp[v - coin] != INT_MAX)
                dp[v] = min(dp[v], dp[v - coin] + 1);
        }
    }
    return dp[amount] == INT_MAX ? -1 : dp[amount];
}
\`\`\`

---

### 3. 2D DP — Grid Path Finding

#### Minimum cost to reach bottom-right of a grid
\`\`\`cpp
int minCost(vector<vector<int>>& grid) {
    int n = grid.size(), m = grid[0].size();
    vector<vector<long long>> dp(n, vector<long long>(m, 1e18));
    dp[0][0] = grid[0][0];

    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            if (i == 0 && j == 0) continue;
            long long fromTop  = (i > 0) ? dp[i-1][j] : 1e18;
            long long fromLeft = (j > 0) ? dp[i][j-1] : 1e18;
            dp[i][j] = min(fromTop, fromLeft) + grid[i][j];
        }
    }
    return dp[n-1][m-1];
}
\`\`\`

---

### 4. 0/1 Knapsack — The Classic DP

Given N items each with weight W[i] and value V[i], select items to maximize total value with total weight ≤ capacity.

\`\`\`cpp
int knapsack(vector<int>& weights, vector<int>& values, int capacity) {
    int n = weights.size();
    // dp[w] = max value achievable with weight limit w
    vector<long long> dp(capacity+1, 0);

    for (int i = 0; i < n; i++) {
        // Traverse BACKWARDS to ensure each item is used at most once
        for (int w = capacity; w >= weights[i]; w--) {
            dp[w] = max(dp[w], dp[w - weights[i]] + values[i]);
        }
    }
    return dp[capacity];
}
\`\`\`

#### Unbounded Knapsack (items can be used multiple times)
\`\`\`cpp
int unboundedKnapsack(vector<int>& weights, vector<int>& values, int capacity) {
    vector<long long> dp(capacity+1, 0);
    for (int i = 0; i < weights.size(); i++) {
        // Traverse FORWARDS — allows reusing the same item
        for (int w = weights[i]; w <= capacity; w++) {
            dp[w] = max(dp[w], dp[w - weights[i]] + values[i]);
        }
    }
    return dp[capacity];
}
\`\`\`

---

### 5. Bitmask DP

**Use when N ≤ 20.** Represent a subset of N elements as an integer (bit i = 1 means element i is selected).

#### Travelling Salesman Problem (TSP) — Visit all cities once, minimize cost
\`\`\`cpp
const int INF = 1e9;
int dist[20][20];  // dist[i][j] = cost from city i to city j
int dp[1<<20][20]; // dp[mask][i] = min cost to visit cities in mask, ending at city i

int tsp(int n) {
    // Initialize
    for (auto& row : dp) fill(row.begin(), row.end(), INF);
    dp[1][0] = 0;  // Start at city 0 (mask=1 means city 0 visited)

    for (int mask = 1; mask < (1<<n); mask++) {
        for (int u = 0; u < n; u++) {
            if (!(mask & (1<<u))) continue;  // u not in mask
            if (dp[mask][u] == INF) continue;
            for (int v = 0; v < n; v++) {
                if (mask & (1<<v)) continue;  // v already visited
                int newMask = mask | (1<<v);
                dp[newMask][v] = min(dp[newMask][v], dp[mask][u] + dist[u][v]);
            }
        }
    }

    int ans = INF;
    int fullMask = (1<<n) - 1;
    for (int u = 1; u < n; u++)
        ans = min(ans, dp[fullMask][u] + dist[u][0]);  // Return to start
    return ans;
}
\`\`\``
  },

  {
    id: "phase-10",
    title: "Phase 10: Advanced Topics & Beyond",
    description: "Explore the frontiers of high-level competitive programming.",
    topics: [
      "Computational Geometry",
      "String Hashing & KMP Algorithm",
      "Square Root Decomposition",
      "Advanced Math (Linear Algebra, FFT)",
      "Continue ............"
    ],
    elaborateContent: `## The Journey Continues
You've built a world-class foundation. These are the "specialty weapons" used in high-level CP.

---

### 1. String Hashing — O(1) String Comparison

#### Why Hash Strings?
Comparing two strings of length L takes O(L) time. With hashing, preprocess once in O(N), then compare any two substrings in O(1).

\`\`\`cpp
struct StringHash {
    vector<long long> h, pw;
    long long MOD = 1e9 + 9, BASE = 131;

    StringHash(string& s) {
        int n = s.size();
        h.resize(n+1, 0);
        pw.resize(n+1, 1);
        for (int i = 0; i < n; i++) {
            h[i+1] = (h[i] * BASE + s[i]) % MOD;
            pw[i+1] = pw[i] * BASE % MOD;
        }
    }

    // Hash of substring s[l..r] (0-indexed)
    long long get(int l, int r) {
        return (h[r+1] - h[l] * pw[r-l+1] % MOD + MOD * 2) % MOD;
    }
};
// Compare s[l1..r1] with t[l2..r2]:
// if hashS.get(l1,r1) == hashT.get(l2,r2) => they're equal
\`\`\`

#### KMP Algorithm — Pattern Matching in O(N+M)
\`\`\`cpp
vector<int> kmpFailure(string& pattern) {
    int m = pattern.size();
    vector<int> fail(m, 0);
    for (int i = 1; i < m; i++) {
        int j = fail[i-1];
        while (j > 0 && pattern[i] != pattern[j]) j = fail[j-1];
        if (pattern[i] == pattern[j]) j++;
        fail[i] = j;
    }
    return fail;
}

vector<int> kmpSearch(string& text, string& pattern) {
    auto fail = kmpFailure(pattern);
    vector<int> matches;
    int j = 0;
    for (int i = 0; i < text.size(); i++) {
        while (j > 0 && text[i] != pattern[j]) j = fail[j-1];
        if (text[i] == pattern[j]) j++;
        if (j == pattern.size()) {
            matches.push_back(i - j + 1);  // Match starts at index i-j+1
            j = fail[j-1];
        }
    }
    return matches;
}
\`\`\`

---

### 2. Computational Geometry

#### Point and Vector basics
\`\`\`cpp
struct Point {
    double x, y;
    Point(double x=0, double y=0): x(x), y(y) {}
    Point operator-(Point& b) { return {x-b.x, y-b.y}; }
    Point operator+(Point& b) { return {x+b.x, y+b.y}; }
    double dot(Point b) { return x*b.x + y*b.y; }
    double cross(Point b) { return x*b.y - y*b.x; }  // THE most important operation
    double norm() { return sqrt(x*x + y*y); }
};

// Cross product tells orientation:
// > 0: counter-clockwise (left turn)
// < 0: clockwise (right turn)
// = 0: collinear
double cross(Point O, Point A, Point B) {
    return (A-O).cross(B-O);
}
\`\`\`

#### Convex Hull — Smallest convex polygon containing all points
\`\`\`cpp
vector<Point> convexHull(vector<Point> pts) {
    int n = pts.size();
    sort(pts.begin(), pts.end(), [](Point& a, Point& b){
        return a.x < b.x || (a.x == b.x && a.y < b.y);
    });
    vector<Point> hull;
    // Lower hull
    for (int i = 0; i < n; i++) {
        while (hull.size() >= 2 && cross(hull[hull.size()-2], hull.back(), pts[i]) <= 0)
            hull.pop_back();
        hull.push_back(pts[i]);
    }
    // Upper hull
    int lower = hull.size() + 1;
    for (int i = n-2; i >= 0; i--) {
        while (hull.size() >= lower && cross(hull[hull.size()-2], hull.back(), pts[i]) <= 0)
            hull.pop_back();
        hull.push_back(pts[i]);
    }
    hull.pop_back();
    return hull;
}
\`\`\`

---

### 3. Square Root Decomposition

#### Mo's Algorithm — Offline Range Queries in O((N+Q)√N)
\`\`\`cpp
int block;  // = sqrt(n)

struct Query { int l, r, idx; };

// Sort queries in Mo's order
sort(queries.begin(), queries.end(), [](Query& a, Query& b){
    int ba = a.l / block, bb = b.l / block;
    if (ba != bb) return ba < bb;
    return (ba & 1) ? a.r > b.r : a.r < b.r;  // Hilbert order optimization
});

// Process queries by moving [curL, curR] window
int curL = 0, curR = -1;
for (auto& q : queries) {
    while (curR < q.r) add(arr[++curR]);
    while (curL > q.l) add(arr[--curL]);
    while (curR > q.r) remove(arr[curR--]);
    while (curL < q.l) remove(arr[curL++]);
    answers[q.idx] = currentAnswer;
}
\`\`\`

---

### 4. Keep Going!
These advanced topics await you after Phase 10:
- **Heavy-Light Decomposition (HLD)** — Path queries on trees
- **Centroid Decomposition** — Distance problems on trees
- **Fast Fourier Transform (FFT)** — Polynomial multiplication in O(N log N)
- **Flow Algorithms** — Max flow, min cut, bipartite matching
- **Suffix Array / Suffix Automaton** — Ultimate string data structures

The competitive programming journey never truly ends. Every problem you solve teaches you something new. Stay curious, stay consistent, and enjoy the process!`
  }
];
