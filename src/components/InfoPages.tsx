import {Check, Mail, ShieldCheck, Trash2} from 'lucide-react';
import {useState} from 'react';
import type {PageRoute} from '../types/toolkit';
import {CopyButton} from './CopyButton';

interface InfoPageProps {
  onNavigate: (route: PageRoute) => void;
  onOpenTools: () => void;
}

export function AboutPage({onOpenTools}: InfoPageProps) {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-16 space-y-10">
      <div className="space-y-4">
        <p className="text-xs font-semibold text-[#0E7490]">About the Toolkit</p>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0B1F3B]">
          Practical planning tools for beginner faceless YouTube creators.
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Faceless Creator Toolkit was designed to give new creators around the world a calm,
          distraction-free place to plan videos, check speaking times, and format uploads without
          subscriptions, accounts, or exaggerated promises.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="rounded-xl border border-slate-200 bg-white p-6 space-y-3">
          <h2 className="font-display text-lg font-bold text-[#0B1F3B]">Why client-side only?</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Every generator, outline builder, and word counter in this toolkit runs directly inside
            your browser using structured JavaScript templates and text analysis. That keeps page
            loads fast on mobile connections and ensures your script drafts never leave your device.
          </p>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6 space-y-3">
          <h2 className="font-display text-lg font-bold text-[#0B1F3B]">What these tools do—and don’t do</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            These tools help you overcome blank-page friction, organize clear B-roll cues, and
            format clean metadata. They do not predict algorithm performance or guarantee views.
            Thoughtful research and steady practice remain the foundation of every good channel.
          </p>
        </section>
      </div>

      <div className="rounded-xl bg-[#0B1F3B] text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="font-display text-xl font-bold">Ready to plan your next video?</h2>
          <p className="text-sm text-slate-300">
            Jump straight into any of the eight browser-based tools.
          </p>
        </div>
        <button
          type="button"
          onClick={onOpenTools}
          className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 rounded-lg bg-[#06B6D4] text-[#0B1F3B] text-sm font-semibold hover:bg-[#22D3EE] transition-colors cursor-pointer shrink-0"
        >
          Open Creator Tools
        </button>
      </div>
    </div>
  );
}

const SUPPORT_EMAIL = 'facelesscreatort@gmail.com';
const PUBLISHER_NAME = 'Faceless Creator Toolkit';

export function ContactPage({onNavigate}: InfoPageProps) {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-16 space-y-8">
      <div className="space-y-3">
        <p className="text-xs font-semibold text-[#0E7490]">Contact</p>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0B1F3B]">
          Get in touch
        </h1>
        <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
          Have feedback on a tool, a feature suggestion for beginner faceless creators, or a
          question about the site? Reach out using the contact details below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
          <div className="flex items-center gap-2.5">
            <Mail className="w-5 h-5 text-[#0E7490]" aria-hidden="true" />
            <h2 className="font-display text-lg font-bold text-[#0B1F3B]">Email Inquiries</h2>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            Support Email:
          </p>
          <p className="font-mono text-sm font-semibold break-all">
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="text-[#0E7490] hover:text-[#0B1F3B] underline underline-offset-2 transition-colors"
            >
              {SUPPORT_EMAIL}
            </a>
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <CopyButton text={SUPPORT_EMAIL} label="Copy Support Email" />
            <a
              href={`mailto:${SUPPORT_EMAIL}?subject=Faceless%20Creator%20Toolkit%20Feedback`}
              className="inline-flex items-center justify-center min-h-[40px] px-4 py-2 rounded-lg bg-[#0B1F3B] text-white text-xs font-semibold hover:bg-[#13325C] transition-colors"
            >
              Open Mail App
            </a>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6 space-y-3">
          <h2 className="font-display text-lg font-bold text-[#0B1F3B]">
            Publisher &amp; Response Notes
          </h2>
          <dl className="space-y-2.5 text-sm">
            <div>
              <dt className="text-xs font-semibold text-slate-500">Publisher</dt>
              <dd className="text-[#0B1F3B] font-medium">{PUBLISHER_NAME}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold text-slate-500">Privacy &amp; Data Requests</dt>
              <dd className="text-slate-600">
                Because no user accounts or servers store your inputs, you can also clear saved
                Production Planner notes directly from the{' '}
                <button
                  type="button"
                  onClick={() => onNavigate('privacy')}
                  className="font-semibold text-[#0E7490] underline underline-offset-2 cursor-pointer"
                >
                  Privacy Policy
                </button>{' '}
                page.
              </dd>
            </div>
          </dl>
        </section>
      </div>
    </div>
  );
}

export function PrivacyPolicyPage() {
  const [cleared, setCleared] = useState(false);

  const handleClearLocalData = () => {
    try {
      localStorage.removeItem('fct_production_projects_v1');
      setCleared(true);
      window.setTimeout(() => setCleared(false), 3000);
    } catch {
      // Ignore storage access errors
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-16 space-y-8">
      <div className="space-y-3">
        <p className="text-xs font-semibold text-[#0E7490]">Privacy Policy</p>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0B1F3B]">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-500">Effective Date: November 19, 2026</p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6 text-sm text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#0E7490]" aria-hidden="true" />
            <h2 className="font-display text-lg font-bold text-[#0B1F3B]">
              1. Local Browser Execution (No Server Processing)
            </h2>
          </div>
          <p>
            Faceless Creator Toolkit is a purely client-side web application. All text you enter
            into the Video Idea Generator, Title Generator, Outline Maker, Hook Generator,
            Description Formatter, and Word Counter is processed locally in your browser memory.
            We do not send your scripts, topics, or titles to external servers or third-party AI
            APIs.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-lg font-bold text-[#0B1F3B]">
            2. Local Storage in Production Planner
          </h2>
          <p>
            The Production Planner saves your project checklist inside your browser’s{' '}
            <code className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded">
              localStorage
            </code>{' '}
            so your tasks stay available when you refresh the page. This data never leaves your
            device and is not accessible to us. You can clear it at any time below:
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={handleClearLocalData}
              className="inline-flex items-center gap-2 min-h-[42px] px-4 py-2 rounded-lg border border-slate-300 bg-white text-xs font-semibold text-[#0B1F3B] hover:border-red-300 hover:text-red-700 transition-colors cursor-pointer"
            >
              {cleared ? (
                <>
                  <Check className="w-4 h-4 text-[#0E7490]" aria-hidden="true" />
                  <span className="text-[#0E7490]">Saved Production Planner data cleared</span>
                </>
              ) : (
                <>
                  <Trash2 className="w-4 h-4" aria-hidden="true" />
                  <span>Clear Saved Production Planner Data</span>
                </>
              )}
            </button>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-lg font-bold text-[#0B1F3B]">
            3. Advertising, Cookies, and External Tracking
          </h2>
          <p>
            This website currently has no advertising, third-party ad networks, ad tracking,
            behavioral tracking pixels, cross-site cookies, or external user-profiling analytics
            installed. Standard web server logs (such as IP address or browser type) may be handled
            transiently by the hosting provider according to their infrastructure policies.
          </p>
          <p>
            If advertising or analytics services are added in the future, this section will be
            updated before those services take effect to describe any associated cookies, data
            handling, and opt-out controls.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-lg font-bold text-[#0B1F3B]">
            4. Contact for Privacy Questions
          </h2>
          <p>
            If you have questions about this policy, contact {PUBLISHER_NAME} at{' '}
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="font-semibold text-[#0E7490] hover:text-[#0B1F3B] underline underline-offset-2"
            >
              {SUPPORT_EMAIL}
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}

export function TermsOfUsePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-16 space-y-8">
      <div className="space-y-3">
        <p className="text-xs font-semibold text-[#0E7490]">Terms of Use</p>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0B1F3B]">
          Terms of Use
        </h1>
        <p className="text-xs text-slate-500">Last Updated: November 19, 2026</p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6 text-sm text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="font-display text-lg font-bold text-[#0B1F3B]">
            1. Free Educational &amp; Planning Purpose
          </h2>
          <p>
            Faceless Creator Toolkit is provided free of charge as a browser-based planning and
            formatting utility for video creators. By using this site, you agree to use the tools
            lawfully and responsibly.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-lg font-bold text-[#0B1F3B]">
            2. No Performance or Revenue Guarantees
          </h2>
          <p>
            All titles, video concepts, outlines, hooks, and niche summaries are creative starting
            ideas only. They do not guarantee views, watch time, subscriber growth, monetization
            approval, or revenue on YouTube or any other platform.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-lg font-bold text-[#0B1F3B]">
            3. Creator Responsibility &amp; Platform Rules
          </h2>
          <p>
            You are solely responsible for the accuracy, originality, copyright licensing, and
            compliance of any videos, scripts, stock footage, or audio you publish. Always verify
            facts and follow YouTube’s Community Guidelines and copyright policies.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-lg font-bold text-[#0B1F3B]">
            4. As-Is Availability
          </h2>
          <p>
            This toolkit is offered on an “as-is” and “as-available” basis without warranties of
            any kind. Please keep independent backups of important scripts and production notes
            saved in your browser.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-lg font-bold text-[#0B1F3B]">
            5. Operator &amp; Governing Details
          </h2>
          <p>
            Maintained by {PUBLISHER_NAME}, reachable at{' '}
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="font-semibold text-[#0E7490] hover:text-[#0B1F3B] underline underline-offset-2"
            >
              {SUPPORT_EMAIL}
            </a>
            . These Terms of Use are governed by the laws of India.
          </p>
        </section>
      </div>
    </div>
  );
}
