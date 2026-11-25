import {Clock, RotateCcw} from 'lucide-react';
import {useEffect, useMemo, useState} from 'react';
import type {HandoffPayload} from '../../types/toolkit';
import {analyzeScriptText} from '../../utils/generators';
import {CopyButton} from '../CopyButton';
import {ToolDisclaimer} from '../ToolDisclaimer';

interface WordCounterProps {
  handoff?: HandoffPayload;
}

const SAMPLE_SCRIPT = `Most beginners skip checking their voiceover pace before they start editing. That single habit often creates rushed narration or videos that accidentally run five seconds past the YouTube Shorts limit.

By reading your draft aloud at a calm conversational pace—around 145 words per minute—you can hear where sentences run too long. Shortening a thirty-word sentence into two crisp statements makes captions easier to read on mobile phones and gives your B-roll natural breathing room.`;

const PACE_OPTIONS = [
  {label: 'Slow & Calm (125 WPM)', wpm: 125},
  {label: 'Conversational (145 WPM)', wpm: 145},
  {label: 'Brisk / Shorts (170 WPM)', wpm: 170},
];

export function WordCounter({handoff}: WordCounterProps) {
  const [text, setText] = useState(handoff?.scriptText ?? '');
  const [wpm, setWpm] = useState(145);

  useEffect(() => {
    if (handoff?.scriptText !== undefined) {
      setText(handoff.scriptText);
    }
  }, [handoff?.scriptText]);

  const analysis = useMemo(() => analyzeScriptText(text, wpm), [text, wpm]);

  const statsSummary = `Words: ${analysis.wordCount}\nCharacters (with spaces): ${analysis.charCountWithSpaces}\nSentences: ${analysis.sentenceCount}\nEstimated Voiceover Runtime (${wpm} WPM): ${analysis.formattedDuration}`;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
          <h2 className="font-display text-2xl font-bold text-[#0B1F3B]">Word Counter</h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
            Paste your narration draft to measure word count, estimated voiceover runtime, Shorts
            length fit, and long sentences that may feel breathless when spoken aloud.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setText(SAMPLE_SCRIPT)}
            className="min-h-[40px] px-3.5 py-2 rounded-lg border border-slate-300 bg-white text-xs font-semibold text-[#0B1F3B] hover:border-[#06B6D4] cursor-pointer whitespace-nowrap"
          >
            Load Sample Script
          </button>
          <button
            type="button"
            onClick={() => setText('')}
            disabled={!text}
            className="inline-flex items-center gap-1.5 min-h-[40px] px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:text-[#0B1F3B] hover:bg-slate-100 disabled:opacity-40 cursor-pointer whitespace-nowrap"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            Clear
          </button>
        </div>
      </div>

      {/* Live metric strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-medium text-slate-500">Total Words</p>
          <p className="font-mono text-2xl font-bold text-[#0B1F3B] tabular-nums mt-1">
            {analysis.wordCount}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-medium text-slate-500">Voiceover Runtime</p>
          <p className="font-mono text-2xl font-bold text-[#0E7490] tabular-nums mt-1">
            {analysis.formattedDuration}
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5 tabular-nums">
            at {wpm} WPM ·{' '}
            {analysis.wordCount === 0
              ? 'Ready to measure'
              : analysis.isShortsLength
                ? 'Fits under 60s Short'
                : 'Long-form pace'}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-medium text-slate-500">Characters (No Spaces)</p>
          <p className="font-mono text-2xl font-bold text-[#0B1F3B] tabular-nums mt-1">
            {analysis.charCountNoSpaces}
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5 tabular-nums">
            {analysis.charCountWithSpaces} with spaces
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-medium text-slate-500">Avg. Sentence Length</p>
          <p className="font-mono text-2xl font-bold text-[#0B1F3B] tabular-nums mt-1">
            {analysis.avgWordsPerSentence}
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5 tabular-nums">
            {analysis.sentenceCount} sentences · {analysis.paragraphCount} paragraphs
          </p>
        </div>
      </div>

      {/* Pace selector & Editor */}
      <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#0B1F3B]">
            <Clock className="w-4 h-4 text-[#0E7490]" aria-hidden="true" />
            <span>Speaking Pace:</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {PACE_OPTIONS.map((opt) => (
              <button
                key={opt.wpm}
                type="button"
                onClick={() => setWpm(opt.wpm)}
                aria-pressed={wpm === opt.wpm}
                className={`min-h-[38px] px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  wpm === opt.wpm
                    ? 'bg-[#0B1F3B] text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="script-input" className="sr-only">
            Script or narration text
          </label>
          <textarea
            id="script-input"
            rows={10}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste or write your YouTube script here to count words, estimate speaking time, and spot long sentences..."
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm sm:text-base text-[#0B1F3B] leading-relaxed placeholder:text-slate-400 focus:border-[#06B6D4] focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <CopyButton text={text} label="Copy Script Text" disabled={!text.trim()} />
          <CopyButton text={statsSummary} label="Copy Stats Summary" disabled={analysis.wordCount === 0} />
        </div>
      </div>

      {/* Long sentence readability helper */}
      {analysis.wordCount > 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 space-y-3">
          <h3 className="font-display text-sm font-bold text-[#0B1F3B]">
            Voiceover Pacing Check (Sentences over 24 words)
          </h3>
          {analysis.longSentences.length === 0 ? (
            <p className="text-xs sm:text-sm text-[#0E7490] font-medium">
              All sentences are 24 words or fewer—clean pacing for clear voiceover delivery and
              on-screen captions.
            </p>
          ) : (
            <div className="space-y-2">
              <p className="text-xs text-slate-600">
                Splitting sentences longer than 24 words makes narration easier to read aloud in one
                breath:
              </p>
              <ul className="divide-y divide-slate-100 rounded-lg border border-slate-200">
                {analysis.longSentences.map((item) => (
                  <li key={item.index} className="p-3 text-xs text-slate-700 space-y-1">
                    <div className="font-mono font-semibold text-amber-800 tabular-nums">
                      Sentence {item.index} · {item.wordCount} words
                    </div>
                    <p className="text-slate-600">{item.preview}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <ToolDisclaimer message="Voiceover runtime estimates assume steady narration without long visual pauses; always do one quick timed read-through before recording." />
    </div>
  );
}
