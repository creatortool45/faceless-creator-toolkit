import type {ToolMetadata} from '../types/toolkit';

export const TOOLS_CATALOG: ToolMetadata[] = [
  {
    id: 'video-idea-generator',
    name: 'Video Idea Generator',
    shortName: 'Idea Generator',
    category: 'Ideation',
    summary:
      'Turn any topic into structured faceless video concepts with visual direction and viewer takeaways.',
    bestFor: 'Overcoming blank-page syndrome before writing a script.',
  },
  {
    id: 'niche-explorer',
    name: 'Niche Explorer',
    shortName: 'Niche Explorer',
    category: 'Strategy',
    summary:
      'Browse realistic faceless channel categories filtered by production style, visual assets, and beginner difficulty.',
    bestFor: 'Choosing a sustainable channel focus you can actually produce.',
  },
  {
    id: 'youtube-title-generator',
    name: 'YouTube Title Generator',
    shortName: 'Title Generator',
    category: 'Packaging',
    summary:
      'Draft clear, curiosity-driven titles with live mobile character-limit checks under 60 characters.',
    bestFor: 'Comparing readable title angles without resorting to spam.',
  },
  {
    id: 'video-outline-maker',
    name: 'Video Outline Maker',
    shortName: 'Outline Maker',
    category: 'Scripting',
    summary:
      'Build a timestamped script structure pairing voiceover beats with matching B-roll or screen visuals.',
    bestFor: 'Keeping narration focused from intro hook to final wrap-up.',
  },
  {
    id: 'hook-generator',
    name: 'Hook Generator',
    shortName: 'Hook Generator',
    category: 'Scripting',
    summary:
      'Create 15-to-30 second spoken openings with first-frame visual cues and estimated reading times.',
    bestFor: 'Giving viewers a clear reason to stay past the first 10 seconds.',
  },
  {
    id: 'description-formatter',
    name: 'Description Formatter',
    shortName: 'Description Formatter',
    category: 'Publishing',
    summary:
      'Format clean YouTube descriptions with validated timestamps, resource links, and above-the-fold previews.',
    bestFor: 'Preparing tidy, navigable upload metadata in under two minutes.',
  },
  {
    id: 'production-planner',
    name: 'Production Planner',
    shortName: 'Production Planner',
    category: 'Workflow',
    summary:
      'Track each video from research and voiceover to editing and upload using a browser-saved checklist.',
    bestFor: 'Staying consistent across weekly uploads without external software.',
  },
  {
    id: 'word-counter',
    name: 'Word Counter',
    shortName: 'Word Counter',
    category: 'Scripting',
    summary:
      'Measure script length, estimated voiceover runtime by speaking pace, and overly long sentences.',
    bestFor: 'Timing Shorts under 60 seconds and spotting breathless sentences.',
  },
];
