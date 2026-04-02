import User from "../models/user.model.js";
import asyncHandler from "../utils/asyncHandler.js"
import ApiError from "../utils/apiError.js"
import argon2 from "argon2"
import ApiResponse from "../utils/apiResponse.js"
import jwt from "jsonwebtoken"

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 * @name   registerUser
 */
export const registerUser =  asyncHandler( async (req , res) => {
    const {username, email, password} = req.body

    if(!username || username.length < 3 || !email || !password) {
        throw new ApiError(400, "Please provide valid username, email and password")
    }

    try {
        const isExistingUser = await User.findOne({$or: [{email}, {username}]})
    
        if(isExistingUser) {
            throw new ApiError(409, "User with email or username already exists")
        }
        const noramalizedEmail = email.toLowerCase()

        if(password.length < 6) {
            throw new ApiError(400, "Password must be at least 6 characters long")
        }
        const hashedPassword = await argon2.hash(password)
        const newUser = await User.create({username, email: noramalizedEmail, password: hashedPassword})

        const token = jwt.sign({userId: newUser._id}, process.env.ACCESS_SECRET_TOKEN, {expiresIn: "1d"})
        return res.status(201).json(new ApiResponse(201, {userId: newUser._id, token} ,  "User registered successfully"))

    } catch (error) {
        throw new ApiError(500, "Error occurred while checking user existence")
    }

})

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 * @name   loginUser
 */
export const loginUser = asyncHandler( async (req, res) => {
    const {email, password} = req.body

    if(!email || !password) {
        throw new ApiError(400, "Please provide email and password")
    }

    try {
        const isExistingUser = await User.findOne({email: email.toLowerCase()})
    
        if(!isExistingUser) {
            throw new ApiError(401, "Invalid email or password")
        }
    
        const isPasswordValid = await argon2.verify(isExistingUser.password, password)
    
        if(!isPasswordValid) {
            throw new ApiError(401, "Invalid email or password")
        }
        const payload = {
            userId: isExistingUser._id,
            username: isExistingUser.username
        }
    
        const token = jwt.sign(payload, process.env.ACCESS_SECRET_TOKEN, {expiresIn: "1d"})
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        });

        return res.status(200).json(new ApiResponse(200, {userId: isExistingUser._id, token}, "User logged in successfully"))
    } catch (error) {
        throw new ApiError(500, "Error occurred while logging in user")
    }
})