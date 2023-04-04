import express from "express";
import { load, login, logout, register } from "../controllers/register.js";

const router = express.Router();

router.route("/register").post(register)
router.route("/login").get(load).post(login)
router.route("/logout").post(logout)

export default router