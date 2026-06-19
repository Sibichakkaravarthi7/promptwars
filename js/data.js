/* ============================================================
   MentorAI — Mock Data
   Agents, topics, problems, progress, conversations, resources
   ============================================================ */

const Data = {

  // ── Current User ───────────────────────────────────────────
  user: {
    id: 'user-001',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    plan: 'Pro',
    initials: 'AJ',
    joinedDate: new Date(Date.now() - 45 * 86400000),
    streak: 12,
    totalHours: 48.5,
    problemsSolved: 247,
    conceptsLearned: 34,
    accuracyRate: 78.4,
    proficiencyLevel: 65,
    weeklyGoalHours: 10,
    weeklyHoursDone: 7.2,
    goals: ['Master Python', 'Learn Data Science', 'Build Portfolio'],
    skills: ['Python', 'JavaScript', 'Statistics']
  },

  // ── Agents ─────────────────────────────────────────────────
  agents: [
    {
      id: 'coding',
      name: 'CodeMentor',
      fullName: 'Coding Mentor',
      icon: '💻',
      color: '#3B82F6',
      colorClass: 'coding',
      specialty: 'Python, JavaScript, Java, C++, SQL',
      description: 'Expert coding tutor that explains algorithms, reviews code, and generates practice problems.',
      model: 'GPT-4 Turbo',
      personality: 'Precise, encouraging, detail-oriented',
      greeting: "Hey there! I'm **CodeMentor** 🚀\n\nI'm your personal coding tutor specializing in Python, JavaScript, Java, and more. I can:\n\n- 🔍 **Review and debug** your code\n- 📚 **Explain algorithms** with examples\n- ⚡ **Generate practice problems** tailored to you\n- 🎯 **Suggest optimizations** for cleaner code\n\nWhat would you like to learn today?"
    },
    {
      id: 'math',
      name: 'MathGenius',
      fullName: 'Math Tutor',
      icon: '📐',
      color: '#8B5CF6',
      colorClass: 'math',
      specialty: 'Algebra, Calculus, Statistics, Linear Algebra',
      description: 'Step-by-step math guidance with visual explanations and practice problem generation.',
      model: 'GPT-4 + Wolfram',
      personality: 'Patient, methodical, visual thinker',
      greeting: "Hello! I'm **MathGenius** 📐\n\nYour dedicated math tutor covering everything from basic algebra to advanced calculus. I specialize in:\n\n- 📊 **Step-by-step problem solving**\n- 🧮 **Clear concept explanations**\n- 📈 **Visual graph interpretations**\n- 🎯 **Targeted practice problems**\n\nWhat mathematical concept can I help you master today?"
    },
    {
      id: 'writing',
      name: 'WriteCoach',
      fullName: 'Writing Coach',
      icon: '✍️',
      color: '#10B981',
      colorClass: 'writing',
      specialty: 'Essays, Grammar, Academic Writing, Creative Writing',
      description: 'Professional writing coach that provides detailed feedback on style, structure, and grammar.',
      model: 'GPT-4 + Grammar API',
      personality: 'Constructive, creative, supportive',
      greeting: "Welcome! I'm **WriteCoach** ✍️\n\nYour personal writing mentor here to help elevate your writing to the next level. I can help with:\n\n- 📝 **Grammar & style improvements**\n- 🏗️ **Essay structure & flow**\n- 🎨 **Tone and voice refinement**\n- 📚 **Academic writing standards**\n\nShare your writing and let's make it shine!"
    },
    {
      id: 'datascience',
      name: 'DataSage',
      fullName: 'Data Science Mentor',
      icon: '📊',
      color: '#F97316',
      colorClass: 'datascience',
      specialty: 'pandas, scikit-learn, SQL, Statistics, Visualization',
      description: 'Expert data science tutor covering ML, statistical analysis, and data visualization.',
      model: 'GPT-4 + Jupyter',
      personality: 'Analytical, practical, results-focused',
      greeting: "Hi! I'm **DataSage** 📊\n\nYour expert data science mentor. I'll guide you through the full data science workflow:\n\n- 🐼 **pandas & data manipulation**\n- 🤖 **Machine learning with scikit-learn**\n- 📊 **Data visualization (Plotly, Matplotlib)**\n- 🗄️ **SQL and database querying**\n\nReady to turn data into insights? Let's dive in!"
    },
    {
      id: 'general',
      name: 'AskAI',
      fullName: 'General Knowledge',
      icon: '🧠',
      color: '#06B6D4',
      colorClass: 'general',
      specialty: 'Any subject, concept clarification, study tips',
      description: 'Versatile AI assistant for cross-domain questions, analogies, and general learning support.',
      model: 'GPT-4',
      personality: 'Curious, friendly, broadly knowledgeable',
      greeting: "Hello! I'm **AskAI** 🧠\n\nYour all-around learning companion. No question is too broad or too specific! I can:\n\n- 🌍 **Answer cross-domain questions**\n- 💡 **Provide analogies & examples**\n- 📖 **Clarify confusing concepts**\n- 🗺️ **Suggest learning resources**\n\nWhat's on your mind today? Ask me anything!"
    }
  ],

  // ── Topics Catalog ──────────────────────────────────────────
  topics: [
    // Python
    { id: 't001', name: 'Python Basics',         subject: 'coding',      difficulty: 1, status: 'completed',   progress: 100, hours: 4,   description: 'Variables, data types, operators, and basic I/O.', icon: '🐍', prereqs: [] },
    { id: 't002', name: 'Control Flow',           subject: 'coding',      difficulty: 2, status: 'completed',   progress: 100, hours: 3,   description: 'if/else, loops, break/continue, comprehensions.', icon: '🔀', prereqs: ['t001'] },
    { id: 't003', name: 'Functions & Scope',      subject: 'coding',      difficulty: 3, status: 'completed',   progress: 100, hours: 5,   description: 'Functions, closures, decorators, lambdas.', icon: '⚙️', prereqs: ['t002'] },
    { id: 't004', name: 'Data Structures',        subject: 'coding',      difficulty: 4, status: 'in_progress', progress: 68,  hours: 6,   description: 'Lists, dicts, sets, tuples and when to use them.', icon: '📦', prereqs: ['t003'] },
    { id: 't005', name: 'OOP in Python',          subject: 'coding',      difficulty: 5, status: 'in_progress', progress: 30,  hours: 7,   description: 'Classes, inheritance, polymorphism, magic methods.', icon: '🏗️', prereqs: ['t004'] },
    { id: 't006', name: 'File I/O & Exceptions',  subject: 'coding',      difficulty: 4, status: 'not_started', progress: 0,   hours: 3,   description: 'Reading/writing files, exception handling, context managers.', icon: '📄', prereqs: ['t003'] },
    { id: 't007', name: 'Algorithms & Big-O',     subject: 'coding',      difficulty: 6, status: 'not_started', progress: 0,   hours: 8,   description: 'Time complexity, sorting, searching, recursion.', icon: '🔬', prereqs: ['t004'] },
    { id: 't008', name: 'JavaScript Essentials',  subject: 'coding',      difficulty: 3, status: 'completed',   progress: 100, hours: 5,   description: 'ES6+, DOM, async/await, closures.', icon: '🌐', prereqs: [] },
    { id: 't009', name: 'React Fundamentals',     subject: 'coding',      difficulty: 5, status: 'not_started', progress: 0,   hours: 10,  description: 'Components, state, props, hooks, context.', icon: '⚛️', prereqs: ['t008'] },
    // Math
    { id: 't010', name: 'Linear Algebra',         subject: 'math',        difficulty: 5, status: 'in_progress', progress: 45,  hours: 8,   description: 'Vectors, matrices, eigenvalues, transformations.', icon: '🧮', prereqs: [] },
    { id: 't011', name: 'Statistics Basics',      subject: 'math',        difficulty: 3, status: 'completed',   progress: 100, hours: 6,   description: 'Probability, distributions, hypothesis testing.', icon: '📊', prereqs: [] },
    { id: 't012', name: 'Calculus I',             subject: 'math',        difficulty: 6, status: 'not_started', progress: 0,   hours: 12,  description: 'Limits, derivatives, integrals, chain rule.', icon: '📉', prereqs: [] },
    { id: 't013', name: 'Bayesian Statistics',    subject: 'math',        difficulty: 7, status: 'not_started', progress: 0,   hours: 10,  description: 'Prior/posterior, Bayes theorem, MCMC.', icon: '🎲', prereqs: ['t011'] },
    // Writing
    { id: 't014', name: 'Essay Structure',        subject: 'writing',     difficulty: 2, status: 'completed',   progress: 100, hours: 3,   description: 'Thesis, body paragraphs, conclusion, transitions.', icon: '📝', prereqs: [] },
    { id: 't015', name: 'Academic Writing',       subject: 'writing',     difficulty: 4, status: 'in_progress', progress: 55,  hours: 5,   description: 'Citations, formal tone, argument construction.', icon: '🎓', prereqs: ['t014'] },
    // Data Science
    { id: 't016', name: 'pandas Basics',          subject: 'datascience', difficulty: 3, status: 'completed',   progress: 100, hours: 6,   description: 'DataFrames, series, indexing, groupby, merge.', icon: '🐼', prereqs: ['t003'] },
    { id: 't017', name: 'Data Visualization',     subject: 'datascience', difficulty: 3, status: 'in_progress', progress: 70,  hours: 4,   description: 'Matplotlib, Seaborn, Plotly, chart best practices.', icon: '🎨', prereqs: ['t016'] },
    { id: 't018', name: 'Machine Learning Intro', subject: 'datascience', difficulty: 6, status: 'not_started', progress: 0,   hours: 12,  description: 'Supervised vs unsupervised, regression, classification.', icon: '🤖', prereqs: ['t016', 't010', 't011'] },
    { id: 't019', name: 'SQL for Data Science',   subject: 'datascience', difficulty: 3, status: 'completed',   progress: 100, hours: 5,   description: 'SELECT, JOIN, aggregate functions, window functions.', icon: '🗄️', prereqs: [] },
    { id: 't020', name: 'Deep Learning',          subject: 'datascience', difficulty: 8, status: 'not_started', progress: 0,   hours: 20,  description: 'Neural networks, backprop, CNNs, transformers.', icon: '🧬', prereqs: ['t018'] },
  ],

  // ── Practice Problems ───────────────────────────────────────
  problems: [
    {
      id: 'p001',
      topicId: 't004',
      agentType: 'coding',
      difficulty: 4,
      type: 'debugging',
      title: 'Fix the Dictionary Bug',
      description: 'The following code is supposed to count word frequencies but has a bug. Find and fix it.',
      starterCode: `def count_words(text):
    words = text.split()
    freq = {}
    for word in words:
        if word in freq:
            freq[word] = freq[word]  # Bug here
        else:
            freq[word] = 1
    return freq

# Test
result = count_words("hello world hello python world")
print(result)`,
      expectedOutput: "{'hello': 2, 'world': 2, 'python': 1}",
      hints: [
        'Look carefully at line 6 — what should happen when a word is already in the dictionary?',
        'When we find an existing word, we need to increment its count by 1.',
        'Change `freq[word] = freq[word]` to `freq[word] = freq[word] + 1` or `freq[word] += 1`'
      ],
      tags: ['dictionaries', 'debugging', 'counting']
    },
    {
      id: 'p002',
      topicId: 't004',
      agentType: 'coding',
      difficulty: 3,
      type: 'free_response',
      title: 'Two Sum Problem',
      description: 'Given a list of numbers and a target, return the indices of two numbers that add up to the target.',
      starterCode: `def two_sum(nums, target):
    # Your solution here
    pass

# Test cases
print(two_sum([2, 7, 11, 15], 9))   # Expected: [0, 1]
print(two_sum([3, 2, 4], 6))        # Expected: [1, 2]
print(two_sum([3, 3], 6))           # Expected: [0, 1]`,
      expectedOutput: '[0, 1]\n[1, 2]\n[0, 1]',
      hints: [
        'Think about what data structure lets you look up values in O(1) time.',
        'Use a dictionary to store numbers you have seen and their indices.',
        'For each number, check if (target - number) is already in the dictionary.'
      ],
      tags: ['arrays', 'hash-map', 'interview']
    },
    {
      id: 'p003',
      topicId: 't007',
      agentType: 'coding',
      difficulty: 5,
      type: 'free_response',
      title: 'Implement Binary Search',
      description: 'Implement binary search that returns the index of the target element, or -1 if not found.',
      starterCode: `def binary_search(arr, target):
    # Implement binary search
    # Time complexity should be O(log n)
    pass

# Tests
print(binary_search([1, 3, 5, 7, 9, 11], 7))   # Expected: 3
print(binary_search([1, 3, 5, 7, 9, 11], 4))   # Expected: -1
print(binary_search([2], 2))                    # Expected: 0`,
      expectedOutput: '3\n-1\n0',
      hints: [
        'Maintain left and right pointers that define the search space.',
        'Calculate mid = (left + right) // 2, then compare arr[mid] with target.',
        'Narrow the search: if arr[mid] < target, move left to mid+1; if larger, move right to mid-1.'
      ],
      tags: ['algorithms', 'binary-search', 'interview']
    },
    {
      id: 'p004',
      topicId: 't011',
      agentType: 'math',
      difficulty: 4,
      type: 'free_response',
      title: 'Central Limit Theorem',
      description: 'Explain the Central Limit Theorem and describe when it applies.',
      starterCode: null,
      expectedOutput: null,
      hints: [
        'Think about what happens to the distribution of sample means as sample size grows.',
        'Consider what "regardless of the population distribution" means.',
        'Remember the conditions: samples must be independent and identically distributed.'
      ],
      tags: ['statistics', 'theory', 'probability']
    },
    {
      id: 'p005',
      topicId: 't016',
      agentType: 'datascience',
      difficulty: 3,
      type: 'free_response',
      title: 'DataFrame GroupBy',
      description: 'Using pandas, group the sales data by region and compute the mean revenue.',
      starterCode: `import pandas as pd

data = {
    'region': ['North', 'South', 'North', 'East', 'South', 'East'],
    'revenue': [1200, 950, 1500, 800, 1100, 1300],
    'month': ['Jan', 'Jan', 'Feb', 'Jan', 'Feb', 'Feb']
}
df = pd.DataFrame(data)

# Group by region and calculate mean revenue
# Your code here`,
      expectedOutput: 'region\nEast     1050.0\nNorth    1350.0\nSouth    1025.0',
      hints: [
        'Use df.groupby() to group rows by the region column.',
        'After groupby, select the revenue column and apply .mean().',
        'Full solution: df.groupby("region")["revenue"].mean()'
      ],
      tags: ['pandas', 'groupby', 'aggregation']
    }
  ],

  // ── Conversations History ───────────────────────────────────
  conversations: [
    {
      id: 'conv-001',
      agentId: 'coding',
      title: 'Python List Sorting',
      preview: 'How do I sort a list by a custom key?',
      timestamp: new Date(Date.now() - 2 * 3600000),
      messageCount: 8,
      active: false
    },
    {
      id: 'conv-002',
      agentId: 'coding',
      title: 'Binary Search Implementation',
      preview: 'Walk me through binary search...',
      timestamp: new Date(Date.now() - 86400000),
      messageCount: 12,
      active: false
    },
    {
      id: 'conv-003',
      agentId: 'math',
      title: 'Matrix Multiplication',
      preview: 'Why is matrix multiplication not commutative?',
      timestamp: new Date(Date.now() - 2 * 86400000),
      messageCount: 6,
      active: false
    },
    {
      id: 'conv-004',
      agentId: 'datascience',
      title: 'pandas GroupBy Deep Dive',
      preview: 'Can you explain the groupby transform?',
      timestamp: new Date(Date.now() - 5 * 86400000),
      messageCount: 15,
      active: false
    }
  ],

  // ── Weekly Progress Data ────────────────────────────────────
  weeklyProgress: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    hours: [1.5, 2.0, 0.5, 2.5, 1.0, 0.5, 0.7],
    problems: [5, 8, 2, 10, 4, 3, 2],
    accuracy: [72, 80, 65, 85, 78, 90, 75]
  },

  // ── Monthly Progress (4 weeks) ──────────────────────────────
  monthlyProgress: {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    hours: [8.5, 11.2, 14.8, 14.0],
    problems: [28, 42, 61, 58],
    proficiency: [45, 52, 60, 65]
  },

  // ── Subject Proficiency ─────────────────────────────────────
  subjectProficiency: {
    labels: ['Python', 'JavaScript', 'Math', 'Writing', 'Data Science'],
    values: [72, 58, 48, 65, 61]
  },

  // ── Achievements ────────────────────────────────────────────
  achievements: [
    { id: 'a001', name: 'First Steps',      icon: '🚀', desc: 'Solved your first practice problem',                 earned: true,  earnedAt: new Date(Date.now() - 44*86400000) },
    { id: 'a002', name: 'Week Warrior',     icon: '🔥', desc: 'Maintained a 7-day learning streak',                 earned: true,  earnedAt: new Date(Date.now() - 5*86400000)  },
    { id: 'a003', name: 'Code Ninja',       icon: '⚡', desc: 'Solved 50 coding problems',                          earned: true,  earnedAt: new Date(Date.now() - 10*86400000) },
    { id: 'a004', name: 'Century Club',     icon: '💯', desc: 'Solved 100 practice problems',                       earned: true,  earnedAt: new Date(Date.now() - 3*86400000)  },
    { id: 'a005', name: 'Sharp Shooter',    icon: '🎯', desc: 'Achieved 90%+ accuracy in a session',                earned: true,  earnedAt: new Date(Date.now() - 1*86400000)  },
    { id: 'a006', name: 'Polyglot',         icon: '🌐', desc: 'Practiced in 3+ programming languages',              earned: false, earnedAt: null },
    { id: 'a007', name: 'Data Wizard',      icon: '🧙', desc: 'Completed the Data Science learning path',           earned: false, earnedAt: null },
    { id: 'a008', name: 'Marathon Learner', icon: '🏃', desc: 'Spent 100+ total hours on the platform',             earned: false, earnedAt: null },
    { id: 'a009', name: 'Top Percentile',   icon: '🏆', desc: 'Ranked in top 10% on weekly leaderboard',            earned: false, earnedAt: null },
    { id: 'a010', name: 'Problem Crusher',  icon: '💪', desc: 'Solved 500 problems',                                earned: false, earnedAt: null },
    { id: 'a011', name: 'Night Owl',        icon: '🦉', desc: 'Completed 10 sessions after 10 PM',                  earned: false, earnedAt: null },
    { id: 'a012', name: 'Certified',        icon: '📜', desc: 'Earned your first certificate',                      earned: false, earnedAt: null },
  ],

  // ── Resource Library ────────────────────────────────────────
  resources: [
    { id: 'r001', type: 'video',    title: 'Python for Beginners — Full Course',      subject: 'coding',      difficulty: 1, durationMin: 240, desc: 'Comprehensive Python crash course covering all fundamentals.', icon: '🎬', tags: ['python', 'beginner'], url: '#' },
    { id: 'r002', type: 'article',  title: 'Understanding Big-O Notation',            subject: 'coding',      difficulty: 4, durationMin: 15,  desc: 'Visual guide to time and space complexity with examples.', icon: '📄', tags: ['algorithms', 'complexity'], url: '#' },
    { id: 'r003', type: 'video',    title: 'Neural Networks from Scratch',            subject: 'datascience', difficulty: 7, durationMin: 120, desc: 'Build a neural network using only numpy — no frameworks.', icon: '🎬', tags: ['deep-learning', 'numpy'], url: '#' },
    { id: 'r004', type: 'article',  title: 'pandas GroupBy — The Complete Guide',     subject: 'datascience', difficulty: 3, durationMin: 20,  desc: 'Master groupby operations with real-world dataset examples.', icon: '📄', tags: ['pandas', 'data-wrangling'], url: '#' },
    { id: 'r005', type: 'problem',  title: 'LeetCode Top 50 — Interview Prep',        subject: 'coding',      difficulty: 6, durationMin: null,desc: 'Curated list of must-solve problems for tech interviews.', icon: '🧩', tags: ['interview', 'algorithms'], url: '#' },
    { id: 'r006', type: 'article',  title: 'Bayesian Thinking for Data Scientists',   subject: 'math',        difficulty: 6, durationMin: 25,  desc: 'Practical introduction to Bayesian reasoning and inference.', icon: '📄', tags: ['statistics', 'bayesian'], url: '#' },
    { id: 'r007', type: 'video',    title: 'React Hooks Deep Dive',                   subject: 'coding',      difficulty: 5, durationMin: 90,  desc: 'Master useState, useEffect, useContext, and custom hooks.', icon: '🎬', tags: ['react', 'javascript'], url: '#' },
    { id: 'r008', type: 'template', title: 'Academic Essay Template (APA)',           subject: 'writing',     difficulty: 2, durationMin: null,desc: 'Ready-to-use APA-format essay template with guidelines.', icon: '📋', tags: ['academic', 'apa', 'essay'], url: '#' },
    { id: 'r009', type: 'video',    title: 'SQL Joins Explained Visually',            subject: 'datascience', difficulty: 3, durationMin: 30,  desc: 'Visual walkthrough of INNER, LEFT, RIGHT, and FULL joins.', icon: '🎬', tags: ['sql', 'database'], url: '#' },
    { id: 'r010', type: 'problem',  title: 'Statistics Practice Set — 100 Problems', subject: 'math',        difficulty: 5, durationMin: null,desc: 'Comprehensive statistics exercises from basic to advanced.', icon: '🧩', tags: ['statistics', 'practice'], url: '#' },
    { id: 'r011', type: 'article',  title: 'Git & GitHub — Complete Workflow',        subject: 'coding',      difficulty: 2, durationMin: 18,  desc: 'From git init to pull requests — the complete dev workflow.', icon: '📄', tags: ['git', 'github', 'tools'], url: '#' },
    { id: 'r012', type: 'template', title: 'Python Data Analysis Notebook Template', subject: 'datascience', difficulty: 3, durationMin: null,desc: 'Structured notebook template for EDA and modeling projects.', icon: '📋', tags: ['python', 'template', 'EDA'], url: '#' },
  ],

  // ── Agent Response Templates ────────────────────────────────
  // Used by chat.js to generate context-aware mock responses
  agentResponses: {
    coding: {
      keywords: {
        sort: `Great question! In Python, there are two main ways to sort:

**1. Using \`sorted()\`** (returns a new list):
\`\`\`python
nums = [3, 1, 4, 1, 5, 9, 2, 6]
sorted_nums = sorted(nums)           # [1, 1, 2, 3, 4, 5, 6, 9]
sorted_desc = sorted(nums, reverse=True)  # [9, 6, 5, 4, 3, 2, 1, 1]
\`\`\`

**2. Using \`.sort()\`** (modifies the list in-place):
\`\`\`python
nums.sort()                          # nums is now sorted
nums.sort(reverse=True)              # sorts descending
\`\`\`

**Sorting by a custom key** — very powerful!
\`\`\`python
students = [("Alice", 85), ("Bob", 92), ("Charlie", 78)]
by_grade = sorted(students, key=lambda x: x[1], reverse=True)
# [('Bob', 92), ('Alice', 85), ('Charlie', 78)]
\`\`\`

⚡ **Time Complexity:** Python uses Timsort — O(n log n) average and worst case.

**Practice challenge:** Sort this list of dictionaries by age, then alphabetically by name for ties:
\`\`\`python
people = [
    {"name": "Charlie", "age": 25},
    {"name": "Alice", "age": 30},
    {"name": "Bob", "age": 25}
]
\`\`\``,

        loop: `Let's break down loops in Python! 🔁

**For loops** — iterate over any iterable:
\`\`\`python
# Basic list iteration
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

# With index using enumerate()
for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")

# Range-based
for i in range(1, 11):    # 1 to 10
    print(i)
\`\`\`

**While loops** — run until condition is False:
\`\`\`python
count = 0
while count < 5:
    print(f"Count: {count}")
    count += 1
\`\`\`

**List Comprehensions** — Pythonic one-liners:
\`\`\`python
squares = [x**2 for x in range(10)]
evens   = [x for x in range(20) if x % 2 == 0]
\`\`\`

🎯 **Mini challenge:** Write a comprehension that creates a list of all prime numbers under 50.`,

        function: `Functions are the building blocks of good Python code! ⚙️

**Basic function anatomy:**
\`\`\`python
def greet(name, greeting="Hello"):
    """Docstring: describes the function purpose."""
    return f"{greeting}, {name}!"

print(greet("Alex"))           # Hello, Alex!
print(greet("Sam", "Hi"))      # Hi, Sam!
\`\`\`

**\`*args\` and \`**kwargs\`** for flexible arguments:
\`\`\`python
def sum_all(*args):
    return sum(args)

def print_info(**kwargs):
    for key, val in kwargs.items():
        print(f"{key}: {val}")

sum_all(1, 2, 3, 4, 5)         # 15
print_info(name="Alex", age=25)
\`\`\`

**Lambda functions** — anonymous one-liners:
\`\`\`python
square = lambda x: x ** 2
double = lambda x: x * 2

# Common use with map/filter
squares = list(map(lambda x: x**2, [1, 2, 3, 4]))
\`\`\`

**Decorators** — wrap a function with extra behavior:
\`\`\`python
def timer(func):
    import time
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        print(f"Elapsed: {time.time() - start:.4f}s")
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(1)
\`\`\``,

        class: `Object-Oriented Programming in Python! 🏗️

\`\`\`python
class Animal:
    # Class variable (shared across all instances)
    species_count = 0
    
    def __init__(self, name, sound):
        # Instance variables
        self.name = name
        self.sound = sound
        Animal.species_count += 1
    
    def speak(self):
        return f"{self.name} says {self.sound}!"
    
    def __repr__(self):
        return f"Animal(name={self.name!r})"
    
    def __str__(self):
        return self.name

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name, "Woof")
        self.breed = breed
    
    def fetch(self, item):
        return f"{self.name} fetches the {item}!"

# Usage
rex = Dog("Rex", "Labrador")
print(rex.speak())    # Rex says Woof!
print(rex.fetch("ball"))
print(Dog.species_count)  # 1
\`\`\`

**Key OOP concepts:**
- **Encapsulation:** Bundle data + methods together
- **Inheritance:** Child classes extend parent classes
- **Polymorphism:** Same interface, different behaviors
- **Abstraction:** Hide implementation details`,
      },
      fallback: [
        `That's a great question! Let me explain with a practical example.\n\nIn Python, this concept is fundamental to writing clean, efficient code. Here's how it works:\n\n\`\`\`python\n# Example demonstrating the concept\ndef example_function(data):\n    """A well-documented function."""\n    result = []\n    for item in data:\n        if item:  # Process valid items\n            result.append(process(item))\n    return result\n\`\`\`\n\nThe key insight here is that **clarity** and **efficiency** often go hand in hand in Python.\n\n🎯 **Try this exercise:** Modify the function above to handle edge cases like empty lists and None values.`,
        `Excellent question! This is something many developers struggle with at first.\n\nLet me break it down step by step:\n\n**Step 1:** Understand the problem\n**Step 2:** Plan your approach (pseudocode helps!)\n**Step 3:** Implement incrementally\n**Step 4:** Test with edge cases\n\n\`\`\`python\n# Always start with a clear structure\ndef solve_problem(input_data):\n    # Handle edge cases first\n    if not input_data:\n        return None\n    \n    # Core logic\n    result = process(input_data)\n    return result\n\`\`\`\n\nWould you like me to generate a practice problem on this topic? 🎯`,
      ]
    },
    math: {
      fallback: [
        `Great question! Let me walk you through this step-by-step. 📐\n\n**Setting up the problem:**\nWhen approaching this type of problem, we first identify what we know and what we're solving for.\n\n**Key formula:**\n> *f(x) = ax² + bx + c*\n\n**Step 1:** Identify the coefficients: a = 2, b = -3, c = 1\n**Step 2:** Apply the quadratic formula:\nx = (-b ± √(b² - 4ac)) / 2a\n\n**Step 3:** Calculate the discriminant:\nΔ = b² - 4ac = 9 - 8 = 1\n\n**Step 4:** Solve:\nx₁ = (3 + 1) / 4 = **1**\nx₂ = (3 - 1) / 4 = **0.5**\n\n✅ **Verify:** Substitute back to check your answer!\n\n🎯 **Practice Problem:** Solve 3x² + 7x - 2 = 0 using the same method.`,
        `Excellent! This is a core mathematical concept that underpins much of data science and ML. Let me explain with clarity.\n\n**The Intuition:**\nThink of it as finding the most "balanced" representation of your data.\n\n**Mathematical Definition:**\nFor a dataset X = {x₁, x₂, ..., xₙ}:\n- Mean: μ = (1/n) Σxᵢ\n- Variance: σ² = (1/n) Σ(xᵢ - μ)²\n- Standard Deviation: σ = √σ²\n\n**Why it matters:**\n- Low σ → data points cluster near the mean\n- High σ → data points are spread out\n\n📊 **Real world example:** Exam scores with μ=75, σ=5 vs μ=75, σ=25 — very different distributions!\n\n🎯 **Calculate:** Find the mean and variance of [4, 8, 12, 16, 20].`
      ]
    },
    writing: {
      fallback: [
        `I'd be happy to help you improve this! ✍️\n\nHere's my detailed feedback:\n\n**Structure (8/10) ✅**\nYour introduction is strong — the thesis is clear and well-positioned. The body paragraphs flow logically.\n\n**Style Suggestions:**\n1. **Vary sentence length** — mix short punchy sentences with longer, flowing ones\n2. **Avoid passive voice** — "The study was conducted by..." → "Researchers conducted..."\n3. **Strengthen transitions** — "Furthermore" and "Moreover" are overused; try "Building on this," or "This reveals that"\n\n**Grammar fixes:**\n- Line 3: "effect" should be "affect" (verb usage)\n- Line 7: Missing comma after introductory clause\n\n**Tone:** Appropriately formal for academic context. Well done! 🎯\n\n**Readability Score:** 72/100 (Good — target 75+)\n\nWould you like me to rewrite a paragraph to demonstrate these suggestions?`,
      ]
    },
    datascience: {
      fallback: [
        `Excellent question! Let's dive into this data science concept. 📊\n\n\`\`\`python\nimport pandas as pd\nimport numpy as np\n\n# Load and explore data\ndf = pd.read_csv('data.csv')\nprint(df.info())       # Data types & nulls\nprint(df.describe())   # Statistical summary\nprint(df.head())\n\n# Handle missing values\ndf['age'].fillna(df['age'].median(), inplace=True)\ndf.dropna(subset=['target'], inplace=True)\n\n# Feature engineering\ndf['age_group'] = pd.cut(df['age'], bins=[0,25,45,65,100], \n                         labels=['young','adult','senior','elder'])\n\`\`\`\n\n**Key insight:** Always explore your data before modeling. Missing values, outliers, and data types can silently break your pipeline.\n\n🎯 **Next step:** Try running \`df.corr()\` to see which features correlate with your target variable.`,
      ]
    },
    general: {
      fallback: [
        `That's a fascinating question! Let me give you a comprehensive answer. 🧠\n\nThe concept you're asking about connects to several important ideas across fields:\n\n**The Core Idea:**\nAt its heart, this is about understanding how systems work and why they behave the way they do.\n\n**Real-world Analogy:**\nThink of it like a GPS navigation system. It doesn't know the "best" route — it calculates optimal paths based on rules (shortest time, avoid tolls, etc.) and updates as conditions change. Similarly, the concept you're asking about operates on rules and feedback.\n\n**Key Takeaways:**\n1. Understanding the **fundamentals** beats memorizing specifics\n2. **Context matters** — the same concept behaves differently in different domains\n3. **Practice** is the fastest path to mastery\n\n📚 **Recommended Resources:**\n- Book: *Thinking, Fast and Slow* by Daniel Kahneman\n- Article: Search "mental models farnam street"\n- YouTube: 3Blue1Brown for visual mathematical explanations\n\nWould you like me to go deeper on any aspect of this?`,
      ]
    }
  },

  // Helper to get agent by id
  getAgent(id) { return this.agents.find(a => a.id === id); },
  getTopic(id) { return this.topics.find(t => t.id === id); },
  getTopicsBySubject(subject) { return this.topics.filter(t => t.subject === subject); },
  getEarnedAchievements() { return this.achievements.filter(a => a.earned); },
  getLocked() { return this.achievements.filter(a => !a.earned); },
};

window.Data = Data;
