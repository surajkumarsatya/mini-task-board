"use client";

import { useEffect, useState } from "react";
import TaskColumn from "../components/TaskColumn";
import TaskForm from "../components/TaskForm";
import { createTask, deleteTask, getTasks, updateTask } from "../lib/api";
import type { Task, TaskStatus } from "@/types/task";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTasks = async () => {
      try {
        setError("");

        const data = await getTasks();

        setTasks(data);
      } catch (error: unknown) {
        console.error("Error loading tasks:", error);

        setError("Unable to load tasks. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  const handleAddTask = async (
    title: string,
    status: TaskStatus,
  ): Promise<void> => {
    try {
      setAdding(true);
      setError("");

      const newTask = await createTask({
        title,
        status,
      });

      setTasks((currentTasks) => [
        newTask,
        ...currentTasks,
      ]);
    } catch (error: unknown) {
      console.error("Error adding task:", error);

      setError("Unable to add task. Please try again.");
      throw error;
    } finally {
      setAdding(false);
    }
  };

  const handleStatusChange = async (
    taskId: number,
    status: TaskStatus,
  ): Promise<void> => {
    const task = tasks.find(
      (currentTask) => currentTask.id === taskId,
    );

    if (!task) {
      return;
    }

    try {
      setError("");

      const updatedTask = await updateTask(taskId, {
        title: task.title,
        status,
      });

      setTasks((currentTasks) =>
        currentTasks.map((currentTask) =>
          currentTask.id === taskId
            ? updatedTask
            : currentTask,
        ),
      );
    } catch (error: unknown) {
      console.error("Error updating task:", error);

      setError("Unable to update task. Please try again.");
    }
  };

  const handleDelete = async (
    taskId: number,
  ): Promise<void> => {
    try {
      setError("");

      await deleteTask(taskId);

      setTasks((currentTasks) =>
        currentTasks.filter(
          (task) => task.id !== taskId,
        ),
      );
    } catch (error: unknown) {
      console.error("Error deleting task:", error);

      setError("Unable to delete task. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Mini Task Board
          </h1>

          <p className="mt-1 text-gray-600">
            Manage your tasks in one simple place.
          </p>
        </header>

        <TaskForm
          onAddTask={handleAddTask}
          loading={adding}
        />

        {error && (
          <div className="mb-6 rounded-md bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {loading ? (
          <div className="rounded-lg bg-white p-8 text-center text-gray-500 shadow-sm">
            Loading tasks...
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-3">
            <TaskColumn
              title="Todo"
              status="todo"
              tasks={tasks}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
            />

            <TaskColumn
              title="In Progress"
              status="in-progress"
              tasks={tasks}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
            />

            <TaskColumn
              title="Done"
              status="done"
              tasks={tasks}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
            />
          </div>
        )}
      </div>
    </main>
  );
}