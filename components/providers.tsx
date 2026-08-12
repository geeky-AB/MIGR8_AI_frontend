"use client";

import type { ReactNode } from "react";
import { ProjectProvider } from "@/contexts/project-context";

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return <ProjectProvider>{children}</ProjectProvider>;
}
