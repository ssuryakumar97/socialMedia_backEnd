import express from "express"
import { follow, getAllUser, getUser, loginUser, registerUser, unFollow } from "../controllers/user.controller.js"
import authMiddleware from "../middlewares/authMiddleware.js"

const router = express.Router()

router.post("/user/register", registerUser)
router.post("/user/login", loginUser)
router.post("/user/getUser", getUser)
router.get("/user/getAllUser", authMiddleware, getAllUser)
router.post("/user/follow", authMiddleware, follow)
router.post("/user/unFollow", authMiddleware, unFollow)
// router.post("/user/unfollow")

export default router