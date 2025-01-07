import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import {}

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
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const themes = [
    {
      value: "autosorts",
      label: "AUTOSHORTS",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbCLhWAEcKDFFJWZliYitygdMkPkokKQKqFA&s  ",
    },
    {
      value: "lego",
      label: "LEGO",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTamhqtGBtTCW5-B9qUzdIYrZYmhWEcNeWnJA&s",
    },
    {
      value: "comic",
      label: "COMIC BOOK",
      image:
        "https://d3mvlb3hz2g78.cloudfront.net/wp-content/uploads/2017/09/thumb_720_450_dreamstime_xl_31771038.jpg",
    },
    {
      value: "disney",
      label: "DISNEY",
      image:
        "https://wallpapers.com/images/featured/disney-has6vy47k75d0bzs.jpg",
    },
  ];

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
    setIsProcessing(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/video",
        dataToSend
      );
      alert("Video data saved successfully!");
      console.log(response.data);

      // Navigate
      // navigate("/library");
      // Navigate("/library");
    } catch (error) {
      console.error(
        "Error saving video data:",
        error.response?.data || error.message
      );
      alert("Failed to save video data. Please try again.");
    }
  };

  return (
    // <div className="min-h-screen py-10 px-5">
    <div className="max-w-lg mx-auto p-3 w-full">
      <div className="max-w-6xl bg-indigo-600 mx-auto p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg">
          Create Your Video
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Enter Prompt or Script */}
          <div>
            <label className="block text-lg font-medium text-white mb-2">
              Enter Prompt or Script
            </label>
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
          {/* Art Style or Template Selection */}
          <div>
            <label className="block text-lg font-medium mb-4">Art Style</label>
            <div className="flex gap-4 overflow-x-auto">
              {themes.map((theme, index) => (
                <label
                  key={index}
                  className={`relative w-40 h-60 rounded-lg overflow-hidden shadow-md cursor-pointer ${
                    formData.template === theme.value
                      ? "border-4 border-indigo-500"
                      : "border border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="template" // Ensure this matches the key in `formData`
                    value={theme.value}
                    checked={formData.template === theme.value}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <img
                    src={theme.image}
                    alt={theme.label}
                    className="object-cover w-full h-full"
                  />
                  <div
                    className="absolute bottom-0 w-full bg-black bg-opacity-70 text-white text-center py-2"
                    style={{ fontWeight: "600" }}
                  >
                    {theme.label}
                  </div>
                  {formData.template === theme.value && (
                    <div className="absolute top-2 right-2 bg-indigo-500 p-1 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* Narrator Voice */}
          {/* Narration Voice */}
<div>
  <label className="block text-lg font-medium mb-4">Narration Voice</label>
  <div className="flex flex-col gap-4">
    {[
      { label: "Echo", gender: "Male, American, Excited", id: "echo" },
      { label: "Alloy", gender: "Female, American", id: "alloy" },
    ].map((voice) => (
      <label
        key={voice.id}
        className={`relative flex items-center gap-4 p-4 rounded-lg cursor-pointer ${
          formData.voice === voice.label
            ? "border-4 border-indigo-500"
            : "border border-gray-300 "
        }`}
      >
        {/* Hidden Radio Input */}
        <input
          type="radio"
          name="voice"
          value={voice.label}
          checked={formData.voice === voice.label}
          onChange={(e) => setFormData({ ...formData, voice: e.target.value })}
          className="hidden"
        />
        {/* Play Button */}
        <button
          type="button"
          className="flex items-center justify-center w-10 h-10 bg-white text-indigo-600 rounded-full shadow-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14.752 11.168l-5.197-3.013c-.76-.442-1.555.136-1.555.986v6.034c0 .85.795 1.428 1.555.986l5.197-3.013a1.125 1.125 0 000-1.972z"
            />
          </svg>
        </button>
        {/* Voice Details */}
        <div className="flex flex-col">
          <span className="font-semibold">{voice.label}</span>
          <span className="text-sm">{voice.gender}</span>
        </div>
        {/* Tick Icon */}
        {formData.voice === voice.label && (
          <div className="absolute top-2 right-2 bg-indigo-500 p-1 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        )}
      </label>
    ))}
  </div>
</div>

          {/* Language */}
          <div>
            <label className="block text-lg font-medium mb-2">
              Select Language
            </label>
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
            <label className="block text-lg font-medium mb-4">
              Aspect Ratio
            </label>
            <div className="flex justify-between bg-gray-100 p-2 rounded-lg">
              {/* Vertical (9:16) */}
              <label
                className={`flex flex-col items-center w-1/3 p-2 rounded-lg cursor-pointer ${
                  formData.aspectRatio === "9:16"
                    ? "bg-indigo-500 text-white"
                    : "bg-white text-gray-800"
                }`}
              >
                <input
                  type="radio"
                  name="aspectRatio"
                  value="9:16"
                  checked={formData.aspectRatio === "9:16"}
                  onChange={handleChange}
                  className="hidden"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <rect
                    x="7"
                    y="4"
                    width="10"
                    height="16"
                    rx="2"
                    ry="2"
                    fill="currentColor"
                  ></rect>
                </svg>
                <span>Vertical (9:16)</span>
              </label>

              {/* Horizontal (16:9) */}
              <label
                className={`flex flex-col items-center w-1/3 p-2 rounded-lg cursor-pointer ${
                  formData.aspectRatio === "16:9"
                    ? "bg-indigo-500 text-white"
                    : "bg-white text-gray-800"
                }`}
              >
                <input
                  type="radio"
                  name="aspectRatio"
                  value="16:9"
                  checked={formData.aspectRatio === "16:9"}
                  onChange={handleChange}
                  className="hidden"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <rect
                    x="4"
                    y="8"
                    width="16"
                    height="8"
                    rx="2"
                    ry="2"
                    fill="currentColor"
                  ></rect>
                </svg>
                <span>Horizontal (16:9)</span>
              </label>

              {/* Square (1:1) */}
              <label
                className={`flex flex-col items-center w-1/3 p-2 rounded-lg cursor-pointer ${
                  formData.aspectRatio === "1:1"
                    ? "bg-indigo-500 text-white"
                    : "bg-white text-gray-800"
                }`}
              >
                <input
                  type="radio"
                  name="aspectRatio"
                  value="1:1"
                  checked={formData.aspectRatio === "1:1"}
                  onChange={handleChange}
                  className="hidden"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <rect
                    x="6"
                    y="6"
                    width="12"
                    height="12"
                    rx="2"
                    ry="2"
                    fill="currentColor"
                  ></rect>
                </svg>
                <span>Square (1:1)</span>
              </label>
            </div>
          </div>

          {/* Generate Caption */}
          <div>
            <label className="block text-lg font-medium mb-2">
              Generate Caption
            </label>
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
              Generate Reel
            </button>
            
          </div>
        </form>
      </div>
    </div>
  );
}
