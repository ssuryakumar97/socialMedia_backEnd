import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const connectDb = async() => {
    try {
        const connect= await mongoose.connect(process.env.MONGO_URL)
        console.log("Your app is connected to mongoDB")
        return connect
    } catch (error) {
        console.log(error)        
    }
}

export default connectDb