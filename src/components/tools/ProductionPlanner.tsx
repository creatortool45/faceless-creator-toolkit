import {CheckSquare, Plus, Square, Trash2} from 'lucide-react';
import {useEffect, useMemo, useState, type FormEvent} from 'react';
import type {ProductionProject, ProductionStep} from '../../types/toolkit';
import {CopyButton} from '../CopyButton';
import {ToolDisclaimer} from '../ToolDisclaimer';

const STORAGE_KEY = 'fct_production_projects_v1';

const DEFAULT_STEP_LABELS = [
  'Idea & clear angle defined',
  'Facts & sources verified',
  'Script written & timed',
  'Voiceover recorded & cleaned',
  'B-roll / screen visuals gathered',
  'Video edited & captions checked',
  'Title & readable thumbnail ready',
  'Description & 00:00 chapters formatted',
  'Uploaded & scheduled',
];

function createSteps(): ProductionStep[] {
  return DEFAULT_STEP_LABELS.map((label, idx) => ({
    id: `step-${idx}`,
    label,
    completed: false,
  }));
}

export function ProductionPlanner() {
  const [projects, setProjects] = useState<ProductionProject[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Ignore storage access errors
    }
    return [];
  });

  const [title, setTitle] = useState('');
  const [niche, setNiche] = useState('');
  const [format, setFormat] = useState<'Long-Form' | 'YouTube Shorts'>('Long-Form');
  const [targetDate, setTargetDate] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | 'In Progress' | 'Ready'>('All');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch {
      // Ignore storage quota errors
    }
  }, [projects]);

  const handleAddProject = (e: FormEvent) => {
    e.preventDefault();
    const cleanTitle = title.trim();
    if (cleanTitle.length < 2) {
      setError('Please enter a working video title (at least 2 characters).');
      return;
    }
    setError('');
    const newProject: ProductionProject = {
      id: `proj-${Date.now()}`,
      title: cleanTitle,
      niche: niche.trim() || 'General',
      format,
      targetDate: targetDate || 'Flexible',
      notes: notes.trim(),
      steps: createSteps(),
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setProjects((prev) => [newProject, ...prev]);
    setTitle('');
    setNiche('');
    setTargetDate('');
    setNotes('');
  };

  const handleLoadSample = () => {
    const sampleSteps = createSteps();
    sampleSteps[0].completed = true;
    sampleSteps[1].completed = true;
    sampleSteps[2].completed = true;
    const sample: ProductionProject = {
      id: `proj-sample-${Date.now()}`,
      title: 'How Ancient Roman Concrete Lasts Over 2,000 Years',
      niche: 'Micro-History',
      format: 'Long-Form',
      targetDate: 'Next Friday',
      notes: 'Use Wikimedia archival photos + clean map overlay for volcanic ash origin.',
      steps: sampleSteps,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setProjects((prev) => [sample, ...prev]);
  };

  const toggleStep = (projectId: string, stepId: string) => {
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id !== projectId) return proj;
        return {
          ...proj,
          steps: proj.steps.map((s) =>
            s.id === stepId ? {...s, completed: !s.completed} : s
          ),
        };
      })
    );
  };

  const deleteProject = (projectId: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
  };

  const filteredProjects = useMemo(() => {
    return projects.filter((proj) => {
      const done = proj.steps.filter((s) => s.completed).length;
      const isReady = done === proj.steps.length;
      if (filterStatus === 'Ready') return isReady;
      if (filterStatus === 'In Progress') return !isReady;
      return true;
    });
  }, [projects, filterStatus]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="font-display text-2xl font-bold text-[#0B1F3B]">Production Planner</h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
          Track each faceless video from research and voiceover to editing and upload. Projects
          stay saved locally in your browser without any account.
        </p>
      </div>

      <form
        onSubmit={handleAddProject}
        noValidate
        className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 space-y-4"
      >
        <h3 className="font-display text-base font-bold text-[#0B1F3B]">Add Video Project</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2 space-y-1.5">
            <label htmlFor="prod-title" className="block text-xs font-semibold text-[#0B1F3B]">
              Working Video Title <span className="text-red-600">*</span>
            </label>
            <input
              id="prod-title"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError('');
              }}
              placeholder="e.g., 5 Keyboard Shortcuts That Speed Up Video Editing"
              className="w-full min-h-[44px] rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm text-[#0B1F3B] placeholder:text-slate-400 focus:border-[#06B6D4] focus:outline-none"
              aria-invalid={Boolean(error)}
              aria-describedby={error ? 'prod-title-error' : undefined}
            />
            {error && (
              <p id="prod-title-error" role="alert" className="text-xs font-medium text-red-700">
                {error}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="prod-niche" className="block text-xs font-semibold text-[#0B1F3B]">
              Niche / Topic Label
            </label>
            <input
              id="prod-niche"
              type="text"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              placeholder="e.g., Productivity, History"
              className="w-full min-h-[44px] rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm text-[#0B1F3B] placeholder:text-slate-400 focus:border-[#06B6D4] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label htmlFor="prod-format" className="block text-xs font-semibold text-[#0B1F3B]">
                Format
              </label>
              <select
                id="prod-format"
                value={format}
                onChange={(e) =>
                  setFormat(e.target.value as 'Long-Form' | 'YouTube Shorts')
                }
                className="w-full min-h-[44px] rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-sm text-[#0B1F3B] focus:border-[#06B6D4] focus:outline-none"
              >
                <option value="Long-Form">Long-Form</option>
                <option value="YouTube Shorts">YouTube Shorts</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="prod-date" className="block text-xs font-semibold text-[#0B1F3B]">
                Target Date
              </label>
              <input
                id="prod-date"
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="w-full min-h-[44px] rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-sm text-[#0B1F3B] focus:border-[#06B6D4] focus:outline-none"
              />
            </div>
          </div>

          <div className="sm:col-span-2 space-y-1.5">
            <label htmlFor="prod-notes" className="block text-xs font-semibold text-[#0B1F3B]">
              Visual / Asset Notes (optional)
            </label>
            <input
              id="prod-notes"
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g., Need 4 stock clips of desk setups + 1 screen capture"
              className="w-full min-h-[44px] rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm text-[#0B1F3B] placeholder:text-slate-400 focus:border-[#06B6D4] focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-lg bg-[#0B1F3B] text-white text-sm font-semibold hover:bg-[#13325C] transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4 text-[#22D3EE]" aria-hidden="true" />
          Add to Production Queue
        </button>
      </form>

      <ToolDisclaimer message="Your production checklist is saved strictly inside this browser's local storage. Clearing browser data will remove saved projects, so copy important notes when needed." />

      {projects.length > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 p-1 rounded-lg bg-slate-100" role="tablist" aria-label="Filter projects">
            {(['All', 'In Progress', 'Ready'] as const).map((status) => (
              <button
                key={status}
                type="button"
                role="tab"
                aria-selected={filterStatus === status}
                onClick={() => setFilterStatus(status)}
                className={`min-h-[36px] px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                  filterStatus === status
                    ? 'bg-white text-[#0B1F3B] shadow-xs'
                    : 'text-slate-600 hover:text-[#0B1F3B]'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
          <p className="text-xs text-slate-600 tabular-nums">
            Showing {filteredProjects.length} of {projects.length} projects
          </p>
        </div>
      )}

      {projects.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/70 p-8 text-center space-y-3">
          <p className="font-display text-base font-semibold text-[#0B1F3B]">
            Your production queue is empty
          </p>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Add your first upcoming video above, or load a sample project to see the 9-step
            faceless workflow checklist.
          </p>
          <button
            type="button"
            onClick={handleLoadSample}
            className="inline-flex items-center justify-center min-h-[44px] px-4 py-2 rounded-lg border border-slate-300 bg-white text-xs font-semibold text-[#0B1F3B] hover:border-[#06B6D4] cursor-pointer"
          >
            Load Example Project
          </button>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/70 p-8 text-center space-y-2">
          <p className="font-display text-base font-semibold text-[#0B1F3B]">
            No projects match "{filterStatus}"
          </p>
          <button
            type="button"
            onClick={() => setFilterStatus('All')}
            className="text-xs font-semibold text-[#0E7490] hover:text-[#0B1F3B] cursor-pointer"
          >
            Show All Projects
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProjects.map((project) => {
            const doneCount = project.steps.filter((s) => s.completed).length;
            const totalCount = project.steps.length;
            const pct = Math.round((doneCount / totalCount) * 100);
            const summaryText = `${project.title} (${project.format} · ${project.niche})\nTarget: ${project.targetDate}\nProgress: ${doneCount}/${totalCount}\n${project.steps
              .map((s) => `[${s.completed ? 'x' : ' '}] ${s.label}`)
              .join('\n')}`;

            return (
              <article
                key={project.id}
                className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="text-xs text-slate-500">
                      <span>{project.niche}</span>
                      <span aria-hidden="true"> · </span>
                      <span>{project.format}</span>
                      <span aria-hidden="true"> · </span>
                      <span>Target: {project.targetDate}</span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-[#0B1F3B]">
                      {project.title}
                    </h3>
                    {project.notes && (
                      <p className="text-xs sm:text-sm text-slate-600">{project.notes}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <CopyButton text={summaryText} label="Copy Checklist" />
                    <button
                      type="button"
                      onClick={() => deleteProject(project.id)}
                      aria-label={`Delete project ${project.title}`}
                      className="inline-flex items-center justify-center min-h-[40px] min-w-[40px] rounded-lg border border-slate-200 text-slate-500 hover:text-red-700 hover:border-red-200 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-[#0B1F3B]">
                    <span>
                      {doneCount === totalCount ? 'Ready to publish' : 'Production checklist'}
                    </span>
                    <span className="font-mono tabular-nums">
                      {doneCount} / {totalCount} ({pct}%)
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-[#06B6D4] transition-all duration-200"
                      style={{width: `${pct}%`}}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 pt-1">
                  {project.steps.map((step) => (
                    <button
                      key={step.id}
                      type="button"
                      onClick={() => toggleStep(project.id, step.id)}
                      aria-pressed={step.completed}
                      className={`flex items-center gap-2.5 min-h-[44px] px-3 py-2 rounded-lg border text-left text-xs transition-colors cursor-pointer ${
                        step.completed
                          ? 'border-cyan-200 bg-cyan-50/50 text-[#0B1F3B]'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {step.completed ? (
                        <CheckSquare className="w-4 h-4 text-[#0E7490] shrink-0" aria-hidden="true" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-400 shrink-0" aria-hidden="true" />
                      )}
                      <span className={step.completed ? 'line-through text-slate-500' : ''}>
                        {step.label}
                      </span>
                    </button>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
