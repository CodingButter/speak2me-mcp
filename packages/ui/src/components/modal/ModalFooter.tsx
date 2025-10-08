import * as React from "react";
import { cn } from "../../lib/utils";

interface ModalFooterProps {
  children?: React.ReactNode;
  className?: string;
}

export const ModalFooter = React.forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ children, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "px-6 py-4 border-t border-slate-700 flex items-center justify-end gap-3",
          className
        )}
      >
        {children}
      </div>
    );
  }
);

ModalFooter.displayName = "ModalFooter";
