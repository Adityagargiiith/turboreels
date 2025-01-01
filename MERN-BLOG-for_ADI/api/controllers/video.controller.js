import Video from "../models/video.model.js";
// import Video from 

// Create a new video
export const createVideo = async (req, res, next) => {
  try {
    const video = new Video(req.body);
    await video.save();
    res.status(201).json({ success: true, message: "Video created successfully", video });
  } catch (err) {
    next(err);
  }
};

// Get all videos
export const getVideos = async (req, res, next) => {
  try {
    const videos = await Video.find();
    res.status(200).json({ success: true, videos });
  } catch (err) {
    next(err);
  }
};

// Get a video by ID
export const getVideoById = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ success: false, message: "Video not found" });
    res.status(200).json({ success: true, video });
  } catch (err) {
    next(err);
  }
};

// Update a video
export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!video) return res.status(404).json({ success: false, message: "Video not found" });
    res.status(200).json({ success: true, message: "Video updated successfully", video });
  } catch (err) {
    next(err);
  }
};

// Delete a video
export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);
    if (!video) return res.status(404).json({ success: false, message: "Video not found" });
    res.status(200).json({ success: true, message: "Video deleted successfully" });
  } catch (err) {
    next(err);
  }
};
