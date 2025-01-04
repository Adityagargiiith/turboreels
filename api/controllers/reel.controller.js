import Reel from "../models/reel.model.js";

// Add a new reel
export const addReel = async (req, res) => {
    const { title, description, url, userId } = req.body;
    
    // Verify that the requesting user matches the userId
    if (req.user.id !== userId) {
        return res.status(403).json({ success: false, message: "Not authorized" });
    }
  
    try {
      const reel = await Reel.create({ title, description, url, userId });
      res.status(201).json({ success: true, reel });
    } catch (error) {
      console.error('Error creating reel:', error); // Add this log
      res.status(500).json({ success: false, message: error.message });
    }
};
// Get all reels of a user
export const getReels = async (req, res) => {
    const { userId } = req.params;  // Changed from req.query to req.params
  
    try {
      const reels = await Reel.find({ userId });
      res.status(200).json({ success: true, reels });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch reels" });
    }
};
// Like/Unlike a reel
export const toggleLikeReel = async (req, res, next) => {
  try {
    const { reelId } = req.params;
    const userId = req.user._id; // Assume req.user is populated by middleware

    const reel = await Reel.findById(reelId);
    if (!reel) return res.status(404).json({ success: false, message: "Reel not found" });

    const isLiked = reel.likes.includes(userId);
    if (isLiked) {
      reel.likes = reel.likes.filter((id) => id.toString() !== userId.toString());
    } else {
      reel.likes.push(userId);
    }

    const updatedReel = await reel.save();
    res.status(200).json({ success: true, reel: updatedReel });
  } catch (error) {
    next(error);
  }
};
