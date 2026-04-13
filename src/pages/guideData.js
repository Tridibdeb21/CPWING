export const guideData = [
  {
    id: "what-is-cp",
    title: "1. What is Competitive Programming?",
    summary: "A mental sport where you solve logical puzzles using programming under strict time limits.",
    content: `Think of **Competitive Programming (CP)** as a mental sport or a high-speed puzzle-solving competition. Instead of running on a track or scoring goals on a field, your brain acts as the muscle, and your programming language acts as your athletic gear.\n\nIn standard Competitive Programming, you are presented with a series of logical, mathematical, or algorithmic problems. Your ultimate goal is to write a computer program that solves these problems as quickly as possible.\n\n### The Core Elements of CP\n\n### 1. A Race against Time\nYour program isn't just checked for correct answers; it is strictly timed. If it takes longer than 1 or 2 seconds to run, you will fail the test.\n\n### 2. Invisible Test Cases\nYou are given 2 or 3 sample tests to check your logic. But when you submit your code, the server will test it against 100+ hidden test cases. If your code fails even one hidden test, it is considered wrong!\n\n### 3. Global Leaderboards\nYou compete globally against other programmers. Finishing faster gives you a higher rank.\n\n### 4. The Dopamine Rush\nFinding the exact right logic and seeing the green "Accepted" text appear on your screen after struggling for hours is an incredibly rewarding feeling.`
  },
  {
    id: "problems-and-algorithms",
    title: "2. Problems and Algorithms",
    summary: "Understand the core concepts of CP: mathematical problems and the smart algorithms that solve them instantly.",
    content: `When we talk about Competitive Programming, the two words you will hear the absolute most are **Problems** and **Algorithms**. They are the bread and butter of everything you will do.\n\n### What really is a Problem?\nA problem is simply a specific logical task that needs to be automated. \nFor example: *"You are given a list of 1,000 numbers. Find if there are two numbers inside the list that sum up to exactly 100."*\n\n### What is an Algorithm?\nAn algorithm is your step-by-step recipe to solve that problem. Let's say you want to bake a cake; the algorithm is the list of instructions (mix flour, add eggs, bake for 30 minutes). \n\nIn programming, an algorithm determines exactly how your computer calculates the answer. \n\n### A Bad Algorithm\nMight check every single number against every other number one by one. If you have a million numbers, this will take the computer hours to finish. You will fail the time limit.\n\n### A Good Algorithm\nMight sort the numbers first, or use a clever trick to find the answer almost instantly. This is what CP teaches you.`
  },
  {
    id: "whats-in-a-problem",
    title: "3. What's in a Problem?",
    summary: "Learn how to read a standard CP problem, including Constraints, Samples, and the Input Description.",
    content: `Every competitive programming task is structured in a clear, predictable way across all platforms (like Codeforces or CSES). When you open up a problem, you will always see these exact sections:\n\n### 1. Problem Statement\nThis is the story or the context. It explains what you need to achieve. Sometimes it's a real-world scenario (like "Alice and Bob are playing a game with stones"), and sometimes it's pure mathematics.\n\n### 2. Input Description\nTells you exactly how the computer will feed data into your program. For example, "The first line contains a number N. The next line contains N numbers separated by spaces."\n\n### 3. Output Description\nTells you exactly what your program must print out. If it says "Print Yes or No", you cannot print "YES" or "yes". It must be exact.\n\n### 4. Constraints\n**This is the most critical part.** It tells you how big the numbers can get. For example, it might say N can be up to 100,000. This dictates how efficient your algorithm needs to be.\n\n### 5. Sample Cases\nA few basic examples of input and expected output so you can run your code and test if you understood the problem statement correctly.`
  },
  {
    id: "how-to-solve",
    title: "4. How to Solve a Problem",
    summary: "Discover the step-by-step process used by experts to tackle an algorithmic problem without getting stuck.",
    content: `Beginners often make the huge mistake of immediately opening their code editor and typing. Do not do this! Follow this proven step-by-step process used by experts:\n\n### 1. Read Slowly and Carefully\nRead the problem twice. Missed details (like "numbers can be negative" or "the array is sorted") lead to hours of frustration.\n\n### 2. Look at Constraints\nLook at the maximum limits. If the limit is very small (like 100), a simple slow solution might work! If it's huge (like 1,000,000), you need to think of a clever mathematical trick or an advanced algorithm.\n\n### 3. Think with Pen and Paper\nGrab a pen and paper. Draw out the sample cases. Try to manually solve the problem for small numbers by hand. Often, writing it down reveals a hidden pattern that you would never see staring at a screen.\n\n### 4. Write the Code\nOnce you are 100% sure your logic works on paper, translate it into code. Keep your code clean, use good variable names, and take it one step at a time.\n\n### 5. Test Edge Cases (Crucial Step)\nWhat if the input is 0? What if the array is entirely empty? What if all the numbers are negative? Test these weird "edge cases" manually before hitting the submit button!`
  },
  {
    id: "why-start",
    title: "5. Why Should I Start?",
    summary: "Discover the immense benefits of CP, from god-tier logic building to cracking interviews at Big Tech companies.",
    content: `Why put yourself through the trouble of solving hard puzzles in your free time? The benefits are life-changing for a software engineering career:\n\n### 1. God-Tier Problem Solving\nYou train your brain to break down massively complex situations into small, manageable logical steps. Regular programming will start to feel incredibly easy.\n\n### 2. Master a Coding Language\nYou will become incredibly fluent in your chosen language. You will know exactly how memory works, how fast certain functions run, and how to write bug-free code quickly.\n\n### 3. Crack Big Tech Interviews\nTop companies like Google, Microsoft, Meta, and Amazon base their hiring interviews entirely on Data Structures and Algorithms. The problems they ask in interviews are basically easy/medium Competitive Programming problems. CP makes these interviews feel like a walk in the park.\n\n### 4. The Community\nYou join a massive global community of smart, helpful students and professionals.\n\n### 5. Deep Satisfaction\nThere is no feeling quite like solving a problem you have been stuck on for three hours. It releases a massive rush of dopamine!`
  },
  {
    id: "progress",
    title: "6. What Progress is Really Like",
    summary: "Understand the reality of learning CP. Learn about the 'Click' moment and why consistency beats intensity.",
    content: `If you are starting out, you absolutely need to know this: **Progress in CP is widely misunderstood. It is not a straight line.**\n\n### 1. The Reality of the Struggle\nYou will spend hours, maybe days, stuck on a seemingly simple problem. You will look at other people solving it in 5 minutes and you will feel completely dumb. This is normal. Literally everyone, even the highest-ranked grandmasters, felt this way at the start.\n\n### 2. The "Click" Moment\nSuddenly, after practicing consistently for a few weeks, concepts will randomly start to make sense. Your brain will physically rewire itself to recognize patterns. A problem that used to take you 3 days will suddenly take you 30 minutes.\n\n### 3. Consistency over Intensity\nSolving 1 or 2 problems every single day is infinitely superior to solving 15 problems on a Sunday and doing nothing the rest of the week. \n\n### 4. Never Compare\nDo not compare your early learning phase to someone else's expert tier. Just focus on being slightly better than you were yesterday.`
  },
  {
    id: "language",
    title: "7. Which Language should I use?",
    summary: "Why C++ is the undisputed king of Competitive Programming, offering massive speed and powerful tools.",
    content: `While you *can* use Python, Java, or Javascript, **C++** is universally considered the undisputed king of Competitive Programming. We highly recommend starting your journey with C++.\n\n### Why is C++ the best for CP?\n\n### 1. Blazing Fast Speed\nC++ is a compiled language that sits very close to the hardware. It runs astronomically faster than Python. In a sport where execution time is strictly measured in milliseconds, C++ gives you a massive advantage.\n\n### 2. The STL (Standard Template Library)\nC++ comes with pre-built data structures (like vectors, sets, maps, queues) and incredibly fast built-in algorithms (like sorting or searching). You won't have to reinvent the wheel every time.\n\n### 3. The Massive Ecosystem\n95% of Competitive Programming tutorials, video guides, editorials, and community discussions are heavily based on C++. Getting help is significantly easier.`
  },
  {
    id: "where-to-write",
    title: "8. Where to Write Codes?",
    summary: "Set up your environment fast. Recommendations for VS Code, old IDEs, and running code straight in your browser.",
    content: `You need a place to write your code and test it. This software is called an IDE (Integrated Development Environment).\n\n### Best Choices for Beginners:\n\n### 1. Visual Studio Code (VS Code)\nThis is currently the modern standard. It is lightweight, looks extremely beautiful, and has thousands of extensions. You can install extensions to automatically run C++ code with one click.\n\n### 2. Code::Blocks\nThis is a very old and somewhat ugly software, but it is incredibly robust. Many universities still use this in their official lab exams and local competitions.\n\n### 3. Online Compilers\nUse websites like Ideone.com, OnlineGDB, or the CSES IDE to code directly inside your web browser. Perfect for coding from a tablet, phone, or public computer.`
  },
  {
    id: "what-is-contest",
    title: "9. What is a Contest?",
    summary: "What happens when the timer starts? Time limits, difficulty ramps, and avoiding painful penalties.",
    content: `A contest is the ultimate arena where you put your skills to the test against other humans!\n\n### 1. The Setup\nA contest is a time-bound event. You usually have 2 to 3 hours for individual contests, or 5 hours for team contests. \n\n### 2. The Problems\nYou are given a set of problems (usually 5 to 10). Problem A is usually very easy. The difficulty ramps up drastically until the final problem, which might only be solved by a few people in the world.\n\n### 3. The Leaderboard\nA live scoreboard tracks everyone. You get ranked based on how many problems you successfully solved. Ties are broken by who finished faster.\n\n### 4. Penalties\nIf you submit a wrong answer, time penalties are added to your final score. You can't just spam guesses. You must be completely confident!`
  },
  {
    id: "platforms",
    title: "10. CP Platforms",
    summary: "A breakdown of Codeforces, AtCoder, CSES, and where exactly you should go to practice.",
    content: `Where do you actually go to solve problems? There are specific websites known as "Online Judges" designed entirely for practicing and hosting competitions.\n\n### 1. [Codeforces](https://codeforces.com/)\nThe undisputed global hub of CP. They hold 2-hour contests almost every single week. The ranking system is highly respected and competitive.\n\n### 2. [AtCoder](https://atcoder.jp/)\nA Japanese platform known for having the highest quality, purely mathematical and logical problems. Their beginner contests are fantastic for practice.\n\n### 3. [CSES Problem Set](https://cses.fi/problemset/)\nA permanent list of 300 heavily curated standard problems. It's considered the holy grail checklist for learning new algorithms step-by-step.\n\n### 4. [LeetCode](https://leetcode.com/)\nNot traditionally "Competitive Programming", but it is the go-to platform for corporate tech-interview preparation.`
  },
  {
    id: "verdicts",
    title: "11. All Verdicts (CE, TLE, etc.)",
    summary: "What do AC, WA, and TLE actually mean? How to read the errors returned by the system.",
    content: `When you submit your code, the platform tests it against hundreds of hidden test cases. It then responds with a "Verdict" acronym.\n\n### The Good Statuses\n\n### AC (Accepted)\nPerfect! Your code gave the exactly correct answer within the required time limits and memory limits. Celebrate!\n\n### The Common Errors\n\n### WA (Wrong Answer)\nYour program printed the wrong output for a hidden test case. Your logic has a flaw or a bug.\n\n### TLE (Time Limit Exceeded)\nYour code is too slow. If a problem allows 1 second, and your code takes 1.1 seconds, you get a TLE. You need a faster algorithm.\n\n### MLE (Memory Limit Exceeded)\nYou used way too much RAM (for example, creating a gigantic array that exceeds the server's limit).\n\n### RE (Runtime Error)\nYour program crashed violently! This is usually caused by accessing an array out of its bounds or dividing by zero.\n\n### CE (Compilation Error)\nYour code has a syntax error (like a missing semicolon). It couldn't even start running.`
  },
  {
    id: "iupc-icpc",
    title: "12. IUPC & ICPC",
    summary: "Understand the massive prestige behind these physical, national and global team tournaments.",
    content: `While solving problems online alone is incredibly fun, university-level programming contests are played in physical teams and carry massive prestige.\n\n### 1. IUPC (Inter-University Programming Contest)\nThese are national-level physical contests hosted inside a university campus. Your university sends a team of 3 members. The catch? The team is given only **one single computer**.\n\n### 2. ICPC (International Collegiate Programming Contest)\nThe granddaddy of them all. The "Olympics" of programming. Over 50,000 students worldwide from thousands of universities compete in regional stages to reach the World Finals.`
  },
  {
    id: "common-mistakes",
    title: "13. Common Mistakes & How to Avoid",
    summary: "Theoretical traps and journey-level mistakes that slow down your progress more than any code bug.",
    content: `Beginners often focus only on coding bugs, but the biggest hurdles in Competitive Programming are actually strategic. Here are the most common theoretical mistakes made during the CP journey and how to steer clear of them:

### 1. The "Advanced Topic" Rush
   * **The Mistake**: Many beginners want to learn fancy algorithms like Segment Trees or Centroid Decomposition within their first month. Skipping basic implementation, greedy logic, and sorting leads to a weak foundation that collapses as soon as a problem requires "thinking" instead of "applying a template."
   * **Avoid it**: Master the basics first. Solve 100+ problems that only require loops, arrays, and basic strings before moving to advanced data structures. Use the "ladder" approach—master Level 1 before looking at Level 5.

### 2. The "Solution Staring" Trap
   * **The Mistake**: Thinking for 5 minutes, getting bored, and immediately opening the "Editorial" or a friend's solution. This prevents your brain from building the "struggle muscle" required to find your own paths and debug your own logic.
   * **Avoid it**: Give yourself at least **45 to 60 minutes** of honest, pen-and-paper thinking time. Try different approaches. If you must look at an editorial, only read the first hint, then try to code the rest yourself.

### 3. The "Easy-Problem" Loop
   * **The Mistake**: Solving hundreds of problems that you already find easy (The Comfort Zone). While this feels great for your ego and gives you a dopamine rush of "Accepted" verdicts, it doesn't actually improve your skill.
   * **Avoid it**: Follow the **Problem+1 Rule**. Always try to solve problems that are just slightly higher than your current rating (e.g., if you are 1000 rated, practice 1100-1200 rated problems). If you aren't struggling, you aren't growing.

### 4. Ignoring Mathematical Foundations
   * **The Mistake**: Treating CP as purely a "coding" contest and ignoring Discrete Mathematics. In higher-level contests, 70% of problems are actually "Math problems in disguise."
   * **Avoid it**: Dedicate specific days to learning Number Theory, Combinatorics, and Probability. Understanding the properties of primes or modular arithmetic will solve problems that code alone cannot touch.

### 5. Rating-Focused Practice
   * **The Mistake**: Obsessing over your Codeforces color (Newbie, Pupil, etc.) and being too afraid to participate in contests because you might lose rating.
   * **Avoid it**: Treat rating as a **byproduct**, not the goal. If your rating drops, it simply highlights a gap in your knowledge. Use contests as "simulated pressure practice" to identify where you need to improve.

### 6. The "Passive Learning" Illusion
   * **The Mistake**: Watching dozens of YouTube tutorials but never opening your code editor. Watching someone else solve a problem creates a "fake" sense of knowledge.
   * **Avoid it**: CP is a hands-on sport. For every 1 hour you spend watching a tutorial or reading a blog, you must spend at least **3 hours implementation** the concepts by yourself. Your fingers need the practice just as much as your brain.

### 7. The Copy-Paste Culture
   * **The Mistake**: Finding a snippet online or using an AI to get a "Green Verdict" without being able to explain every single line of that code.
   * **Avoid it**: If you use an external idea, **delete the code and rewrite it from scratch** in your own style. If you can't reproduce the logic on a clean screen, you haven't actually learned the concept. Remember: in physical contests like ICPC, you have no internet.

### 8. Inconsistency (The Burnout Cycle)
   * **The Mistake**: Grinding CP for 18 hours a day for one week, then disappearing for an entire month. Logical patterns fade quickly if they aren't used regularly.
   * **Avoid it**: Aim for **consistency over intensity**. Solving 1 challenging problem Every. Single. Day. is infinitely more powerful than solving 10 easy problems once a month. Make CP a daily habit, even if just for an hour.`
  }
];
