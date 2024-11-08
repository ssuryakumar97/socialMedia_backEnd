import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    followers: [
        {
            userId: {
            type: mongoose.Schema.ObjectId,
            ref: "User" 
        }
    }
    ],
    following: [{
        userId:
        {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        }
    }],
    posts: [{
        postId: {
            type: mongoose.Schema.ObjectId,
            ref: "Post"
        }
    }]

}, {timestamps: true})

export default mongoose.model("User", userSchema)