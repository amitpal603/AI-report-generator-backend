import {Router} from "express"
import { loginUser, logoutUser, registerUser } from "../controllers/auth.controller.js"

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

export default router