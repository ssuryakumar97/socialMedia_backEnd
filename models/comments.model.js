import mongoose from "mongoose";
// o Fields: commentText, userId, postId, createdAt, etc.

const commentsSchema = new mongoose.Schema({
    commentText: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    postId: {
        type: mongoose.Schema.ObjectId,
        ref: "Post",
        required: true
    }

}, {timestamps: true})

export default mongoose.model("Comment", commentsSchema)