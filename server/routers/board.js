import express from "express";
import { createBoard, getAllBoard } from "../controllers/board.js";
import isAuthenticated from "./../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/").post(isAuthenticated, createBoard);
router.route("/").get(getAllBoard);

export default router;
