import ApiError from "../utils/apiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import BlackList from "../models/blackList.model.js"

export const authUser = asyncHandler( async (req, res, next) => {
    const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "")

    if(!token) {
        throw new ApiError(401, "Unauthorized access")
    }
    const isBlackListed = await BlackList.findOne({token})
    if(isBlackListed) {
        throw new ApiError(401, "Token is blacklisted. Please login again.")
    }
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_SECRET_TOKEN)
        req.userInfo = decoded
        next()
    } catch (error) {
        throw new ApiError(401, "Invalid or expired token")
    }

})