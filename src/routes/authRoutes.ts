import express from "express";
import { signup, login } from "../controllers/authController";

const router = express.Router();

// 🔐 Auth Routes

// Signup
router.post("/signup", signup);

// Login
router.post("/login", login);

export default router;