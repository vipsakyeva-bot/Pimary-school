import React from 'react';
import { Presentation } from 'lucide-react';

interface TopNavProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenPresentation: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  activeTab,
  onSelectTab,
  onOpenPresentation,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-stone-900 border-b border-stone-800 text-stone-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-3.5">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <button
          onClick={() => onSelectTab('overview')}
          className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 hover:text-amber-400 transition-colors text-left"
        >
          EduSpark
        </button>

        {/* Zone 2: 4-5 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-300">
          <button
            onClick={() => onSelectTab('overview')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-white ${
              activeTab === 'overview' ? 'text-white underline underline-offset-8 decoration-amber-400 decoration-2 font-semibold' : 'text-stone-300'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => onSelectTab('simulators')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-white ${
              activeTab === 'simulators' ? 'text-white underline underline-offset-8 decoration-amber-400 decoration-2 font-semibold' : 'text-stone-300'
            }`}
          >
            Simulators
          </button>
          <button
            onClick={() => onSelectTab('slides')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-white ${
              activeTab === 'slides' ? 'text-white underline underline-offset-8 decoration-amber-400 decoration-2 font-semibold' : 'text-stone-300'
            }`}
          >
            Presentation Deck
          </button>
          <button
            onClick={() => onSelectTab('planner')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-white ${
              activeTab === 'planner' ? 'text-white underline underline-offset-8 decoration-amber-400 decoration-2 font-semibold' : 'text-stone-300'
            }`}
          >
            Rubric & Milestones
          </button>
          <button
            onClick={() => onSelectTab('defense')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-white ${
              activeTab === 'defense' ? 'text-white underline underline-offset-8 decoration-amber-400 decoration-2 font-semibold' : 'text-stone-300'
            }`}
          >
            Defense Q&A
          </button>
          <button
            onClick={() => onSelectTab('citations')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-white ${
              activeTab === 'citations' ? 'text-white underline underline-offset-8 decoration-amber-400 decoration-2 font-semibold' : 'text-stone-300'
            }`}
          >
            Citations
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenPresentation}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-stone-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm"
          >
            <Presentation className="w-3.5 h-3.5" />
            <span>Present Project</span>
          </button>
        </div>
      </div>
    </header>
  );
};
