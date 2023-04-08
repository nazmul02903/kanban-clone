import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  createSection,
  deleteSection,
  updateSection,
} from "../controllers/section.js";

const router = express.Router();

router.route("/:boardId/section").post(isAuthenticated, createSection);
router
  .route("/section/:sectionId")
  .put(isAuthenticated, updateSection)
  .delete(isAuthenticated, deleteSection);

export default router;
