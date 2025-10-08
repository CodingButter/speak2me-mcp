import { Elysia, t } from "elysia";

export const projectsRoutes = new Elysia()
  // Get all projects
  .get("/projects", async (context: any) => {
    try {
      const projects = await context.core.getAllProjects();
      return projects;
    } catch (error: any) {
      console.error("Error fetching projects:", error);
      return { error: error.message };
    }
  })

  // Get single project
  .get("/projects/:id", async (context: any) => {
    try {
      const project = await context.core.getProject(context.params.id);
      if (!project) {
        context.set.status = 404;
        return { error: "Project not found" };
      }
      return project;
    } catch (error: any) {
      console.error(`Error fetching project ${context.params.id}:`, error);
      context.set.status = 500;
      return { error: error.message };
    }
  })

  // Create new project
  .post(
    "/projects",
    async (context: any) => {
      try {
        const { name, description } = context.body;
        const project = await context.core.createProject(name, description);
        return project;
      } catch (error: any) {
        console.error("Error creating project:", error);
        context.set.status = 500;
        return { error: error.message };
      }
    },
    {
      body: t.Object({
        name: t.String(),
        description: t.Optional(t.String()),
      }),
    }
  )

  // Update project
  .patch(
    "/projects/:id",
    async (context: any) => {
      try {
        const { name, description } = context.body;
        const project = await context.core.updateProject(context.params.id, {
          name,
          description,
        });
        return project;
      } catch (error: any) {
        console.error(`Error updating project ${context.params.id}:`, error);
        context.set.status = 500;
        return { error: error.message };
      }
    },
    {
      body: t.Object({
        name: t.Optional(t.String()),
        description: t.Optional(t.String()),
      }),
    }
  )

  // Delete project
  .delete("/projects/:id", async (context: any) => {
    try {
      await context.core.deleteProject(context.params.id);
      return { ok: true };
    } catch (error: any) {
      console.error(`Error deleting project ${context.params.id}:`, error);
      context.set.status = 500;
      return { error: error.message };
    }
  });
