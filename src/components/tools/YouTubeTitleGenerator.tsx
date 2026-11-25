import {ArrowRight, Heading1, RefreshCw} from 'lucide-react';
import {useEffect, useState, type FormEvent} from 'react';
import type {HandoffPayload, TitleSuggestion, ToolId} from '../../types/toolkit';
import {generateYouTubeTitles} from '../../utils/generators';
import {CopyButton} from '../CopyButton';
import {ToolDisclaimer} from '../ToolDisclaimer';

interface YouTubeTitleGeneratorProps {
  handoff?: HandoffPayload;
  onHandoffToTool: (toolId: ToolId, payload: HandoffPayload) => void;
}

const STYLE_OPTIONS = [
  'All Styles',
  'How-To & Practical',
  'Curiosity & Question',
  'List & Numbered',
  'Comparison / Myth-Busting',
];

export function YouTubeTitleGenerator({
  handoff,
  onHandoffToTool,
}: YouTubeTitleGeneratorProps) {
  const [topic, setTopic] = useState(handoff?.topic ?? '');
  const [benefit, setBenefit] = useState('');
  const [keyword, setKeyword] = useState('');
  const [style, setStyle] = useState('All Styles');
  const [seed, setSeed] = useState(0);
  const [error, setError] = useState('');
  const [titles, setTitles] = useState<TitleSuggestion[]>([]);

  useEffect(() => {
    if (handoff?.topic) {
      setTopic(handoff.topic);
      setError('');
      setTitles(
        generateYouTubeTitles({
          topic: handoff.topic,
          benefit,
          keyword,
          style,
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
    setTitles(
      generateYouTubeTitles({
        topic: cleaned,
        benefit,
        keyword,
        style,
        variationSeed: nextSeed,
      })
    );
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    runGenerate(topic, 0);
  };

  const allTitlesText = titles.map((t, i) => `${i + 1}. ${t.text}`).join('\n');

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="font-display text-2xl font-bold text-[#0B1F3B]">
          YouTube Title Generator
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
          Draft clear, readable YouTube title ideas with live character counts so you can spot
          titles that fit cleanly on mobile screens (under 60 characters).
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 space-y-5"
      >
        <div className="space-y-2">
          <label htmlFor="title-topic" className="block text-sm font-semibold text-[#0B1F3B]">
            Core Video Topic <span className="text-red-600">*</span>
          </label>
          <input
            id="title-topic"
            type="text"
            value={topic}
            onChange={(e) => {
              setTopic(e.target.value);
              if (error) setError('');
            }}
            placeholder="e.g., recording voiceovers at home, Roman concrete, budget spreadsheets"
            className="w-full min-h-[44px] rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-[#0B1F3B] placeholder:text-slate-400 focus:border-[#06B6D4] focus:outline-none"
            aria-invalid={Boolean(error)}
            aria-describedby={error ? 'title-topic-error' : undefined}
          />
          {error && (
            <p id="title-topic-error" role="alert" className="text-xs font-medium text-red-700">
              {error}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="title-benefit" className="block text-xs font-semibold text-[#0B1F3B]">
              Viewer Outcome (optional)
            </label>
            <input
              id="title-benefit"
              type="text"
              value={benefit}
              onChange={(e) => setBenefit(e.target.value)}
              placeholder="e.g., save 2 hours a week"
              className="w-full min-h-[44px] rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-[#0B1F3B] placeholder:text-slate-400 focus:border-[#06B6D4] focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="title-keyword" className="block text-xs font-semibold text-[#0B1F3B]">
              Focus Label (optional)
            </label>
            <input
              id="title-keyword"
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="e.g., 2026 Guide, Beginners"
              className="w-full min-h-[44px] rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-[#0B1F3B] placeholder:text-slate-400 focus:border-[#06B6D4] focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="title-style" className="block text-xs font-semibold text-[#0B1F3B]">
              Title Structure
            </label>
            <select
              id="title-style"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="w-full min-h-[44px] rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-[#0B1F3B] focus:border-[#06B6D4] focus:outline-none"
            >
              {STYLE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-lg bg-[#0B1F3B] text-white text-sm font-semibold hover:bg-[#13325C] transition-colors cursor-pointer"
          >
            <Heading1 className="w-4 h-4 text-[#22D3EE]" aria-hidden="true" />
            Generate Title Ideas
          </button>

          {titles.length > 0 && (
            <button
              type="button"
              onClick={() => runGenerate(topic, seed + 1)}
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-[#0B1F3B] text-sm font-medium hover:border-[#06B6D4] transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" aria-hidden="true" />
              Reorder Suggestions
            </button>
          )}
        </div>
      </form>

      <ToolDisclaimer message="Title ideas are structural templates for brainstorming and honest A/B testing—not guaranteed click-through rates." />

      {titles.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/70 p-8 text-center space-y-2">
          <p className="font-display text-base font-semibold text-[#0B1F3B]">
            Enter a topic to preview title structures
          </p>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Each suggestion checks mobile truncation length so important words aren’t cut off on
            phone screens.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-semibold text-[#0B1F3B] tabular-nums">
              {titles.length} title ideas generated
            </p>
            <CopyButton text={allTitlesText} label="Copy All Titles" />
          </div>

          <div className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white overflow-hidden">
            {titles.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 hover:bg-slate-50/70 transition-colors"
              >
                <div className="space-y-1 min-w-0">
                  <p className="text-sm sm:text-base font-semibold text-[#0B1F3B] break-words">
                    {item.text}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-2 text-xs text-slate-500">
                    <span>{item.pattern}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums">{item.charCount} chars</span>
                    <span aria-hidden="true">·</span>
                    <span className={item.fitsMobile ? 'text-[#0E7490] font-medium' : 'text-amber-700 font-medium'}>
                      {item.fitsMobile
                        ? 'Fits mobile cleanly (<=60)'
                        : 'Over 60 chars — may shorten on mobile'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <CopyButton text={item.text} label="Copy" />
                  <button
                    type="button"
                    onClick={() =>
                      onHandoffToTool('hook-generator', {
                        topic: item.text,
                      })
                    }
                    className="inline-flex items-center gap-1 min-h-[40px] px-2.5 text-xs font-semibold text-[#0E7490] hover:text-[#0B1F3B] cursor-pointer whitespace-nowrap"
                  >
                    Write Hook
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
