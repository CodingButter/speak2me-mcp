import { useEffect } from "react";
import { Outlet, useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { RootLayout } from "./RootLayout";
import { projectsApi } from "../lib/api-client";
import { useApp } from "../contexts/AppContext";

export function ProjectLayout() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const { setProjectId } = useApp();

  const { data: project, isLoading, error } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => projectsApi.getById(projectId!),
    enabled: !!projectId,
  });

  // Set project ID in AppContext when it changes
  useEffect(() => {
    if (projectId) {
      setProjectId(projectId);
    }
    return () => {
      // Clean up when leaving project
      setProjectId(undefined);
    };
  }, [projectId, setProjectId]);

  useEffect(() => {
    if (error) {
      // Project not found or error loading - redirect to projects list
      navigate("/", { replace: true });
    }
  }, [error, navigate]);

  if (!projectId) {
    navigate("/", { replace: true });
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary">
        <div className="text-text-secondary">Loading project...</div>
      </div>
    );
  }

  if (!project) {
    return null;
  }

  return (
    <RootLayout projectId={projectId} projectName={project.name}>
      <Outlet />
    </RootLayout>
  );
}
