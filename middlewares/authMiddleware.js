import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const authMiddleware = async(req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        if(!token){
            return res.status(401).json({message: "Token missing"})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Token is not valid"})
    }
}

export default authMiddleware