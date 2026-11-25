import {ArrowRight, Lightbulb, RefreshCw} from 'lucide-react';
import {useEffect, useState, type FormEvent} from 'react';
import type {HandoffPayload, ToolId, VideoIdea} from '../../types/toolkit';
import {generateVideoIdeas} from '../../utils/generators';
import {CopyButton} from '../CopyButton';
import {ToolDisclaimer} from '../ToolDisclaimer';

interface VideoIdeaGeneratorProps {
  handoff?: HandoffPayload;
  onHandoffToTool: (toolId: ToolId, payload: HandoffPayload) => void;
}

const FORMAT_OPTIONS = [
  'Long-Form (8-15 min)',
  'YouTube Shorts (<60s)',
  'Listicle / Countdown',
  'Deep-Dive Explainer',
  'Storytelling / Documentary',
];

const AUDIENCE_OPTIONS = ['Complete Beginners', 'Curious Generalists', 'Hobbyists'];

const TONE_OPTIONS = ['Educational', 'Mystery / Investigative', 'Calm & Minimal', 'Practical Step-by-Step'];

const EXAMPLE_TOPICS = ['Home Coffee Brewing', 'Personal Budgeting', 'Sleep Habits', 'Spreadsheet Shortcuts'];

export function VideoIdeaGenerator({handoff, onHandoffToTool}: VideoIdeaGeneratorProps) {
  const [topic, setTopic] = useState(handoff?.topic ?? '');
  const [format, setFormat] = useState(FORMAT_OPTIONS[0]);
  const [audience, setAudience] = useState(AUDIENCE_OPTIONS[0]);
  const [tone, setTone] = useState(TONE_OPTIONS[0]);
  const [seed, setSeed] = useState(0);
  const [error, setError] = useState('');
  const [ideas, setIdeas] = useState<VideoIdea[]>([]);

  useEffect(() => {
    if (handoff?.topic) {
      setTopic(handoff.topic);
      setError('');
      setIdeas(
        generateVideoIdeas({
          topic: handoff.topic,
          format,
          audience,
          tone,
          variationSeed: 0,
        })
      );
    }
  }, [handoff?.topic]);

  const runGeneration = (nextTopic: string, nextSeed: number) => {
    const cleaned = nextTopic.trim();
    if (cleaned.length < 2) {
      setError('Please enter a topic or niche with at least 2 characters.');
      return;
    }
    setError('');
    setSeed(nextSeed);
    setIdeas(
      generateVideoIdeas({
        topic: cleaned,
        format,
        audience,
        tone,
        variationSeed: nextSeed,
      })
    );
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    runGeneration(topic, 0);
  };

  const handleLoadExample = (example: string) => {
    setTopic(example);
    runGeneration(example, 0);
  };

  const allIdeasText = ideas
    .map(
      (idea, i) =>
        `${i + 1}. ${idea.titleConcept}\n   Angle: ${idea.angle}\n   Visuals: ${idea.visualApproach}\n   Takeaway: ${idea.viewerTakeaway}`
    )
    .join('\n\n');

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="font-display text-2xl font-bold text-[#0B1F3B]">Video Idea Generator</h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
          Enter any subject to brainstorm faceless video angles complete with visual directions you
          can film using screen recordings, stock clips, or simple slides.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 space-y-5"
      >
        <div className="space-y-2">
          <label htmlFor="idea-topic" className="block text-sm font-semibold text-[#0B1F3B]">
            Topic or Niche <span className="text-red-600">*</span>
          </label>
          <input
            id="idea-topic"
            type="text"
            value={topic}
            onChange={(e) => {
              setTopic(e.target.value);
              if (error) setError('');
            }}
            placeholder="e.g., Indoor houseplants, urban train design, beginner photography"
            className="w-full min-h-[44px] rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-[#0B1F3B] placeholder:text-slate-400 focus:border-[#06B6D4] focus:outline-none"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? 'idea-topic-error' : undefined}
          />
          {error && (
            <p id="idea-topic-error" role="alert" className="text-xs font-medium text-red-700">
              {error}
            </p>
          )}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs text-slate-500">Try an example:</span>
            {EXAMPLE_TOPICS.map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => handleLoadExample(ex)}
                className="text-xs font-medium text-[#0E7490] hover:text-[#0B1F3B] underline underline-offset-2 cursor-pointer py-1"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="idea-format" className="block text-xs font-semibold text-[#0B1F3B]">
              Video Format
            </label>
            <select
              id="idea-format"
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="w-full min-h-[44px] rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-[#0B1F3B] focus:border-[#06B6D4] focus:outline-none"
            >
              {FORMAT_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="idea-audience" className="block text-xs font-semibold text-[#0B1F3B]">
              Viewer Experience
            </label>
            <select
              id="idea-audience"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="w-full min-h-[44px] rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-[#0B1F3B] focus:border-[#06B6D4] focus:outline-none"
            >
              {AUDIENCE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="idea-tone" className="block text-xs font-semibold text-[#0B1F3B]">
              Narration Tone
            </label>
            <select
              id="idea-tone"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full min-h-[44px] rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-[#0B1F3B] focus:border-[#06B6D4] focus:outline-none"
            >
              {TONE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-lg bg-[#0B1F3B] text-white text-sm font-semibold hover:bg-[#13325C] transition-colors cursor-pointer"
          >
            <Lightbulb className="w-4 h-4 text-[#22D3EE]" aria-hidden="true" />
            Generate Video Ideas
          </button>

          {ideas.length > 0 && (
            <button
              type="button"
              onClick={() => runGeneration(topic, seed + 1)}
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-[#0B1F3B] text-sm font-medium hover:border-[#06B6D4] transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" aria-hidden="true" />
              Shuffle Angles
            </button>
          )}
        </div>
      </form>

      <ToolDisclaimer message="These concepts are structured starting ideas for planning your video—success still depends on your script research, editing clarity, and consistency." />

      {ideas.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/70 p-8 text-center space-y-3">
          <p className="font-display text-base font-semibold text-[#0B1F3B]">
            Ready when you have a topic
          </p>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Enter a topic above and choose your preferred format to receive six faceless video
            concepts with visual production notes.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-semibold text-[#0B1F3B] tabular-nums">
              Showing {ideas.length} concept ideas
            </p>
            <CopyButton text={allIdeasText} label="Copy All Ideas" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ideas.map((idea, idx) => (
              <article
                key={idea.id}
                className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 space-y-4"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-500">
                    <span>
                      Concept <span className="tabular-nums font-medium">0{idx + 1}</span> ·{' '}
                      {idea.suggestedLength}
                    </span>
                  </div>
                  <h3 className="font-display text-base font-bold text-[#0B1F3B] leading-snug">
                    {idea.titleConcept}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{idea.angle}</p>
                  <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs leading-relaxed text-slate-600">
                    <p>
                      <span className="font-semibold text-[#0B1F3B]">Faceless visual idea:</span>{' '}
                      {idea.visualApproach}
                    </p>
                    <p>
                      <span className="font-semibold text-[#0B1F3B]">Viewer takeaway:</span>{' '}
                      {idea.viewerTakeaway}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
                  <CopyButton
                    text={`${idea.titleConcept}\n\nVisual idea: ${idea.visualApproach}\nTakeaway: ${idea.viewerTakeaway}`}
                    label="Copy Idea"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      onHandoffToTool('video-outline-maker', {
                        topic: idea.titleConcept,
                      })
                    }
                    className="inline-flex items-center gap-1 min-h-[40px] px-2.5 text-xs font-semibold text-[#0E7490] hover:text-[#0B1F3B] transition-colors cursor-pointer"
                  >
                    Build Outline
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
