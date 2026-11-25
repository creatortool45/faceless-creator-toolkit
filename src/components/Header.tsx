import {Menu, X} from 'lucide-react';
import {useState} from 'react';
import type {PageRoute} from '../types/toolkit';

interface HeaderProps {
  activeRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
  onOpenWorkspace: () => void;
}

export function Header({activeRoute, onNavigate, onOpenWorkspace}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: {label: string; route: PageRoute}[] = [
    {label: 'Home', route: 'home'},
    {label: 'Tools', route: 'tools'},
    {label: 'About', route: 'about'},
    {label: 'Contact', route: 'contact'},
  ];

  const handleLinkClick = (route: PageRoute) => {
    setMobileMenuOpen(false);
    onNavigate(route);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-8 px-4 sm:px-6">
        {/* Zone 1: Brand wordmark (single line) */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('home');
          }}
          className="font-display text-base sm:text-lg font-bold tracking-tight text-[#0B1F3B] whitespace-nowrap shrink-0"
        >
          Faceless Creator Toolkit
        </a>

        {/* Zone 2: Clean single-line text nav links */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = activeRoute === item.route;
            return (
              <a
                key={item.route}
                href={`#${item.route}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.route);
                }}
                aria-current={isActive ? 'page' : undefined}
                className={`text-sm font-medium transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                  isActive
                    ? 'text-[#0B1F3B] border-[#06B6D4]'
                    : 'text-slate-600 border-transparent hover:text-[#0B1F3B] hover:border-slate-300'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Single primary action + mobile menu toggle */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenWorkspace();
            }}
            className="hidden sm:inline-flex items-center justify-center min-h-[40px] px-4 py-2 text-xs font-semibold rounded-lg bg-[#0B1F3B] text-white hover:bg-[#13325C] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Open Tools
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center min-h-[44px] min-w-[44px] rounded-lg text-[#0B1F3B] hover:bg-slate-100 transition-colors cursor-pointer"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = activeRoute === item.route;
              return (
                <a
                  key={item.route}
                  href={`#${item.route}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.route);
                  }}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex items-center min-h-[44px] px-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#0B1F3B] text-white'
                      : 'text-[#0B1F3B] hover:bg-slate-100'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenWorkspace();
              }}
              className="mt-2 flex items-center justify-center min-h-[44px] px-4 rounded-lg bg-[#06B6D4] text-[#0B1F3B] text-sm font-semibold hover:bg-[#22D3EE] transition-colors cursor-pointer"
            >
              Launch Tool Workspace
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
