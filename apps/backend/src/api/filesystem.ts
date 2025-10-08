import { Elysia, t } from "elysia";
import { readdir, stat, mkdir, access, constants } from "fs/promises";
import { join, resolve, relative, sep } from "path";
import { homedir } from "os";

export const filesystemRoutes = new Elysia()
  // Browse filesystem - list directories
  .get(
    "/filesystem/browse",
    async ({ query }) => {
      try {
        const requestedPath = query.path || homedir();
        const absolutePath = resolve(requestedPath);

        // Security check - don't allow going outside reasonable bounds
        // Allow home directory and its subdirectories
        const homeDir = homedir();
        if (!absolutePath.startsWith(homeDir) && !absolutePath.startsWith('/home')) {
          throw new Error("Access denied to path outside home directory");
        }

        // Check if path exists and is accessible
        try {
          await access(absolutePath, constants.R_OK);
        } catch {
          throw new Error("Path does not exist or is not accessible");
        }

        const stats = await stat(absolutePath);
        if (!stats.isDirectory()) {
          throw new Error("Path is not a directory");
        }

        // Read directory contents
        const entries = await readdir(absolutePath, { withFileTypes: true });

        // Filter to only directories, exclude hidden and node_modules
        const directories = await Promise.all(
          entries
            .filter((entry) => {
              if (!entry.isDirectory()) return false;
              if (entry.name.startsWith('.')) return false;
              if (entry.name === 'node_modules') return false;
              return true;
            })
            .map(async (entry) => {
              const fullPath = join(absolutePath, entry.name);
              const stats = await stat(fullPath);
              return {
                name: entry.name,
                path: fullPath,
                modifiedAt: stats.mtime.getTime(),
              };
            })
        );

        // Sort by name
        directories.sort((a, b) => a.name.localeCompare(b.name));

        // Get parent directory
        const parentPath = absolutePath === sep ? null : resolve(absolutePath, '..');

        return {
          currentPath: absolutePath,
          parentPath,
          directories,
        };
      } catch (error: any) {
        throw new Error(`Failed to browse filesystem: ${error.message}`);
      }
    },
    {
      query: t.Object({
        path: t.Optional(t.String()),
      }),
    }
  )

  // Create new directory
  .post(
    "/filesystem/mkdir",
    async ({ body }) => {
      try {
        const { path, name } = body;
        const parentPath = resolve(path);
        const newPath = join(parentPath, name);

        // Security check
        const homeDir = homedir();
        if (!parentPath.startsWith(homeDir) && !parentPath.startsWith('/home')) {
          throw new Error("Access denied to path outside home directory");
        }

        // Check if parent exists
        const parentStats = await stat(parentPath);
        if (!parentStats.isDirectory()) {
          throw new Error("Parent path is not a directory");
        }

        // Create directory
        await mkdir(newPath, { recursive: false });

        const stats = await stat(newPath);

        return {
          ok: true,
          directory: {
            name,
            path: newPath,
            modifiedAt: stats.mtime.getTime(),
          },
        };
      } catch (error: any) {
        throw new Error(`Failed to create directory: ${error.message}`);
      }
    },
    {
      body: t.Object({
        path: t.String(),
        name: t.String(),
      }),
    }
  )

  // Validate a directory path for project selection
  .post(
    "/filesystem/validate",
    async ({ body }) => {
      try {
        const absolutePath = resolve(body.path);

        // Security check
        const homeDir = homedir();
        if (!absolutePath.startsWith(homeDir) && !absolutePath.startsWith('/home')) {
          return {
            valid: false,
            reason: "Path must be within home directory",
          };
        }

        // Check if path exists and is accessible
        try {
          await access(absolutePath, constants.R_OK | constants.W_OK);
        } catch {
          return {
            valid: false,
            reason: "Path does not exist or is not writable",
          };
        }

        const stats = await stat(absolutePath);
        if (!stats.isDirectory()) {
          return {
            valid: false,
            reason: "Path is not a directory",
          };
        }

        return {
          valid: true,
          path: absolutePath,
        };
      } catch (error: any) {
        return {
          valid: false,
          reason: error.message,
        };
      }
    },
    {
      body: t.Object({
        path: t.String(),
      }),
    }
  );
