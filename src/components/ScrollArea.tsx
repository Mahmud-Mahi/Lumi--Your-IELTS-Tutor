import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';

interface ScrollAreaProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/**
 * Bounded, scrollable container ("scroll area") that never stretches its
 * parent — content scrolls inside instead. Uses the app's global Dracula
 * thin scrollbar styling (see src/index.css).
 *
 * Give it a height constraint via className (e.g. `flex-1 min-h-0` inside a
 * bounded flex parent, or `max-h-[55vh]` when ancestors are unbounded) and
 * it will scroll internally as content grows.
 */
export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ children, className = '', ...rest }, ref) => (
    <div
      ref={ref}
      className={`min-h-0 overflow-y-auto overscroll-contain ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
);

ScrollArea.displayName = 'ScrollArea';