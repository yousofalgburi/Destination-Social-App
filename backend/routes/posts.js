import express from "express"
import * as postsController from "../controllers/posts.js"
import auth from "../middleware/auth.js"
const router = express.Router()

router.patch("/:id", auth, postsController.updatePost)
router.delete("/:id", auth, postsController.deletePost)

export default router
