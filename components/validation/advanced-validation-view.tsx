"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SourceUploadZone } from "@/components/validation/source-upload-zone";
import { ValidationRulesTable } from "@/components/validation/validation-rules-table";
import { PlayArrowIcon } from "@/components/ui/icons";
import { LATEST_VALIDATION_RUN_ID } from "@/data/validation-results";

export function AdvancedValidationView() {
  const router = useRouter();
  const [sourceReady, setSourceReady] = useState(false);

  function handleSaveDraft() {
    console.info("Save Draft clicked (mock)");
  }

  function handleRunValidation() {
    // Mock run — navigate to results for the newly created validation id
    router.push(`/validation_result/${LATEST_VALIDATION_RUN_ID}`);
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      <div className="flex-1 overflow-y-auto bg-background pb-28">
        <div className="mx-auto max-w-[1200px] px-4 py-6 md:px-8">
          <div className="mb-6">
            <h2 className="mb-2 text-[32px] font-semibold leading-10 tracking-[-0.01em] text-on-surface">
              Data Validation Rules
            </h2>
            <p className="text-base leading-6 text-on-surface-variant">
              Configure validation logic and upload your source records to begin
              validation.
            </p>
          </div>

          <SourceUploadZone onFileSelected={() => setSourceReady(true)} />
          <ValidationRulesTable />
        </div>
      </div>

      <div className="sticky bottom-0 z-30 flex flex-col gap-3 border-t border-outline-variant bg-surface/90 px-4 py-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] backdrop-blur-md sm:flex-row sm:items-center sm:justify-between md:px-6">
        <div className="text-[13px] leading-[18px] text-on-surface-variant">
          {sourceReady ? (
            <>
              <span className="font-semibold text-primary">Source File</span>{" "}
              ready for validation
            </>
          ) : (
            "Upload a source file to begin validation"
          )}
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleSaveDraft}
            className="rounded-lg border border-outline-variant bg-white px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.02em] text-on-surface shadow-sm transition-colors hover:bg-surface-container-low"
          >
            Save Draft
          </button>
          <button
            type="button"
            onClick={handleRunValidation}
            className="inline-flex items-center gap-2 rounded-lg bg-primary-container px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.02em] text-on-primary shadow-sm transition-colors hover:bg-primary"
          >
            Run Validation Rules
            <PlayArrowIcon className="h-[18px] w-[18px]" />
          </button>
        </div>
      </div>
    </div>
  );
}
