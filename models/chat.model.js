import mongoose from "mongoose";


const chatSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    message: {
        type: String,
    },
    createdAt: {
        type: String
    }

}, {timestamps: true})

export default mongoose.model("Comment", chatSchema)