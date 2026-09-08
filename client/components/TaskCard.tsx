"use client";

import { Task, TaskStatus } from "@/types/task";

interface TaskCardProps {
  task: Task;
  onStatusChange: (
    taskId: number,
    status: TaskStatus
  ) => Promise<void>;
  onDelete: (taskId: number) => Promise<void>;
}

export default function TaskCard({
  task,
  onStatusChange,
  onDelete,
}: TaskCardProps) {
  return (
    <article className="rounded-md bg-white p-4 shadow-sm">
      <p className="mb-4 font-medium text-gray-900">
        {task.title}
      </p>

      <div className="flex items-center gap-2">
        <select
          value={task.status}
          onChange={(event) =>
            onStatusChange(
              task.id,
              event.target.value as TaskStatus
            )
          }
          className="flex-1 rounded border border-gray-300 px-2 py-1.5 text-sm text-gray-700"
        >
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <button
          type="button"
          onClick={() => onDelete(task.id)}
          className="rounded px-2 py-1.5 text-sm text-red-600 hover:bg-red-50"
        >
          Delete
        </button>
      </div>
    </article>
  );
}