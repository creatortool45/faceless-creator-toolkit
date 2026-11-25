import {ArrowRight, Search, X} from 'lucide-react';
import {useMemo, useState} from 'react';
import {FACELESS_NICHES} from '../../data/niches';
import type {HandoffPayload, ToolId} from '../../types/toolkit';
import {CopyButton} from '../CopyButton';
import {ToolDisclaimer} from '../ToolDisclaimer';

interface NicheExplorerProps {
  onHandoffToTool: (toolId: ToolId, payload: HandoffPayload) => void;
}

const CATEGORIES = [
  'All',
  'Education & Explainers',
  'History & Mystery',
  'Tech & Productivity',
  'Finance & Career',
  'Health & Science',
  'Culture & Media',
] as const;

const STYLES = [
  'All',
  'Stock Footage + Voiceover',
  'Screen Recording + Tutorial',
  '2D Motion / Slides',
  'Ambient / Lo-Fi Visuals',
] as const;

const CATEGORY_SEARCH_KEYWORDS: Record<string, string> = {
  'Education & Explainers': 'learning educational tutorials guides knowledge study',
  'History & Mystery': 'historical documentary mysteries stories past',
  'Tech & Productivity': 'technology gadgets software tools digital workflow',
  'Finance & Career': 'money personal finance investing jobs work business',
  'Health & Science': 'scientific biology research wellness nature',
  'Culture & Media': 'entertainment movies design media lifestyle',
};

const NICHE_SEARCH_KEYWORDS: Record<string, string> = {
  'retro-computing-design': 'technology computing computers hardware interfaces',
};

function buildNicheSearchText(niche: (typeof FACELESS_NICHES)[number]): string {
  const categoryKeywords = CATEGORY_SEARCH_KEYWORDS[niche.category] ?? '';
  const extraKeywords = NICHE_SEARCH_KEYWORDS[niche.id] ?? '';
  return [
    niche.name,
    niche.category,
    niche.productionStyle,
    niche.difficulty,
    niche.overview,
    niche.visualWorkflow,
    niche.beginnerPitfall,
    niche.starterTopics.join(' '),
    niche.id.replace(/-/g, ' '),
    categoryKeywords,
    extraKeywords,
  ]
    .join(' ')
    .toLowerCase();
}

export function NicheExplorer({onHandoffToTool}: NicheExplorerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStyle, setSelectedStyle] = useState<string>('All');
  const [difficultyOnly, setDifficultyOnly] = useState<'All' | 'Beginner-Friendly'>('All');

  const searchableNiches = useMemo(
    () =>
      FACELESS_NICHES.map((niche) => ({
        niche,
        searchText: buildNicheSearchText(niche),
      })),
    []
  );

  const filteredNiches = useMemo(() => {
    const tokens = searchQuery
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean);

    return searchableNiches
      .filter(({niche, searchText}) => {
        if (selectedCategory !== 'All' && niche.category !== selectedCategory) return false;
        if (selectedStyle !== 'All' && niche.productionStyle !== selectedStyle) return false;
        if (difficultyOnly === 'Beginner-Friendly' && niche.difficulty !== 'Beginner-Friendly') {
          return false;
        }
        if (tokens.length === 0) return true;
        return tokens.every((token) => searchText.includes(token));
      })
      .map(({niche}) => niche);
  }, [searchableNiches, searchQuery, selectedCategory, selectedStyle, difficultyOnly]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedStyle('All');
    setDifficultyOnly('All');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="font-display text-2xl font-bold text-[#0B1F3B]">Niche Explorer</h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
          Compare realistic faceless YouTube niches by how the visuals are made, beginner learning
          curve, and starter video topics.
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-5 relative">
            <label htmlFor="niche-search" className="sr-only">
              Search niches or starter topics
            </label>
            <Search
              className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="niche-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search niches, topics, or keywords..."
              className="w-full min-h-[44px] rounded-lg border border-slate-300 bg-white pl-10 pr-9 py-2 text-sm text-[#0B1F3B] placeholder:text-slate-400 focus:border-[#06B6D4] focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 min-h-[36px] min-w-[36px] flex items-center justify-center text-slate-400 hover:text-[#0B1F3B] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="md:col-span-4">
            <label htmlFor="niche-style" className="sr-only">
              Filter by visual production style
            </label>
            <select
              id="niche-style"
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value)}
              className="w-full min-h-[44px] rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-[#0B1F3B] focus:border-[#06B6D4] focus:outline-none"
            >
              {STYLES.map((style) => (
                <option key={style} value={style}>
                  {style === 'All' ? 'All Production Styles' : style}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-3">
            <button
              type="button"
              onClick={() =>
                setDifficultyOnly((prev) =>
                  prev === 'All' ? 'Beginner-Friendly' : 'All'
                )
              }
              aria-pressed={difficultyOnly === 'Beginner-Friendly'}
              className={`w-full min-h-[44px] rounded-lg border px-3 py-2 text-xs font-semibold transition-colors cursor-pointer ${
                difficultyOnly === 'Beginner-Friendly'
                  ? 'border-[#0B1F3B] bg-[#0B1F3B] text-white'
                  : 'border-slate-300 bg-white text-[#0B1F3B] hover:border-[#06B6D4]'
              }`}
            >
              {difficultyOnly === 'Beginner-Friendly'
                ? 'Showing: Beginner-Friendly'
                : 'Filter: Beginner-Friendly'}
            </button>
          </div>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1" role="tablist" aria-label="Niche categories">
          {CATEGORIES.map((category) => {
            const active = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedCategory(category)}
                className={`min-h-[38px] px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  active
                    ? 'bg-[#06B6D4] text-[#0B1F3B]'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      <ToolDisclaimer message="Niche profiles highlight production logistics and beginner trade-offs rather than income promises. Choose a topic you are willing to research steadily." />

      <div className="flex items-center justify-between text-xs text-slate-600">
        <p className="tabular-nums">
          Showing {filteredNiches.length} of {FACELESS_NICHES.length} faceless niches
        </p>
        {(searchQuery ||
          selectedCategory !== 'All' ||
          selectedStyle !== 'All' ||
          difficultyOnly !== 'All') && (
          <button
            type="button"
            onClick={clearFilters}
            className="font-semibold text-[#0E7490] hover:text-[#0B1F3B] cursor-pointer"
          >
            Reset Filters
          </button>
        )}
      </div>

      {filteredNiches.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/70 p-8 text-center space-y-3">
          <p className="font-display text-base font-semibold text-[#0B1F3B]">
            No matching niches found
          </p>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Try clearing one of your active filters or searching with a broader keyword.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex items-center justify-center min-h-[44px] px-4 py-2 rounded-lg bg-[#0B1F3B] text-white text-xs font-semibold hover:bg-[#13325C] cursor-pointer"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredNiches.map((niche) => (
            <article
              key={niche.id}
              className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 space-y-4"
            >
              <div className="space-y-3">
                <div className="text-xs text-slate-500">
                  <span>{niche.category}</span>
                  <span aria-hidden="true"> · </span>
                  <span>{niche.productionStyle}</span>
                  <span aria-hidden="true"> · </span>
                  <span className="font-medium text-[#0E7490]">{niche.difficulty}</span>
                </div>

                <h3 className="font-display text-lg font-bold text-[#0B1F3B]">{niche.name}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{niche.overview}</p>

                <div className="space-y-1.5 text-xs leading-relaxed text-slate-600 pt-2 border-t border-slate-100">
                  <p>
                    <span className="font-semibold text-[#0B1F3B]">Visual workflow:</span>{' '}
                    {niche.visualWorkflow}
                  </p>
                  <p>
                    <span className="font-semibold text-[#0B1F3B]">Watch out for:</span>{' '}
                    {niche.beginnerPitfall}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-1.5">
                  <p className="text-xs font-semibold text-[#0B1F3B]">Starter video topics:</p>
                  <ul className="space-y-1 text-xs text-slate-600 list-disc pl-4">
                    {niche.starterTopics.map((st) => (
                      <li key={st}>{st}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
                <CopyButton
                  text={`${niche.name} (${niche.productionStyle})\n\nOverview: ${niche.overview}\nStarter topics:\n- ${niche.starterTopics.join('\n- ')}`}
                  label="Copy Summary"
                />
                <button
                  type="button"
                  onClick={() =>
                    onHandoffToTool('video-idea-generator', {
                      topic: niche.starterTopics[0],
                    })
                  }
                  className="inline-flex items-center gap-1 min-h-[40px] px-2.5 text-xs font-semibold text-[#0E7490] hover:text-[#0B1F3B] cursor-pointer"
                >
                  Generate Ideas
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
