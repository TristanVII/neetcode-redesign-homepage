export type ThemeMode = 'dark' | 'light';

export interface Course {
  title: string;
  description: string;
  lessons: number;
  hours: number;
  badge: string;
  badgeColor: 'green' | 'purple';
  image: string;
}

export interface FooterColumn {
  title: string;
  links: string[];
}

export interface CompanyLogo {
  name: string;
  src: string;
}

export interface GraphNodeModel {
  id: string;
  label: string;
  data: { progress: number; count: number };
  dimension: { width: number; height: number };
}

export interface GraphLinkModel {
  source: string;
  target: string;
}

export const NAV_LINKS = ['Problems', 'Roadmap', 'Courses', 'Pricing'];

export const GRAPH_LAYOUT_SETTINGS = {
  orientation: 'TB',
  rankPadding: 100,
  nodePadding: 50,
  edgePadding: 30,
  rankDir: 'TB',
  align: 'UL',
  ranksep: 90,
  nodesep: 50,
  multigraph: true,
  compound: true,
};

export const GRAPH_NODES: GraphNodeModel[] = [
  { id: 'arrays', label: 'Arrays & Hashing', data: { progress: 78, count: 9 }, dimension: { width: 240, height: 50 } },
  { id: 'two-pointers', label: 'Two Pointers', data: { progress: 60, count: 5 }, dimension: { width: 210, height: 50 } },
  { id: 'sliding-window', label: 'Sliding Window', data: { progress: 33, count: 6 }, dimension: { width: 220, height: 50 } },
  { id: 'stack', label: 'Stack', data: { progress: 86, count: 7 }, dimension: { width: 160, height: 50 } },
  { id: 'binary-search', label: 'Binary Search', data: { progress: 43, count: 7 }, dimension: { width: 210, height: 50 } },
  { id: 'linked-list', label: 'Linked List', data: { progress: 100, count: 11 }, dimension: { width: 200, height: 50 } },
  { id: 'trees', label: 'Trees', data: { progress: 25, count: 15 }, dimension: { width: 160, height: 50 } },
  { id: 'heap', label: 'Heap / Priority Q', data: { progress: 0, count: 7 }, dimension: { width: 240, height: 50 } },
  { id: 'backtracking', label: 'Backtracking', data: { progress: 14, count: 9 }, dimension: { width: 210, height: 50 } },
  { id: 'graphs', label: 'Graphs', data: { progress: 0, count: 13 }, dimension: { width: 170, height: 50 } },
  { id: 'dp', label: 'Dynamic Programming', data: { progress: 10, count: 12 }, dimension: { width: 270, height: 50 } },
  { id: 'greedy', label: 'Greedy', data: { progress: 0, count: 8 }, dimension: { width: 170, height: 50 } },
];

export const GRAPH_LINKS: GraphLinkModel[] = [
  { source: 'arrays', target: 'two-pointers' },
  { source: 'arrays', target: 'stack' },
  { source: 'arrays', target: 'sliding-window' },
  { source: 'two-pointers', target: 'binary-search' },
  { source: 'two-pointers', target: 'linked-list' },
  { source: 'sliding-window', target: 'binary-search' },
  { source: 'stack', target: 'binary-search' },
  { source: 'linked-list', target: 'trees' },
  { source: 'binary-search', target: 'trees' },
  { source: 'binary-search', target: 'heap' },
  { source: 'trees', target: 'backtracking' },
  { source: 'trees', target: 'graphs' },
  { source: 'heap', target: 'backtracking' },
  { source: 'backtracking', target: 'dp' },
  { source: 'graphs', target: 'dp' },
  { source: 'dp', target: 'greedy' },
  { source: 'graphs', target: 'greedy' },
];

export const COMPANY_LOGOS: CompanyLogo[] = [
  { name: 'Google', src: 'assets/logos/google.svg' },
  { name: 'Meta', src: 'assets/logos/meta.svg' },
  { name: 'Amazon', src: 'assets/logos/amazon.svg' },
  { name: 'Apple', src: 'assets/logos/apple.svg' },
  { name: 'Microsoft', src: 'assets/logos/microsoft.svg' },
  { name: 'Netflix', src: 'assets/logos/netflix.svg' },
];

export const FOOTER_COLUMNS: FooterColumn[] = [
  { title: 'Product', links: ['Roadmap', 'NeetCode 150', 'Blind 75', 'Courses'] },
  { title: 'Resources', links: ['Blog', 'YouTube', 'Discord', 'FAQ'] },
  { title: 'Company', links: ['About', 'Careers', 'Privacy', 'Terms'] },
];

export const COURSES: Course[] = [
  { title: 'Algorithms & Data Structures for Beginners', description: 'Learn the foundations with animated visualizations and step-by-step explanations.', lessons: 46, hours: 14, badge: 'Free', badgeColor: 'green', image: 'assets/courses/algo_and_datastructures.png' },
  { title: 'Advanced Algorithms', description: 'Master advanced topics like dynamic programming, graphs, and greedy algorithms.', lessons: 38, hours: 12, badge: 'Pro', badgeColor: 'purple', image: 'assets/courses/Advanced_algos.png' },
  { title: 'System Design for Beginners', description: 'Learn to design scalable systems — databases, caching, load balancing, and more.', lessons: 22, hours: 8, badge: 'Free', badgeColor: 'green', image: 'assets/courses/system_design_for_beginers.png' },
  { title: 'System Design Interview', description: 'Practice real system design interview questions asked at top tech companies.', lessons: 28, hours: 10, badge: 'Pro', badgeColor: 'purple', image: 'assets/courses/system_design_interview.png' },
  { title: 'Full Stack Development', description: 'Build a complete full stack app with Next.js, TypeScript, PostgreSQL, and deployment.', lessons: 34, hours: 16, badge: 'Pro', badgeColor: 'purple', image: 'assets/courses/full_stack_dev.png' },
  { title: 'Object Oriented Design Interview', description: 'Practice OOP design interview questions asked at top tech companies.', lessons: 18, hours: 6, badge: 'Pro', badgeColor: 'purple', image: 'assets/courses/object_oriented_design_interview.png' },
  { title: 'Python for Beginners', description: 'Start from zero. Learn Python fundamentals with hands-on exercises and projects.', lessons: 30, hours: 10, badge: 'Free', badgeColor: 'green', image: 'assets/courses/python_for_beginers.png' },
  { title: 'Python for Coding Interviews', description: 'Master Python tricks and idioms that make interview solutions clean and fast.', lessons: 24, hours: 8, badge: 'Pro', badgeColor: 'purple', image: 'assets/courses/python_for_coding_interviews.png' },
  { title: 'SQL for Beginners', description: 'Learn SQL from scratch — queries, joins, aggregations, and database fundamentals.', lessons: 20, hours: 7, badge: 'Free', badgeColor: 'green', image: 'assets/courses/sql_for_beg.png' },
  { title: 'Design Patterns', description: 'Learn the essential design patterns every software engineer should know.', lessons: 26, hours: 9, badge: 'Pro', badgeColor: 'purple', image: 'assets/courses/design_patterns.png' },
  { title: 'OO Programming', description: 'Master object-oriented programming concepts — classes, inheritance, polymorphism, and more.', lessons: 22, hours: 8, badge: 'Free', badgeColor: 'green', image: 'assets/courses/oo_programming.png' },
];
