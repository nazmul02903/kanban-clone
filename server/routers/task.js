import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  createTask,
  deleteTask,
  updatePosition,
  updateTask,
} from "../controllers/task.js";

const router = express.Router();

router.route("/:sectionId/task").post(isAuthenticated, createTask);
router
  .route("/task/:taskId")
  .put(isAuthenticated, updateTask)
  .delete(isAuthenticated, deleteTask);

router.route("/update/task").put(isAuthenticated, updatePosition);

export default router;
