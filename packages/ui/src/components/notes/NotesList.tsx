import * as React from "react";
import { cn } from "../../lib/utils";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

interface NotesListProps {
  children?: React.ReactNode;
  onNew?: () => void;
  className?: string;
}

export const NotesList = React.forwardRef<HTMLDivElement, NotesListProps>(
  ({ children, onNew, className }, ref) => {
    return (
      <Card
        ref={ref}
        className={cn(
          "p-4 bg-slate-900/50 border-slate-700",
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-slate-200">Notes</h3>
          {onNew && (
            <Button
              size="sm"
              onClick={onNew}
              className="h-8 px-3 text-xs"
            >
              <Plus className="w-4 h-4 mr-1" />
              New
            </Button>
          )}
        </div>

        {/* Notes List */}
        <div className="flex flex-col gap-2">
          {children}
        </div>
      </Card>
    );
  }
);

NotesList.displayName = "NotesList";
