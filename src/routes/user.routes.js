import {Router} from "express"
import { getUserProfile, loginUser, logoutUser, registerUser } from "../controllers/auth.controller.js"
import { authUser } from "../middlewares/auth.middleware.js"
const router = Router()

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
router.post("/register", registerUser)
/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
router.post("/login", loginUser)

/**
 * @desc    Logout user
 * @route   POST /api/auth/logout
 * @access  public
 */
router.get("/logout", logoutUser)

/**
 * @desc    Get user profile
 * @route   GET /api/auth/profile
 * @access  Private
 * @name   getUserProfile
 */
router.get("/profile", authUser, getUserProfile)

export default router