import * as React from "react";
import { cn } from "../../lib/utils";

interface ModalTitleProps {
  children?: React.ReactNode;
  className?: string;
}

export const ModalTitle = React.forwardRef<
  HTMLHeadingElement,
  ModalTitleProps
>(({ children, className }, ref) => {
  return (
    <h2
      ref={ref}
      className={cn(
        "text-xl font-semibold text-slate-100",
        className
      )}
    >
      {children}
    </h2>
  );
});

ModalTitle.displayName = "ModalTitle";
