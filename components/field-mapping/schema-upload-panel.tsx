"use client";

import type { ChangeEvent, ComponentType } from "react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { SchemaIcon, UploadFileIcon } from "@/components/ui/icons";
import type { SchemaUploadCard } from "@/data/field-mapping";

const iconMap: Record<
  SchemaUploadCard["icon"],
  ComponentType<{ className?: string }>
> = {
  uploadFile: UploadFileIcon,
  schema: SchemaIcon,
};

type SchemaUploadPanelProps = {
  card: SchemaUploadCard;
  file: File | null;
  onFileSelected: (file: File) => void;
};

export function SchemaUploadPanel({
  card,
  file,
  onFileSelected,
}: SchemaUploadPanelProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const Icon = iconMap[card.icon];

  function handleSelectClick() {
    inputRef.current?.click();
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const selected = event.target.files?.[0];
    if (!selected) return;
    // Local selection only — nothing is sent until "Start Mapping" is clicked.
    onFileSelected(selected);
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-[20px] border border-outline-variant bg-surface p-6 text-center shadow-sm sm:p-8">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-container/10 text-primary">
        <Icon className="h-10 w-10" />
      </div>
      <h3 className="text-xl font-semibold leading-7 text-on-surface sm:text-2xl sm:leading-8">
        {card.title}
      </h3>
      <p className="max-w-xs text-sm leading-5 text-on-surface-variant sm:text-base sm:leading-6">
        {card.description}
      </p>

      <input
        ref={inputRef}
        type="file"
        accept=".csv,.xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv"
        className="hidden"
        onChange={handleFileChange}
      />

      <Button
        type="button"
        onClick={handleSelectClick}
        className="mt-4 h-auto rounded bg-primary px-6 py-2 text-xs font-semibold uppercase tracking-[0.02em] text-on-primary shadow-none hover:bg-primary hover:opacity-90"
      >
        {card.buttonLabel}
      </Button>

      <p className="mt-2 text-[13px] leading-[18px] text-outline">
        {file ? `Selected: ${file.name}` : card.supportedFormats}
      </p>
    </div>
  );
}
