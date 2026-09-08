import { CreateTaskInput, Task, UpdateTaskInput } from "@/types/task";

const API_URL = "http://localhost:5000/api/tasks";

export async function getTasks(): Promise<Task[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  return response.json() as Promise<Task[]>;
}

export async function getTaskById(id: number): Promise<Task> {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch task");
  }

  return response.json() as Promise<Task>;
}

export async function createTask(
  data: CreateTaskInput,
): Promise<Task> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create task");
  }

  return response.json() as Promise<Task>;
}

export async function updateTask(
  id: number,
  data: UpdateTaskInput,
): Promise<Task> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update task");
  }

  return response.json() as Promise<Task>;
}

export async function deleteTask(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete task");
  }
}