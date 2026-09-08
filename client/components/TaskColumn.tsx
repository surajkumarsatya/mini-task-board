"use client";

import { Task, TaskStatus } from "@/types/task";
import TaskCard from "./TaskCard";

interface TaskColumnProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  onStatusChange: (
    taskId: number,
    status: TaskStatus
  ) => Promise<void>;
  onDelete: (taskId: number) => Promise<void>;
}

export default function TaskColumn({
  title,
  status,
  tasks,
  onStatusChange,
  onDelete,
}: TaskColumnProps) {
  const columnTasks = tasks.filter(
    (task) => task.status === status
  );

  return (
    <section className="rounded-lg bg-gray-200 p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-semibold text-gray-800">
          {title}
        </h2>

        <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-gray-600">
          {columnTasks.length}
        </span>
      </div>

      <div className="space-y-3">
        {columnTasks.length === 0 ? (
          <p className="py-5 text-center text-sm text-gray-500">
            No tasks
          </p>
        ) : (
          columnTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onStatusChange={onStatusChange}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </section>
  );
}