import express from "express";
import {
  createBoard,
  deleteBoard,
  getAllBoard,
  getSingleBoard,
  updateBoard,
  updatePosition,
} from "../controllers/board.js";
import isAuthenticated from "./../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/").post(isAuthenticated, createBoard);
router
  .route("/")
  .get(isAuthenticated, getAllBoard)
  .put(isAuthenticated, updatePosition);
router
  .route("/:boardId")
  .get(isAuthenticated, getSingleBoard)
  .put(isAuthenticated, updateBoard)
  .delete(isAuthenticated, deleteBoard);

export default router;
