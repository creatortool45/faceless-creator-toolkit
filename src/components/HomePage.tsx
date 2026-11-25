import {
  ArrowRight,
  Compass,
  FileText,
  Heading1,
  Kanban,
  Lightbulb,
  ListTree,
  Sparkles,
  Type,
} from 'lucide-react';
import type {ReactNode} from 'react';
import {TOOLS_CATALOG} from '../data/toolsCatalog';
import type {PageRoute, ToolId} from '../types/toolkit';

interface HomePageProps {
  onSelectTool: (toolId: ToolId) => void;
  onNavigate: (route: PageRoute) => void;
}

const TOOL_ICONS: Record<ToolId, ReactNode> = {
  'video-idea-generator': <Lightbulb className="w-5 h-5 text-[#0E7490]" aria-hidden="true" />,
  'niche-explorer': <Compass className="w-5 h-5 text-[#0E7490]" aria-hidden="true" />,
  'youtube-title-generator': <Heading1 className="w-5 h-5 text-[#0E7490]" aria-hidden="true" />,
  'video-outline-maker': <ListTree className="w-5 h-5 text-[#0E7490]" aria-hidden="true" />,
  'hook-generator': <Sparkles className="w-5 h-5 text-[#0E7490]" aria-hidden="true" />,
  'description-formatter': <FileText className="w-5 h-5 text-[#0E7490]" aria-hidden="true" />,
  'production-planner': <Kanban className="w-5 h-5 text-[#0E7490]" aria-hidden="true" />,
  'word-counter': <Type className="w-5 h-5 text-[#0E7490]" aria-hidden="true" />,
};

export function HomePage({onSelectTool, onNavigate}: HomePageProps) {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <p className="text-xs sm:text-sm font-semibold tracking-wide text-[#0E7490]">
                Free browser tools · No login · Runs locally on your device
              </p>

              <h1
                className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0B1F3B] leading-[1.12]"
                style={{textWrap: 'balance'}}
              >
                Plan, script, and organize your faceless YouTube videos without guesswork.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Faceless Creator Toolkit gives beginner YouTube creators worldwide eight
                practical, client-side tools—from picking a sustainable niche and outlining your
                narration to timing voiceovers and formatting upload descriptions.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => onSelectTool('video-idea-generator')}
                  className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-lg bg-[#0B1F3B] text-white text-sm font-semibold hover:bg-[#13325C] transition-colors cursor-pointer"
                >
                  Start With Video Ideas
                  <ArrowRight className="w-4 h-4 text-[#22D3EE]" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={() => onSelectTool('niche-explorer')}
                  className="inline-flex items-center justify-center min-h-[48px] px-5 py-3 rounded-lg border border-slate-300 bg-white text-[#0B1F3B] text-sm font-semibold hover:border-[#06B6D4] transition-colors cursor-pointer"
                >
                  Explore Niches
                </button>
              </div>
            </div>

            {/* Right Navy Summary Card (Single focal anchor) */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-[#0B1F3B] text-white p-6 sm:p-8 space-y-6">
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-[#22D3EE]">
                    A calm workflow from blank page to upload
                  </p>
                  <h2 className="font-display text-xl font-bold text-white">
                    Three steps for your next faceless upload
                  </h2>
                </div>

                <ol className="space-y-4 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="font-mono text-xs font-bold text-[#0B1F3B] bg-[#22D3EE] rounded-md px-2 py-1 shrink-0 tabular-nums">
                      01
                    </span>
                    <div>
                      <p className="font-semibold text-white">Pick a topic and visual style</p>
                      <p className="text-slate-300 text-xs leading-relaxed mt-0.5">
                        Use Niche Explorer and Video Idea Generator to find angles suited to stock
                        footage, screen recordings, or slides.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-mono text-xs font-bold text-[#0B1F3B] bg-[#22D3EE] rounded-md px-2 py-1 shrink-0 tabular-nums">
                      02
                    </span>
                    <div>
                      <p className="font-semibold text-white">Outline, hook, and time your script</p>
                      <p className="text-slate-300 text-xs leading-relaxed mt-0.5">
                        Draft a clear 15-second opening, build timestamped sections, and check
                        voiceover runtime in Word Counter.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-mono text-xs font-bold text-[#0B1F3B] bg-[#22D3EE] rounded-md px-2 py-1 shrink-0 tabular-nums">
                      03
                    </span>
                    <div>
                      <p className="font-semibold text-white">Package cleanly and track progress</p>
                      <p className="text-slate-300 text-xs leading-relaxed mt-0.5">
                        Test mobile-length titles, validate 00:00 description chapters, and check
                        off steps in Production Planner.
                      </p>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Eight Tools Grid */}
      <section id="toolkit-grid" className="py-14 sm:py-18 bg-slate-50/60">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0B1F3B]">
                Eight focused tools for every stage
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Open any tool directly below. All suggestions are creative starting points to help
                structure your own research and editing—never guaranteed viral outcomes.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('tools')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0E7490] hover:text-[#0B1F3B] cursor-pointer whitespace-nowrap shrink-0 self-start sm:self-auto"
            >
              Open Full Workspace
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {TOOLS_CATALOG.map((tool, index) => (
              <article
                key={tool.id}
                className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 transition-colors hover:border-[#06B6D4]"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-50 border border-cyan-100">
                      {TOOL_ICONS[tool.id]}
                    </div>
                    <span className="text-xs text-slate-500 font-medium">
                      <span className="font-mono tabular-nums">0{index + 1}</span> · {tool.category}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-[#0B1F3B] leading-snug">
                    {tool.name}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">{tool.summary}</p>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectTool(tool.id)}
                    className="inline-flex items-center justify-between w-full min-h-[42px] px-3.5 py-2 rounded-lg bg-slate-50 text-xs font-semibold text-[#0B1F3B] group-hover:bg-[#0B1F3B] group-hover:text-white transition-colors cursor-pointer"
                  >
                    <span>Open Tool</span>
                    <ArrowRight
                      className="w-3.5 h-3.5 text-[#0E7490] group-hover:text-[#22D3EE]"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Honest Principles Section */}
      <section className="border-t border-slate-200 bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <h3 className="font-display text-base font-bold text-[#0B1F3B]">
                Private by architecture
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Every generator, formatter, and word counter runs in your browser using plain
                JavaScript. No accounts, no external API keys, and no analytics trackers.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-display text-base font-bold text-[#0B1F3B]">
                Built for faceless formats
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Outlines, hooks, and production checklists include visual B-roll cues, screen
                recording reminders, and speaking-pace timing made for voiceover channels.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-display text-base font-bold text-[#0B1F3B]">
                Practical expectations
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Tools speed up planning and reduce formatting errors, while real channel growth
                comes from accurate research, clear audio, and steady publishing habits.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
