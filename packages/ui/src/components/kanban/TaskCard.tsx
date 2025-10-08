import * as React from "react";
import { cn } from "../../lib/utils";
import { Card } from "../ui/card";
import { PriorityBadge, Priority } from "./PriorityBadge";
import { TaskTag } from "./TaskTag";
import { User, MessageSquare } from "lucide-react";

interface TaskCardProps {
  title: string;
  description?: string;
  priority: Priority;
  tags?: string[];
  assignee?: string;
  commentCount?: number;
  className?: string;
  onClick?: () => void;
}

export const TaskCard = React.forwardRef<HTMLDivElement, TaskCardProps>(
  (
    {
      title,
      description,
      priority,
      tags = [],
      assignee,
      commentCount = 0,
      className,
      onClick,
    },
    ref
  ) => {
    return (
      <Card
        ref={ref}
        className={cn(
          "p-4 cursor-pointer transition-all hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10",
          "bg-slate-800/50 border-slate-700",
          className
        )}
        onClick={onClick}
      >
        {/* Header with Priority and Tags */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <PriorityBadge priority={priority} />
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {tags.map((tag, index) => (
                <TaskTag key={index} tag={tag} />
              ))}
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold text-slate-100 mb-2">{title}</h3>

        {/* Description */}
        {description && (
          <p className="text-xs text-slate-400 mb-3 line-clamp-2">
            {description}
          </p>
        )}

        {/* Footer with Assignee and Comments */}
        <div className="flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <User className="w-3 h-3" />
            <span>{assignee || "Unassigned"}</span>
          </div>
          {commentCount > 0 && (
            <div className="flex items-center gap-1">
              <MessageSquare className="w-3 h-3" />
              <span>{commentCount}</span>
            </div>
          )}
        </div>
      </Card>
    );
  }
);

TaskCard.displayName = "TaskCard";
