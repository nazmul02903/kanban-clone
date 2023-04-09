import express from "express"
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { createTask } from "../controllers/task.js";

const router = express.Router()

router.route("/task/:sectionId").post(isAuthenticated, createTask)

export default router