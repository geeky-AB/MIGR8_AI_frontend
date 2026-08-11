import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/app-shell";
import { ValidationResultsView } from "@/components/validation/validation-results-view";
import {
  getAllValidationResultIds,
  getValidationResult,
} from "@/data/validation-results";

type ValidationResultPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return getAllValidationResultIds().map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: ValidationResultPageProps): Promise<Metadata> {
  const { id } = await params;
  const result = getValidationResult(id);

  return {
    title: result
      ? `${result.runName} Results | MIGR8 AI`
      : "Validation Results | MIGR8 AI",
    description:
      "Analyze validation health score, error breakdowns, and exception details.",
  };
}

export default async function ValidationResultPage({
  params,
}: ValidationResultPageProps) {
  const { id } = await params;
  const result = getValidationResult(id);

  if (!result) notFound();

  return (
    <AppShell
      topbarLeading={
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <span className="truncate text-xs font-semibold uppercase tracking-[0.02em] leading-4 text-primary">
            {result.projectName}
          </span>
        </div>
      }
    >
      <ValidationResultsView result={result} />
    </AppShell>
  );
}
