import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  prompt: { type: String, required: true },
  template: { type: String, required: true },
  voice: { type: String, required: true },
  language: { type: String, required: true },
  aspectRatio: { type: String, required: true },
  caption: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Video", videoSchema);
