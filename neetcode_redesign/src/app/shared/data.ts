// Shared data for all homepage variations
export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface ProblemPreview {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  acceptance: number;
}

export interface InterviewQuestionPreview {
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "NeetCode's roadmap completely changed how I approach interview prep. Went from random grinding to structured learning.",
    name: 'Sarah Chen',
    role: 'Software Engineer',
    company: 'Google',
    avatar: 'assets/testimonials/testimonial1.png',
  },
  {
    quote: "The pattern-based approach is genius. After learning the patterns, I could solve new problems I'd never seen before.",
    name: 'Marcus Johnson',
    role: 'Senior SDE',
    company: 'Amazon',
    avatar: 'assets/testimonials/testimonial2.png',
  },
  {
    quote: "Best investment I made for my career. Got offers from 3 FAANG companies after using NeetCode for 2 months.",
    name: 'Priya Patel',
    role: 'Software Engineer',
    company: 'Meta',
    avatar: 'assets/testimonials/testimonial3.png',
  },
  {
    quote: "The video explanations are incredibly clear. NeetCode breaks down complex algorithms in a way that actually sticks.",
    name: 'David Kim',
    role: 'Backend Engineer',
    company: 'Microsoft',
    avatar: 'assets/testimonials/testimonial4.png',
  },
  {
    quote: "I tried LeetCode for months with no structure. NeetCode gave me a clear path and I landed my dream job in 8 weeks.",
    name: 'Emily Torres',
    role: 'Full Stack Developer',
    company: 'Apple',
    avatar: 'assets/testimonials/testimonial5.png',
  },
  {
    quote: "The NeetCode 150 is the perfect curated list. No fluff, just the problems that matter for real interviews.",
    name: 'Alex Rivera',
    role: 'ML Engineer',
    company: 'Netflix',
    avatar: 'assets/testimonials/testimonial6.png',
  },
];

export const STATS: Stat[] = [
  { value: 500, suffix: 'K+', label: 'Engineers Learning' },
  { value: 10, suffix: 'M+', label: 'Problems Solved' },
  { value: 150, suffix: '+', label: 'Curated Problems' },
  { value: 49, suffix: '/5', label: 'Average Rating' },
];

export const FEATURES: Feature[] = [
  {
    icon: '🗺️',
    title: 'Structured Roadmaps',
    description: 'Follow a visual roadmap that guides you through topics in the optimal order. No more wondering what to study next.',
  },
  {
    icon: '🧩',
    title: 'Pattern-Based Learning',
    description: 'Learn the 15 core coding patterns that cover 90% of interview questions. Solve new problems by recognizing patterns.',
  },
  {
    icon: '🎥',
    title: 'Video Explanations',
    description: 'Every problem has a detailed video walkthrough explaining the intuition, approach, and optimal solution step-by-step.',
  },
  {
    icon: '📊',
    title: 'Progress Tracking',
    description: 'Track your completion across problem sets. See your strengths and weaknesses at a glance with detailed analytics.',
  },
  {
    icon: '🏆',
    title: 'Curated Problem Sets',
    description: 'NeetCode 150 and Blind 75 — hand-picked problems that cover every pattern asked at top tech companies.',
  },
  {
    icon: '💻',
    title: 'Built-in Code Editor',
    description: 'Write and test your solutions directly in the browser with syntax highlighting and multiple language support.',
  },
];

export const HOW_IT_WORKS: Feature[] = [
  {
    icon: '1',
    title: 'Pick Your Roadmap',
    description: 'Choose from NeetCode 150, Blind 75, or topic-based paths tailored to your level and timeline.',
  },
  {
    icon: '2',
    title: 'Learn the Patterns',
    description: 'Watch video explanations that teach you the underlying patterns — not just memorized solutions.',
  },
  {
    icon: '3',
    title: 'Solve with Confidence',
    description: 'Apply patterns to new problems. Track progress and build the muscle memory that crushes real interviews.',
  },
];

export const PROBLEM_PREVIEWS: ProblemPreview[] = [
  { id: 1, title: 'Two Sum', difficulty: 'Easy', category: 'Arrays & Hashing', acceptance: 82 },
  { id: 2, title: 'Valid Anagram', difficulty: 'Easy', category: 'Arrays & Hashing', acceptance: 78 },
  { id: 3, title: 'Longest Substring Without Repeating', difficulty: 'Medium', category: 'Sliding Window', acceptance: 64 },
  { id: 4, title: 'Container With Most Water', difficulty: 'Medium', category: 'Two Pointers', acceptance: 59 },
  { id: 5, title: 'Merge K Sorted Lists', difficulty: 'Hard', category: 'Linked List', acceptance: 41 },
  { id: 6, title: 'Binary Tree Maximum Path Sum', difficulty: 'Hard', category: 'Trees', acceptance: 38 },
];

export const INTERVIEW_QUESTION_PREVIEWS: InterviewQuestionPreview[] = [
  { title: 'Design LeetCode', difficulty: 'Easy' },
  { title: 'Design URL Shortener', difficulty: 'Easy' },
  { title: 'Design Webhook', difficulty: 'Easy' },
  { title: 'Design Google Docs', difficulty: 'Medium' },
  { title: 'Design Spotify Top K Songs', difficulty: 'Hard' },
  { title: 'Design Yelp', difficulty: 'Easy' },
  { title: 'Design Rate Limiter', difficulty: 'Easy' },
  { title: 'Design Pastebin', difficulty: 'Easy' },
  { title: 'Design Realtime Monitoring System', difficulty: 'Easy' },
  { title: 'Design Typeahead System', difficulty: 'Easy' },
  { title: 'Design a Comment System', difficulty: 'Medium' },
];

export const COMPANIES = ['Google', 'Meta', 'Amazon', 'Apple', 'Microsoft', 'Netflix'];

export const ROADMAP_TOPICS = [
  { name: 'Arrays & Hashing', count: 9, progress: 78 },
  { name: 'Two Pointers', count: 5, progress: 60 },
  { name: 'Sliding Window', count: 6, progress: 33 },
  { name: 'Stack', count: 7, progress: 86 },
  { name: 'Binary Search', count: 7, progress: 43 },
  { name: 'Linked List', count: 11, progress: 55 },
  { name: 'Trees', count: 15, progress: 27 },
  { name: 'Graphs', count: 13, progress: 15 },
  { name: 'Dynamic Programming', count: 12, progress: 8 },
  { name: 'Backtracking', count: 9, progress: 44 },
];
