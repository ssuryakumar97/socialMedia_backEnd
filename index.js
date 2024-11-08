import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDb from "./database/configDB.js"
import userRouter from "./routers/userRouter.js"
import postRouter from "./routers/postRouter.js"
import commentRouter from "./routers/commentRouter.js"

dotenv.config()
connectDb()
const app = express()

app.use(cors())
app.use(express.json())
app.use("/api",userRouter )
app.use("/api",postRouter )
app.use("/api",commentRouter )

app.listen( process.env.PORT || 4000 ,() => {
    console.log("your app is running on port", process.env.PORT)
})