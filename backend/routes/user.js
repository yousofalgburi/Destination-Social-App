import express from "express"
import * as userControllers from "../controllers/user.js"
const router = express.Router()

router.post("/signin", userControllers.signin)
router.post("/signup", userControllers.signup)

export default router
