import type { Request, Response } from "express";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "../config/db.js";

export type TaskStatus = "todo" | "in-progress" | "done";

export interface Task extends RowDataPacket {
  id: number;
  title: string;
  status: TaskStatus;
  created_at: Date;
}

interface TaskRequestBody {
  title?: string;
  status?: TaskStatus;
}

interface TaskIdParams {
  id: string;
}

// GET /api/tasks
export const getTasks = async (_req: Request, res: Response): Promise<void> => {
  try {
    const [rows] = await pool.query<Task[]>(
      "SELECT * FROM tasks ORDER BY created_at DESC",
    );

    res.status(200).json(rows);
  } catch (error: unknown) {
    console.error("Error while fetching tasks:", error);

    res.status(500).json({
      message: "Failed to fetch tasks",
    });
  }
};

// GET /api/tasks/:id
export const getTaskById = async (req: Request<TaskIdParams>, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const [rows] = await pool.query<Task[]>(
      "SELECT * FROM tasks WHERE id = ?",
      [id],
    );

    if (rows.length === 0) {
      res.status(404).json({
        message: "Task not found",
      });
      return;
    }

    res.status(200).json(rows[0]);
  } catch (error: unknown) {
    console.error("Error while fetching task:", error);

    res.status(500).json({
      message: "Failed to fetch task",
    });
  }
};

// POST /api/tasks
export const createTask = async (req: Request<Record<string, never>, unknown, TaskRequestBody>, res: Response,): Promise<void> => {
  try {
    const { title, status } = req.body;

    if (!title || !title.trim()) {
      res.status(400).json({
        message: "Title is required",
      });
      return;
    }

    const taskStatus: TaskStatus = status ?? "todo";

    const [result] = await pool.query<ResultSetHeader>(
      "INSERT INTO tasks (title, status) VALUES (?, ?)",
      [title.trim(), taskStatus],
    );

    const [rows] = await pool.query<Task[]>(
      "SELECT * FROM tasks WHERE id = ?",
      [result.insertId],
    );

    if (rows.length === 0) {
      res.status(500).json({
        message: "Task was created but could not be retrieved",
      });
      return;
    }

    res.status(201).json(rows[0]);
  } catch (error: unknown) {
    console.error("Error while creating task:", error);

    res.status(500).json({
      message: "Failed to create task",
    });
  }
};

// PUT /api/tasks/:id
export const updateTask = async (req: Request<TaskIdParams, unknown, TaskRequestBody>, res: Response,): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, status } = req.body;

    if (!title || !title.trim()) {
      res.status(400).json({
        message: "Title is required",
      });
      return;
    }

    if (!status) {
      res.status(400).json({
        message: "Status is required",
      });
      return;
    }

    await pool.query("UPDATE tasks SET title = ?, status = ? WHERE id = ?", [
      title.trim(),
      status,
      id,
    ]);

    const [rows] = await pool.query<Task[]>(
      "SELECT * FROM tasks WHERE id = ?",
      [id],
    );

    if (rows.length === 0) {
      res.status(404).json({
        message: "Task not found",
      });
      return;
    }

    res.status(200).json(rows[0]);
  } catch (error: unknown) {
    console.error("Error updating task:", error);

    res.status(500).json({
      message: "Failed to update task",
    });
  }
};

// DELETE /api/tasks/:id
export const deleteTask = async (req: Request<TaskIdParams>, res: Response,): Promise<void> => {
  try {
    const { id } = req.params;

    const [result] = await pool.query<ResultSetHeader>(
      "DELETE FROM tasks WHERE id = ?",
      [id],
    );

    if (result.affectedRows === 0) {
      res.status(404).json({
        message: "Task not found",
      });
      return;
    }

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error: unknown) {
    console.error("Error deleting task:", error);

    res.status(500).json({
      message: "Failed to delete task",
    });
  }
};
