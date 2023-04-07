import express from "express";
import { createBoard, getAllBoard, getSingleBoard } from "../controllers/board.js";
import isAuthenticated from "./../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/").post(isAuthenticated, createBoard);
router.route("/").get(isAuthenticated, getAllBoard);
router.route("/:boardId").get(isAuthenticated, getSingleBoard);

export default router;
