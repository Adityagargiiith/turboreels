import express from "express";
import {
  createVideo,
  getVideos,
  getVideoById,
  updateVideo,
  deleteVideo,
} from "../controllers/video.controller.js";

const router = express.Router();

// Create a new video
router.post("/", createVideo);

// Get all videos
router.get("/", getVideos);

// Get a single video by ID
router.get("/:id", getVideoById);

// Update a video by ID
router.put("/:id", updateVideo);

// Delete a video by ID
router.delete("/:id", deleteVideo);

export default router;
