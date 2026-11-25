import {AlertTriangle, FileText, RotateCcw} from 'lucide-react';
import {useMemo, useState} from 'react';
import {formatYouTubeDescription} from '../../utils/generators';
import {CopyButton} from '../CopyButton';
import {ToolDisclaimer} from '../ToolDisclaimer';

const SAMPLE_DESCRIPTION = {
  summary:
    'Learn how to clean room echo and background hum from voiceover recordings using free desktop software—no acoustic foam or studio booth needed.',
  chaptersRaw:
    '00:00 What causes room echo\n00:45 Quick mic placement tips\n02:10 Applying noise reduction safely\n04:05 Simple EQ settings for clear voice\n05:30 Final audio checklist',
  resourcesRaw:
    'Audacity (free open-source audio editor): https://www.audacityteam.org/\nRecording checklist notes: Keep mic 6 inches away at a 45-degree angle',
  cta: 'Questions about your audio setup? Leave a comment below and I will reply with tips.',
  hashtagsRaw: 'VoiceoverTips, FacelessYouTube, AudioEditing',
};

export function DescriptionFormatter() {
  const [summary, setSummary] = useState('');
  const [chaptersRaw, setChaptersRaw] = useState('');
  const [resourcesRaw, setResourcesRaw] = useState('');
  const [cta, setCta] = useState('');
  const [hashtagsRaw, setHashtagsRaw] = useState('');

  const result = useMemo(
    () =>
      formatYouTubeDescription({
        summary,
        chaptersRaw,
        resourcesRaw,
        cta,
        hashtagsRaw,
      }),
    [summary, chaptersRaw, resourcesRaw, cta, hashtagsRaw]
  );

  const loadSample = () => {
    setSummary(SAMPLE_DESCRIPTION.summary);
    setChaptersRaw(SAMPLE_DESCRIPTION.chaptersRaw);
    setResourcesRaw(SAMPLE_DESCRIPTION.resourcesRaw);
    setCta(SAMPLE_DESCRIPTION.cta);
    setHashtagsRaw(SAMPLE_DESCRIPTION.hashtagsRaw);
  };

  const resetAll = () => {
    setSummary('');
    setChaptersRaw('');
    setResourcesRaw('');
    setCta('');
    setHashtagsRaw('');
  };

  const overLimit = result.charCount > 5000;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2">
          <h2 className="font-display text-2xl font-bold text-[#0B1F3B]">
            Description Formatter
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
            Organize your summary, timestamp chapters, source links, and hashtags into a tidy
            YouTube description with automatic timestamp checks.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={loadSample}
            className="min-h-[40px] px-3.5 py-2 rounded-lg border border-slate-300 bg-white text-xs font-semibold text-[#0B1F3B] hover:border-[#06B6D4] cursor-pointer whitespace-nowrap"
          >
            Insert Sample
          </button>
          <button
            type="button"
            onClick={resetAll}
            className="inline-flex items-center gap-1.5 min-h-[40px] px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:text-[#0B1F3B] hover:bg-slate-100 cursor-pointer whitespace-nowrap"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            Clear
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 rounded-xl border border-slate-200 bg-white p-4 sm:p-6 space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="desc-summary" className="block text-xs font-semibold text-[#0B1F3B]">
              1. Opening Video Summary (First 150 chars show before "More")
            </label>
            <textarea
              id="desc-summary"
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Write 1–2 plain sentences explaining what the viewer will learn in this video..."
              className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-[#0B1F3B] placeholder:text-slate-400 focus:border-[#06B6D4] focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="desc-chapters" className="block text-xs font-semibold text-[#0B1F3B]">
              2. Timestamp Chapters (One per line, start with 00:00)
            </label>
            <textarea
              id="desc-chapters"
              rows={4}
              value={chaptersRaw}
              onChange={(e) => setChaptersRaw(e.target.value)}
              placeholder={'00:00 Introduction\n01:15 Core concept\n03:40 Step-by-step example'}
              className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 font-mono text-xs sm:text-sm text-[#0B1F3B] placeholder:text-slate-400 focus:border-[#06B6D4] focus:outline-none"
            />
          </div>

          {result.chapterWarnings.length > 0 && (
            <div
              role="status"
              className="rounded-lg border border-amber-300 bg-amber-50 p-3 space-y-1 text-xs text-amber-900"
            >
              <div className="flex items-center gap-1.5 font-semibold">
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" aria-hidden="true" />
                <span>Chapter formatting check</span>
              </div>
              <ul className="list-disc pl-5 space-y-0.5">
                {result.chapterWarnings.map((warn, i) => (
                  <li key={i}>{warn}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="space-y-1.5">
            <label htmlFor="desc-resources" className="block text-xs font-semibold text-[#0B1F3B]">
              3. Sources, Tools, or Links (One per line)
            </label>
            <textarea
              id="desc-resources"
              rows={3}
              value={resourcesRaw}
              onChange={(e) => setResourcesRaw(e.target.value)}
              placeholder="e.g., Official documentation: https://example.com"
              className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-[#0B1F3B] placeholder:text-slate-400 focus:border-[#06B6D4] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="desc-cta" className="block text-xs font-semibold text-[#0B1F3B]">
                4. Viewer Prompt / CTA
              </label>
              <input
                id="desc-cta"
                type="text"
                value={cta}
                onChange={(e) => setCta(e.target.value)}
                placeholder="e.g., Subscribe for weekly explainers."
                className="w-full min-h-[44px] rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm text-[#0B1F3B] placeholder:text-slate-400 focus:border-[#06B6D4] focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="desc-tags" className="block text-xs font-semibold text-[#0B1F3B]">
                5. Hashtags (up to 5, comma or space separated)
              </label>
              <input
                id="desc-tags"
                type="text"
                value={hashtagsRaw}
                onChange={(e) => setHashtagsRaw(e.target.value)}
                placeholder="e.g., VideoEditing, FacelessChannel"
                className="w-full min-h-[44px] rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm text-[#0B1F3B] placeholder:text-slate-400 focus:border-[#06B6D4] focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#0E7490]" aria-hidden="true" />
                <h3 className="font-display text-sm font-bold text-[#0B1F3B]">
                  Formatted Output
                </h3>
              </div>
              <span
                className={`font-mono text-xs tabular-nums font-semibold ${
                  overLimit ? 'text-red-700' : 'text-slate-500'
                }`}
              >
                {result.charCount} / 5,000 chars
              </span>
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3 space-y-1">
              <p className="text-[11px] font-semibold text-slate-500">
                Above-the-fold preview (first 150 chars)
              </p>
              <p className="text-xs text-[#0B1F3B] leading-relaxed">
                {result.aboveTheFoldPreview}
              </p>
            </div>

            {result.formattedText ? (
              <pre className="whitespace-pre-wrap break-words rounded-lg border border-slate-200 bg-white p-3.5 text-xs sm:text-sm text-[#0B1F3B] font-sans leading-relaxed max-h-[340px] overflow-y-auto">
                {result.formattedText}
              </pre>
            ) : (
              <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50/70 p-6 text-center text-xs text-slate-500">
                Start typing on the left or click "Insert Sample" to preview your formatted YouTube
                description.
              </div>
            )}

            <CopyButton
              text={result.formattedText}
              label="Copy Formatted Description"
              variant="primary"
              className="w-full"
              disabled={!result.formattedText}
            />
          </div>

          <ToolDisclaimer message="Descriptions help viewers navigate your video and cite sources clearly. YouTube's official limit is 5,000 characters." />
        </div>
      </div>
    </div>
  );
}
