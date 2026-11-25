import type {NicheItem} from '../types/toolkit';

export const FACELESS_NICHES: NicheItem[] = [
  {
    id: 'everyday-science-explainers',
    name: 'Everyday Science & How Things Work',
    category: 'Health & Science',
    productionStyle: 'Stock Footage + Voiceover',
    difficulty: 'Beginner-Friendly',
    evergreenPotential: 'High',
    overview:
      'Answer ordinary questions people wonder about daily—why bridges sway, how noise-canceling headphones work, or what happens during sleep.',
    visualWorkflow:
      'Pair royalty-free stock clips, simple labeled diagrams, and clean pan-and-zoom public domain photos.',
    beginnerPitfall:
      'Avoid reading textbook definitions verbatim; anchor every explanation in one concrete real-world example.',
    starterTopics: [
      'Why airplanes leave white trails in the sky',
      'How induction stoves heat pans without getting hot',
      'What actually causes brain freeze when eating ice cream',
    ],
  },
  {
    id: 'software-workflow-tutorials',
    name: 'Software & Productivity Tutorials',
    category: 'Tech & Productivity',
    productionStyle: 'Screen Recording + Tutorial',
    difficulty: 'Beginner-Friendly',
    evergreenPotential: 'High',
    overview:
      'Step-by-step screen recordings teaching beginners how to use spreadsheets, note-taking apps, open-source editors, or browser tools.',
    visualWorkflow:
      'Record 1080p screen captures with zoomed cursor highlights and crisp voiceover instructions.',
    beginnerPitfall:
      'Skipping small setup steps loses beginners fast—zoom into menus and state keyboard shortcuts aloud.',
    starterTopics: [
      'How to clean messy spreadsheet data in 5 minutes',
      'Free keyboard shortcuts that save hours every week',
      'Setting up a simple weekly budget tracker from scratch',
    ],
  },
  {
    id: 'micro-history-stories',
    name: 'Forgotten Micro-Histories',
    category: 'History & Mystery',
    productionStyle: 'Stock Footage + Voiceover',
    difficulty: 'Beginner-Friendly',
    evergreenPotential: 'High',
    overview:
      'Focused 8-to-12 minute stories about unusual inventions, vanished towns, odd treaties, or everyday life in past centuries.',
    visualWorkflow:
      'Use public domain museum archives, Wikimedia Commons illustrations, vintage maps, and subtle Ken Burns motion.',
    beginnerPitfall:
      'Broad topics like "World War II" are overcrowded; narrow down to one specific event, person, or object.',
    starterTopics: [
      'How the world survived before standard time zones existed',
      'The strange reason London built bridges with houses on them',
      'Why ancient Roman concrete outlasts modern sidewalks',
    ],
  },
  {
    id: 'personal-finance-basics',
    name: 'Plain-English Money Basics',
    category: 'Finance & Career',
    productionStyle: '2D Motion / Slides',
    difficulty: 'Beginner-Friendly',
    evergreenPotential: 'High',
    overview:
      'Educational breakdowns of compound interest, emergency funds, credit scores, and comparing everyday financial concepts without hype.',
    visualWorkflow:
      'Clean slide decks, simple bar charts, and animated number callouts using white and navy typography.',
    beginnerPitfall:
      'Never present personal opinions as licensed financial advice; frame videos around mechanics and clear disclaimers.',
    starterTopics: [
      'How compound interest works with small monthly amounts',
      'Fixed vs. variable interest rates explained simply',
      '5 common budgeting mistakes first-time earners make',
    ],
  },
  {
    id: 'book-idea-breakdowns',
    name: 'Non-Fiction Book Idea Summaries',
    category: 'Education & Explainers',
    productionStyle: '2D Motion / Slides',
    difficulty: 'Beginner-Friendly',
    evergreenPotential: 'High',
    overview:
      'Distill the core lessons of psychology, communication, or skill-building books into structured, actionable visual takeaways.',
    visualWorkflow:
      'Minimalist typography slides, simple stick-figure or icon diagrams, and clean chapter dividers.',
    beginnerPitfall:
      'Don’t just list chapter titles—explain how one idea applies to an everyday problem the viewer faces.',
    starterTopics: [
      'Three practical habits from classic time-management books',
      'Why checklists prevent costly errors in complex work',
      'How active listening changes difficult conversations',
    ],
  },
  {
    id: 'urban-design-geography',
    name: 'Geography & City Design Explainers',
    category: 'Education & Explainers',
    productionStyle: '2D Motion / Slides',
    difficulty: 'Moderate',
    evergreenPotential: 'High',
    overview:
      'Explore why cities are laid out the way they are, how transit lines solve bottlenecks, or why borders look unusual on maps.',
    visualWorkflow:
      'Combine open map visuals, highlighted route overlays, and street-level stock footage.',
    beginnerPitfall:
      'Fact-check map borders and statistics carefully; geography viewers notice inaccurate labels immediately.',
    starterTopics: [
      'Why some cities use grid streets while others wind naturally',
      'How roundabouts reduce severe traffic collisions',
      'The engineering behind underground metro stations',
    ],
  },
  {
    id: 'study-ambient-sessions',
    name: 'Calm Study & Ambient Soundscapes',
    category: 'Culture & Media',
    productionStyle: 'Ambient / Lo-Fi Visuals',
    difficulty: 'Beginner-Friendly',
    evergreenPotential: 'High',
    overview:
      'Pomodoro study timers, rain-on-window visuals, library ambiance, and distraction-free focus timers for students and remote workers.',
    visualWorkflow:
      'Static or gently looping original photography/video paired with licensed ambient audio and minimal on-screen timer.',
    beginnerPitfall:
      'Ensure every audio track has clear commercial-safe licensing to avoid copyright claims on long videos.',
    starterTopics: [
      '50/10 Pomodoro study session with quiet rain audio',
      'Two-hour deep reading timer with soft fireplace crackle',
      'Morning planning session background with gentle café hum',
    ],
  },
  {
    id: 'unsolved-maritime-mysteries',
    name: 'Maritime & Aviation Investigations',
    category: 'History & Mystery',
    productionStyle: 'Stock Footage + Voiceover',
    difficulty: 'Moderate',
    evergreenPotential: 'High',
    overview:
      'Chronological retellings of real navigational puzzles, lost expeditions, and engineering lessons learned from historical mishaps.',
    visualWorkflow:
      'Timeline graphics, archival photos, ocean/sky stock footage, and calm documentary narration.',
    beginnerPitfall:
      'Avoid sensationalizing tragedies or inventing unverified theories; stick to documented timelines.',
    starterTopics: [
      'How early sailors navigated open oceans without GPS',
      'The engineering flaw that sank a famous 17th-century warship',
      'Why modern black boxes are painted bright orange',
    ],
  },
  {
    id: 'consumer-tech-comparisons',
    name: 'Practical Tech & Gear Explainers',
    category: 'Tech & Productivity',
    productionStyle: 'Stock Footage + Voiceover',
    difficulty: 'Beginner-Friendly',
    evergreenPotential: 'Balanced',
    overview:
      'Help everyday buyers understand specs without jargon—OLED vs. LCD, SSD speeds, microphone basics, or battery longevity.',
    visualWorkflow:
      'Clean spec comparison tables, product stock clips, and clear annotated callout slides.',
    beginnerPitfall:
      'Chasing every weekly gadget rumor burns beginners out; focus on timeless buying concepts.',
    starterTopics: [
      'RAM vs. storage: what actually slows down an older laptop',
      'How to get clear voiceover audio with a budget USB mic',
      'USB-C cable differences explained in plain English',
    ],
  },
  {
    id: 'career-communication-skills',
    name: 'Resume, Interview & Career Prep',
    category: 'Finance & Career',
    productionStyle: 'Screen Recording + Tutorial',
    difficulty: 'Beginner-Friendly',
    evergreenPotential: 'High',
    overview:
      'Walkthroughs of writing clear resumes, structuring interview answers, and navigating early-career workplace communication.',
    visualWorkflow:
      'Screen-record real before-and-after document edits using anonymized sample resumes and email drafts.',
    beginnerPitfall:
      'Generic advice like "be confident" feels empty; show concrete before-and-after sentence rewrites.',
    starterTopics: [
      'How to rewrite weak resume bullet points with real outcomes',
      'Structuring answers to common behavioral interview questions',
      'Three polite ways to follow up after a job application',
    ],
  },
  {
    id: 'animation-cinema-essays',
    name: 'Storytelling & Film Craft Breakdowns',
    category: 'Culture & Media',
    productionStyle: '2D Motion / Slides',
    difficulty: 'Moderate',
    evergreenPotential: 'High',
    overview:
      'Analyze how pacing, color palettes, sound design, and script structure make memorable scenes work.',
    visualWorkflow:
      'Short transformative clip excerpts (following fair-use commentary discipline), storyboard sketches, and color swatches.',
    beginnerPitfall:
      'Playing long unbroken movie clips triggers Content ID blocks; keep clips brief, muted when speaking, or use still frames.',
    starterTopics: [
      'How background music changes the meaning of a quiet scene',
      'Why three-act structure still guides short documentaries',
      'Using color contrast to show character change without dialogue',
    ],
  },
  {
    id: 'sleep-nutrition-habits',
    name: 'Evidence-Based Habit & Sleep Guides',
    category: 'Health & Science',
    productionStyle: 'Stock Footage + Voiceover',
    difficulty: 'Moderate',
    evergreenPotential: 'High',
    overview:
      'Accessible summaries of published sleep hygiene, posture, hydration, and focus research written for busy beginners.',
    visualWorkflow:
      'Calm nature/lifestyle B-roll, simple bulleted checklists, and clear source citations on screen.',
    beginnerPitfall:
      'Always cite reputable studies and clearly state educational intent rather than medical diagnosis.',
    starterTopics: [
      'Why morning sunlight affects your evening sleep schedule',
      'Simple desk stretches to ease neck tension between edits',
      'How caffeine timing impacts deep sleep quality',
    ],
  },
  {
    id: 'language-learning-micro',
    name: 'Practical Phrase & Vocabulary Lessons',
    category: 'Education & Explainers',
    productionStyle: '2D Motion / Slides',
    difficulty: 'Beginner-Friendly',
    evergreenPotential: 'High',
    overview:
      'Bite-sized vocabulary, pronunciation tips, and everyday travel dialogues using clean flashcards and clear audio.',
    visualWorkflow:
      'High-contrast typography cards showing native script, phonetic reading, and real-world sentence context.',
    beginnerPitfall:
      'Avoid rushing through words; leave a 2-second pause so learners can repeat phrases aloud.',
    starterTopics: [
      '20 essential café phrases for your first trip abroad',
      'Common false friends between English and Spanish',
      'How to practice listening comprehension in 10 minutes a day',
    ],
  },
  {
    id: 'open-source-creator-tools',
    name: 'Free Creator Software Walkthroughs',
    category: 'Tech & Productivity',
    productionStyle: 'Screen Recording + Tutorial',
    difficulty: 'Beginner-Friendly',
    evergreenPotential: 'High',
    overview:
      'Teach fellow beginners how to edit video, clean audio, or design thumbnails using completely free desktop and web software.',
    visualWorkflow:
      'Full-screen software walkthroughs with step numbers in the corner and clear voiceover pacing.',
    beginnerPitfall:
      'Software updates change menus yearly—include the version number in your description and pinned comment.',
    starterTopics: [
      'How to remove background room hum from voiceovers for free',
      'Basic keyboard shortcuts for faster video editing cuts',
      'Designing readable YouTube thumbnails with two fonts',
    ],
  },
  {
    id: 'wildlife-nature-facts',
    name: 'Fascinating Nature & Animal Adaptations',
    category: 'Health & Science',
    productionStyle: 'Stock Footage + Voiceover',
    difficulty: 'Beginner-Friendly',
    evergreenPotential: 'High',
    overview:
      'Short and mid-length documentaries exploring how animals survive extreme climates, migrate thousands of miles, or build complex nests.',
    visualWorkflow:
      'High-resolution wildlife stock footage, range maps, and calm storytelling narration.',
    beginnerPitfall:
      'Avoid misleading dramatic exaggerations; genuine biology is surprising enough on its own.',
    starterTopics: [
      'How arctic foxes survive temperatures below minus forty',
      'Why starlings fly in synchronized murmurations',
      'The surprising engineering inside a beaver dam',
    ],
  },
  {
    id: 'retro-computing-design',
    name: 'Design & Tech History Spotlights',
    category: 'Culture & Media',
    productionStyle: 'Stock Footage + Voiceover',
    difficulty: 'Moderate',
    evergreenPotential: 'High',
    overview:
      'Stories of iconic industrial designs, early computer interfaces, classic typefaces, and everyday objects we rarely notice.',
    visualWorkflow:
      'Archival product photos, clean UI comparisons, and timeline overlays.',
    beginnerPitfall:
      'Verify dates and designer credits carefully so enthusiasts trust your research.',
    starterTopics: [
      'Why computer error screens turned blue in the 1990s',
      'How highway signs were designed to be read at 65 mph',
      'The origin of the floppy disk save icon',
    ],
  },
  {
    id: 'home-organization-systems',
    name: 'Minimalist Workspace & Home Systems',
    category: 'Tech & Productivity',
    productionStyle: 'Ambient / Lo-Fi Visuals',
    difficulty: 'Beginner-Friendly',
    evergreenPotential: 'High',
    overview:
      'Overhead desk setups, cable management walkthroughs, and practical organization guides filmed hands-only or with clean slides.',
    visualWorkflow:
      'Overhead top-down shots of hands, simple checklists, or calm stock interiors with narration.',
    beginnerPitfall:
      'Don’t focus on expensive gear hauls; beginners appreciate low-cost, practical organization ideas.',
    starterTopics: [
      'Organizing a small desk for recording voiceovers at home',
      'A 15-minute weekly digital file cleanup routine',
      'How to hide desk cables using items you already own',
    ],
  },
  {
    id: 'myth-busting-history',
    name: 'Common Myths & Misconceptions',
    category: 'History & Mystery',
    productionStyle: '2D Motion / Slides',
    difficulty: 'Beginner-Friendly',
    evergreenPotential: 'High',
    overview:
      'Debunk widely repeated historical or everyday myths with clear primary sources and quick visual comparisons.',
    visualWorkflow:
      'Split-screen "Myth vs. Reality" slides paired with archival imagery and crisp narration.',
    beginnerPitfall:
      'Always link or mention where the real evidence comes from so viewers know why the myth is false.',
    starterTopics: [
      '5 historical facts everyone remembers slightly wrong',
      'Did medieval people really believe the Earth was flat?',
      'Why carrots got their reputation for improving night vision',
    ],
  },
];
