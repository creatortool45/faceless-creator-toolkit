import {Info} from 'lucide-react';

interface ToolDisclaimerProps {
  message?: string;
}

export function ToolDisclaimer({
  message = 'Generated suggestions are creative starting ideas to adapt to your research and voice—not guaranteed viral results or performance predictions.',
}: ToolDisclaimerProps) {
  return (
    <div className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-xs leading-relaxed text-slate-600">
      <Info className="w-4 h-4 text-[#0E7490] shrink-0 mt-0.5" aria-hidden="true" />
      <p>{message}</p>
    </div>
  );
}
