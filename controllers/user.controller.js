import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const registerUser = async(req, res) => {
    try {
        const {name, email, password} = req.body
        console.log(email)
        const oldUser = await User.findOne({email})
        if(oldUser){
            return res.status(401).json({message: "User already exists"})
        }
        const hashedPassword =await bcrypt.hash(password, 10)
        const user = new User({name, email, password: hashedPassword})
        await user.save()
        res.status(200).json({message: "User registered successfully", data: {id: user._id,name: user.name,email:user.email,followers: user.followers, following: user.following, posts: user.posts}})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong, internal server error"})
    }
}

export const loginUser = async(req, res) => {
    try {
        const {email, password} = req.body
        const user =await User.findOne({email})
        if(!user){
            return res.status(401).json({message:"User not found,please register"})
        }
        const passwordMatch = await bcrypt.compare(password, user.password)
        if(!passwordMatch){
            return res.status(401).json({message: "Incorrect Password"})
        }
        const token =await jwt.sign({email:user.email}, process.env.JWT_SECRET, {expiresIn: "1h"})
        user.token = token
        await user.save()
        res.status(200).json({message: "Login Successful", data: {id: user._id,name: user.name,email:user.email,followers: user.followers, following: user.following, posts: user.posts, token: token}})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong, internal server error"})
    }
}

export const getUser = async(req, res) => {
    try {
        const {userId} = req.body
        const user = await User.findOne({_id: userId})
        res.status(200).json(user)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error in getting user"})
    }
}

export const getAllUser = async(req, res) => {
    try {
        const user = await User.find()
        res.status(200).json(user)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error in getting All user"})
    }
}

export const follow = async(req, res) => {
    const isUserAlreadyFollowing = (followingId, normalUser) => {
            for(let i=0; i<normalUser.following.length; i++){
                // console.log(normalUser.following[i].userId)
                // console.log(followingId)
                if(followingId == normalUser.following[i].userId){
                    return true
                }
            }
            return false
    }
    try {
        const {userId, followingId} = req.body
        const normalUser = await User.findOne({_id: userId})
        console.log(isUserAlreadyFollowing(followingId, normalUser))
        if(isUserAlreadyFollowing(followingId, normalUser)){
            return res.status(400).json({message: "User already followed"})
        }
        const user = await User.findOneAndUpdate({_id: userId}, {$push: {following: {userId: followingId}}}, {new: true})
        const followerUser = await User.findOneAndUpdate({_id: followingId}, {$push: {followers: {userId: userId}}}, {new: true})
        res.status(200).json({message: "User followed successfully", userdata: user, followingData: followerUser})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error in following user"})
    }
}

export const unFollow = async(req, res) => {
    try {
        const {userId, followingId} = req.body
        // const normalUser = await User.findOne({_id: userId})
        console.log(userId, followingId)
        const user = await User.findOneAndUpdate({_id: userId}, { $pull: { following: {userId: followingId}}}, {new: true})
        const followerUser = await User.findOneAndUpdate({_id: followingId}, { $pull: {followers:  {userId: userId}}}, {new: true})
        res.status(200).json({message: "User unfollowed successfully", userdata: user, followingData: followerUser})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error in unfollowing user"})
    }
}
 