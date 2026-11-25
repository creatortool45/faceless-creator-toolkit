export type PageRoute =
  | 'home'
  | 'tools'
  | 'about'
  | 'contact'
  | 'privacy'
  | 'terms';

export type ToolId =
  | 'video-idea-generator'
  | 'niche-explorer'
  | 'youtube-title-generator'
  | 'video-outline-maker'
  | 'hook-generator'
  | 'description-formatter'
  | 'production-planner'
  | 'word-counter';

export interface ToolMetadata {
  id: ToolId;
  name: string;
  shortName: string;
  category: string;
  summary: string;
  bestFor: string;
}

export interface HandoffPayload {
  topic?: string;
  title?: string;
  scriptText?: string;
  niche?: string;
}

export interface VideoIdea {
  id: string;
  titleConcept: string;
  angle: string;
  visualApproach: string;
  viewerTakeaway: string;
  suggestedLength: string;
}

export interface NicheItem {
  id: string;
  name: string;
  category:
    | 'Education & Explainers'
    | 'History & Mystery'
    | 'Tech & Productivity'
    | 'Finance & Career'
    | 'Health & Science'
    | 'Culture & Media';
  productionStyle:
    | 'Stock Footage + Voiceover'
    | 'Screen Recording + Tutorial'
    | '2D Motion / Slides'
    | 'Ambient / Lo-Fi Visuals';
  difficulty: 'Beginner-Friendly' | 'Moderate';
  evergreenPotential: 'High' | 'Balanced';
  overview: string;
  visualWorkflow: string;
  beginnerPitfall: string;
  starterTopics: string[];
}

export interface TitleSuggestion {
  id: string;
  text: string;
  pattern: string;
  charCount: number;
  fitsMobile: boolean;
}

export interface OutlineSection {
  id: string;
  timeRange: string;
  heading: string;
  narrationPrompt: string;
  visualCue: string;
  pacingTip: string;
}

export interface HookSuggestion {
  id: string;
  angleLabel: string;
  spokenLine: string;
  openingVisualCue: string;
  estimatedSeconds: number;
  wordCount: number;
}

export interface ProductionStep {
  id: string;
  label: string;
  completed: boolean;
}

export interface ProductionProject {
  id: string;
  title: string;
  niche: string;
  format: 'Long-Form' | 'YouTube Shorts';
  targetDate: string;
  notes: string;
  steps: ProductionStep[];
  createdAt: string;
}

export interface ScriptAnalysis {
  wordCount: number;
  charCountWithSpaces: number;
  charCountNoSpaces: number;
  sentenceCount: number;
  paragraphCount: number;
  estimatedSeconds: number;
  formattedDuration: string;
  isShortsLength: boolean;
  avgWordsPerSentence: number;
  longSentences: {index: number; wordCount: number; preview: string}[];
}
