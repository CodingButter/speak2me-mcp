import * as React from "react";
import { cn } from "../../lib/utils";
import { Card } from "../ui/card";

interface NoteCardProps {
  title: string;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export const NoteCard = React.forwardRef<HTMLDivElement, NoteCardProps>(
  ({ title, isActive = false, onClick, className }, ref) => {
    return (
      <Card
        ref={ref}
        className={cn(
          "p-3 cursor-pointer transition-all",
          "bg-slate-800/50 border-slate-700",
          "hover:bg-slate-700/50",
          isActive && "bg-purple-500/20 border-purple-500/50 text-purple-300",
          className
        )}
        onClick={onClick}
      >
        <div className="text-sm font-medium truncate">{title}</div>
      </Card>
    );
  }
);

NoteCard.displayName = "NoteCard";
