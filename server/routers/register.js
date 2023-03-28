import express from "express";
import { load, login, register } from "../controllers/register.js";

const router = express.Router();

router.route("/register").post(register)
router.route("/login").get(load).post(login)

export default router