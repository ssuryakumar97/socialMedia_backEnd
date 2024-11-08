import Comment from "../models/comments.model.js";
import Post from "../models/post.model.js";


//CREATE COMMENT
export const createComment = async(req, res) => {
    try {
        const {commentText, userId, postId} = req.body
        const comment = new Comment({commentText, userId, postId})
        await comment.save()
        const postUpdate = await Post.findOneAndUpdate({_id: postId}, {$push: {comments: {commentId: comment._id}}})
        res.status(200).json({message: "Comments created successfully", data: comment})

    } catch (error) {
        res.status(500).json({message: "Error occured while creating comment"})
    }
}

//UPDATE COMMENT
export const updateComment = async(req, res) => {
    try {
        const {commentText, commentId} = req.body
        const commentUpdate =await Comment.findOneAndUpdate({_id: commentId},{commentText},{new: true})
        res.status(200).json({message: "Comments updated successfully", data: commentUpdate})
    } catch (error) {
        res.status(500).json({message: "Error occured while updating comment"})
    }
}

export const deleteComment = async(req, res) => {
    try {
        const { commentId, postId} = req.body
        const commentDelete =await Comment.deleteOne({_id: commentId})
        const updatePost = await Post.findOneAndUpdate({_id: postId},{$pull: {comments: {commentId: commentId}}},{new: true})
        res.status(200).json({message: "Comments deleted successfully", deleteCount: commentDelete.deletedCount})
    } catch (error) {
        res.status(500).json({message: "Error occured while deleting comment"})
    }
}