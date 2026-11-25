import {ArrowRight, ListTree} from 'lucide-react';
import {useEffect, useState, type FormEvent} from 'react';
import type {HandoffPayload, OutlineSection, ToolId} from '../../types/toolkit';
import {generateVideoOutline} from '../../utils/generators';
import {CopyButton} from '../CopyButton';
import {ToolDisclaimer} from '../ToolDisclaimer';

interface VideoOutlineMakerProps {
  handoff?: HandoffPayload;
  onHandoffToTool: (toolId: ToolId, payload: HandoffPayload) => void;
}

const FORMAT_OPTIONS = [
  'Tutorial / How-To',
  'Top 5 / Listicle',
  'Documentary / Story',
  'Problem-Solution Explainer',
];

const DURATION_OPTIONS = ['Short (under 60s)', 'Standard (5–8 min)', 'Deep Dive (10–15 min)'];

export function VideoOutlineMaker({handoff, onHandoffToTool}: VideoOutlineMakerProps) {
  const [topic, setTopic] = useState(handoff?.topic ?? '');
  const [format, setFormat] = useState(FORMAT_OPTIONS[0]);
  const [duration, setDuration] = useState(DURATION_OPTIONS[1]);
  const [keyPointsRaw, setKeyPointsRaw] = useState('');
  const [error, setError] = useState('');
  const [sections, setSections] = useState<OutlineSection[]>([]);

  useEffect(() => {
    if (handoff?.topic) {
      setTopic(handoff.topic);
      setError('');
      setSections(
        generateVideoOutline({
          topic: handoff.topic,
          format,
          duration,
          keyPointsRaw,
        })
      );
    }
  }, [handoff?.topic]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const cleaned = topic.trim();
    if (cleaned.length < 2) {
      setError('Please enter a working video title or topic (at least 2 characters).');
      return;
    }
    setError('');
    setSections(
      generateVideoOutline({
        topic: cleaned,
        format,
        duration,
        keyPointsRaw,
      })
    );
  };

  const fullOutlineText = sections
    .map(
      (s) =>
        `[${s.timeRange}] ${s.heading}\nNarration: ${s.narrationPrompt}\nVisual Cue: ${s.visualCue}\nPacing Note: ${s.pacingTip}`
    )
    .join('\n\n');

  const narrationDraftText = sections
    .map((s) => `${s.heading}\n${s.narrationPrompt}`)
    .join('\n\n');

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="font-display text-2xl font-bold text-[#0B1F3B]">Video Outline Maker</h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
          Map out a timestamped faceless script skeleton pairing every voiceover beat with a
          concrete visual cue so editing stays organized.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 space-y-5"
      >
        <div className="space-y-2">
          <label htmlFor="outline-topic" className="block text-sm font-semibold text-[#0B1F3B]">
            Video Title or Topic <span className="text-red-600">*</span>
          </label>
          <input
            id="outline-topic"
            type="text"
            value={topic}
            onChange={(e) => {
              setTopic(e.target.value);
              if (error) setError('');
            }}
            placeholder="e.g., How to remove background echo in Audacity for free"
            className="w-full min-h-[44px] rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-[#0B1F3B] placeholder:text-slate-400 focus:border-[#06B6D4] focus:outline-none"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? 'outline-topic-error' : undefined}
          />
          {error && (
            <p id="outline-topic-error" role="alert" className="text-xs font-medium text-red-700">
              {error}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="outline-format" className="block text-xs font-semibold text-[#0B1F3B]">
              Structure Type
            </label>
            <select
              id="outline-format"
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
            <label htmlFor="outline-duration" className="block text-xs font-semibold text-[#0B1F3B]">
              Target Video Length
            </label>
            <select
              id="outline-duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full min-h-[44px] rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-[#0B1F3B] focus:border-[#06B6D4] focus:outline-none"
            >
              {DURATION_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="outline-points" className="block text-xs font-semibold text-[#0B1F3B]">
            Key Points to Include (optional, one per line or comma-separated)
          </label>
          <textarea
            id="outline-points"
            rows={3}
            value={keyPointsRaw}
            onChange={(e) => setKeyPointsRaw(e.target.value)}
            placeholder="e.g., Recording room setup, Noise reduction filter, Export volume levels"
            className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-[#0B1F3B] placeholder:text-slate-400 focus:border-[#06B6D4] focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-lg bg-[#0B1F3B] text-white text-sm font-semibold hover:bg-[#13325C] transition-colors cursor-pointer"
        >
          <ListTree className="w-4 h-4 text-[#22D3EE]" aria-hidden="true" />
          Build Video Outline
        </button>
      </form>

      <ToolDisclaimer message="Outlines provide pacing benchmarks and section prompts—adjust timestamps and talking points to match your real research." />

      {sections.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/70 p-8 text-center space-y-2">
          <p className="font-display text-base font-semibold text-[#0B1F3B]">
            No outline generated yet
          </p>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Add your topic and target duration above to generate a timestamped outline with B-roll
            and pacing notes.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-semibold text-[#0B1F3B] tabular-nums">
              {sections.length} outline sections ({duration})
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <CopyButton text={fullOutlineText} label="Copy Full Outline" />
              <button
                type="button"
                onClick={() =>
                  onHandoffToTool('word-counter', {
                    scriptText: narrationDraftText,
                  })
                }
                className="inline-flex items-center gap-1 min-h-[40px] px-3 text-xs font-semibold text-[#0E7490] hover:text-[#0B1F3B] cursor-pointer"
              >
                Open in Word Counter
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {sections.map((section, idx) => (
              <section
                key={section.id}
                className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 space-y-2.5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs font-semibold text-[#0E7490] tabular-nums">
                      {section.timeRange}
                    </span>
                    <span aria-hidden="true" className="text-slate-300">
                      ·
                    </span>
                    <h3 className="font-display text-base font-bold text-[#0B1F3B]">
                      {idx + 1}. {section.heading}
                    </h3>
                  </div>
                  <CopyButton
                    text={`[${section.timeRange}] ${section.heading}\n${section.narrationPrompt}\nVisual: ${section.visualCue}`}
                    label="Copy"
                    variant="ghost"
                  />
                </div>

                <div className="space-y-1.5 text-sm text-slate-700 leading-relaxed">
                  <p>
                    <span className="font-semibold text-[#0B1F3B]">Voiceover focus:</span>{' '}
                    {section.narrationPrompt}
                  </p>
                  <p className="text-slate-600">
                    <span className="font-semibold text-[#0B1F3B]">Visual / B-roll cue:</span>{' '}
                    {section.visualCue}
                  </p>
                  <p className="text-xs text-slate-500">
                    <span className="font-semibold text-slate-700">Pacing note:</span>{' '}
                    {section.pacingTip}
                  </p>
                </div>
              </section>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
