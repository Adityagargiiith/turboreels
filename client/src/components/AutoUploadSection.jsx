import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export default function SingleVideoSection() {
  
  const [formData, setFormData] = useState({
    userId: "",
    prompt: "",
    template: "Select a Template/Theme",
    voice: "Default Voice",
    language: "English",
    aspectRatio: "16:9",
    caption: "",
  });
  // const currentUser=
  const { currentUser } = useSelector((state) => state.user);
  const dataToSend = { ...formData, userId: currentUser._id };
  console.log(currentUser);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/video", dataToSend);
      alert("Video data saved successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error saving video data:", error.response?.data || error.message);
      alert("Failed to save video data. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <div className="max-w-6xl bg-indigo-600 mx-auto p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg">
          Auto Upload Your Video
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Enter Prompt or Script */}
          <div>
            <label className="block text-lg font-medium text-white mb-2">Enter Prompt or Script</label>
            <textarea
              name="prompt"
              className="w-full bg-indigo-600 border-gray-300 rounded-lg shadow-sm placeholder-white"
              rows="4"
              placeholder="Enter a prompt to generate a script or paste your own script here..."
              value={formData.prompt}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* Video Template and Theme */}
          <div>
            <label className="block text-lg font-medium mb-2">Choose Video Template and Theme</label>
            <select
              name="template"
              className="w-full bg-indigo-600 border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={formData.template}
              onChange={handleChange}
              required
            >
              <option>Select a Template/Theme</option>
              <option>Modern</option>
              <option>Classic</option>
              <option>Minimalist</option>
            </select>
          </div>

          {/* Narrator Voice */}
          <div>
            <label className="block text-lg font-medium mb-2">Select Narrator Voice</label>
            <select
              name="voice"
              className="w-full bg-indigo-600 border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={formData.voice}
              onChange={handleChange}
              required
            >
              <option>Default Voice</option>
              <option>Male Voice 1</option>
              <option>Female Voice 1</option>
              <option>AI Generated Voice</option>
            </select>
          </div>

          {/* Language */}
          <div>
            <label className="block text-lg font-medium mb-2">Select Language</label>
            <select
              name="language"
              className="w-full bg-indigo-600 border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={formData.language}
              onChange={handleChange}
              required
            >
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
            </select>
          </div>

          {/* Aspect Ratio */}
          <div>
            <label className="block text-lg font-medium mb-2">Choose Aspect Ratio</label>
            <div className="flex space-x-4">
              {["16:9", "1:1", "9:16"].map((ratio) => (
                <label key={ratio} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="aspectRatio"
                    value={ratio}
                    checked={formData.aspectRatio === ratio}
                    onChange={handleChange}
                  />
                  <span>{ratio}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Generate Caption */}
          <div>
            <label className="block text-lg font-medium mb-2">Generate Caption</label>
            <input
              type="text"
              name="caption"
              placeholder="Enter a caption for the video..."
              className="w-full bg-indigo-600 border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 placeholder-white"
              value={formData.caption}
              onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <div className="space-y-4">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-2 px-4 rounded-lg font-medium"
            >
              Save Video
            </button>
             {/* Preview and Edit */}
             <div className="space-y-4">
              <button
                type="button"
                className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-2 px-4 rounded-lg font-medium"
              >
                Preview Video
              </button>
              <button
                type="button"
                className="w-full bg-gray-800 text-white py-2 px-4 rounded-lg font-medium"
              >
                Edit Video/Upload Custom Photos
              </button>
            </div>
  
            {/* Download and Upload */}
            <div className="space-y-4">
             
              <button
                type="button"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium"
              >
                Upload to Social Media
              </button>
              </div>
          </div>
        </form>
      </div>
    </div>
  );
}
