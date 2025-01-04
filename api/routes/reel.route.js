import express from "express";
import { addReel, getReels, toggleLikeReel } from "../controllers/reel.controller.js";
// import { verifyToken } from "../middlewares/auth.middleware.js"; // Middleware for user authentication
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

// Add a new reel
router.post("/", verifyToken, addReel);

// Get reels by user ID
router.get("/user/:userId", verifyToken, getReels);

// Like/Unlike a reel
router.put("/:reelId/like", verifyToken, toggleLikeReel);

export default router;
