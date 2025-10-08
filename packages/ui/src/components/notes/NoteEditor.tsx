import * as React from "react";
import { cn } from "../../lib/utils";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

interface NoteEditorProps {
  title: string;
  content: string;
  createdAt?: string;
  modifiedAt?: string;
  onTitleChange?: (title: string) => void;
  onContentChange?: (content: string) => void;
  onEdit?: () => void;
  onDelete?: () => void;
  readOnly?: boolean;
  className?: string;
}

export const NoteEditor = React.forwardRef<HTMLDivElement, NoteEditorProps>(
  (
    {
      title,
      content,
      createdAt,
      modifiedAt,
      onTitleChange,
      onContentChange,
      onEdit,
      onDelete,
      readOnly = true,
      className,
    },
    ref
  ) => {
    return (
      <Card
        ref={ref}
        className={cn(
          "p-6 bg-slate-900/50 border-slate-700",
          className
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          {readOnly ? (
            <h2 className="text-xl font-semibold text-slate-100">{title}</h2>
          ) : (
            <input
              type="text"
              value={title}
              onChange={(e) => onTitleChange?.(e.target.value)}
              className="flex-1 text-xl font-semibold bg-transparent border-none outline-none text-slate-100 placeholder:text-slate-500"
              placeholder="Note title..."
            />
          )}
          <div className="flex gap-2 ml-4">
            {onEdit && (
              <Button variant="secondary" size="sm" onClick={onEdit}>
                {readOnly ? "Edit" : "Save"}
              </Button>
            )}
            {onDelete && (
              <Button variant="destructive" size="sm" onClick={onDelete}>
                Delete
              </Button>
            )}
          </div>
        </div>

        {/* Metadata */}
        {(createdAt || modifiedAt) && (
          <div className="text-xs text-slate-500 mb-6">
            {createdAt && <span>Created: {createdAt}</span>}
            {createdAt && modifiedAt && <span className="mx-2">|</span>}
            {modifiedAt && <span>Modified: {modifiedAt}</span>}
          </div>
        )}

        {/* Content */}
        {readOnly ? (
          <div className="prose prose-invert prose-slate max-w-none">
            <div
              className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        ) : (
          <Textarea
            value={content}
            onChange={(e) => onContentChange?.(e.target.value)}
            className="min-h-[400px] font-mono text-sm bg-slate-800/50 border-slate-700"
            placeholder="Write your note here..."
          />
        )}
      </Card>
    );
  }
);

NoteEditor.displayName = "NoteEditor";
