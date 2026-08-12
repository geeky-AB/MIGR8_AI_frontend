"use client";

import { useState, type DragEvent } from "react";
import apiClient, { getApiErrorMessage } from "@/lib/axios";

type SourceUploadZoneProps = {
  projectId: string;
  onUploaded: (runId: string, fields: string[], fileName: string) => void;
};

export function SourceUploadZone({ projectId, onUploaded }: SourceUploadZoneProps) {
  const [fileName, setFileName] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  async function applyFile(file: File | undefined) {
    if (!file) return;
    setError(null);
    setFileName(file.name);
    setUploading(true);

    try {
      const { data: created } = await apiClient.post<{ run_id: string }>(
        `/api/runs/?project_id=${projectId}`,
      );

      const formData = new FormData();
      formData.append("file", file);
      const { data: uploaded } = await apiClient.post<{ fields: string[] }>(
        `/api/runs/${created.run_id}/upload`,
        formData,
      );

      onUploaded(created.run_id, uploaded.fields, file.name);
    } catch (err) {
      setError(getApiErrorMessage(err, "Upload failed"));
      setFileName(null);
    } finally {
      setUploading(false);
    }
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setDragActive(false);
    applyFile(event.dataTransfer.files?.[0]);
  }

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
      onDragLeave={() => setDragActive(false)}
      onDrop={handleDrop}
      className={`flex flex-col items-center justify-center gap-3 rounded-card border-2 border-dashed p-10 text-center transition-colors ${
        dragActive ? "border-primary bg-primary-container/5" : "border-outline-variant"
      }`}
    >
      <p className="text-sm text-on-surface-variant">
        Drag and drop your source Excel/CSV file here, or
      </p>
      <label className="cursor-pointer rounded bg-primary-container px-4 py-2 text-sm font-semibold text-on-primary hover:bg-primary">
        Browse Files
        <input
          type="file"
          accept=".xlsx,.xls,.csv"
          className="hidden"
          onChange={(e) => applyFile(e.target.files?.[0])}
        />
      </label>

      {uploading && <p className="text-xs text-on-surface-variant">Uploading and extracting columns...</p>}
      {fileName && !uploading && !error && (
        <p className="font-mono text-xs text-on-surface-variant">{fileName}</p>
      )}
      {error && <p className="text-xs text-error">{error}</p>}
    </div>
  );
}
