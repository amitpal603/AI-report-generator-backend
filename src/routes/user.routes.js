import {Router} from "express"
import { loginUser, registerUser } from "../controllers/auth.controller.js"

const router = Router()

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
router.post("/register", registerUser)
router.post("/login", loginUser)
export default router