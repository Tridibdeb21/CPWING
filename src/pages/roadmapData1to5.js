export const phases1to5 = [
  {
    id: "phase-1",
    title: "Phase 1: Foundations of Programming",
    description: "Start your journey by mastering the core syntax and basic logical building blocks.",
    topics: [
      "Input/Output & Data Types",
      "Control Structures (if/else, switch)",
      "Loops (for, while, do-while)",
      "Arrays & String Manipulation",
      "Functions, Recursion & Pointers"
    ],
    elaborateContent: `## Introduction to the Core
In Competitive Programming (CP), you must be fluent in your language before you can think about algorithms. C++ is the standard language used by most top programmers because it is extremely fast and has powerful built-in tools. Your first goal: write, compile, and run code without thinking about syntax.

---

### 1. Input/Output & Data Types

#### Why Fast I/O Matters
In contests, you might receive 100,000 lines of input. Using standard \`cin\` and \`cout\` without optimization can cause Time Limit Exceeded (TLE) even if your algorithm is correct. The two magic lines below make C++ I/O as fast as C's \`scanf/printf\`.

#### Data Types Cheat Sheet
- \`int\` → up to ~2×10⁹ (use for small numbers)
- \`long long\` → up to ~9.2×10¹⁸ (use whenever numbers can be large)
- \`double\` → floating point (use with caution due to precision issues)
- \`string\` → sequence of characters
- \`bool\` → true or false
- \`char\` → single character ('A', 'z', '1')

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    // Fast I/O - ALWAYS put these two lines
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int a;           // small integer
    long long b;     // large integer
    double c;        // decimal
    string s;        // text
    char ch;         // single character

    cin >> a >> b >> c >> s >> ch;

    cout << "int: " << a << "\\n";
    cout << "long long: " << b << "\\n";
    cout << "double: " << c << "\\n";
    cout << "string: " << s << "\\n";
    cout << "char: " << ch << "\\n";

    // Reading whole line with spaces
    string line;
    getline(cin, line);

    // Reading until EOF (End of file)
    int x;
    while (cin >> x) {
        cout << x << "\\n";
    }

    return 0;
}
\`\`\`
**Key Insight:** Always use \`"\\n"\` instead of \`endl\`. The \`endl\` flushes the buffer and is 50x slower!

---

### 2. Control Structures (if/else & switch)

#### The if/else Statement
\`if/else\` is the brain of your program. It lets you make decisions based on conditions.

#### Structure:
\`\`\`
if (condition) {
    // run this block if condition is TRUE
} else if (another_condition) {
    // run this block if the above was false, but this is TRUE
} else {
    // run this if ALL above were false
}
\`\`\`

#### Real CP Example: Determine if a number is positive, negative, or zero
\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n;
    cin >> n;

    if (n > 0) {
        cout << "Positive\\n";
    } else if (n < 0) {
        cout << "Negative\\n";
    } else {
        cout << "Zero\\n";
    }

    return 0;
}
\`\`\`

#### The switch Statement
Use \`switch\` when you have many conditions based on a single variable's value:
\`\`\`cpp
int day;
cin >> day;
switch (day) {
    case 1: cout << "Monday"; break;
    case 2: cout << "Tuesday"; break;
    case 3: cout << "Wednesday"; break;
    default: cout << "Invalid day"; break;
}
\`\`\`
**Important:** Never forget \`break\`! Without it, the code "falls through" to the next case.

#### Ternary Operator (Shortcut)
\`\`\`cpp
int a = 5, b = 10;
int bigger = (a > b) ? a : b;  // If a>b, bigger=a; else bigger=b
cout << bigger;  // Output: 10
\`\`\`

---

### 3. Loops (The Engine of CP)

Loops are the backbone of almost every CP solution. If you can't write loops fluently, you can't solve problems.

#### The for Loop
Use when you know exactly how many times to iterate.
\`\`\`cpp
// Print 1 to 10
for (int i = 1; i <= 10; i++) {
    cout << i << " ";
}

// Print in reverse
for (int i = 10; i >= 1; i--) {
    cout << i << " ";
}

// Skip by 2 (even numbers)
for (int i = 0; i <= 20; i += 2) {
    cout << i << " ";
}
\`\`\`

#### The while Loop
Use when you don't know exactly how many times to loop.
\`\`\`cpp
int n = 100;
int count = 0;
while (n > 1) {
    if (n % 2 == 0) n /= 2;
    else n = 3 * n + 1;
    count++;
}
cout << "Steps: " << count << "\\n";
\`\`\`

#### Nested Loops (Critical for 2D problems)
\`\`\`cpp
// Print multiplication table
for (int i = 1; i <= 5; i++) {
    for (int j = 1; j <= 5; j++) {
        cout << i * j << "\\t";
    }
    cout << "\\n";
}
\`\`\`

#### break and continue
\`\`\`cpp
// break: stop the loop immediately
for (int i = 0; i < 100; i++) {
    if (i == 5) break;   // Stops at i=5
    cout << i << " ";    // Prints: 0 1 2 3 4
}

// continue: skip this iteration, go to next
for (int i = 0; i < 10; i++) {
    if (i % 2 == 0) continue;   // Skip even numbers
    cout << i << " ";            // Prints: 1 3 5 7 9
}
\`\`\`

---

### 4. Arrays & String Manipulation

#### Arrays: The Most Used Data Structure
An array stores multiple values of the same type in sequential memory.
\`\`\`cpp
int arr[5] = {10, 20, 30, 40, 50};

// Access by index (0-based!)
cout << arr[0];  // 10
cout << arr[4];  // 50

// Fill array with input
int n = 5;
int a[n];
for (int i = 0; i < n; i++) cin >> a[i];

// Find max value in array
int maxVal = a[0];
for (int i = 1; i < n; i++) {
    if (a[i] > maxVal) maxVal = a[i];
}
cout << "Max: " << maxVal;
\`\`\`

#### 2D Arrays (Matrices)
\`\`\`cpp
int grid[3][3] = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

// Print the grid
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
        cout << grid[i][j] << " ";
    }
    cout << "\\n";
}
\`\`\`

#### String Manipulation
Strings in C++ are arrays of characters with many built-in functions.
\`\`\`cpp
string s = "hello world";

cout << s.length();              // 11
cout << s.size();                // 11 (same as length)
cout << s[0];                    // 'h'
cout << s.substr(6, 5);          // "world" (start=6, len=5)
cout << s.find("world");         // 6 (index where it first appears)
cout << s.find("xyz");           // string::npos (not found)

// Reverse a string
reverse(s.begin(), s.end());
cout << s;  // "dlrow olleh"

// Convert to uppercase
for (char& c : s) c = toupper(c);
cout << s;  // "DLROW OLLEH"

// Check if character is digit or letter
char ch = '5';
if (isdigit(ch)) cout << "It's a digit";
if (isalpha(ch)) cout << "It's a letter";
\`\`\`

---

### 5. Functions & Recursion

#### Functions: Code Reuse
\`\`\`cpp
// Function that returns the sum of two numbers
int add(int a, int b) {
    return a + b;
}

// Function that checks if a number is prime
bool isPrime(int n) {
    if (n < 2) return false;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) return false;
    }
    return true;
}

int main() {
    cout << add(3, 5) << "\\n";     // 8
    cout << isPrime(17) << "\\n";   // 1 (true)
    cout << isPrime(20) << "\\n";   // 0 (false)
}
\`\`\`

#### Recursion: Functions that call themselves
Every recursive function needs:
1. **Base Case** (when to stop)
2. **Recursive Case** (how to move toward the base case)

\`\`\`cpp
// Factorial: n! = n * (n-1) * (n-2) * ... * 1
int factorial(int n) {
    if (n == 0 || n == 1) return 1;  // Base Case
    return n * factorial(n - 1);     // Recursive Case
}

// Fibonacci: F(n) = F(n-1) + F(n-2)
int fib(int n) {
    if (n <= 1) return n;            // Base Case
    return fib(n-1) + fib(n-2);     // Recursive Case
}

// Power: a^b using recursion
long long power(long long a, long long b) {
    if (b == 0) return 1;
    if (b % 2 == 0) {
        long long half = power(a, b/2);
        return half * half;          // Fast exponentiation!
    }
    return a * power(a, b-1);
}
\`\`\`
**Warning:** Never use recursive Fibonacci for large N. It is O(2^N). Use memoization (Phase 9) instead.`
  },

  {
    id: "phase-2",
    title: "Phase 2: Efficiency & STL Power",
    description: "Learn to write fast code and use the powerful C++ Standard Template Library.",
    topics: [
      "Time and Space Complexity Analysis",
      "STL Containers (Vector, Set, Map, Pair)",
      "Iterators & Custom Comparators",
      "Stack, Queue & Priority Queue",
      "Built-in Algorithms (Sort, Find, Reverse)"
    ],
    elaborateContent: `## The Art of Efficiency
In Competitive Programming, a correct but slow solution scores zero points. The most important skill is knowing BEFORE coding whether your solution is fast enough.

---

### 1. Time and Space Complexity

#### Big O Notation
Big O describes the worst-case growth rate of your algorithm. For a time limit of 1 second, assume your computer runs ~10⁸ simple operations per second.

| Complexity | Max N (1 sec) | Example |
|---|---|---|
| O(1) | Any | Array index access |
| O(log N) | 10^18 | Binary search |
| O(N) | 10^8 | Single loop |
| O(N log N) | 10^6 | Merge sort |
| O(N²) | 10^4 | Nested loops |
| O(N³) | 500 | Triple nested loops |
| O(2^N) | 20 | Subset enumeration |

#### Calculating Complexity
\`\`\`cpp
// O(N) - single loop
for (int i = 0; i < n; i++) { ... }

// O(N²) - nested loop
for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) { ... }
}

// O(N log N) - loop + binary search inside
for (int i = 0; i < n; i++) {
    binary_search(v.begin(), v.end(), target); // O(log N)
}

// O(log N) - halving each iteration
while (n > 1) {
    n /= 2;  // Halves each time
}
\`\`\`

#### Space Complexity
\`\`\`cpp
int arr[100000];   // O(N) space - watch out for stack overflow!
int dp[1000][1000]; // O(N²) space - 4MB for int, might be too much!
\`\`\`

---

### 2. STL Containers

#### Vector — The Dynamic Array
\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    vector<int> v;              // empty vector
    vector<int> v2(5, 0);       // size=5, all zeros
    vector<int> v3 = {3,1,4,1,5};

    v.push_back(10);    // Add to end
    v.push_back(20);
    v.push_back(30);
    v.pop_back();       // Remove last element

    cout << v.size();   // 2
    cout << v[0];       // 10
    cout << v.front();  // 10 (first)
    cout << v.back();   // 20 (last)

    // Iterate
    for (int x : v) cout << x << " ";

    // Sort
    sort(v3.begin(), v3.end());   // {1,1,3,4,5}

    // 2D vector (like a 2D array, but flexible)
    vector<vector<int>> grid(3, vector<int>(4, 0)); // 3x4 grid of zeros
    grid[1][2] = 7;
}
\`\`\`

#### Set — Unique Sorted Elements
\`\`\`cpp
set<int> s;
s.insert(5);
s.insert(3);
s.insert(5);  // Duplicate! Ignored
s.insert(8);
// s = {3, 5, 8} — always sorted, always unique

cout << s.count(5);  // 1 (exists)
cout << s.count(9);  // 0 (doesn't exist)
s.erase(3);          // Remove element
cout << s.size();    // 2

// Iterate
for (int x : s) cout << x << " ";  // 5 8

// Find lower_bound and upper_bound
auto it = s.lower_bound(4);  // First element >= 4
cout << *it;  // 5
\`\`\`

#### Map — Key-Value Dictionary
\`\`\`cpp
map<string, int> freq;
freq["apple"] = 3;
freq["banana"] = 7;
freq["apple"]++;   // Now freq["apple"] = 4

// Check if key exists
if (freq.count("apple")) cout << "apple exists!";

// Iterate
for (auto& [key, val] : freq) {
    cout << key << ": " << val << "\\n";
}

// Practical: Count frequencies of characters
string s = "abracadabra";
map<char, int> charFreq;
for (char c : s) charFreq[c]++;
for (auto& [ch, cnt] : charFreq) cout << ch << ": " << cnt << "\\n";
\`\`\`

#### Pair & Tuple
\`\`\`cpp
pair<int, int> p = {3, 7};
cout << p.first;   // 3
cout << p.second;  // 7

// Sort array of pairs (sorts by first, then second automatically)
vector<pair<int,int>> edges = {{5,2},{1,3},{3,1}};
sort(edges.begin(), edges.end());  // {{1,3},{3,1},{5,2}}

// Tuple (3+ values)
tuple<int, string, double> t = {1, "hello", 3.14};
cout << get<0>(t);  // 1
cout << get<1>(t);  // "hello"
\`\`\`

---

### 3. Stack, Queue & Priority Queue

#### Stack — Last In, First Out (LIFO)
\`\`\`cpp
stack<int> stk;
stk.push(10);
stk.push(20);
stk.push(30);

cout << stk.top();   // 30 (most recently pushed)
stk.pop();           // Remove top
cout << stk.top();   // 20

while (!stk.empty()) {
    cout << stk.top() << " ";
    stk.pop();
}  // Output: 20 10

// Classic use: Check balanced parentheses
string s = "({[]})";
stack<char> bracket;
bool valid = true;
for (char c : s) {
    if (c == '(' || c == '{' || c == '[') bracket.push(c);
    else {
        if (bracket.empty()) { valid = false; break; }
        char top = bracket.top(); bracket.pop();
        if ((c==')' && top!='(') || (c=='}' && top!='{') || (c==']' && top!='['))
            { valid = false; break; }
    }
}
if (!bracket.empty()) valid = false;
cout << (valid ? "Valid" : "Invalid");
\`\`\`

#### Queue — First In, First Out (FIFO)
\`\`\`cpp
queue<int> q;
q.push(10);
q.push(20);
q.push(30);

cout << q.front();  // 10 (oldest)
cout << q.back();   // 30 (newest)
q.pop();            // Remove front (10)
cout << q.front();  // 20
\`\`\`

#### Priority Queue — Always gives the Maximum
\`\`\`cpp
priority_queue<int> maxpq;   // default: MAX heap
maxpq.push(3);
maxpq.push(1);
maxpq.push(7);
maxpq.push(4);

cout << maxpq.top();  // 7 (maximum)
maxpq.pop();
cout << maxpq.top();  // 4

// Min heap (for Dijkstra's algorithm)
priority_queue<int, vector<int>, greater<int>> minpq;
minpq.push(3);
minpq.push(1);
minpq.push(7);
cout << minpq.top();  // 1 (minimum)
\`\`\`

---

### 4. Built-in Algorithms

\`\`\`cpp
vector<int> v = {5, 2, 8, 1, 9, 3};

// Sort ascending
sort(v.begin(), v.end());  // {1,2,3,5,8,9}

// Sort descending
sort(v.begin(), v.end(), greater<int>());  // {9,8,5,3,2,1}

// Binary search (array must be sorted first!)
sort(v.begin(), v.end());
bool found = binary_search(v.begin(), v.end(), 5);  // true

// lower_bound: first element >= value
auto it = lower_bound(v.begin(), v.end(), 5);
cout << *it;  // 5

// upper_bound: first element > value
auto it2 = upper_bound(v.begin(), v.end(), 5);
cout << *it2;  // 8

// Max and Min
cout << *max_element(v.begin(), v.end());  // 9
cout << *min_element(v.begin(), v.end());  // 1

// Reverse
reverse(v.begin(), v.end());

// Fill all elements with a value
fill(v.begin(), v.end(), 0);

// Sum of all elements
long long total = accumulate(v.begin(), v.end(), 0LL);

// Custom sort: sort by length of string
vector<string> words = {"banana", "apple", "kiwi"};
sort(words.begin(), words.end(), [](string& a, string& b){
    return a.length() < b.length();  // shortest first
});
// {"kiwi", "apple", "banana"}
\`\`\``
  },

  {
    id: "phase-3",
    title: "Phase 3: Classic Algorithmic Techniques",
    description: "Master the fundamental patterns used to solve common contest problems.",
    topics: [
      "Two Pointers Technique",
      "Sliding Window Approach",
      "Prefix Sum & Difference Arrays",
      "Bit Manipulation Basics",
      "Greedy Strategy Foundations"
    ],
    elaborateContent: `## Pattern Recognition
The difference between a beginner and an intermediate CP programmer is the ability to recognize which pattern to apply. This phase gives you 5 powerful templates.

---

### 1. Prefix Sum — Instant Range Queries

#### The Problem
Given an array, answer Q queries each asking: "What is the sum of elements from index L to R?"

**Naive approach:** O(N) per query = O(N×Q) total. Too slow.
**Prefix Sum:** O(N) build + O(1) per query = O(N + Q). Fast!

#### How it works
\`prefix[i] = arr[1] + arr[2] + ... + arr[i]\`
Then: \`sum(L, R) = prefix[R] - prefix[L-1]\`

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    int n, q;
    cin >> n >> q;

    vector<long long> arr(n+1), pref(n+1, 0);
    for (int i = 1; i <= n; i++) cin >> arr[i];

    // Build prefix sum
    for (int i = 1; i <= n; i++)
        pref[i] = pref[i-1] + arr[i];

    // Answer queries in O(1) each
    while (q--) {
        int L, R;
        cin >> L >> R;
        cout << pref[R] - pref[L-1] << "\\n";
    }
}
\`\`\`

#### 2D Prefix Sum (for grids)
\`\`\`cpp
int n, m;
cin >> n >> m;
vector<vector<long long>> grid(n+1, vector<long long>(m+1));
vector<vector<long long>> pref(n+1, vector<long long>(m+1, 0));

for (int i = 1; i <= n; i++)
    for (int j = 1; j <= m; j++) cin >> grid[i][j];

// Build 2D prefix sum
for (int i = 1; i <= n; i++)
    for (int j = 1; j <= m; j++)
        pref[i][j] = grid[i][j] + pref[i-1][j] + pref[i][j-1] - pref[i-1][j-1];

// Query sum of rectangle (r1,c1) to (r2,c2)
auto query = [&](int r1, int c1, int r2, int c2) {
    return pref[r2][c2] - pref[r1-1][c2] - pref[r2][c1-1] + pref[r1-1][c1-1];
};
\`\`\`

#### Difference Array (Point Updates, Range Queries)
\`\`\`cpp
// Add value V to all elements in range [L, R]
vector<int> diff(n+2, 0);
// Operation: add V to [L, R]
diff[L] += V;
diff[R+1] -= V;

// Reconstruct original array
for (int i = 1; i <= n; i++)
    diff[i] += diff[i-1];
\`\`\`

---

### 2. Two Pointers

#### When to use: Sorted arrays or problems with a "window" condition

#### Pattern 1: Find pair with target sum
\`\`\`cpp
vector<int> arr = {1, 2, 3, 4, 6, 8};
int target = 7;
int left = 0, right = arr.size() - 1;

while (left < right) {
    int sum = arr[left] + arr[right];
    if (sum == target) {
        cout << arr[left] << " + " << arr[right] << " = " << target << "\\n";
        left++; right--;
    } else if (sum < target) {
        left++;   // Need bigger sum, move left pointer right
    } else {
        right--;  // Need smaller sum, move right pointer left
    }
}
\`\`\`

#### Pattern 2: Remove duplicates from sorted array
\`\`\`cpp
vector<int> nums = {1,1,2,2,3,4,4,5};
int write = 1;
for (int read = 1; read < nums.size(); read++) {
    if (nums[read] != nums[read-1]) {
        nums[write++] = nums[read];
    }
}
nums.resize(write);
// Result: {1, 2, 3, 4, 5}
\`\`\`

---

### 3. Sliding Window

#### Fixed-size window: Max sum of K consecutive elements
\`\`\`cpp
int n, k;
cin >> n >> k;
vector<int> arr(n);
for (int& x : arr) cin >> x;

long long windowSum = 0;
for (int i = 0; i < k; i++) windowSum += arr[i];  // First window

long long maxSum = windowSum;
for (int i = k; i < n; i++) {
    windowSum += arr[i];        // Add new element
    windowSum -= arr[i - k];    // Remove old element
    maxSum = max(maxSum, windowSum);
}
cout << maxSum;
\`\`\`

#### Variable-size window: Longest subarray with sum ≤ K
\`\`\`cpp
int left = 0;
long long sum = 0;
int maxLen = 0;
for (int right = 0; right < n; right++) {
    sum += arr[right];
    while (sum > K) {
        sum -= arr[left];
        left++;
    }
    maxLen = max(maxLen, right - left + 1);
}
cout << maxLen;
\`\`\`

---

### 4. Bit Manipulation

#### Why it matters: Bits are the fastest operations a computer can do

\`\`\`cpp
int a = 5;   // binary: 101
int b = 3;   // binary: 011

// AND: 1 only if BOTH bits are 1
cout << (a & b);   // 001 = 1

// OR: 1 if EITHER bit is 1
cout << (a | b);   // 111 = 7

// XOR: 1 if bits are DIFFERENT
cout << (a ^ b);   // 110 = 6

// NOT: flip all bits
cout << (~a);      // ...11111010 = -6 (two's complement)

// Left shift: multiply by 2
cout << (a << 1);  // 1010 = 10

// Right shift: divide by 2
cout << (a >> 1);  // 10 = 2
\`\`\`

#### Common Bit Tricks
\`\`\`cpp
int n = 13;  // binary: 1101

// Check if N-th bit is set
int N = 2;
if ((n >> N) & 1) cout << "Bit " << N << " is set";

// Set N-th bit
n = n | (1 << N);

// Clear N-th bit
n = n & ~(1 << N);

// Toggle N-th bit
n = n ^ (1 << N);

// Check if number is power of 2
bool isPow2 = (n > 0) && ((n & (n-1)) == 0);

// Count set bits (popcount)
cout << __builtin_popcount(n);  // Built-in, very fast

// Find lowest set bit
cout << (n & (-n));
\`\`\`

#### Subset Enumeration (critical for Bitmask DP)
\`\`\`cpp
int mask = 5;  // 101 in binary (represents a set {0, 2})
// Iterate over all subsets of mask
for (int sub = mask; sub > 0; sub = (sub-1) & mask) {
    // sub is a subset of mask
    cout << sub << "\\n";
}
\`\`\`

---

### 5. Greedy Strategy

#### The Greedy Principle: At each step, pick the locally best option

**When it works:** When a locally optimal choice leads to a globally optimal solution.
**Proving it works:** Often use "exchange argument" — show swapping any two adjacent choices doesn't improve the result.

#### Example: Activity Selection (Maximum non-overlapping intervals)
\`\`\`cpp
// Given intervals [start, end], select maximum non-overlapping ones
vector<pair<int,int>> intervals = {{1,3},{2,4},{3,5},{4,6}};

// Sort by END time (Greedy key insight!)
sort(intervals.begin(), intervals.end(), [](auto& a, auto& b){
    return a.second < b.second;
});

int count = 0;
int lastEnd = -1;
for (auto& [start, end] : intervals) {
    if (start >= lastEnd) {    // No overlap with last selected
        count++;
        lastEnd = end;
    }
}
cout << count;  // Maximum activities = 3
\`\`\`

#### Example: Fractional Knapsack
\`\`\`cpp
struct Item { double weight, value; };
vector<Item> items = {{2, 10}, {3, 15}, {5, 20}};
double capacity = 7;

// Sort by value/weight ratio (greedy!)
sort(items.begin(), items.end(), [](Item& a, Item& b){
    return a.value/a.weight > b.value/b.weight;
});

double totalValue = 0;
for (auto& item : items) {
    if (capacity >= item.weight) {
        totalValue += item.value;
        capacity -= item.weight;
    } else {
        totalValue += (capacity / item.weight) * item.value;
        break;
    }
}
cout << totalValue;
\`\`\``
  },

  {
    id: "phase-4",
    title: "Phase 4: Number Theory Foundations",
    description: "Master prime numbers, modular arithmetic, and mathematical tools for CP.",
    topics: [
      "Prime Factorization & Primality Testing",
      "Sieve of Eratosthenes",
      "GCD & LCM (Euclidean Algorithm)",
      "Modular Arithmetic (Addition/Multiplication)",
      "Modular Multiplicative Inverse"
    ],
    elaborateContent: `## The Language of Numbers
Number Theory problems appear in almost every CP contest. They look simple but require deep mathematical thinking. This phase gives you the tools to crack them.

---

### 1. Primality Testing

#### Naive Approach — O(√N)
A number N is prime if no number from 2 to √N divides it.

\`\`\`cpp
bool isPrime(long long n) {
    if (n < 2) return false;
    if (n == 2) return true;
    if (n % 2 == 0) return false;  // Even numbers not prime
    for (long long i = 3; i * i <= n; i += 2) {  // Only odd divisors
        if (n % i == 0) return false;
    }
    return true;
}
\`\`\`

#### Prime Factorization — O(√N)
Every number can be written as a product of prime numbers (e.g., 360 = 2³ × 3² × 5).

\`\`\`cpp
map<int, int> factorize(int n) {
    map<int, int> factors;
    for (int i = 2; i * i <= n; i++) {
        while (n % i == 0) {
            factors[i]++;
            n /= i;
        }
    }
    if (n > 1) factors[n]++;  // n itself is prime
    return factors;
}

// Example: factorize(360) = {2:3, 3:2, 5:1}
// This means 360 = 2^3 * 3^2 * 5^1
\`\`\`

---

### 2. Sieve of Eratosthenes

#### Find ALL primes up to N in O(N log log N)
This is one of the most efficient algorithms in Number Theory.

**Key Idea:** Start with all numbers marked prime. For each prime p, mark all multiples of p as composite.

\`\`\`cpp
const int MAXN = 1e7 + 5;
bool is_prime[MAXN];

void sieve(int N) {
    fill(is_prime, is_prime + N + 1, true);
    is_prime[0] = is_prime[1] = false;

    for (int p = 2; p * p <= N; p++) {
        if (is_prime[p]) {
            // Mark all multiples of p starting from p²
            for (int i = p * p; i <= N; i += p)
                is_prime[i] = false;
        }
    }
}

int main() {
    sieve(1000000);

    // Count primes up to 1,000,000
    int cnt = 0;
    for (int i = 2; i <= 1000000; i++)
        if (is_prime[i]) cnt++;
    cout << cnt;  // 78498 primes!
}
\`\`\`

#### Smallest Prime Factor (SPF) Sieve — For fast factorization
\`\`\`cpp
int spf[MAXN];  // spf[i] = smallest prime factor of i

void buildSPF(int N) {
    for (int i = 0; i <= N; i++) spf[i] = i;
    for (int i = 2; i * i <= N; i++) {
        if (spf[i] == i) {  // i is prime
            for (int j = i * i; j <= N; j += i)
                if (spf[j] == j) spf[j] = i;
        }
    }
}

// Factorize any number in O(log N) using SPF
map<int,int> fastFactorize(int n) {
    map<int,int> factors;
    while (n > 1) {
        factors[spf[n]]++;
        n /= spf[n];
    }
    return factors;
}
\`\`\`

---

### 3. GCD & LCM

#### GCD — Greatest Common Divisor
GCD(a, b) = largest number that divides both a and b.

\`\`\`cpp
// Euclidean Algorithm: GCD(a, b) = GCD(b, a%b)
long long gcd(long long a, long long b) {
    while (b) {
        a %= b;
        swap(a, b);
    }
    return a;
}

// C++17 has built-in:
#include <numeric>
cout << __gcd(12, 8);   // 4
cout << gcd(48, 18);    // 6 (C++17)

// LCM = a * b / GCD(a, b)
long long lcm(long long a, long long b) {
    return a / gcd(a, b) * b;  // Divide first to prevent overflow!
}
\`\`\`

#### Extended Euclidean Algorithm
Finds x and y such that: ax + by = GCD(a, b)
\`\`\`cpp
long long extgcd(long long a, long long b, long long& x, long long& y) {
    if (b == 0) { x = 1; y = 0; return a; }
    long long x1, y1;
    long long g = extgcd(b, a % b, x1, y1);
    x = y1;
    y = x1 - (a / b) * y1;
    return g;
}
\`\`\`

---

### 4. Modular Arithmetic

#### Why Modulo?
Answers can be astronomically large (e.g., 10^100). We always compute "answer modulo 10^9+7" to keep numbers manageable.

\`\`\`cpp
const long long MOD = 1e9 + 7;

// Addition under modulo
long long addMod(long long a, long long b) {
    return (a + b) % MOD;
}

// Multiplication under modulo (ALWAYS multiply before modding)
long long mulMod(long long a, long long b) {
    return (a % MOD) * (b % MOD) % MOD;
}

// CAREFUL with subtraction — result can be negative!
long long subMod(long long a, long long b) {
    return ((a - b) % MOD + MOD) % MOD;
}

// Fast power: compute a^b mod M in O(log b)
long long power(long long base, long long exp, long long mod) {
    long long result = 1;
    base %= mod;
    while (exp > 0) {
        if (exp & 1) result = result * base % mod;  // If exp is odd
        base = base * base % mod;
        exp >>= 1;  // Divide exp by 2
    }
    return result;
}

// Example: 2^100 mod (10^9+7)
cout << power(2, 100, MOD);
\`\`\`

---

### 5. Modular Multiplicative Inverse

#### What is it?
The modular inverse of A (mod M) is a number X such that: A × X ≡ 1 (mod M).
This lets us perform "division" under modulo: A/B mod M = A × inverse(B) mod M.

**Condition:** Inverse exists only if GCD(A, M) = 1. If M is prime, all numbers 1..M-1 have an inverse.

#### Using Fermat's Little Theorem (when M is prime)
If M is prime: A^(M-1) ≡ 1 (mod M)
Therefore: A^(M-2) ≡ A^(-1) (mod M)

\`\`\`cpp
const long long MOD = 1e9 + 7;

long long power(long long base, long long exp, long long mod) {
    long long result = 1;
    base %= mod;
    while (exp > 0) {
        if (exp & 1) result = result * base % mod;
        base = base * base % mod;
        exp >>= 1;
    }
    return result;
}

long long modInverse(long long a, long long mod) {
    return power(a, mod - 2, mod);
}

// Precompute factorials and inverse factorials (for nCr queries)
const int MAXN = 1e6 + 5;
long long fact[MAXN], inv_fact[MAXN];

void precompute() {
    fact[0] = 1;
    for (int i = 1; i < MAXN; i++)
        fact[i] = fact[i-1] * i % MOD;
    inv_fact[MAXN-1] = modInverse(fact[MAXN-1], MOD);
    for (int i = MAXN-2; i >= 0; i--)
        inv_fact[i] = inv_fact[i+1] * (i+1) % MOD;
}

// nCr in O(1) after precomputation!
long long nCr(int n, int r) {
    if (r < 0 || r > n) return 0;
    return fact[n] % MOD * inv_fact[r] % MOD * inv_fact[n-r] % MOD;
}
\`\`\``
  },

  {
    id: "phase-5",
    title: "Phase 5: Searching & Counting",
    description: "Learn to find answers in massive search spaces and count possibilities.",
    topics: [
      "Binary Search (on range & on answer)",
      "Ternary Search",
      "Introduction to Combinatorics",
      "Permutations & Combinations (nCr, nPr)",
      "Pascal's Triangle Basics"
    ],
    elaborateContent: `## Finding the Invisible
Binary Search is one of the most powerful tools in CP — not just for sorted arrays, but for an entire class of "optimization" problems.

---

### 1. Binary Search — The Complete Guide

#### Classic Binary Search: Find element in sorted array
\`\`\`cpp
// Returns index of target, or -1 if not found
int binarySearch(vector<int>& arr, int target) {
    int low = 0, high = arr.size() - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;  // Avoids integer overflow!
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}
\`\`\`

#### Lower Bound & Upper Bound
\`\`\`cpp
vector<int> v = {1, 3, 3, 5, 5, 5, 7};

// First position where element >= target
auto lb = lower_bound(v.begin(), v.end(), 5);
cout << (lb - v.begin());  // index 3

// First position where element > target
auto ub = upper_bound(v.begin(), v.end(), 5);
cout << (ub - v.begin());  // index 6

// Count of occurrences of 5
cout << (ub - lb);  // 3
\`\`\`

#### Binary Search on Answer — The Powerful Technique
**Use when:** You're asked to find the minimum/maximum value X such that some condition is satisfied.
**Key insight:** If condition holds for X, it also holds for all X > X (or X < X). This monotonic property allows binary search.

\`\`\`cpp
// Classic Problem: Given N cows and M stalls, place cows such that
// minimum distance between any two cows is maximized.
bool canPlace(vector<int>& stalls, int n, int minDist) {
    int count = 1, last = stalls[0];
    for (int i = 1; i < stalls.size(); i++) {
        if (stalls[i] - last >= minDist) {
            count++;
            last = stalls[i];
        }
    }
    return count >= n;
}

int solve(vector<int>& stalls, int n) {
    sort(stalls.begin(), stalls.end());
    int low = 1, high = stalls.back() - stalls[0];
    int ans = 0;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (canPlace(stalls, n, mid)) {
            ans = mid;        // mid works, try larger
            low = mid + 1;
        } else {
            high = mid - 1;   // mid doesn't work, try smaller
        }
    }
    return ans;
}
\`\`\`

---

### 2. Ternary Search — Find Max/Min of Unimodal Function
\`\`\`cpp
// Find minimum of a strictly unimodal function f(x)
double ternarySearch(double lo, double hi) {
    const double eps = 1e-9;
    while (hi - lo > eps) {
        double m1 = lo + (hi - lo) / 3;
        double m2 = hi - (hi - lo) / 3;
        if (f(m1) < f(m2)) hi = m2;  // Minimum is in [lo, m2]
        else lo = m1;                 // Minimum is in [m1, hi]
    }
    return f((lo + hi) / 2);
}
\`\`\`

---

### 3. Combinatorics

#### Permutations — Ordered arrangements
nPr = n! / (n-r)! = number of ways to arrange r items from n

\`\`\`cpp
// How many ways to arrange 3 books from 5?
// 5P3 = 5 × 4 × 3 = 60
long long permutation(int n, int r) {
    long long result = 1;
    for (int i = 0; i < r; i++) result *= (n - i);
    return result;
}
\`\`\`

#### Combinations — Unordered selections
nCr = n! / (r! × (n-r)!) = number of ways to choose r items from n

\`\`\`cpp
// How many ways to choose 3 students from 5?
// 5C3 = 10
long long combination(int n, int r) {
    if (r > n - r) r = n - r;  // Optimization
    long long result = 1;
    for (int i = 0; i < r; i++) {
        result *= (n - i);
        result /= (i + 1);
    }
    return result;
}
\`\`\`

---

### 4. Pascal's Triangle

Pascal's Triangle gives us all combinations (nCr values) precomputed.
- Row N, Column R = C(N, R)
- Each cell = sum of two cells directly above it

\`\`\`cpp
const int MAXN = 1005;
long long C[MAXN][MAXN];  // C[n][r] = nCr

void buildPascal() {
    for (int i = 0; i < MAXN; i++) {
        C[i][0] = 1;
        for (int j = 1; j <= i; j++)
            C[i][j] = C[i-1][j-1] + C[i-1][j];
    }
}

// After building: C[10][3] = 10C3 = 120
\`\`\`

#### Properties used in CP
\`\`\`
C(n, 0) = C(n, n) = 1
C(n, r) = C(n, n-r)         (symmetry)
C(n, r) = C(n-1, r-1) + C(n-1, r)  (Pascal's rule)
Sum of row n = 2^n
\`\`\``
  }
];
