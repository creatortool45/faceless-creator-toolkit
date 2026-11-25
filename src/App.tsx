/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {useEffect, useState} from 'react';
import {Footer} from './components/Footer';
import {Header} from './components/Header';
import {HomePage} from './components/HomePage';
import {
  AboutPage,
  ContactPage,
  PrivacyPolicyPage,
  TermsOfUsePage,
} from './components/InfoPages';
import {ToolWorkspace} from './components/ToolWorkspace';
import {TOOLS_CATALOG} from './data/toolsCatalog';
import type {HandoffPayload, PageRoute, ToolId} from './types/toolkit';

const VALID_TOOL_IDS = new Set<string>(TOOLS_CATALOG.map((t) => t.id));

function parseHash(): {route: PageRoute; toolId: ToolId} {
  const raw = window.location.hash.replace(/^#/, '').trim();
  if (!raw || raw === 'home') {
    return {route: 'home', toolId: 'video-idea-generator'};
  }
  if (raw === 'about' || raw === 'contact' || raw === 'privacy' || raw === 'terms') {
    return {route: raw, toolId: 'video-idea-generator'};
  }
  if (raw === 'tools') {
    return {route: 'tools', toolId: 'video-idea-generator'};
  }
  if (raw.startsWith('tools/')) {
    const candidate = raw.slice('tools/'.length);
    if (VALID_TOOL_IDS.has(candidate)) {
      return {route: 'tools', toolId: candidate as ToolId};
    }
    return {route: 'tools', toolId: 'video-idea-generator'};
  }
  return {route: 'home', toolId: 'video-idea-generator'};
}

export default function App() {
  const initial = parseHash();
  const [route, setRoute] = useState<PageRoute>(initial.route);
  const [activeTool, setActiveTool] = useState<ToolId>(initial.toolId);
  const [handoff, setHandoff] = useState<HandoffPayload | undefined>(undefined);

  useEffect(() => {
    const handleHashChange = () => {
      const parsed = parseHash();
      setRoute(parsed.route);
      if (parsed.route === 'tools') {
        setActiveTool(parsed.toolId);
      }
      window.scrollTo({top: 0, behavior: 'auto'});
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (nextRoute: PageRoute) => {
    setRoute(nextRoute);
    const targetHash = nextRoute === 'tools' ? `#tools/${activeTool}` : `#${nextRoute}`;
    if (window.location.hash !== targetHash) {
      window.location.hash = targetHash;
    }
    window.scrollTo({top: 0, behavior: 'auto'});
  };

  const selectTool = (toolId: ToolId, payload?: HandoffPayload) => {
    setActiveTool(toolId);
    setHandoff(payload);
    setRoute('tools');
    const targetHash = `#tools/${toolId}`;
    if (window.location.hash !== targetHash) {
      window.location.hash = targetHash;
    }
    window.scrollTo({top: 0, behavior: 'auto'});
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#0B1F3B]">
      <Header
        activeRoute={route}
        onNavigate={navigateTo}
        onOpenWorkspace={() => selectTool(activeTool)}
      />

      <div className="flex-1">
        {route === 'home' && (
          <HomePage onSelectTool={(id) => selectTool(id)} onNavigate={navigateTo} />
        )}
        {route === 'tools' && (
          <ToolWorkspace
            activeTool={activeTool}
            handoff={handoff}
            onSelectTool={selectTool}
            onBackHome={() => navigateTo('home')}
          />
        )}
        {route === 'about' && (
          <AboutPage onNavigate={navigateTo} onOpenTools={() => selectTool(activeTool)} />
        )}
        {route === 'contact' && (
          <ContactPage onNavigate={navigateTo} onOpenTools={() => selectTool(activeTool)} />
        )}
        {route === 'privacy' && <PrivacyPolicyPage />}
        {route === 'terms' && <TermsOfUsePage />}
      </div>

      <Footer onNavigate={navigateTo} onSelectTool={(id) => selectTool(id)} />
    </div>
  );
}
