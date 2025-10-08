import { useState } from "react";
import {
  KanbanBoard,
  KanbanColumn,
  TaskCard,
  Priority,
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Modal,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  Textarea,
} from "@s2m-pac/ui";
import { Plus } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  tags: string[];
  assignee?: string;
  commentCount?: number;
  status: "backlog" | "in_progress" | "blocked" | "completed";
}

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Design API endpoints",
    description: "Create RESTful endpoints for user management",
    priority: "medium",
    tags: ["#api", "#backend"],
    status: "backlog",
  },
  {
    id: "2",
    title: "Update README",
    description: "Add installation instructions and usage examples",
    priority: "low",
    tags: ["#docs"],
    assignee: "Claude",
    commentCount: 2,
    status: "backlog",
  },
  {
    id: "3",
    title: "Implement JWT authentication",
    description: "Set up JWT middleware and token generation",
    priority: "high",
    tags: ["#auth", "#security"],
    assignee: "You",
    commentCount: 5,
    status: "in_progress",
  },
  {
    id: "4",
    title: "Build login form",
    description: "Create responsive login UI with validation",
    priority: "medium",
    tags: ["#ui"],
    assignee: "Claude",
    commentCount: 3,
    status: "in_progress",
  },
  {
    id: "5",
    title: "Fix session persistence",
    description: "Sessions not persisting after refresh. Waiting on DB migration.",
    priority: "high",
    tags: ["#bug"],
    assignee: "You",
    status: "blocked",
  },
  {
    id: "6",
    title: "Initialize project",
    description: "Set up project structure and dependencies",
    priority: "high",
    tags: ["#setup"],
    status: "completed",
  },
  {
    id: "7",
    title: "Set up database",
    description: "Configure Prisma and create initial schema",
    priority: "medium",
    tags: ["#db"],
    status: "completed",
  },
];

export function Tasks() {
  const [tasks] = useState<Task[]>(mockTasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<string>("all");

  const getTasksByStatus = (status: Task["status"]) => {
    return tasks.filter((task) => task.status === status);
  };

  const handleCreateTask = () => {
    setIsModalOpen(false);
    console.log("Create task");
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-100">Tasks</h2>
        <div className="flex items-center gap-3">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter: All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Filter: All</SelectItem>
              <SelectItem value="high">High Priority</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Task
          </Button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-hidden">
        <KanbanBoard>
          {/* Backlog Column */}
          <KanbanColumn
            title="Backlog"
            count={getTasksByStatus("backlog").length}
          >
            {getTasksByStatus("backlog").map((task) => (
              <TaskCard
                key={task.id}
                title={task.title}
                description={task.description}
                priority={task.priority}
                tags={task.tags}
                assignee={task.assignee}
                commentCount={task.commentCount}
              />
            ))}
          </KanbanColumn>

          {/* In Progress Column */}
          <KanbanColumn
            title="In Progress"
            count={getTasksByStatus("in_progress").length}
          >
            {getTasksByStatus("in_progress").map((task) => (
              <TaskCard
                key={task.id}
                title={task.title}
                description={task.description}
                priority={task.priority}
                tags={task.tags}
                assignee={task.assignee}
                commentCount={task.commentCount}
              />
            ))}
          </KanbanColumn>

          {/* Blocked Column */}
          <KanbanColumn
            title="Blocked"
            count={getTasksByStatus("blocked").length}
          >
            {getTasksByStatus("blocked").map((task) => (
              <TaskCard
                key={task.id}
                title={task.title}
                description={task.description}
                priority={task.priority}
                tags={task.tags}
                assignee={task.assignee}
                commentCount={task.commentCount}
              />
            ))}
          </KanbanColumn>

          {/* Completed Column */}
          <KanbanColumn
            title="Completed"
            count={getTasksByStatus("completed").length}
          >
            {getTasksByStatus("completed").map((task) => (
              <TaskCard
                key={task.id}
                title={task.title}
                description={task.description}
                priority={task.priority}
                tags={task.tags}
                assignee={task.assignee}
                commentCount={task.commentCount}
                className="opacity-60"
              />
            ))}
          </KanbanColumn>
        </KanbanBoard>
      </div>

      {/* New Task Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalHeader>
          <ModalTitle>Create New Task</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Task title..."
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Task description..."
                className="mt-1 min-h-[100px]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select defaultValue="medium">
                  <SelectTrigger id="priority" className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="assignee">Assignee</Label>
                <Input
                  id="assignee"
                  placeholder="Assignee name..."
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
                placeholder="#api, #backend"
                className="mt-1"
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="secondary"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </Button>
          <Button onClick={handleCreateTask}>Create Task</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
