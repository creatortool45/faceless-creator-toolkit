import {Check, Copy} from 'lucide-react';
import {useState} from 'react';

interface CopyButtonProps {
  text: string;
  label?: string;
  copiedLabel?: string;
  variant?: 'secondary' | 'primary' | 'ghost';
  className?: string;
  disabled?: boolean;
}

export async function copyToClipboard(text: string): Promise<boolean> {
  if (!text) return false;
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Fallback below
  }
  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(textarea);
    return ok;
  } catch {
    return false;
  }
}

export function CopyButton({
  text,
  label = 'Copy',
  copiedLabel = 'Copied',
  variant = 'secondary',
  className = '',
  disabled = false,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (disabled || !text) return;
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    }
  };

  const baseStyles =
    'inline-flex items-center justify-center gap-1.5 min-h-[40px] px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-45 disabled:cursor-not-allowed';

  const variantStyles =
    variant === 'primary'
      ? 'bg-[#0B1F3B] text-white hover:bg-[#13325C]'
      : variant === 'ghost'
        ? 'text-[#0B1F3B] hover:bg-slate-100 border border-transparent'
        : 'bg-white text-[#0B1F3B] border border-slate-200 hover:border-[#06B6D4] hover:bg-cyan-50/40';

  return (
    <button
      type="button"
      onClick={handleCopy}
      disabled={disabled || !text}
      className={`${baseStyles} ${variantStyles} ${className}`}
      aria-live="polite"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-[#0E7490]" aria-hidden="true" />
          <span className="text-[#0E7490]">{copiedLabel}</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
}
