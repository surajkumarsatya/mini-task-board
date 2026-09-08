"use client";

import { FormEvent, useState } from "react";
import { TaskStatus } from "@/types/task";

interface TaskFormProps {
  onAddTask: (title: string, status: TaskStatus) => Promise<void>;
  loading: boolean;
}

export default function TaskForm({
  onAddTask,
  loading,
}: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState<TaskStatus>("todo");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    await onAddTask(title.trim(), status);

    setTitle("");
    setStatus("todo");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 rounded-lg bg-white p-5 shadow-sm"
    >
      <h2 className="mb-4 text-lg font-semibold text-gray-900">
        Add New Task
      </h2>

      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Enter task title"
          className="flex-1 rounded-md border border-gray-300 px-4 py-2.5 text-gray-900 outline-none focus:border-blue-500"
        />

        <select
          value={status}
          onChange={(event) =>
            setStatus(event.target.value as TaskStatus)
          }
          className="rounded-md border border-gray-300 px-4 py-2.5 text-gray-900 outline-none focus:border-blue-500"
        >
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <button
          type="submit"
          disabled={loading || !title.trim()}
          className="rounded-md bg-blue-600 px-6 py-2.5 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Task"}
        </button>
      </div>
    </form>
  );
}