import express from "express"
import * as homeController from "../controllers/home.js"
const router = express.Router()
// new
router.get("/", homeController.getHomePosts)

export default router
