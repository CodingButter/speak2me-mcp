import type {
  TodoCreateInput,
  TodoUpdateInput,
  TodoListInput,
  TodoArchiveInput,
  TodoDeleteInput,
  TodoOutput,
  Todo,
} from "@s2m-pac/shared";
import type { PrismaClient } from "@prisma/client";

/**
 * Core business logic for TODO MCP tools
 * Framework-agnostic - can be called from Elysia, Electron, or anywhere
 */

interface TodoContext {
  conversationId: string;
  prisma: PrismaClient;
}

/**
 * Convert Prisma Todo to output format
 */
function formatTodo(todo: any): Todo {
  return {
    id: todo.id,
    conversationId: todo.conversationId,
    projectPath: todo.projectPath,
    title: todo.title,
    description: todo.description,
    status: todo.status,
    priority: todo.priority,
    tags: todo.tags ? JSON.parse(todo.tags) : [],
    createdAt: todo.createdAt.getTime(),
    updatedAt: todo.updatedAt.getTime(),
    completedAt: todo.completedAt?.getTime() ?? null,
    archivedAt: todo.archivedAt?.getTime() ?? null,
    blockedReason: todo.blockedReason,
    assignee: todo.assignee,
    metadata: todo.metadata ? JSON.parse(todo.metadata) : null,
  };
}

/**
 * Create a new TODO item
 */
export async function handleTodoCreate(
  input: TodoCreateInput,
  context: TodoContext
): Promise<TodoOutput> {
  try {
    const todo = await context.prisma.todo.create({
      data: {
        conversationId: context.conversationId,
        title: input.title,
        description: input.description,
        priority: input.priority,
        tags: input.tags ? JSON.stringify(input.tags) : null,
        assignee: input.assignee,
        projectPath: input.projectPath,
        status: "BACKLOG",
      },
    });

    return {
      ok: true,
      todo: formatTodo(todo),
    };
  } catch (error) {
    return {
      ok: false,
      reason: error instanceof Error ? error.message : "Failed to create TODO",
    };
  }
}

/**
 * Update an existing TODO item
 */
export async function handleTodoUpdate(
  input: TodoUpdateInput,
  context: TodoContext
): Promise<TodoOutput> {
  try {
    // Build update data
    const updateData: any = {};

    if (input.title !== undefined) updateData.title = input.title;
    if (input.description !== undefined) updateData.description = input.description;
    if (input.priority !== undefined) updateData.priority = input.priority;
    if (input.tags !== undefined) updateData.tags = JSON.stringify(input.tags);
    if (input.blockedReason !== undefined) updateData.blockedReason = input.blockedReason;
    if (input.assignee !== undefined) updateData.assignee = input.assignee;

    // Handle status changes with timestamps
    if (input.status !== undefined) {
      updateData.status = input.status;

      if (input.status === "COMPLETED") {
        updateData.completedAt = new Date();
      } else if (input.status === "ARCHIVED") {
        updateData.archivedAt = new Date();
      }
    }

    const todo = await context.prisma.todo.update({
      where: { id: input.id },
      data: updateData,
    });

    return {
      ok: true,
      todo: formatTodo(todo),
    };
  } catch (error) {
    return {
      ok: false,
      reason: error instanceof Error ? error.message : "Failed to update TODO",
    };
  }
}

/**
 * List TODO items with optional filters
 */
export async function handleTodoList(
  input: TodoListInput,
  context: TodoContext
): Promise<TodoOutput> {
  try {
    // Build query filters
    const where: any = {
      conversationId: context.conversationId,
    };

    if (input.status) {
      where.status = input.status;
    }

    if (input.projectPath) {
      where.projectPath = input.projectPath;
    }

    if (input.priority) {
      where.priority = input.priority;
    }

    // Note: Tags filtering requires JSON parsing in app logic
    // SQLite doesn't have native JSON array searching

    const todos = await context.prisma.todo.findMany({
      where,
      orderBy: [
        { status: "asc" }, // BACKLOG, IN_PROGRESS, BLOCKED, COMPLETED, ARCHIVED
        { priority: "desc" }, // CRITICAL, HIGH, MEDIUM, LOW
        { createdAt: "desc" },
      ],
    });

    // Apply tag filtering if specified
    let filteredTodos = todos;
    if (input.tags && input.tags.length > 0) {
      filteredTodos = todos.filter((todo) => {
        if (!todo.tags) return false;
        const todoTags = JSON.parse(todo.tags);
        return input.tags!.some((tag) => todoTags.includes(tag));
      });
    }

    return {
      ok: true,
      todos: filteredTodos.map(formatTodo),
    };
  } catch (error) {
    return {
      ok: false,
      reason: error instanceof Error ? error.message : "Failed to list TODOs",
    };
  }
}

/**
 * Archive a TODO item
 */
export async function handleTodoArchive(
  input: TodoArchiveInput,
  context: TodoContext
): Promise<TodoOutput> {
  try {
    const todo = await context.prisma.todo.update({
      where: { id: input.id },
      data: {
        status: "ARCHIVED",
        archivedAt: new Date(),
      },
    });

    return {
      ok: true,
      todo: formatTodo(todo),
    };
  } catch (error) {
    return {
      ok: false,
      reason: error instanceof Error ? error.message : "Failed to archive TODO",
    };
  }
}

/**
 * Delete a TODO item (admin only - typically not exposed to MCP)
 */
export async function handleTodoDelete(
  input: TodoDeleteInput,
  context: TodoContext
): Promise<TodoOutput> {
  try {
    await context.prisma.todo.delete({
      where: { id: input.id },
    });

    return {
      ok: true,
    };
  } catch (error) {
    return {
      ok: false,
      reason: error instanceof Error ? error.message : "Failed to delete TODO",
    };
  }
}
