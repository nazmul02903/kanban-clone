import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { createTask, deleteTask, updateTask } from "../controllers/task.js";

const router = express.Router();

router.route("/:sectionId/task").post(isAuthenticated, createTask);
router
  .route("/task/:taskId")
  .put(isAuthenticated, updateTask)
  .delete(isAuthenticated, deleteTask);

export default router;
