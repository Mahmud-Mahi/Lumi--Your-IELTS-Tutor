import React, { useEffect, useLayoutEffect, useRef } from 'react';

interface ChatInputBoxProps {
  value: string;
  onChange: (text: string) => void;
  onSend: () => void;
  placeholder?: string;
  disabled?: boolean;
  /** Max visible rows before the box starts scrolling. */
  maxRows?: number;
  inputId?: string;
  /** Focus the composer once when it appears (e.g. after opening a chat). */
  autoFocus?: boolean;
  /** Extra classes for the wrapping element (usually `flex-1`). */
  containerClassName?: string;
  /**
   * Copilot-style inline suggestion (e.g. the Whisper-refined version of the
   * draft). Shown as gray ghost text inside the box; the real value is only
   * replaced when the suggestion is accepted. Tab accepts, Esc dismisses.
   */
  ghostSuggestion?: string | null;
  /** Called when the user accepts the ghost suggestion (Tab / button). */
  onGhostAccept?: () => void;
  /** Called when the user dismisses the ghost suggestion (Esc / typing). */
  onGhostDismiss?: () => void;
}

/**
 * A professional, WhatsApp/Discord/Messenger-style message composer.
 *
 * - Multi-line <textarea> that auto-grows up to `maxRows` and then scrolls.
 * - Enter sends, Shift+Enter inserts a newline, IME composition is respected.
 * - The text caret "syncs" with externally-applied text (e.g. live speech
 *   recognition): while the user types, the native caret is preserved; when
 *   text arrives from outside (speech transcript), the caret follows to the end.
 * - After a send clears the box, focus returns to the composer automatically.
 */
export const ChatInputBox: React.FC<ChatInputBoxProps> = ({
  value,
  onChange,
  onSend,
  placeholder,
  disabled,
  maxRows = 4,
  inputId,
  autoFocus,
  containerClassName = '',
  ghostSuggestion,
  onGhostAccept,
  onGhostDismiss,
}) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  // True when the latest value change came from the user typing/pasting
  // (so we don't override their native caret with the external-update logic).
  const userEditRef = useRef(false);
  const prevValueRef = useRef(value);
  const prevHadTextRef = useRef(value !== '');

  const hasGhost = Boolean(ghostSuggestion && ghostSuggestion.trim());

  // Auto-resize the textarea to fit the content, capped at maxRows. While a
  // ghost suggestion is pending, size to the LONGER of draft/suggestion so the
  // ghost text is never clipped by the box.
  const sizeText = hasGhost && ghostSuggestion!.length > value.length ? ghostSuggestion! : value;
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const style = getComputedStyle(el) as CSSStyleDeclaration & {
      lineHeight?: string;
      paddingTop?: string;
      paddingBottom?: string;
    };
    const lineHeight = parseFloat(String(style.lineHeight || '')) || 20;
    const padTop = parseFloat(String(style.paddingTop || '')) || 0;
    const padBottom = parseFloat(String(style.paddingBottom || '')) || 0;
    const maxHeight = lineHeight * maxRows + padTop + padBottom;

    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, maxHeight)}px`;
    el.style.overflowY = el.scrollHeight > maxHeight ? 'auto' : 'hidden';
  }, [sizeText, maxRows]);

  // Cursor sync: keep the caret glued to the end when text arrives from an
  // external source (live speech), but never fight the user's native caret.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const externalUpdate = prevValueRef.current !== value && !userEditRef.current;
    if (externalUpdate && el === document.activeElement) {
      const len = el.value.length;
      try { el.setSelectionRange(len, len); } catch {}
    }
    userEditRef.current = false;
    prevValueRef.current = value;

    // After a send clears the box, refocus so the user can immediately type
    // the next message (WhatsApp/Discord behaviour).
    if (value === '' && prevHadTextRef.current && el !== document.activeElement && !disabled) {
      try { el.focus({ preventScroll: true }); } catch {}
    }
    prevHadTextRef.current = value !== '';
  }, [value, disabled]);

  // Optional one-time focus when the composer appears (autoFocus only fires
  // once on mount; it must not steal focus later while disabled flips).
  const didAutoFocusRef = useRef(false);
  useEffect(() => {
    if (!autoFocus || disabled || didAutoFocusRef.current) return;
    didAutoFocusRef.current = true;
    const t = setTimeout(() => {
      try { ref.current?.focus({ preventScroll: true }); } catch {}
    }, 50);
    return () => clearTimeout(t);
  }, [autoFocus, disabled]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Typing while a suggestion is pending means the user is editing their own
    // draft — the ghost is stale the moment a character lands.
    if (hasGhost) onGhostDismiss?.();
    userEditRef.current = true;
    onChange(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Copilot-style ghost handling takes precedence over everything else:
    // Tab accepts the suggestion, Esc keeps the user's own text.
    if (hasGhost) {
      if (e.key === 'Tab') {
        e.preventDefault();
        onGhostAccept?.();
        return;
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        onGhostDismiss?.();
        return;
      }
    }
    // Enter sends; Shift+Enter makes a newline; IME composing Enter is ignored
    // so CJK/romaji input methods can confirm candidates without sending.
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className={`flex flex-col ${containerClassName}`}>
      <div className="relative flex items-end w-full">
        {/* Ghost suggestion overlay — gray italic preview of what the box will
            contain if accepted (VS Code Copilot style). The textarea's own
            text is transparent while the ghost is pending. */}
        {hasGhost && (
          <div
            aria-hidden
            className="absolute inset-0 px-4 py-3 rounded-2xl text-xs sm:text-sm leading-relaxed text-[#6272a4] italic whitespace-pre-wrap break-words overflow-hidden pointer-events-none max-h-[140px]"
          >
            {ghostSuggestion}
          </div>
        )}
        <textarea
          ref={ref}
          id={inputId}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          rows={1}
          data-enable-grammarly="false"
          placeholder={hasGhost ? '' : placeholder}
          style={hasGhost ? { color: 'transparent', caretColor: '#f8f8f2' } : undefined}
          className="w-full resize-none overflow-hidden leading-relaxed min-h-[44px] max-h-[140px] px-4 py-3 rounded-2xl bg-[#282a36] border border-[#44475a] text-[#f8f8f2] text-xs sm:text-sm placeholder-[#6272a4] focus:outline-none focus:ring-2 focus:ring-[#bd93f9]/50 disabled:opacity-60 disabled:cursor-not-allowed"
        />
      </div>
      {hasGhost && (
        <div className="flex items-center gap-2 pt-1.5 px-1 text-[10px]">
          <span className="text-[#bd93f9]">✦ AI refined</span>
          <button
            type="button"
            onClick={onGhostAccept}
            className="px-2 py-0.5 rounded-md border border-[#44475a] text-[#50fa7b] hover:bg-[#44475a] transition-colors cursor-pointer"
          >
            Use it <span className="opacity-60">(Tab)</span>
          </button>
          <button
            type="button"
            onClick={onGhostDismiss}
            className="px-2 py-0.5 rounded-md border border-transparent text-[#6272a4] hover:bg-[#44475a] hover:text-[#f8f8f2] transition-colors cursor-pointer"
          >
            Keep mine <span className="opacity-60">(Esc)</span>
          </button>
        </div>
      )}
    </div>
  );
};