import express from "express"
import * as homeController from "../controllers/home.js"
const router = express.Router()

router.get("/", homeController.getHomePosts)

export default router
