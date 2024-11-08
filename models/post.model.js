import mongoose from "mongoose";


const postSchema = new mongoose.Schema({
    postContent: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        // required: true
    },
    likes: {
        type: Number,
    },
    comments: [
        {commentId: {
        type: mongoose.Schema.ObjectId,
        ref: "Comment" 
    }}
    ],
    // createdAt: {
    //     type: String
    // }

}, {timestamps: true})

export default mongoose.model("Post", postSchema)