import {ArrowRight, RefreshCw, Sparkles} from 'lucide-react';
import {useEffect, useState, type FormEvent} from 'react';
import type {HandoffPayload, HookSuggestion, ToolId} from '../../types/toolkit';
import {generateHooks} from '../../utils/generators';
import {CopyButton} from '../CopyButton';
import {ToolDisclaimer} from '../ToolDisclaimer';

interface HookGeneratorProps {
  handoff?: HandoffPayload;
  onHandoffToTool: (toolId: ToolId, payload: HandoffPayload) => void;
}

const ANGLE_OPTIONS = [
  'All Angles',
  'Open Loop / Curiosity',
  'Relatable Pain Point',
  'Surprising Contrast',
  'Direct Promise / Preview',
  'Short-Form Fast Start',
];

export function HookGenerator({handoff, onHandoffToTool}: HookGeneratorProps) {
  const [topic, setTopic] = useState(handoff?.topic ?? '');
  const [angle, setAngle] = useState('All Angles');
  const [persona, setPersona] = useState('');
  const [seed, setSeed] = useState(0);
  const [error, setError] = useState('');
  const [hooks, setHooks] = useState<HookSuggestion[]>([]);

  useEffect(() => {
    if (handoff?.topic) {
      setTopic(handoff.topic);
      setError('');
      setHooks(
        generateHooks({
          topic: handoff.topic,
          angle,
          persona,
          variationSeed: 0,
        })
      );
    }
  }, [handoff?.topic]);

  const runGenerate = (nextTopic: string, nextSeed: number) => {
    const cleaned = nextTopic.trim();
    if (cleaned.length < 2) {
      setError('Please enter your video topic (at least 2 characters).');
      return;
    }
    setError('');
    setSeed(nextSeed);
    setHooks(
      generateHooks({
        topic: cleaned,
        angle,
        persona,
        variationSeed: nextSeed,
      })
    );
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    runGenerate(topic, 0);
  };

  const allHooksText = hooks
    .map(
      (h, i) =>
        `${i + 1}. [${h.angleLabel} · ~${h.estimatedSeconds}s]\n"${h.spokenLine}"\nFirst-frame visual: ${h.openingVisualCue}`
    )
    .join('\n\n');

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="font-display text-2xl font-bold text-[#0B1F3B]">Hook Generator</h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
          Draft concise spoken openings paired with first-3-second visual cues so viewers know
          immediately what your faceless video delivers.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 space-y-5"
      >
        <div className="space-y-2">
          <label htmlFor="hook-topic" className="block text-sm font-semibold text-[#0B1F3B]">
            Video Topic or Working Title <span className="text-red-600">*</span>
          </label>
          <input
            id="hook-topic"
            type="text"
            value={topic}
            onChange={(e) => {
              setTopic(e.target.value);
              if (error) setError('');
            }}
            placeholder="e.g., Why roundabouts reduce traffic collisions"
            className="w-full min-h-[44px] rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-[#0B1F3B] placeholder:text-slate-400 focus:border-[#06B6D4] focus:outline-none"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? 'hook-topic-error' : undefined}
          />
          {error && (
            <p id="hook-topic-error" role="alert" className="text-xs font-medium text-red-700">
              {error}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="hook-angle" className="block text-xs font-semibold text-[#0B1F3B]">
              Opening Angle
            </label>
            <select
              id="hook-angle"
              value={angle}
              onChange={(e) => setAngle(e.target.value)}
              className="w-full min-h-[44px] rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-[#0B1F3B] focus:border-[#06B6D4] focus:outline-none"
            >
              {ANGLE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="hook-persona" className="block text-xs font-semibold text-[#0B1F3B]">
              Target Viewer Group (optional)
            </label>
            <input
              id="hook-persona"
              type="text"
              value={persona}
              onChange={(e) => setPersona(e.target.value)}
              placeholder="e.g., students, first-time editors, travelers"
              className="w-full min-h-[44px] rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-[#0B1F3B] placeholder:text-slate-400 focus:border-[#06B6D4] focus:outline-none"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-lg bg-[#0B1F3B] text-white text-sm font-semibold hover:bg-[#13325C] transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#22D3EE]" aria-hidden="true" />
            Generate Hook Drafts
          </button>

          {hooks.length > 0 && (
            <button
              type="button"
              onClick={() => runGenerate(topic, seed + 1)}
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-[#0B1F3B] text-sm font-medium hover:border-[#06B6D4] transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" aria-hidden="true" />
              Shuffle Drafts
            </button>
          )}
        </div>
      </form>

      <ToolDisclaimer message="Read each hook aloud before recording to match your natural breathing pace and verify it fits your video's real promise." />

      {hooks.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/70 p-8 text-center space-y-2">
          <p className="font-display text-base font-semibold text-[#0B1F3B]">
            Ready to write your opening 15 seconds
          </p>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Enter a topic above to see six spoken hook options with estimated speaking duration and
            first-frame visual cues.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-semibold text-[#0B1F3B] tabular-nums">
              {hooks.length} opening hook drafts (estimated at ~145 WPM)
            </p>
            <CopyButton text={allHooksText} label="Copy All Hooks" />
          </div>

          <div className="grid grid-cols-1 gap-4">
            {hooks.map((hook) => (
              <article
                key={hook.id}
                className="rounded-xl border border-slate-200 bg-white p-5 space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                  <div>
                    <span className="font-semibold text-[#0E7490]">{hook.angleLabel}</span>
                    <span aria-hidden="true"> · </span>
                    <span className="font-mono tabular-nums">{hook.wordCount} words</span>
                    <span aria-hidden="true"> · </span>
                    <span className="font-mono tabular-nums">~{hook.estimatedSeconds}s spoken</span>
                  </div>
                </div>

                <blockquote className="text-base font-medium text-[#0B1F3B] leading-relaxed">
                  “{hook.spokenLine}”
                </blockquote>

                <p className="text-xs sm:text-sm text-slate-600 pt-2 border-t border-slate-100">
                  <span className="font-semibold text-[#0B1F3B]">Opening visual cue:</span>{' '}
                  {hook.openingVisualCue}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <CopyButton text={hook.spokenLine} label="Copy Hook Text" />
                  <button
                    type="button"
                    onClick={() =>
                      onHandoffToTool('word-counter', {
                        scriptText: hook.spokenLine,
                      })
                    }
                    className="inline-flex items-center gap-1 min-h-[40px] px-2.5 text-xs font-semibold text-[#0E7490] hover:text-[#0B1F3B] cursor-pointer"
                  >
                    Time in Word Counter
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
