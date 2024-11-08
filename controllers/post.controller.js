import Post from "../models/post.model.js";
import User from "../models/user.model.js";

export const createPost = async(req, res) => {
    try {
        const {postContent, userId} = req.body
        console.log(postContent)
        const post = new Post({postContent, userId})
        await post.save()
        const userUpdate = await User.findOneAndUpdate({_id: userId}, {$push: {posts: {postId: post._id}}})
        res.status(200).json({message: "Post created successfully", postData: post})
    } catch (error) {
        res.status(500).json({message: "Problem on createing posts"})
    }
}

export const getAllPost = async(req,res) => {
    try {
        const posts = await Post.find()
        res.status(201).json({message: "Data's retreived successfully", data: posts})
    } catch (error) {
        res.status(500).json({message: "Problem on retreiving posts"})
    }
}

//Likes
export const updateLike = async(req,res)=>{
    try {
        const {count,postId} = req.body
        // console.log(count,userid);
        const likeUpdate= await Post.findOneAndUpdate({_id:postId},{likes:count}, {new: true})
        res.status(200).json({message: "Likes updated successfully",data: likeUpdate})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"error occured while updating likes"})
    }
    }
    

// Delete

export const deletePost=async(req,res)=>{
    try {
      const {postId}=req.body
      const postDelete= await Post.deleteOne({_id:postId})
      res.status(200).json({message: "post deleted successfully", count: postDelete.deletedCount})
  
    } catch (error) {
      console.log(error);
      res.status(500).json({message:"error occured while delete post"})
    }
  
  }
  