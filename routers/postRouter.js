import express from "express"
// import authMiddleware from "../middlewares/authMiddleware.js"
import { createPost, deletePost, getAllPost, updateLike } from "../controllers/post.controller.js"

const router = express.Router()

router.post("/post/newPost", createPost)
router.get("/post/getAllPost", getAllPost)
router.post("/post/updateLike", updateLike)
router.delete("/post/deletePost", deletePost)

export default router