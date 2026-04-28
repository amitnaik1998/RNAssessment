export type Note = {
  id: string;
  title: string;
  content: string;
};

export const NOTES: Note[] = [
  {
    id: '1',
    title: 'Grocery List',
    content: 'Milk, eggs, bread, coffee, bananas, oats, chicken, broccoli, rice.',
  },
  {
    id: '2',
    title: 'Meeting Notes — Project Kickoff',
    content:
      'Discussed timelines, agreed on weekly sync every Tuesday, action items assigned. Need to share design mockups by Friday.',
  },
  {
    id: '3',
    title: 'Book Recommendations',
    content:
      'Atomic Habits by James Clear, The Pragmatic Programmer, Sapiens by Yuval Noah Harari, Deep Work by Cal Newport.',
  },
  {
    id: '4',
    title: 'Weekend Plans',
    content:
      'Saturday: morning run, brunch with friends, afternoon at the bookstore. Sunday: meal prep, laundry, finish reading.',
  },
  {
    id: '5',
    title: 'Workout Routine',
    content:
      'Mon/Wed/Fri: strength training (push, pull, legs split). Tue/Thu: cardio (30 min run). Saturday: yoga. Sunday: rest.',
  },
  {
    id: '6',
    title: 'Things to Learn',
    content:
      'TypeScript advanced types, React Native animations with Reanimated, basics of system design, Spanish (resume Duolingo).',
  },
  {
    id: '7',
    title: 'Travel Bucket List',
    content:
      'Iceland for the northern lights, Kyoto in cherry blossom season, Patagonia for hiking, road trip along the Pacific Coast Highway.',
  },
  {
    id: '8',
    title: 'Recipe — One-Pot Pasta',
    content:
      'Garlic, cherry tomatoes, basil, olive oil, spaghetti, vegetable stock. Cook everything together for 10 minutes, finish with parmesan.',
  },
  {
    id: '9',
    title: 'Side Project Ideas',
    content:
      'Habit tracker with streak visualization, CLI tool for managing dotfiles, browser extension that summarizes long articles.',
  },
  {
    id: '10',
    title: 'Movies to Watch',
    content:
      'Dune Part Two, Past Lives, Everything Everywhere All at Once, The Holdovers, Anatomy of a Fall.',
  },
  {
    id: '11',
    title: 'Birthday Gift Ideas — Mom',
    content:
      'A nice scarf, the new cookbook she mentioned, weekend spa voucher. Order at least two weeks ahead so it arrives on time.',
  },
  {
    id: '12',
    title: 'Bug — Login Flow',
    content:
      'Token refresh fails silently when the app is backgrounded for more than 30 minutes. Reproduce on iOS first, then check Android.',
  },
  {
    id: '13',
    title: 'Apartment Hunt Checklist',
    content:
      'Natural light, in-unit laundry, walking distance to a grocery store, decent cell signal, no carpet in the bedroom.',
  },
  {
    id: '14',
    title: 'Podcast Episodes Queue',
    content:
      'Lex Fridman with Andrej Karpathy, Acquired on TSMC, Huberman Lab on sleep, The Daily on this week\'s election coverage.',
  },
  {
    id: '15',
    title: 'Quarterly Goals',
    content:
      'Ship the notes app, run a 10K under 50 minutes, finish two technical books, take one full weekend off-grid.',
  },
  {
    id: '16',
    title: 'Car Maintenance',
    content:
      'Oil change due at 65,000 miles, rotate tires, replace cabin air filter, schedule annual inspection before the registration expires.',
  },
  {
    id: '17',
    title: 'Gift Card Balances',
    content:
      'Amazon: $42, Starbucks: $7.50, Target: $25, REI: $60. Use the REI one before the spring sale ends.',
  },
  {
    id: '18',
    title: 'Interview Prep',
    content:
      'Review system design fundamentals, practice two LeetCode mediums daily, refresh on React Native bridge internals, prepare STAR stories.',
  },
  {
    id: '19',
    title: 'Plants Care Schedule',
    content:
      'Monstera: water weekly. Snake plant: every 2-3 weeks. Pothos: when top inch is dry. Rotate all of them every Sunday for even light.',
  },
  {
    id: '20',
    title: 'Random Ideas',
    content:
      'A search engine that only indexes personal blogs. A keyboard shortcut manager that learns from usage. An app to swap books with neighbors.',
  },
];
