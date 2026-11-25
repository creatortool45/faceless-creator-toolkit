import {ArrowLeft} from 'lucide-react';
import {TOOLS_CATALOG} from '../data/toolsCatalog';
import type {HandoffPayload, ToolId} from '../types/toolkit';
import {DescriptionFormatter} from './tools/DescriptionFormatter';
import {HookGenerator} from './tools/HookGenerator';
import {NicheExplorer} from './tools/NicheExplorer';
import {ProductionPlanner} from './tools/ProductionPlanner';
import {VideoIdeaGenerator} from './tools/VideoIdeaGenerator';
import {VideoOutlineMaker} from './tools/VideoOutlineMaker';
import {WordCounter} from './tools/WordCounter';
import {YouTubeTitleGenerator} from './tools/YouTubeTitleGenerator';

interface ToolWorkspaceProps {
  activeTool: ToolId;
  handoff?: HandoffPayload;
  onSelectTool: (toolId: ToolId, payload?: HandoffPayload) => void;
  onBackHome: () => void;
}

export function ToolWorkspace({
  activeTool,
  handoff,
  onSelectTool,
  onBackHome,
}: ToolWorkspaceProps) {
  const currentToolMeta = TOOLS_CATALOG.find((t) => t.id === activeTool) ?? TOOLS_CATALOG[0];

  const handleHandoff = (targetTool: ToolId, payload: HandoffPayload) => {
    onSelectTool(targetTool, payload);
  };

  return (
    <div className="bg-slate-50/70 min-h-[calc(100vh-14rem)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6 sm:py-8">
        {/* Top breadcrumb & mobile tool switcher */}
        <div className="mb-6 flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <button
                type="button"
                onClick={onBackHome}
                className="inline-flex items-center gap-1 min-h-[36px] font-semibold text-[#0B1F3B] hover:text-[#0E7490] cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                Home
              </button>
              <span aria-hidden="true">/</span>
              <span>Tools</span>
              <span aria-hidden="true">/</span>
              <span className="font-semibold text-[#0E7490]">{currentToolMeta.name}</span>
            </div>
          </div>

          {/* Mobile / Tablet horizontal tool switcher */}
          <div className="lg:hidden">
            <label htmlFor="mobile-tool-select" className="sr-only">
              Select a tool
            </label>
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {TOOLS_CATALOG.map((tool) => {
                const isActive = tool.id === activeTool;
                return (
                  <button
                    key={tool.id}
                    type="button"
                    onClick={() => onSelectTool(tool.id)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`min-h-[42px] px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#0B1F3B] text-white'
                        : 'bg-white border border-slate-200 text-[#0B1F3B] hover:border-[#06B6D4]'
                    }`}
                  >
                    {tool.shortName}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Desktop Sidebar Tool Switcher */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-20 space-y-4">
            <div className="rounded-xl border border-slate-200 bg-white p-3 space-y-1">
              <p className="px-3 py-2 text-xs font-semibold text-slate-500">All 8 Tools</p>
              <nav aria-label="Creator tools navigation" className="space-y-1">
                {TOOLS_CATALOG.map((tool, idx) => {
                  const isActive = tool.id === activeTool;
                  return (
                    <button
                      key={tool.id}
                      type="button"
                      onClick={() => onSelectTool(tool.id)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`w-full flex items-center justify-between gap-2 min-h-[44px] px-3 py-2 rounded-lg text-left text-sm transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-[#0B1F3B] text-white font-semibold'
                          : 'text-[#0B1F3B] hover:bg-slate-100 font-medium'
                      }`}
                    >
                      <span className="truncate">{tool.shortName}</span>
                      <span
                        className={`font-mono text-xs tabular-nums ${
                          isActive ? 'text-[#22D3EE]' : 'text-slate-400'
                        }`}
                      >
                        0{idx + 1}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-1.5">
              <p className="text-xs font-semibold text-[#0B1F3B]">Best used for</p>
              <p className="text-xs text-slate-600 leading-relaxed">{currentToolMeta.bestFor}</p>
            </div>
          </aside>

          {/* Main Tool Panel */}
          <main className="lg:col-span-9 min-w-0">
            {activeTool === 'video-idea-generator' && (
              <VideoIdeaGenerator handoff={handoff} onHandoffToTool={handleHandoff} />
            )}
            {activeTool === 'niche-explorer' && (
              <NicheExplorer onHandoffToTool={handleHandoff} />
            )}
            {activeTool === 'youtube-title-generator' && (
              <YouTubeTitleGenerator handoff={handoff} onHandoffToTool={handleHandoff} />
            )}
            {activeTool === 'video-outline-maker' && (
              <VideoOutlineMaker handoff={handoff} onHandoffToTool={handleHandoff} />
            )}
            {activeTool === 'hook-generator' && (
              <HookGenerator handoff={handoff} onHandoffToTool={handleHandoff} />
            )}
            {activeTool === 'description-formatter' && <DescriptionFormatter />}
            {activeTool === 'production-planner' && <ProductionPlanner />}
            {activeTool === 'word-counter' && <WordCounter handoff={handoff} />}
          </main>
        </div>
      </div>
    </div>
  );
}
