import express from "express"
import authMiddleware from "../middlewares/authMiddleware.js"
import { createComment, deleteComment,updateComment } from "../controllers/comment.controller.js"

const router = express.Router()

router.post("/comment/newComment", createComment)
router.put("/comment/updateComment", updateComment)
router.delete("/comment/deleteComment", deleteComment)

export default router