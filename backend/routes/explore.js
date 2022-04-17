import express from "express"
import * as exploreControllers from "../controllers/explore.js"
import auth from "../middleware/auth.js"
const router = express.Router()

router.get("/", exploreControllers.getPosts)
router.get("/:id", exploreControllers.getPost)
router.get("/search", exploreControllers.getPostsBySearch)
router.patch("/:id/likePost", auth, exploreControllers.likePost)

export default router
