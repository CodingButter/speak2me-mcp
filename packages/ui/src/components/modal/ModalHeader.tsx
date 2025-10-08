import * as React from "react";
import { cn } from "../../lib/utils";

interface ModalHeaderProps {
  children?: React.ReactNode;
  className?: string;
}

export const ModalHeader = React.forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ children, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "px-6 pt-6 pb-4 border-b border-slate-700",
          className
        )}
      >
        {children}
      </div>
    );
  }
);

ModalHeader.displayName = "ModalHeader";
