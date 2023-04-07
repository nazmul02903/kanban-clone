import express from "express";
import {
  createBoard,
  getAllBoard,
  getSingleBoard,
  updateBoard,
} from "../controllers/board.js";
import isAuthenticated from "./../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/").post(isAuthenticated, createBoard);
router.route("/").get(isAuthenticated, getAllBoard);
router
  .route("/:boardId")
  .get(isAuthenticated, getSingleBoard)
  .put(isAuthenticated, updateBoard);

export default router;
