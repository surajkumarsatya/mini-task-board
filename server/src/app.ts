import express from "express";
import cors from "cors";

import taskRoutes from "./routes/task.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
    res.json({
        message: "Mini Task Board API is running",
    });
});

app.use("/api/tasks", taskRoutes);

export default app;