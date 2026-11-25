import type {
  HookSuggestion,
  OutlineSection,
  ScriptAnalysis,
  TitleSuggestion,
  VideoIdea,
} from '../types/toolkit';

function cleanInput(value: string): string {
  return value.trim().replace(/\s+/g, ' ');
}

function toTitleCase(text: string): string {
  const minorWords = new Set([
    'a',
    'an',
    'and',
    'as',
    'at',
    'but',
    'by',
    'for',
    'in',
    'nor',
    'of',
    'on',
    'or',
    'so',
    'the',
    'to',
    'up',
    'via',
    'vs',
    'with',
  ]);
  return text
    .split(' ')
    .map((word, index) => {
      if (!word) return '';
      const lower = word.toLowerCase();
      if (index > 0 && minorWords.has(lower)) {
        return lower;
      }
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(' ');
}

function stripLeadingHowTo(topic: string): string {
  return topic.replace(/^how to\s+/i, '').trim();
}

export function generateVideoIdeas(params: {
  topic: string;
  format: string;
  audience: string;
  tone: string;
  variationSeed?: number;
}): VideoIdea[] {
  const rawTopic = cleanInput(params.topic);
  const core = stripLeadingHowTo(rawTopic);
  const titledCore = toTitleCase(core);
  const seed = params.variationSeed ?? 0;

  const visualByFormat: Record<string, string[]> = {
    'Long-Form (8-15 min)': [
      'Stock B-roll scenes paired with clean animated section headers and chapter markers',
      'Screen-recorded walkthroughs mixed with simple slide callouts highlighting key steps',
      'Timeline graphics, archival imagery, and calm pan-and-zoom stills',
    ],
    'YouTube Shorts (<60s)': [
      'Vertical 9:16 kinetic captions centered above punchy 2-second stock clips',
      'Fast split-screen comparison slides with bold high-contrast callout numbers',
      'Tight zoomed screen capture showing one quick tip in real time',
    ],
    'Listicle / Countdown': [
      'Numbered chapter cards (`01` to `05`) with fresh visual clips per item',
      'Side-by-side "Before vs. After" visual cards over steady voiceover narration',
      'Clean checklist animations checking off each point as you explain it',
    ],
    'Deep-Dive Explainer': [
      'Simple 2D diagram slides breaking complex steps into 3 clear visual blocks',
      'Annotated charts, map overlays, and slow-paced B-roll for breathing room',
      'Whiteboard-style sequential text builds synced to calm narration',
    ],
    'Storytelling / Documentary': [
      'Atmospheric stock scenes, historical photos, and subtle map transitions',
      'Chronological date stamps in the corner over moody, unhurried visuals',
      'Minimalist quote cards highlighting documented facts and turning points',
    ],
  };

  const visualPool = visualByFormat[params.format] ?? visualByFormat['Long-Form (8-15 min)'];

  const lengthByFormat: Record<string, string> = {
    'Long-Form (8-15 min)': '8–12 minutes',
    'YouTube Shorts (<60s)': '40–55 seconds',
    'Listicle / Countdown': '6–9 minutes',
    'Deep-Dive Explainer': '10–14 minutes',
    'Storytelling / Documentary': '9–13 minutes',
  };

  const suggestedLength = lengthByFormat[params.format] ?? '8–10 minutes';

  const templates: Omit<VideoIdea, 'id'>[] = [
    {
      titleConcept: `The Beginner's Step-by-Step Guide to ${titledCore}`,
      angle: `Structured ${params.tone.toLowerCase()} breakdown designed specifically for ${params.audience.toLowerCase()}.`,
      visualApproach: visualPool[0],
      viewerTakeaway: `Viewers leave with a repeatable 3-step starting framework for ${core.toLowerCase()} without feeling overwhelmed.`,
      suggestedLength,
    },
    {
      titleConcept: `5 Common Mistakes Beginners Make With ${titledCore} (And Better Alternatives)`,
      angle: 'Problem-solution format that highlights avoidable errors before showing the practical fix.',
      visualApproach: visualPool[1],
      viewerTakeaway: 'Helps new viewers recognize pitfalls early and apply concrete, low-effort corrections.',
      suggestedLength,
    },
    {
      titleConcept: `How ${titledCore} Actually Works — Explained in Plain English`,
      angle: `Jargon-free ${params.tone.toLowerCase()} explainer using everyday analogies instead of technical terms.`,
      visualApproach: visualPool[2],
      viewerTakeaway: `Demystifies ${core.toLowerCase()} so first-time viewers understand the core mechanics clearly.`,
      suggestedLength,
    },
    {
      titleConcept: `Before You Start ${titledCore}: What I Wish Someone Explained Earlier`,
      angle: 'Expectation-setting reality check covering time, setup, and realistic early milestones.',
      visualApproach: visualPool[0],
      viewerTakeaway: 'Sets grounded expectations and prepares viewers with the exact prerequisites they need.',
      suggestedLength,
    },
    {
      titleConcept: `${titledCore} Breakdown: Simple vs. Overcomplicated Approaches`,
      angle: 'Side-by-side comparison contrasting an accessible starter workflow against unnecessary complexity.',
      visualApproach: visualPool[1],
      viewerTakeaway: `Shows ${params.audience.toLowerCase()} how to get clean results using simpler tools and habits.`,
      suggestedLength,
    },
    {
      titleConcept: `A Complete ${titledCore} Walkthrough Using Only Free Resources`,
      angle: 'Zero-budget practical tutorial built around free, accessible methods anyone worldwide can follow.',
      visualApproach: visualPool[2],
      viewerTakeaway: 'Removes financial friction and empowers beginners to try the workflow immediately.',
      suggestedLength,
    },
    {
      titleConcept: `Why Most Explanations About ${titledCore} Miss This Crucial Detail`,
      angle: 'Curiosity-driven deep dive examining one overlooked principle that changes how the topic makes sense.',
      visualApproach: visualPool[0],
      viewerTakeaway: 'Gives viewers a fresh perspective they can verify and remember after the video ends.',
      suggestedLength,
    },
    {
      titleConcept: `From Zero to First Milestone: A Realistic ${titledCore} Roadmap`,
      angle: 'Chronological milestone map dividing the learning curve into calm, manageable weekly stages.',
      visualApproach: visualPool[1],
      viewerTakeaway: 'Replaces vague advice with a clear milestone checklist viewers can follow step by step.',
      suggestedLength,
    },
  ];

  // Rotate templates based on variationSeed so clicking "Generate More Variations" gives a fresh order
  const offset = (seed * 2) % templates.length;
  const rotated = [...templates.slice(offset), ...templates.slice(0, offset)].slice(0, 6);

  return rotated.map((item, idx) => ({
    ...item,
    id: `idea-${seed}-${idx}`,
  }));
}

const TITLE_MAX_CHARS = 60;
const TITLE_MIN_TARGET_CHARS = 35;
const DANGLING_END_WORDS = new Set([
  'a',
  'an',
  'and',
  'as',
  'at',
  'by',
  'for',
  'from',
  'in',
  'into',
  'of',
  'on',
  'or',
  'the',
  'to',
  'via',
  'vs',
  'vs.',
  'with',
]);

type TopicShape =
  | 'how-works'
  | 'how-process'
  | 'how-to'
  | 'question'
  | 'gerund'
  | 'noun';

interface ParsedTopic {
  shape: TopicShape;
  /** Full cleaned topic phrase in title case (e.g. "How Artificial Intelligence Works") */
  full: string;
  /** Extracted core noun/subject or action phrase (e.g. "Artificial Intelligence" or "Remove Background Echo") */
  subject: string;
  /** Noun subject stripped of a leading article ("The Internet" -> "Internet") for modifier slots */
  bareSubject: string;
  isPlural: boolean;
  hasPrepositionalTail: boolean;
}

function formatTitlePhrase(text: string): string {
  const cleaned = cleanInput(text).replace(/[.!?;:,]+$/, '').trim();
  if (!cleaned) return '';
  return cleaned
    .split(' ')
    .map((word, index) => {
      if (!word) return '';
      // Preserve intentional acronyms or camel-cased brand names (e.g. AI, SEO, YouTube, USB-C)
      if (/^[A-Z0-9-]{2,6}$/.test(word) || /[a-z][A-Z]/.test(word)) {
        return word;
      }
      return toTitleCase(index === 0 ? word : `x ${word}`).replace(/^X /, '');
    })
    .join(' ');
}

function condenseTitlePhrase(phrase: string, maxLength: number): string {
  const cleaned = cleanInput(phrase);
  if (cleaned.length <= maxLength) return cleaned;
  if (maxLength <= 0) return '';

  const words = cleaned.split(' ');
  const kept: string[] = [];

  for (const word of words) {
    const next = kept.length === 0 ? word : `${kept.join(' ')} ${word}`;
    if (next.length > maxLength) break;
    kept.push(word);
  }

  while (kept.length > 1 && DANGLING_END_WORDS.has(kept[kept.length - 1].toLowerCase())) {
    kept.pop();
  }

  const joined = kept.join(' ').replace(/[-:,;]+$/, '').trim();
  if (joined.length > 0 && joined.length <= maxLength) {
    return joined;
  }

  return cleaned.slice(0, maxLength).trim();
}

function detectPlural(phrase: string): boolean {
  const withoutPrep = phrase.split(/\s+(?:for|at|in|on|with|without|from|by|of)\s+/i)[0] ?? phrase;
  const lastWord = withoutPrep.trim().split(' ').pop() ?? '';
  if (!lastWord) return false;
  if (/^[A-Z0-9-]{2,}$/.test(lastWord)) return false;
  return /^[a-z]{3,}s$/i.test(lastWord) && !/(ss|us|is|ics)$/i.test(lastWord);
}

function parseTopicForTitles(rawTopic: string): ParsedTopic {
  const cleaned = cleanInput(rawTopic);
  const endsWithQuestion = /\?\s*$/.test(cleaned);
  const noPunct = cleaned.replace(/[?!.,;:]+$/, '').trim();

  // 1. "How to ..." goal / action phrase
  const howToMatch = noPunct.match(/^how\s+to\s+(.+)$/i);
  if (howToMatch) {
    const action = formatTitlePhrase(howToMatch[1]);
    return {
      shape: 'how-to',
      full: formatTitlePhrase(noPunct),
      subject: action,
      bareSubject: action,
      isPlural: false,
      hasPrepositionalTail: /\b(for|at|in|on|with|without|from|by)\b/i.test(action),
    };
  }

  // 2. "How <subject> [actually/really] works/work" process phrase
  const howWorksMatch = noPunct.match(
    /^how\s+(.+?)\s+(?:actually\s+|really\s+)?(works|work)$/i
  );
  if (howWorksMatch) {
    const subj = formatTitlePhrase(howWorksMatch[1]);
    const bare = subj.replace(/^(The|A|An)\s+/i, '').trim() || subj;
    const isPlural = howWorksMatch[2].toLowerCase() === 'work' || detectPlural(subj);
    return {
      shape: 'how-works',
      full: formatTitlePhrase(noPunct),
      subject: subj,
      bareSubject: bare,
      isPlural,
      hasPrepositionalTail: /\b(for|at|in|on|with|without|from|by)\b/i.test(bare),
    };
  }

  // 3. Other "How <clause>" process phrases (e.g., "How solar panels generate electricity")
  if (/^how\s+/i.test(noPunct)) {
    const full = formatTitlePhrase(noPunct);
    return {
      shape: 'how-process',
      full,
      subject: full,
      bareSubject: full,
      isPlural: false,
      hasPrepositionalTail: false,
    };
  }

  // 4. Question phrases (Why / What / When / Where / Who / Which / Is / Are / Do / Does / Did / Can / Should / Will or trailing '?')
  if (
    endsWithQuestion ||
    /^(why|what|when|where|who|which|is|are|do|does|did|can|could|should|will|would)\s+/i.test(
      noPunct
    )
  ) {
    const full = formatTitlePhrase(noPunct);
    return {
      shape: 'question',
      full,
      subject: full,
      bareSubject: full,
      isPlural: false,
      hasPrepositionalTail: false,
    };
  }

  const formatted = formatTitlePhrase(noPunct);
  const bare = formatted.replace(/^(The|A|An)\s+/i, '').trim() || formatted;
  const hasPrep = /\b(for|at|in|on|with|without|from|by)\b/i.test(formatted);

  // 5. Gerund / activity phrase (e.g. "Recording Voiceovers at Home", "Learning Python")
  if (/^[a-z]{3,}ing\b/i.test(formatted) && !/^(thing|nothing|something|everything|king|ring|wing|spring|string)\b/i.test(formatted)) {
    return {
      shape: 'gerund',
      full: formatted,
      subject: formatted,
      bareSubject: bare,
      isPlural: false,
      hasPrepositionalTail: hasPrep,
    };
  }

  // 6. Standard noun / concept phrase
  return {
    shape: 'noun',
    full: formatted,
    subject: formatted,
    bareSubject: bare,
    isPlural: detectPlural(formatted),
    hasPrepositionalTail: hasPrep,
  };
}

function fixIndefiniteArticles(text: string): string {
  return text.replace(/\b(A|a)\s+([A-Za-z]+)/g, (match, article, nextWord) => {
    const lower = nextWord.toLowerCase();
    // Words starting with a vowel letter that have a consonant sound ("useful", "unique", "one", "unit", "universal", "user", "euro")
    if (/^(use|uni|one|once|eu|ubi|ura|usb)/i.test(lower)) {
      return match;
    }
    if (/^[aeiou]/i.test(lower) || /^(honest|hour|heir)/i.test(lower)) {
      return `${article === 'A' ? 'An' : 'an'} ${nextWord}`;
    }
    return match;
  });
}

function isGrammaticallyCleanTitle(text: string): boolean {
  if (!text) return false;
  // Reject repeated consecutive words (e.g. "to to", "the the")
  if (/\b([a-z]+)\s+\1\b/i.test(text)) return false;
  // Reject double punctuation artifacts
  if (/[?:,]{2}|,\?|:\?/.test(text)) return false;
  // Reject redundant key framing words
  if (
    /\bbeginners?\b.*\bbeginners?\b/i.test(text) ||
    /\bguides?\b.*\bguides?\b/i.test(text) ||
    /\bsteps?\b.*\bsteps?\b/i.test(text) ||
    /\bmistakes?\b.*\bmistakes?\b/i.test(text) ||
    /\btips?\b.*\btips?\b/i.test(text) ||
    /\bmyths?\b.*\bmyths?\b/i.test(text) ||
    /\bexplained\b.*\bexplained\b/i.test(text) ||
    /\bworks?\b.*\bworks?\b/i.test(text)
  ) {
    return false;
  }
  // Reject clause/question phrases forced into incompatible modifier or verb slots
  if (
    /\b(common|start|better|simple|practical|useful|essential|key|first|can|does|do|is|are)\s+(how|why|what|when|where|who)\b/i.test(
      text
    )
  ) {
    return false;
  }
  if (
    /\b(how|why|what|when|where)\s+[^:?]{2,}\s+(mistakes|tips|workflow|checklist|basics|steps|myths|feel|matter)\b/i.test(
      text
    )
  ) {
    return false;
  }
  if (/\b(works|work)\s+(mistakes|tips|workflow|checklist|basics|steps|feel|matter)\b/i.test(text)) {
    return false;
  }
  return true;
}

function pickVerifiedTitle(candidates: string[], used: Set<string>): string {
  const normalized = candidates
    .map((c) => fixIndefiniteArticles(cleanInput(c)))
    .filter((c) => c.length > 0);

  const uniqueUnused = normalized.filter((c) => !used.has(c.toLowerCase()));
  const basePool = uniqueUnused.length > 0 ? uniqueUnused : normalized;
  const grammaticallyClean = basePool.filter((c) => isGrammaticallyCleanTitle(c));
  const searchPool = grammaticallyClean.length > 0 ? grammaticallyClean : basePool;

  // Priority 1: Clean, grammatical title in the exact 35-60 character target range
  const ideal = searchPool.find(
    (c) => c.length >= TITLE_MIN_TARGET_CHARS && c.length <= TITLE_MAX_CHARS
  );
  if (ideal) return ideal;

  // Priority 2: Longest clean title still strictly <= 60 characters
  const withinLimit = searchPool
    .filter((c) => c.length <= TITLE_MAX_CHARS)
    .sort((a, b) => b.length - a.length);
  if (withinLimit.length > 0) return withinLimit[0];

  // Priority 3: Hard verification fallback guaranteeing <= 60 characters
  return condenseTitlePhrase(searchPool[0] ?? '', TITLE_MAX_CHARS);
}

function makeVariants(phrase: string, lengths: number[]): string[] {
  return Array.from(
    new Set([phrase, ...lengths.map((len) => condenseTitlePhrase(phrase, len))].filter(Boolean))
  );
}

export function generateYouTubeTitles(params: {
  topic: string;
  benefit: string;
  keyword: string;
  style: string;
  variationSeed?: number;
}): TitleSuggestion[] {
  const parsed = parseTopicForTitles(params.topic);
  const benefitRaw = cleanInput(params.benefit).replace(/^to\s+/i, '');
  const benefit = benefitRaw ? formatTitlePhrase(benefitRaw) : '';
  const keyword = formatTitlePhrase(params.keyword);
  const seed = params.variationSeed ?? 0;

  const fullVariants = makeVariants(parsed.full, [40, 32, 24]);
  const subjectVariants = makeVariants(parsed.subject, [32, 24, 18]);
  const bareVariants = makeVariants(parsed.bareSubject, [32, 24, 18]);

  const expand = (
    variants: string[],
    builders: Array<(t: string) => string | null>
  ): string[] => {
    const out: string[] = [];
    for (const v of variants) {
      for (const build of builders) {
        const result = build(v);
        if (result) out.push(result);
      }
    }
    return out;
  };

  let allPatterns: {pattern: string; category: string; candidates: string[]}[];

  if (parsed.shape === 'how-works') {
    const intactClause = [parsed.full];
    const verbWorks = parsed.isPlural ? 'Work' : 'Works';
    const verbIs = parsed.isPlural ? 'Are' : 'Is';
    const verbDoes = parsed.isPlural ? 'Do' : 'Does';
    const pronoun = parsed.isPlural ? 'They' : 'It';

    allPatterns = [
      {
        pattern: 'Clear How-To',
        category: 'How-To & Practical',
        candidates: [
          ...expand(intactClause, [
            (c) => (benefit ? `${c}: How to ${benefit}` : null),
            (c) => `${c} (Clear Beginner Guide)`,
            (c) => `${c}: A Beginner Guide`,
            (c) => `${c} — Step-by-Step Guide`,
            (c) => `Beginner Guide to ${c}`,
            (c) => `${c} Step by Step`,
          ]),
          ...expand(subjectVariants, [
            (s) => `How ${s} ${verbWorks} (Beginner Guide)`,
            (s) => `A Clear Beginner Guide to ${s}`,
          ]),
        ],
      },
      {
        pattern: 'Plain-English Explainer',
        category: 'Curiosity & Question',
        candidates: [
          ...expand(intactClause, [
            (c) => `${c}, Explained Simply`,
            (c) => `${c} in Plain English`,
            (c) => `${c} for Beginners`,
            (c) => `${c} (Plain English)`,
          ]),
          ...expand(subjectVariants, [
            (s) => `${s} Explained in Plain English`,
            (s) => `${s} Explained Simply for Beginners`,
          ]),
        ],
      },
      {
        pattern: 'Numbered Mistakes',
        category: 'List & Numbered',
        candidates: [
          ...expand(bareVariants, [
            (s) =>
              parsed.hasPrepositionalTail
                ? `5 Common Mistakes With ${s}`
                : `5 Common ${s} Mistakes Beginners Make`,
            (s) =>
              parsed.hasPrepositionalTail
                ? `5 Mistakes Beginners Make With ${s}`
                : `5 Common ${s} Misconceptions`,
            (s) => `5 Myths Beginners Believe About ${s}`,
            (s) => `5 Things People Get Wrong About ${s}`,
            (s) => `5 Mistakes People Make With ${s}`,
          ]),
        ],
      },
      {
        pattern: 'Direct Comparison',
        category: 'Comparison / Myth-Busting',
        candidates: [
          ...expand(subjectVariants, [
            (s) => `${s}: Hype vs. How ${pronoun} Actually ${verbWorks}`,
            (s) => `${s}: What People Think vs. Reality`,
            (s) => `${s}: Simple vs. Technical View`,
            (s) => `${s}: Myth vs. Real Mechanics`,
          ]),
          ...expand(intactClause, [
            (c) => `${c}: Simple vs. Complex`,
            (c) => `${c}: Hype vs. Reality`,
          ]),
        ],
      },
      {
        pattern: 'Open Question',
        category: 'Curiosity & Question',
        candidates: [
          ...expand(subjectVariants, [
            (s) => `Why ${verbDoes} ${s} Seem So Confusing at First?`,
            (s) => `Why ${verbDoes} ${s} Feel So Complicated?`,
            (s) => `What Makes ${s} So Hard to Understand?`,
            (s) => `Why ${verbIs} ${s} So Confusing at First?`,
            (s) => `What Makes ${s} Work So Well?`,
          ]),
        ],
      },
      {
        pattern: 'Step-by-Step Checklist',
        category: 'How-To & Practical',
        candidates: [
          ...expand(intactClause, [
            (c) => (keyword ? `${keyword}: ${c}` : null),
            (c) => `${c}: A Simple Breakdown`,
            (c) => `${c}: Step-by-Step Overview`,
          ]),
          ...expand(subjectVariants, [
            (s) => (keyword ? `${keyword}: How ${s} ${verbWorks}` : null),
            (s) => `A Step-by-Step Breakdown of ${s}`,
            (s) => `A Simple Guide to Understanding ${s}`,
          ]),
        ],
      },
      {
        pattern: 'Zero-Fluff Breakdown',
        category: 'List & Numbered',
        candidates: [
          ...expand(intactClause, [
            (c) => `5 Key Facts About ${c}`,
            (c) => `7 Essential Facts: ${c}`,
            (c) => `5 Clear Steps: ${c}`,
          ]),
          ...expand(bareVariants, [
            (s) => (benefit ? `7 ${s} Tips to ${benefit}` : null),
            (s) => `7 Key ${s} Concepts Every Beginner Should Know`,
            (s) => `7 Essential ${s} Concepts Explained`,
            (s) => `7 Core Facts About ${s}`,
          ]),
        ],
      },
      {
        pattern: 'Myth vs. Reality',
        category: 'Comparison / Myth-Busting',
        candidates: [
          ...expand(intactClause, [
            (c) => `The Truth About ${c}`,
            (c) => `${c} Without the Hype`,
            (c) => `${c} Without the Jargon`,
          ]),
          ...expand(subjectVariants, [
            (s) => `The Truth About ${s} (Without the Hype)`,
            (s) => `${s}: Separating Fact From Hype`,
            (s) => `The Honest Truth About ${s}`,
          ]),
        ],
      },
      {
        pattern: 'Short & Punchy',
        category: 'How-To & Practical',
        candidates: [
          ...expand(intactClause, [
            (c) => (keyword ? `${keyword}: ${c} in 10 Minutes` : null),
            (c) => `${c} in Under 10 Minutes`,
            (c) => `${c} in 10 Minutes`,
            (c) => `${c} in 5 Minutes`,
          ]),
          ...expand(bareVariants, [
            (s) => (keyword ? `${keyword}: ${s} Basics in 10 Minutes` : null),
            (s) => `Learn ${s} Basics in Under 10 Minutes`,
            (s) => `${s} Explained in Under 10 Minutes`,
          ]),
        ],
      },
      {
        pattern: 'Curiosity Gap',
        category: 'Curiosity & Question',
        candidates: [
          ...expand(intactClause, [
            (c) => `The Overlooked Detail Behind ${c}`,
            (c) => `What Most People Miss About ${c}`,
          ]),
          ...expand(subjectVariants, [
            (s) => `The Overlooked Principle Behind ${s}`,
            (s) => `What Most People Miss About ${s}`,
            (s) => `One Overlooked Detail About ${s}`,
            (s) => `The Hidden Mechanism Behind ${s}`,
          ]),
        ],
      },
      {
        pattern: 'First-Timer Blueprint',
        category: 'List & Numbered',
        candidates: [
          ...expand(intactClause, [
            (c) => `3 Core Ideas Behind ${c}`,
            (c) => `3 Simple Parts of ${c}`,
          ]),
          ...expand(subjectVariants, [
            (s) => `3 Core Ideas to Understand ${s}`,
            (s) => `3 Essential Concepts Behind ${s}`,
            (s) => `3 Simple Basics of ${s} for Beginners`,
            (s) => `3 First Concepts to Learn in ${s}`,
          ]),
        ],
      },
      {
        pattern: 'Honest Breakdown',
        category: 'Comparison / Myth-Busting',
        candidates: [
          ...expand(intactClause, [
            (c) => `${c}: An Honest Breakdown`,
            (c) => `${c} — What Really Matters`,
          ]),
          ...expand(subjectVariants, [
            (s) => `Understanding ${s}: What Really Matters`,
            (s) => `${s}: What Beginners Need to Know`,
            (s) => `Should Beginners Learn About ${s} Today?`,
            (s) => `${verbIs} ${s} Worth Understanding Today?`,
          ]),
        ],
      },
    ];
  } else if (parsed.shape === 'how-process') {
    allPatterns = [
      {
        pattern: 'Clear How-To',
        category: 'How-To & Practical',
        candidates: expand(fullVariants, [
          (c) => (benefit ? `${c}: How to ${benefit}` : null),
          (c) => `${c} (Clear Beginner Guide)`,
          (c) => `${c}: A Beginner Guide`,
          (c) => `${c} Step by Step`,
          (c) => `Beginner Guide: ${c}`,
          (c) => `${c} — Full Guide`,
        ]),
      },
      {
        pattern: 'Plain-English Explainer',
        category: 'Curiosity & Question',
        candidates: expand(fullVariants, [
          (c) => `${c}, Explained Simply`,
          (c) => `${c} in Plain English`,
          (c) => `${c} (Explained Clearly)`,
          (c) => `${c} for Beginners`,
          (c) => `Simply Explained: ${c}`,
        ]),
      },
      {
        pattern: 'Numbered Mistakes',
        category: 'List & Numbered',
        candidates: expand(fullVariants, [
          (c) => `5 Myths About ${c}`,
          (c) => `5 Surprising Facts: ${c}`,
          (c) => `5 Things People Miss: ${c}`,
          (c) => `${c}: 5 Common Myths`,
          (c) => `${c}: 5 Key Facts`,
        ]),
      },
      {
        pattern: 'Direct Comparison',
        category: 'Comparison / Myth-Busting',
        candidates: expand(fullVariants, [
          (c) => `${c}: Myth vs. Reality`,
          (c) => `${c}: Simple vs. Complex`,
          (c) => `${c}: Hype vs. Fact`,
          (c) => `${c}: What Really Happens`,
        ]),
      },
      {
        pattern: 'Open Question',
        category: 'Curiosity & Question',
        candidates: expand(fullVariants, [
          (c) => `${c} — Here Is What Really Happens`,
          (c) => `${c}: What Actually Happens`,
          (c) => `${c} — Why It Matters`,
          (c) => `${c}: The Plain Answer`,
        ]),
      },
      {
        pattern: 'Step-by-Step Checklist',
        category: 'How-To & Practical',
        candidates: expand(fullVariants, [
          (c) => (keyword ? `${keyword}: ${c}` : null),
          (c) => `${c}: A Simple Breakdown`,
          (c) => `${c}: Step-by-Step Process`,
          (c) => `A Clear Breakdown: ${c}`,
        ]),
      },
      {
        pattern: 'Zero-Fluff Breakdown',
        category: 'List & Numbered',
        candidates: expand(fullVariants, [
          (c) => `3 Key Stages: ${c}`,
          (c) => `5 Core Facts: ${c}`,
          (c) => `${c}: 3 Main Steps`,
          (c) => `${c}: 5 Quick Facts`,
        ]),
      },
      {
        pattern: 'Myth vs. Reality',
        category: 'Comparison / Myth-Busting',
        candidates: expand(fullVariants, [
          (c) => `The Truth About ${c}`,
          (c) => `${c} Without the Jargon`,
          (c) => `${c}: Separating Fact From Myth`,
          (c) => `The Real Story: ${c}`,
        ]),
      },
      {
        pattern: 'Short & Punchy',
        category: 'How-To & Practical',
        candidates: expand(fullVariants, [
          (c) => (keyword ? `${keyword}: ${c} in 10 Min` : null),
          (c) => `${c} in Under 10 Minutes`,
          (c) => `${c} in 5 Minutes`,
          (c) => `${c} — Quick Breakdown`,
        ]),
      },
      {
        pattern: 'Curiosity Gap',
        category: 'Curiosity & Question',
        candidates: expand(fullVariants, [
          (c) => `The Overlooked Detail: ${c}`,
          (c) => `What Most People Miss: ${c}`,
          (c) => `One Hidden Factor: ${c}`,
          (c) => `The Real Science: ${c}`,
        ]),
      },
      {
        pattern: 'First-Timer Blueprint',
        category: 'List & Numbered',
        candidates: expand(fullVariants, [
          (c) => `3 Core Ideas: ${c}`,
          (c) => `3 Simple Clues: ${c}`,
          (c) => `${c} in 3 Clear Steps`,
          (c) => `${c} in 3 Simple Parts`,
        ]),
      },
      {
        pattern: 'Honest Breakdown',
        category: 'Comparison / Myth-Busting',
        candidates: expand(fullVariants, [
          (c) => `${c}: An Honest Breakdown`,
          (c) => `${c}: What the Evidence Shows`,
          (c) => `${c} — A Closer Look`,
          (c) => `${c}: The Plain Truth`,
        ]),
      },
    ];
  } else if (parsed.shape === 'question') {
    allPatterns = [
      {
        pattern: 'Clear How-To',
        category: 'How-To & Practical',
        candidates: expand(fullVariants, [
          (q) => `${q}? A Clear Beginner Guide`,
          (q) => `${q}? Explained Step by Step`,
          (q) => `${q}? The Beginner Guide`,
          (q) => `${q}? A Practical Guide`,
          (q) => `${q}? Step by Step`,
        ]),
      },
      {
        pattern: 'Plain-English Explainer',
        category: 'Curiosity & Question',
        candidates: expand(fullVariants, [
          (q) => `${q}? Explained in Plain English`,
          (q) => `${q}? The Simple Explanation`,
          (q) => `${q}? Explained Simply`,
          (q) => `${q}? Plain English`,
        ]),
      },
      {
        pattern: 'Numbered Mistakes',
        category: 'List & Numbered',
        candidates: expand(fullVariants, [
          (q) => `${q}? 5 Common Myths Explained`,
          (q) => `${q}? 5 Surprising Facts`,
          (q) => `${q}? 5 Common Myths`,
          (q) => `${q}? 5 Key Facts`,
          (q) => `${q}? 5 Mistakes People Make`,
        ]),
      },
      {
        pattern: 'Direct Comparison',
        category: 'Comparison / Myth-Busting',
        candidates: expand(fullVariants, [
          (q) => `${q}? Myth vs. Real Evidence`,
          (q) => `${q}? Common Guess vs. Fact`,
          (q) => `${q}? Myth vs. Reality`,
          (q) => `${q}? Fact vs. Fiction`,
        ]),
      },
      {
        pattern: 'Open Question',
        category: 'Curiosity & Question',
        candidates: expand(fullVariants, [
          (q) => `${q}? Here Is the Real Answer`,
          (q) => `${q}? What Actually Happens`,
          (q) => `${q}? The Honest Answer`,
          (q) => `${q}? The Real Answer`,
        ]),
      },
      {
        pattern: 'Step-by-Step Checklist',
        category: 'How-To & Practical',
        candidates: expand(fullVariants, [
          (q) => (keyword ? `${keyword}: ${q}? Full Breakdown` : null),
          (q) => (keyword ? `${keyword}: ${q}?` : null),
          (q) => `${q}? A Step-by-Step Breakdown`,
          (q) => `${q}? A Clear Breakdown`,
          (q) => `${q}? Simple Breakdown`,
        ]),
      },
      {
        pattern: 'Zero-Fluff Breakdown',
        category: 'List & Numbered',
        candidates: expand(fullVariants, [
          (q) => `${q}? 3 Clear Takeaways to Know`,
          (q) => `${q}? 5 Things Worth Knowing`,
          (q) => `${q}? 3 Key Reasons`,
          (q) => `${q}? 3 Main Takeaways`,
        ]),
      },
      {
        pattern: 'Myth vs. Reality',
        category: 'Comparison / Myth-Busting',
        candidates: expand(fullVariants, [
          (q) => `${q}? Separating Fact From Hype`,
          (q) => `${q}? The Truth Without Hype`,
          (q) => `${q}? The Real Story`,
          (q) => `${q}? The Plain Truth`,
        ]),
      },
      {
        pattern: 'Short & Punchy',
        category: 'How-To & Practical',
        candidates: expand(fullVariants, [
          (q) => (keyword ? `${keyword}: ${q}? In 5 Min` : null),
          (q) => `${q}? Answered in Under 10 Minutes`,
          (q) => `${q}? Answered in 5 Minutes`,
          (q) => `${q}? Quick Answer`,
        ]),
      },
      {
        pattern: 'Curiosity Gap',
        category: 'Curiosity & Question',
        candidates: expand(fullVariants, [
          (q) => `${q}? The Detail Most People Miss`,
          (q) => `${q}? One Overlooked Factor`,
          (q) => `${q}? The Overlooked Reason`,
          (q) => `${q}? What People Miss`,
        ]),
      },
      {
        pattern: 'First-Timer Blueprint',
        category: 'List & Numbered',
        candidates: expand(fullVariants, [
          (q) => `${q}? 3 Facts Every Beginner Needs`,
          (q) => `${q}? 3 Simple Clues Explained`,
          (q) => `${q}? 3 Essential Facts`,
          (q) => `${q}? 3 Key Facts`,
        ]),
      },
      {
        pattern: 'Honest Breakdown',
        category: 'Comparison / Myth-Busting',
        candidates: expand(fullVariants, [
          (q) => `${q}? What the Evidence Shows`,
          (q) => `${q}? An Honest Breakdown`,
          (q) => `${q}? A Realistic Look`,
          (q) => `${q}? What Really Matters`,
        ]),
      },
    ];
  } else if (parsed.shape === 'how-to') {
    allPatterns = [
      {
        pattern: 'Clear How-To',
        category: 'How-To & Practical',
        candidates: expand(subjectVariants, [
          (t) => (benefit ? `How to ${t} and ${benefit}` : null),
          (t) => (benefit ? `${t}: How to ${benefit}` : null),
          (t) => `How to ${t} (Clear Beginner Guide)`,
          (t) => `How to ${t}: A Beginner Guide`,
          (t) => `How to ${t} Step by Step`,
          (t) => `How to ${t} Without Guesswork`,
          (t) => `How to ${t} Easily`,
        ]),
      },
      {
        pattern: 'Plain-English Explainer',
        category: 'Curiosity & Question',
        candidates: expand(subjectVariants, [
          (t) => `How to ${t}, Explained Simply`,
          (t) => `How to ${t} Without Confusion`,
          (t) => `The Simple Way to ${t} Today`,
          (t) => `How to ${t} for Beginners`,
          (t) => `How to ${t} in Plain English`,
        ]),
      },
      {
        pattern: 'Numbered Mistakes',
        category: 'List & Numbered',
        candidates: expand(subjectVariants, [
          (t) => `5 Mistakes Beginners Make Trying to ${t}`,
          (t) => `5 Common Mistakes When You ${t}`,
          (t) => `5 Mistakes to Avoid When You ${t}`,
          (t) => `5 Mistakes Trying to ${t}`,
        ]),
      },
      {
        pattern: 'Direct Comparison',
        category: 'Comparison / Myth-Busting',
        candidates: expand(subjectVariants, [
          (t) => `How to ${t}: What Works vs. What Fails`,
          (t) => `${t}: What Works vs. What Wastes Time`,
          (t) => `${t}: Simple vs. Overcomplicated`,
          (t) => `${t}: What Actually Works`,
        ]),
      },
      {
        pattern: 'Open Question',
        category: 'Curiosity & Question',
        candidates: expand(subjectVariants, [
          (t) => `What Makes It So Hard to ${t} at First?`,
          (t) => `Why Is It So Hard to ${t} at First?`,
          (t) => `Why Do Beginners Struggle to ${t}?`,
          (t) => `What Makes It So Hard to ${t}?`,
          (t) => `Why Is It Hard to ${t}?`,
        ]),
      },
      {
        pattern: 'Step-by-Step Checklist',
        category: 'How-To & Practical',
        candidates: expand(subjectVariants, [
          (t) => (keyword ? `${keyword}: A Simple Way to ${t}` : null),
          (t) => (keyword ? `${keyword}: How to ${t}` : null),
          (t) => `A Simple Step-by-Step Way to ${t}`,
          (t) => `A Simple Checklist to ${t}`,
          (t) => `The Simple Way to ${t}`,
        ]),
      },
      {
        pattern: 'Zero-Fluff Breakdown',
        category: 'List & Numbered',
        candidates: expand(subjectVariants, [
          (t) => `7 Practical Tips to ${t} More Easily`,
          (t) => `7 Practical Tips to ${t} Faster`,
          (t) => `7 Useful Tips to ${t} Right`,
          (t) => `7 Practical Tips to ${t}`,
        ]),
      },
      {
        pattern: 'Myth vs. Reality',
        category: 'Comparison / Myth-Busting',
        candidates: expand(subjectVariants, [
          (t) => `The Truth About Trying to ${t}`,
          (t) => `Common Myths When You Try to ${t}`,
          (t) => `Myths vs. Reality: How to ${t}`,
          (t) => `Common Myths About How to ${t}`,
        ]),
      },
      {
        pattern: 'Short & Punchy',
        category: 'How-To & Practical',
        candidates: expand(subjectVariants, [
          (t) => (keyword ? `${keyword}: How to ${t} in 10 Minutes` : null),
          (t) => (keyword ? `${keyword}: How to ${t} Fast` : null),
          (t) => `How to ${t} in Under 10 Minutes`,
          (t) => `Learn to ${t} in Under 10 Minutes`,
          (t) => `How to ${t} in 10 Minutes`,
        ]),
      },
      {
        pattern: 'Curiosity Gap',
        category: 'Curiosity & Question',
        candidates: expand(subjectVariants, [
          (t) => `The Overlooked Detail When You ${t}`,
          (t) => `What Most People Miss Trying to ${t}`,
          (t) => `One Key Detail Before You ${t}`,
          (t) => `One Step People Miss Trying to ${t}`,
        ]),
      },
      {
        pattern: 'First-Timer Blueprint',
        category: 'List & Numbered',
        candidates: expand(subjectVariants, [
          (t) => `3 Essential Steps Before You ${t}`,
          (t) => `3 Key Steps to ${t} Properly`,
          (t) => `3 Simple Steps to ${t} Well`,
          (t) => `3 First Steps to ${t}`,
        ]),
      },
      {
        pattern: 'Honest Breakdown',
        category: 'Comparison / Myth-Busting',
        candidates: expand(subjectVariants, [
          (t) => `Is It Worth Learning How to ${t}?`,
          (t) => `Should Beginners Learn How to ${t}?`,
          (t) => `Is It Easy to ${t} Yourself?`,
          (t) => `Should You Try to ${t}?`,
        ]),
      },
    ];
  } else if (parsed.shape === 'gerund') {
    allPatterns = [
      {
        pattern: 'Clear How-To',
        category: 'How-To & Practical',
        candidates: expand(subjectVariants, [
          (t) => (benefit ? `${t}: How to ${benefit}` : null),
          (t) => `A Clear Beginner Guide to ${t}`,
          (t) => `${t}: A Clear Beginner Guide`,
          (t) => `Beginner Guide to ${t}`,
          (t) => `${t} Step by Step`,
          (t) => `Getting Started With ${t}`,
        ]),
      },
      {
        pattern: 'Plain-English Explainer',
        category: 'Curiosity & Question',
        candidates: expand(subjectVariants, [
          (t) => `${t} Explained in Plain English`,
          (t) => `${t} Explained Simply for Beginners`,
          (t) => `A Plain-English Guide to ${t}`,
          (t) => `${t}, Explained Simply`,
        ]),
      },
      {
        pattern: 'Numbered Mistakes',
        category: 'List & Numbered',
        candidates: expand(subjectVariants, [
          (t) => `5 Mistakes to Avoid When ${t}`,
          (t) => `5 Common Mistakes When ${t}`,
          (t) => `5 Beginner Mistakes When ${t}`,
          (t) => `5 Mistakes People Make ${t}`,
        ]),
      },
      {
        pattern: 'Direct Comparison',
        category: 'Comparison / Myth-Busting',
        candidates: expand(subjectVariants, [
          (t) => `${t}: What Works vs. What Wastes Time`,
          (t) => `${t}: Simple vs. Overcomplicated`,
          (t) => `${t}: What Works vs. What Fails`,
          (t) => `${t}: Good vs. Bad Habits`,
        ]),
      },
      {
        pattern: 'Open Question',
        category: 'Curiosity & Question',
        candidates: expand(subjectVariants, [
          (t) => `Why Can ${t} Feel So Confusing at First?`,
          (t) => `What Makes ${t} Harder Than It Looks?`,
          (t) => `Why Can ${t} Feel Tricky at First?`,
          (t) => `Why Can ${t} Feel Confusing?`,
          (t) => `What Makes ${t} Easier?`,
        ]),
      },
      {
        pattern: 'Step-by-Step Checklist',
        category: 'How-To & Practical',
        candidates: expand(subjectVariants, [
          (t) => (keyword ? `${keyword}: A Simple Checklist for ${t}` : null),
          (t) => (keyword ? `${keyword}: Simple ${t} Setup` : null),
          (t) => `A Simple Workflow for ${t}`,
          (t) => `A Step-by-Step Checklist for ${t}`,
          (t) => `Simple Checklist for ${t}`,
        ]),
      },
      {
        pattern: 'Zero-Fluff Breakdown',
        category: 'List & Numbered',
        candidates: expand(subjectVariants, [
          (t) => (benefit ? `7 Tips for ${t} to ${benefit}` : null),
          (t) => `7 Practical Tips for ${t} Worth Knowing`,
          (t) => `7 Practical Tips for ${t}`,
          (t) => `7 Useful Tips for ${t}`,
          (t) => `5 Practical Tips for ${t}`,
        ]),
      },
      {
        pattern: 'Myth vs. Reality',
        category: 'Comparison / Myth-Busting',
        candidates: expand(subjectVariants, [
          (t) => `The Truth About ${t} (Without the Hype)`,
          (t) => `Common Myths About ${t} Explained`,
          (t) => `The Honest Truth About ${t}`,
          (t) => `${t}: Myth vs. Reality`,
          (t) => `The Truth About ${t}`,
        ]),
      },
      {
        pattern: 'Short & Punchy',
        category: 'How-To & Practical',
        candidates: expand(subjectVariants, [
          (t) => (keyword ? `${keyword}: ${t} in 10 Minutes` : null),
          (t) => `Learn ${t} in Under 10 Minutes`,
          (t) => `${t} Basics in Under 10 Minutes`,
          (t) => `${t} Fundamentals in 10 Minutes`,
          (t) => `${t} in Under 10 Minutes`,
        ]),
      },
      {
        pattern: 'Curiosity Gap',
        category: 'Curiosity & Question',
        candidates: expand(subjectVariants, [
          (t) => `The Overlooked Detail Behind Better ${t}`,
          (t) => `One Overlooked Detail About ${t}`,
          (t) => `What Most People Miss About ${t}`,
          (t) => `One Key Detail When ${t}`,
        ]),
      },
      {
        pattern: 'First-Timer Blueprint',
        category: 'List & Numbered',
        candidates: expand(subjectVariants, [
          (t) => `3 Essential Steps Before ${t}`,
          (t) => `3 Key Steps to Better ${t}`,
          (t) => `3 Simple Steps for ${t}`,
          (t) => `3 First Steps for ${t}`,
        ]),
      },
      {
        pattern: 'Honest Breakdown',
        category: 'Comparison / Myth-Busting',
        candidates: expand(subjectVariants, [
          (t) => `Is ${t} Worth Doing From Scratch?`,
          (t) => `Is ${t} Worth Starting as a Beginner?`,
          (t) => `Is ${t} Worth Your Time Today?`,
          (t) => `Is ${t} Worth Trying?`,
        ]),
      },
    ];
  } else {
    // Standard noun / concept phrase
    const verbWorks = parsed.isPlural ? 'Work' : 'Works';
    const verbIs = parsed.isPlural ? 'Are' : 'Is';

    allPatterns = [
      {
        pattern: 'Clear How-To',
        category: 'How-To & Practical',
        candidates: expand(subjectVariants, [
          (t) => (benefit ? `${t}: How to ${benefit}` : null),
          (t) => (benefit ? `Use ${t} to ${benefit}` : null),
          (t) => `How to Start ${t} (Clear Beginner Guide)`,
          (t) => `How to Start ${t}: A Beginner Guide`,
          (t) => `How to Start ${t} Step by Step`,
          (t) => `A Clear Beginner Guide to ${t}`,
          (t) => `How to Get Started With ${t}`,
          (t) => `Beginner Guide to ${t}`,
          (t) => `How to Start ${t}`,
        ]),
      },
      {
        pattern: 'Plain-English Explainer',
        category: 'Curiosity & Question',
        candidates: expand(subjectVariants, [
          (t) => `How ${t} Actually ${verbWorks}, Explained Simply`,
          (t) => `How ${t} ${verbWorks} in Plain English`,
          (t) => `${t} Explained Simply for Beginners`,
          (t) => `How ${t} Actually ${verbWorks} for Beginners`,
          (t) => `How ${t} Actually ${verbWorks}`,
          (t) => `${t} Explained Simply`,
        ]),
      },
      {
        pattern: 'Numbered Mistakes',
        category: 'List & Numbered',
        candidates: expand(
          bareVariants,
          parsed.hasPrepositionalTail
            ? [
                (t) => `5 Common Mistakes With ${t}`,
                (t) => `5 Mistakes Beginners Make With ${t}`,
                (t) => `5 Mistakes to Avoid With ${t}`,
                (t) => `5 Common Pitfalls in ${t}`,
              ]
            : [
                (t) => `5 Common ${t} Mistakes Beginners Should Avoid`,
                (t) => `5 ${t} Mistakes Beginners Can Easily Avoid`,
                (t) => `5 Common ${t} Mistakes to Avoid`,
                (t) => `5 ${t} Mistakes Beginners Make`,
                (t) => `5 ${t} Mistakes to Avoid`,
              ]
        ),
      },
      {
        pattern: 'Direct Comparison',
        category: 'Comparison / Myth-Busting',
        candidates: expand(subjectVariants, [
          (t) => `${t}: What Works vs. What Wastes Time`,
          (t) => `${t}: Simple vs. Overcomplicated`,
          (t) => `${t}: What Works vs. What Fails`,
          (t) => `${t}: Good vs. Bad Habits`,
          (t) => `${t}: What Actually Works`,
        ]),
      },
      {
        pattern: 'Open Question',
        category: 'Curiosity & Question',
        candidates: expand(subjectVariants, [
          (t) => `Why Can ${t} Feel So Confusing at First?`,
          (t) => `What Makes ${t} Harder Than It Looks?`,
          (t) => `Why Can ${t} Feel Confusing?`,
          (t) => `What Makes ${t} Matter So Much?`,
          (t) => `What Makes ${t} So Important?`,
        ]),
      },
      {
        pattern: 'Step-by-Step Checklist',
        category: 'How-To & Practical',
        candidates: expand(
          bareVariants,
          parsed.hasPrepositionalTail
            ? [
                (t) => (keyword ? `${keyword}: A Simple Checklist for ${t}` : null),
                (t) => `A Simple Checklist for ${t}`,
                (t) => `A Step-by-Step Workflow for ${t}`,
                (t) => `Simple Workflow for ${t}`,
              ]
            : [
                (t) => (keyword ? `${keyword}: A Simple ${t} Workflow` : null),
                (t) => (keyword ? `${keyword}: ${t} Checklist` : null),
                (t) => `A Simple ${t} Workflow Anyone Can Follow`,
                (t) => `A Simple Step-by-Step ${t} Checklist`,
                (t) => `Simple ${t} Checklist for Beginners`,
                (t) => `A Simple ${t} Workflow`,
                (t) => `Step-by-Step ${t} Checklist`,
              ]
        ),
      },
      {
        pattern: 'Zero-Fluff Breakdown',
        category: 'List & Numbered',
        candidates: expand(
          bareVariants,
          parsed.hasPrepositionalTail
            ? [
                (t) => (benefit ? `7 Tips for ${t} to ${benefit}` : null),
                (t) => `7 Practical Tips for ${t}`,
                (t) => `7 Useful Tips for ${t}`,
                (t) => `5 Practical Tips for ${t}`,
              ]
            : [
                (t) => (benefit ? `7 ${t} Tips to ${benefit}` : null),
                (t) => `7 Practical ${t} Tips Worth Knowing Early`,
                (t) => `7 Practical ${t} Tips for Beginners`,
                (t) => `7 Useful ${t} Tips to Know Early`,
                (t) => `7 Practical ${t} Tips`,
                (t) => `5 Practical ${t} Tips`,
              ]
        ),
      },
      {
        pattern: 'Myth vs. Reality',
        category: 'Comparison / Myth-Busting',
        candidates: expand(subjectVariants, [
          (t) => `The Truth About ${t} (Without the Hype)`,
          (t) =>
            parsed.hasPrepositionalTail
              ? `Common Myths About ${t} Explained`
              : `${t} Myths vs. Reality Explained`,
          (t) => `The Honest Truth About ${t}`,
          (t) => `${t}: Myth vs. Reality`,
          (t) => `The Truth About ${t}`,
        ]),
      },
      {
        pattern: 'Short & Punchy',
        category: 'How-To & Practical',
        candidates: expand(
          bareVariants,
          parsed.hasPrepositionalTail
            ? [
                (t) => (keyword ? `${keyword}: ${t} in 10 Minutes` : null),
                (t) => `Learn ${t} in Under 10 Minutes`,
                (t) => `${t} Explained in 10 Minutes`,
                (t) => `${t} in Under 10 Minutes`,
              ]
            : [
                (t) => (keyword ? `${keyword}: ${t} Basics in 10 Minutes` : null),
                (t) => (keyword ? `${keyword}: ${t} Basics Explained` : null),
                (t) => `Learn ${t} Basics in Under 10 Minutes`,
                (t) => `${t} Basics in Under 10 Minutes`,
                (t) => `${t} Fundamentals in 10 Minutes`,
                (t) => `${t} Basics in 10 Minutes`,
              ]
        ),
      },
      {
        pattern: 'Curiosity Gap',
        category: 'Curiosity & Question',
        candidates: expand(subjectVariants, [
          (t) => `The Overlooked Rule Behind Better ${t}`,
          (t) => `One Overlooked Detail About ${t}`,
          (t) => `What Most People Miss About ${t}`,
          (t) => `The Key Detail Behind ${t}`,
          (t) => `What People Miss About ${t}`,
        ]),
      },
      {
        pattern: 'First-Timer Blueprint',
        category: 'List & Numbered',
        candidates: expand(subjectVariants, [
          (t) => `3 Essential Steps Before You Try ${t}`,
          (t) => `3 Key Steps Before Starting ${t}`,
          (t) =>
            parsed.hasPrepositionalTail
              ? `3 Essential Steps for ${t}`
              : `3 Essential ${t} Steps for Beginners`,
          (t) => `3 First Steps to Start ${t}`,
          (t) => `3 First Steps for ${t}`,
        ]),
      },
      {
        pattern: 'Honest Breakdown',
        category: 'Comparison / Myth-Busting',
        candidates: expand(subjectVariants, [
          (t) => `${verbIs} ${t} Worth Learning From Scratch?`,
          (t) => `${verbIs} ${t} Worth Starting as a Beginner?`,
          (t) => `${verbIs} ${t} Worth Learning Today?`,
          (t) => `${verbIs} ${t} Worth Your Time?`,
          (t) => `${verbIs} ${t} Worth Learning?`,
        ]),
      },
    ];
  }

  const filtered =
    params.style === 'All Styles'
      ? allPatterns
      : allPatterns.filter((p) => p.category === params.style);

  const pool = filtered.length > 0 ? filtered : allPatterns;
  const offset = seed % pool.length;
  const ordered = [...pool.slice(offset), ...pool.slice(0, offset)];

  const usedTitles = new Set<string>();

  return ordered.map((item, index) => {
    const chosen = pickVerifiedTitle(item.candidates, usedTitles);
    // Final length verification before returning
    const text =
      chosen.length <= TITLE_MAX_CHARS
        ? chosen
        : condenseTitlePhrase(chosen, TITLE_MAX_CHARS);
    usedTitles.add(text.toLowerCase());

    return {
      id: `title-${seed}-${index}`,
      text,
      pattern: item.pattern,
      charCount: text.length,
      fitsMobile: text.length <= TITLE_MAX_CHARS,
    };
  });
}

export function generateVideoOutline(params: {
  topic: string;
  format: string;
  duration: string;
  keyPointsRaw: string;
}): OutlineSection[] {
  const topic = cleanInput(params.topic);
  const titled = toTitleCase(topic);
  const customPoints = params.keyPointsRaw
    .split(/[\n,]+/)
    .map((s) => cleanInput(s))
    .filter(Boolean);

  if (params.duration === 'Short (under 60s)') {
    const point1 = customPoints[0] || `the main thing beginners misunderstand about ${topic}`;
    const point2 = customPoints[1] || `one practical step you can test today`;
    return [
      {
        id: 'sec-1',
        timeRange: '0:00 – 0:06',
        heading: 'Immediate Visual Hook',
        narrationPrompt: `Open directly with the central question or contrast around ${titled}—skip "Hey guys, welcome back."`,
        visualCue: 'High-contrast text overlay (3–5 words max) over fast moving B-roll or zoomed screen action.',
        pacingTip: 'Aim for 12–16 spoken words with zero intro music fade-in.',
      },
      {
        id: 'sec-2',
        timeRange: '0:06 – 0:25',
        heading: 'Core Setup & Context',
        narrationPrompt: `Briefly explain ${point1} using one crisp, concrete example.`,
        visualCue: 'Switch visuals every 2–3 seconds (annotated screenshot, stock clip, or simple icon slide).',
        pacingTip: 'Keep sentences under 14 words so captions stay readable on mobile screens.',
      },
      {
        id: 'sec-3',
        timeRange: '0:25 – 0:46',
        heading: 'Actionable Payoff',
        narrationPrompt: `Deliver the main takeaway: ${point2}. Show the clear before-and-after difference.`,
        visualCue: 'Side-by-side comparison card or highlighted result frame.',
        pacingTip: 'Pause half a second right before the key reveal for natural emphasis.',
      },
      {
        id: 'sec-4',
        timeRange: '0:46 – 0:55',
        heading: 'Clean Wrap-Up',
        narrationPrompt: `Summarize in one short sentence and invite viewers to check the pinned comment or next related Short.`,
        visualCue: 'Clean final slide with subtle directional arrow to subscribe/comment.',
        pacingTip: 'End abruptly on value rather than dragging out a goodbye.',
      },
    ];
  }

  const isDeepDive = params.duration === 'Deep Dive (10–15 min)';
  const p1 = customPoints[0] || `Why ${topic} matters right now and what beginners usually overlook`;
  const p2 = customPoints[1] || `Core mechanics and step-by-step foundations of ${topic}`;
  const p3 = customPoints[2] || `Practical real-world example applying ${topic} from start to finish`;
  const p4 = customPoints[3] || `Common pitfalls, edge cases, and simple fixes`;

  const timestamps = isDeepDive
    ? ['0:00 – 0:40', '0:40 – 2:30', '2:30 – 5:45', '5:45 – 9:15', '9:15 – 11:30', '11:30 – 12:30']
    : ['0:00 – 0:30', '0:30 – 1:45', '1:45 – 3:45', '3:45 – 5:30', '5:30 – 6:45', '6:45 – 7:30'];

  const formatNote =
    params.format === 'Tutorial / How-To'
      ? 'Zoom smoothly into interface controls as you name each step.'
      : params.format === 'Documentary / Story'
        ? 'Use archival stills, timeline dates, and calm atmospheric B-roll.'
        : 'Use clean numbered slide transitions and contrast tables.';

  return [
    {
      id: 'sec-1',
      timeRange: timestamps[0],
      heading: 'Opening Hook & Promise',
      narrationPrompt: `Confirm what the viewer clicked for immediately: explain what this video on "${titled}" will clarify and why it matters.`,
      visualCue: '3–4 fast, relevant B-roll clips with a clear title card on screen.',
      pacingTip: 'Cut any channel intro logo; confirm the title promise within the first 15 seconds.',
    },
    {
      id: 'sec-2',
      timeRange: timestamps[1],
      heading: 'Context & Starting Point',
      narrationPrompt: `Cover: ${p1}. Establish the baseline problem in plain language without jargon.`,
      visualCue: formatNote,
      pacingTip: 'Keep energy steady and conversational—write how you speak aloud.',
    },
    {
      id: 'sec-3',
      timeRange: timestamps[2],
      heading: 'Part 1: Core Breakdown',
      narrationPrompt: `Walk through: ${p2}. Break this into 2–3 clear sub-points so viewers can follow visually.`,
      visualCue: 'Bullet-point summary slide appearing one line at a time synced with voiceover.',
      pacingTip: 'Insert a brief 1-second visual pause between sub-points.',
    },
    {
      id: 'sec-4',
      timeRange: timestamps[3],
      heading: 'Part 2: Concrete Example / Walkthrough',
      narrationPrompt: `Demonstrate: ${p3}. Show rather than just tell so the concept feels tangible.`,
      visualCue: 'Annotated screen recording, chart, or step-by-step visual sequence.',
      pacingTip: 'Re-hook viewer attention halfway by previewing what happens next.',
    },
    {
      id: 'sec-5',
      timeRange: timestamps[4],
      heading: 'Part 3: Mistakes to Avoid & Nuance',
      narrationPrompt: `Address: ${p4}. Explain one realistic limitation or nuance beginners run into.`,
      visualCue: 'Simple two-column comparison card ("Common Mistake" vs. "Better Approach").',
      pacingTip: 'Honest caveats build strong viewer trust and reduce confused comments.',
    },
    {
      id: 'sec-6',
      timeRange: timestamps[5],
      heading: 'Summary & Next Step',
      narrationPrompt: `Recap the single biggest takeaway on ${titled} in two sentences, and point viewers to one logical next video.`,
      visualCue: 'Clean end-screen card layout with space reserved for YouTube end-screen elements.',
      pacingTip: 'Keep the outro tight (20–30 seconds) so retention stays high through the final frame.',
    },
  ];
}

export function generateHooks(params: {
  topic: string;
  angle: string;
  persona: string;
  variationSeed?: number;
}): HookSuggestion[] {
  const topic = cleanInput(params.topic);
  const cleanTopic = stripLeadingHowTo(topic);
  const persona = cleanInput(params.persona) || 'beginners';
  const seed = params.variationSeed ?? 0;

  const estimate = (line: string) => {
    const words = line.trim().split(/\s+/).filter(Boolean).length;
    const secs = Math.max(4, Math.round((words / 145) * 60));
    return {words, secs};
  };

  const hooksData: {angleLabel: string; category: string; spokenLine: string; visual: string}[] = [
    {
      angleLabel: 'Open Loop / Curiosity',
      category: 'Open Loop / Curiosity',
      spokenLine: `Most ${persona} assume ${cleanTopic} takes complicated tools or hours of guesswork. Yet one overlooked detail changes how the entire process works—and once you see it, the rest clicks into place.`,
      visual: 'Start on a calm close-up visual, then reveal a simple 2-part diagram as you say "one overlooked detail."',
    },
    {
      angleLabel: 'Relatable Pain Point',
      category: 'Relatable Pain Point',
      spokenLine: `If you have ever tried figuring out ${cleanTopic} and stopped halfway because every explanation sounded overly technical, you are not alone. Let's walk through it in plain English, step by step.`,
      visual: 'Show cluttered notes or overwhelming tabs briefly, then cut cleanly to a blank structured checklist.',
    },
    {
      angleLabel: 'Surprising Contrast',
      category: 'Surprising Contrast',
      spokenLine: `Two people can spend the exact same amount of time on ${cleanTopic} and end up with completely different results. The difference rarely comes down to luck—it comes down to the order you do these three things.`,
      visual: 'Split-screen "Approach A vs. Approach B" slide with crisp navy and cyan labels.',
    },
    {
      angleLabel: 'Direct Promise / Preview',
      category: 'Direct Promise / Preview',
      spokenLine: `In the next few minutes, we are breaking down ${cleanTopic} from scratch—no fluff, no filler, and no expensive software required. Here is the exact starting framework.`,
      visual: 'Clean title card fading straight into step 1 of your screen recording or B-roll.',
    },
    {
      angleLabel: 'Short-Form Fast Start',
      category: 'Short-Form Fast Start',
      spokenLine: `Here is the simplest way to understand ${cleanTopic} in under sixty seconds—and the one mistake almost everyone makes first.`,
      visual: 'Bold 4-word kinetic caption center-frame over immediate movement in frame 1.',
    },
    {
      angleLabel: 'Quiet Documentary Lead',
      category: 'Open Loop / Curiosity',
      spokenLine: `At first glance, ${cleanTopic} looks completely straightforward. But look closer at how it started, and a much more interesting pattern appears.`,
      visual: 'Slow zoom into an archival photo or map with subtle chapter date in the corner.',
    },
    {
      angleLabel: 'Practical Checklist Hook',
      category: 'Direct Promise / Preview',
      spokenLine: `Before you spend another afternoon researching ${cleanTopic}, save yourself the trial and error. Here are the three fundamentals that actually matter when you are starting out.`,
      visual: 'Three numbered blank lines appearing one by one on a clean white background.',
    },
  ];

  const matching =
    params.angle === 'All Angles'
      ? hooksData
      : hooksData.filter((h) => h.category === params.angle);

  const pool = matching.length >= 3 ? matching : hooksData;
  const offset = seed % pool.length;
  const ordered = [...pool.slice(offset), ...pool.slice(0, offset)].slice(0, 6);

  return ordered.map((item, idx) => {
    const {words, secs} = estimate(item.spokenLine);
    return {
      id: `hook-${seed}-${idx}`,
      angleLabel: item.angleLabel,
      spokenLine: item.spokenLine,
      openingVisualCue: item.visual,
      estimatedSeconds: secs,
      wordCount: words,
    };
  });
}

export function formatYouTubeDescription(params: {
  summary: string;
  chaptersRaw: string;
  resourcesRaw: string;
  cta: string;
  hashtagsRaw: string;
}): {
  formattedText: string;
  aboveTheFoldPreview: string;
  charCount: number;
  chapterWarnings: string[];
} {
  const summary = params.summary.trim();
  const chaptersLines = params.chaptersRaw
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
  const resourcesLines = params.resourcesRaw
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
  const cta = params.cta.trim();

  const chapterWarnings: string[] = [];
  const timestampRegex = /^(\d{1,2}:)?\d{1,2}:\d{2}\s+.+/;

  if (chaptersLines.length > 0) {
    const firstStartsAtZero = /^0{1,2}:00\b/.test(chaptersLines[0]);
    if (!firstStartsAtZero) {
      chapterWarnings.push(
        'YouTube chapters require the first timestamp to start at 00:00 (e.g., "00:00 Intro").'
      );
    }
    if (chaptersLines.length < 3) {
      chapterWarnings.push('YouTube displays interactive chapters only when at least 3 timestamps are listed.');
    }
    chaptersLines.forEach((line, i) => {
      if (!timestampRegex.test(line)) {
        chapterWarnings.push(`Chapter line ${i + 1} ("${line.slice(0, 28)}") should start with MM:SS followed by a label.`);
      }
    });
  }

  const hashtags = params.hashtagsRaw
    .split(/[\s,]+/)
    .map((tag) => tag.replace(/[^a-zA-Z0-9_]/g, ''))
    .filter(Boolean)
    .slice(0, 5)
    .map((tag) => `#${tag}`);

  const blocks: string[] = [];

  if (summary) {
    blocks.push(summary);
  }

  if (chaptersLines.length > 0) {
    blocks.push(`Chapters:\n${chaptersLines.join('\n')}`);
  }

  if (resourcesLines.length > 0) {
    blocks.push(`Resources & References:\n${resourcesLines.map((r) => `- ${r}`).join('\n')}`);
  }

  if (cta) {
    blocks.push(cta);
  }

  if (hashtags.length > 0) {
    blocks.push(hashtags.join(' '));
  }

  const formattedText = blocks.join('\n\n');
  const aboveTheFoldPreview = summary
    ? summary.slice(0, 150) + (summary.length > 150 ? '…' : '')
    : 'Your opening 150 characters appear here before viewers click "More".';

  return {
    formattedText,
    aboveTheFoldPreview,
    charCount: formattedText.length,
    chapterWarnings,
  };
}

export function analyzeScriptText(text: string, wpm: number): ScriptAnalysis {
  const trimmed = text.trim();
  if (!trimmed) {
    return {
      wordCount: 0,
      charCountWithSpaces: text.length,
      charCountNoSpaces: 0,
      sentenceCount: 0,
      paragraphCount: 0,
      estimatedSeconds: 0,
      formattedDuration: '0:00',
      isShortsLength: true,
      avgWordsPerSentence: 0,
      longSentences: [],
    };
  }

  const words = trimmed.split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const charCountWithSpaces = text.length;
  const charCountNoSpaces = text.replace(/\s+/g, '').length;

  const rawSentences = trimmed
    .split(/(?<=[.!?])\s+|\n+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
  const sentenceCount = rawSentences.length;

  const paragraphs = trimmed
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  const paragraphCount = paragraphs.length;

  const safeWpm = Math.max(80, Math.min(240, wpm));
  const estimatedSeconds = Math.round((wordCount / safeWpm) * 60);
  const mins = Math.floor(estimatedSeconds / 60);
  const secs = estimatedSeconds % 60;
  const formattedDuration = `${mins}:${secs.toString().padStart(2, '0')}`;

  const avgWordsPerSentence = sentenceCount > 0 ? Math.round((wordCount / sentenceCount) * 10) / 10 : 0;

  const longSentences = rawSentences
    .map((sentence, idx) => {
      const sWords = sentence.split(/\s+/).filter(Boolean).length;
      return {
        index: idx + 1,
        wordCount: sWords,
        preview: sentence.length > 110 ? `${sentence.slice(0, 107)}...` : sentence,
      };
    })
    .filter((item) => item.wordCount > 24);

  return {
    wordCount,
    charCountWithSpaces,
    charCountNoSpaces,
    sentenceCount,
    paragraphCount,
    estimatedSeconds,
    formattedDuration,
    isShortsLength: estimatedSeconds <= 58,
    avgWordsPerSentence,
    longSentences,
  };
}
