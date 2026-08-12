"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_PROJECT_ID,
  MIGRATION_PROJECTS,
  type MigrationProject,
} from "@/data/projects";

type ProjectContextValue = {
  projects: MigrationProject[];
  selectedProject: MigrationProject;
  selectProject: (projectId: string) => void;
};

const ProjectContext = createContext<ProjectContextValue | null>(null);

type ProjectProviderProps = {
  children: ReactNode;
};

export function ProjectProvider({ children }: ProjectProviderProps) {
  const [selectedProjectId, setSelectedProjectId] = useState(DEFAULT_PROJECT_ID);

  const value = useMemo<ProjectContextValue>(() => {
    const selectedProject =
      MIGRATION_PROJECTS.find((project) => project.id === selectedProjectId) ??
      MIGRATION_PROJECTS[0];

    return {
      projects: MIGRATION_PROJECTS,
      selectedProject,
      selectProject: setSelectedProjectId,
    };
  }, [selectedProjectId]);

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
}
