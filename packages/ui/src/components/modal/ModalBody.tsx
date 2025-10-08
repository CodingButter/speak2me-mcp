import * as React from "react";
import { cn } from "../../lib/utils";

interface ModalBodyProps {
  children?: React.ReactNode;
  className?: string;
}

export const ModalBody = React.forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ children, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("px-6 py-4", className)}
      >
        {children}
      </div>
    );
  }
);

ModalBody.displayName = "ModalBody";
