import { useState, useCallback, useRef } from "react";
import { Upload, X } from "lucide-react";
import { FileIcon } from "./FileIcon";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

export interface UploadedFile {
  id: string;
  file: File;
  name: string;
}

export interface FileUploadProps {
  files: UploadedFile[];
  onFilesAdded: (files: File[]) => void;
  onFileRemoved: (id: string) => void;
  maxFiles?: number;
  accept?: string;
  className?: string;
}

export function FileUpload({
  files,
  onFilesAdded,
  onFileRemoved,
  maxFiles = 10,
  accept,
  className,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragCounter = useRef(0);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      dragCounter.current = 0;

      const droppedFiles = Array.from(e.dataTransfer.files);
      if (droppedFiles.length > 0) {
        const remainingSlots = maxFiles - files.length;
        const filesToAdd = droppedFiles.slice(0, remainingSlots);
        if (filesToAdd.length > 0) {
          onFilesAdded(filesToAdd);
        }
      }
    },
    [files.length, maxFiles, onFilesAdded]
  );

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
      if (selectedFiles.length > 0) {
        const remainingSlots = maxFiles - files.length;
        const filesToAdd = selectedFiles.slice(0, remainingSlots);
        if (filesToAdd.length > 0) {
          onFilesAdded(filesToAdd);
        }
      }
      // Reset input value so same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [files.length, maxFiles, onFilesAdded]
  );

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={cn(
        "relative flex flex-col gap-2 p-2 border border-border rounded bg-bg-secondary transition-colors",
        isDragging && "border-accent-blue bg-accent-blue/10",
        className
      )}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={accept}
        onChange={handleFileInputChange}
        className="hidden"
      />

      {files.length === 0 ? (
        <button
          onClick={handleClick}
          className="flex flex-col items-center justify-center gap-2 p-4 text-text-tertiary hover:text-text-secondary transition-colors cursor-pointer"
        >
          <Upload className="w-6 h-6" />
          <span className="text-xs">Drop files or click</span>
        </button>
      ) : (
        <div className="flex flex-wrap gap-2">
          {files.map((uploadedFile) => (
            <div
              key={uploadedFile.id}
              className="relative group flex flex-col items-center p-2 rounded hover:bg-bg-hover transition-colors"
            >
              <FileIcon filename={uploadedFile.name} size="md" showName={true} maxNameLength={12} />
              <button
                onClick={() => onFileRemoved(uploadedFile.id)}
                className="absolute -top-1 -right-1 p-0.5 rounded-full bg-destructive text-bg-primary opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label={`Remove ${uploadedFile.name}`}
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
          {files.length < maxFiles && (
            <button
              onClick={handleClick}
              className="flex flex-col items-center justify-center p-2 w-16 h-16 border border-dashed border-border rounded hover:border-accent-blue hover:text-accent-blue transition-colors"
            >
              <Upload className="w-5 h-5" />
              <span className="text-xs mt-1">Add</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
