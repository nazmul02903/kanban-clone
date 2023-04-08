import express from "express"
import isAuthenticated from "../middlewares/isAuthenticated.js"
import { createSection } from "../controllers/section.js"

const router = express.Router()


router.route("/:boardId/section").post(isAuthenticated, createSection)


export default router