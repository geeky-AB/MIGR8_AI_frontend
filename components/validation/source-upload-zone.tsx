"use client";

import { useRef, useState, type ChangeEvent, type DragEvent } from "react";
import { AddIcon, UploadFileIcon } from "@/components/ui/icons";

type SourceUploadZoneProps = {
  onFileSelected?: (fileName: string) => void;
};

export function SourceUploadZone({ onFileSelected }: SourceUploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  function applyFile(file: File | undefined) {
    if (!file) return;
    setFileName(file.name);
    onFileSelected?.(file.name);
    console.info("Validation source selected", { name: file.name });
  }

  function handleBrowse() {
    inputRef.current?.click();
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    applyFile(event.target.files?.[0]);
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragOver(false);
    applyFile(event.dataTransfer.files?.[0]);
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleBrowse}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleBrowse();
        }
      }}
      onDragOver={(event) => {
        event.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      className={[
        "group mb-8 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-primary/30 bg-surface-container-lowest p-6 text-center transition-colors sm:p-8",
        dragOver
          ? "border-solid border-primary-container bg-surface-container"
          : "hover:bg-primary-container/5",
      ].join(" ")}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".csv,.xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv"
        className="hidden"
        onChange={handleChange}
        onClick={(event) => event.stopPropagation()}
      />

      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-container/10 transition-transform group-hover:scale-110">
        <UploadFileIcon className="h-10 w-10 text-primary" />
      </div>
      <h3 className="mb-2 text-2xl font-semibold leading-8 text-on-surface">
        Source File for Validation
      </h3>
      <p className="mb-6 max-w-md text-base leading-6 text-on-surface-variant">
        Drag and drop your migration source file here, or click to browse your
        local files.
      </p>
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          handleBrowse();
        }}
        className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 text-xs font-semibold uppercase tracking-[0.02em] text-on-primary shadow-md transition-all hover:bg-primary/90"
      >
        <AddIcon className="h-4 w-4" />
        Select Source File
      </button>
      <p className="mt-4 font-mono text-xs font-medium leading-4 text-outline">
        {fileName
          ? `Selected: ${fileName}`
          : "Supported formats: .xlsx, .csv"}
      </p>
    </div>
  );
}
