import {TOOLS_CATALOG} from '../data/toolsCatalog';
import type {PageRoute, ToolId} from '../types/toolkit';

interface FooterProps {
  onNavigate: (route: PageRoute) => void;
  onSelectTool: (toolId: ToolId) => void;
}

export function Footer({onNavigate, onSelectTool}: FooterProps) {
  return (
    <footer className="border-t border-slate-200 bg-[#0B1F3B] text-slate-300">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5 space-y-3">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('home');
              }}
              className="font-display text-lg font-bold text-white inline-block"
            >
              Faceless Creator Toolkit
            </a>
            <p className="text-sm leading-relaxed text-slate-300 max-w-md">
              A free, browser-based planning and scripting workspace built for beginner faceless
              YouTube creators worldwide. All eight tools run locally on your device with no
              accounts, no paid APIs, and no external tracking.
            </p>
            <p className="text-xs leading-relaxed text-slate-400">
              Note: Tool outputs are creative starting points to help organize your own original
              videos—never guaranteed viral outcomes.
            </p>
          </div>

          <div className="md:col-span-4 space-y-3">
            <h2 className="font-display text-sm font-semibold text-white">Creator Tools</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
              {TOOLS_CATALOG.map((tool) => (
                <li key={tool.id}>
                  <a
                    href={`#tools/${tool.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onSelectTool(tool.id);
                    }}
                    className="text-slate-300 hover:text-[#22D3EE] transition-colors inline-block py-0.5"
                  >
                    {tool.shortName}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h2 className="font-display text-sm font-semibold text-white">Information</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#about"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('about');
                  }}
                  className="text-slate-300 hover:text-[#22D3EE] transition-colors inline-block py-0.5"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('contact');
                  }}
                  className="text-slate-300 hover:text-[#22D3EE] transition-colors inline-block py-0.5"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#privacy"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('privacy');
                  }}
                  className="text-slate-300 hover:text-[#22D3EE] transition-colors inline-block py-0.5"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#terms"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('terms');
                  }}
                  className="text-slate-300 hover:text-[#22D3EE] transition-colors inline-block py-0.5"
                >
                  Terms of Use
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Faceless Creator Toolkit. Free educational utility.</p>
          <p>100% client-side execution · No login required</p>
        </div>
      </div>
    </footer>
  );
}
