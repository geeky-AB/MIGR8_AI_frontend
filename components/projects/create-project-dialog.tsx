"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { TextField } from "@/components/ui/text-field";

type CreateProjectDialogProps = {
  open: boolean;
  onClose: () => void;
};

export function CreateProjectDialog({ open, onClose }: CreateProjectDialogProps) {
  const [projectName, setProjectName] = useState("");

  function handleClose() {
    setProjectName("");
    onClose();
  }

  function handleCreate() {
    handleClose();
  }

  return (
    <Dialog
      open={open}
      title="Create New Project"
      onClose={handleClose}
      footer={
        <>
          <Button type="button" variant="ghost" size="md" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            type="button"
            size="md"
            onClick={handleCreate}
            disabled={!projectName.trim()}
          >
            Create
          </Button>
        </>
      }
    >
      <TextField
        id="project-name"
        label="Project Name"
        placeholder="Enter project name"
        value={projectName}
        onChange={(event) => setProjectName(event.target.value)}
        autoFocus
      />
    </Dialog>
  );
}
