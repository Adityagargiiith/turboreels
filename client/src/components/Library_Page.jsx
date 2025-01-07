import React, { useState, useEffect } from "react";
import axios from "axios";

const LibraryPage = () => {
  const [videoData, setVideoData] = useState({
    prompt: "",
    template: "",
    voice: "",
    language: "",
    aspectRatio: "",
    caption: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageOptions, setImageOptions] = useState([]);
  const [editing, setEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [aiSelectedImage, setAiSelectedImage] = useState(null);

  // Fetch the latest video from the backend
  useEffect(() => {
    const fetchLatestVideo = async () => {
      try {
        const response = await axios.get("https://turboreels.onrender.com/api/video");
        const videos = response.data.videos;
        const latestVideo = videos.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )[0];

        // Extract only the fields we want to display
        const { prompt, template, voice, language, aspectRatio, caption } = latestVideo;
        setVideoData({
          prompt,
          template,
          voice,
          language,
          aspectRatio,
          caption: caption || "N/A", // Handle optional caption field
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching video details:", error);
        setError("Failed to load video details");
        setLoading(false);
      }
    };

    fetchLatestVideo();
  }, []);

  const handleEditImage = () => {
    setEditing(true);
    setImageOptions([
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbCLhWAEcKDFFJWZliYitygdMkPkokKQKqFA&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTamhqtGBtTCW5-B9qUzdIYrZYmhWEcNeWnJA&s",
      "https://d3mvlb3hz2g78.cloudfront.net/wp-content/uploads/2017/09/thumb_720_450_dreamstime_xl_31771038.jpg",
    ]);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setAiSelectedImage(null); // Deselect AI image when a user image is selected
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAiImageClick = (image) => {
    setAiSelectedImage(image);
    setSelectedImage(null); // Deselect user image when an AI image is selected
  };

  const handleUploadImageClick = () => {
    alert("Upload image feature not implemented yet.");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {error}
      </div>
    );
  }

  // Function to format field labels
  const formatFieldLabel = (key) => {
    return key
      .replace(/([A-Z])/g, " $1") // Add space before capital letters
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter of each word
      .join(" ");
  };

  return (
    <div className="flex flex-wrap gap-8 p-8 min-h-screen">
      {/* Left Side: Video Preview */}
      <div className="flex-1">
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg">
          Video Preview
        </h2>
        <div className="rounded-lg shadow-lg p-6">
          <div className="w-full aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center p-4">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <p className="mt-2 text-sm text-gray-500">
                Video preview will be available once processing is complete
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Video Details */}
      <div className="flex-1">
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg">
          Generated Video Details
        </h2>
        <div className="bg-indigo-600 rounded-lg shadow-lg p-6">
          <div className="space-y-6">
            {Object.entries(videoData).map(([key, value]) => (
              <div key={key}>
                <h3 className="text-lg font-semibold text-white">{formatFieldLabel(key)}</h3>
                <p className="mt-2 text-white bg-indigo-600 p-3 rounded-lg border-2 border-white">
                  {value || "N/A"}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <button
              className="px-6 py-3 text-white bg-indigo-500 rounded-lg shadow-md hover:bg-indigo-700"
              onClick={handleEditImage}
            >
              Edit Image
            </button>
          </div>
        </div>
      </div>

      {/* Image Edit Options */}
      {editing && (
        <div className="bg-indigo-600 rounded-lg shadow-lg p-6 mt-8 w-full">
          <h3 className="text-lg font-semibold text-white -700 mb-4">
            Edit Image Options
          </h3>
          <div className="space-y-4">
            {/* Upload Your Own Image */}
            <button
              className="w-full te px-4 py-2 text-white bg-indigo-500 rounded-lg shadow-md hover:bg-indigo-700"
              onClick={() => document.getElementById("file-upload").click()}
            >
              Upload Your Own Image
            </button>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
            {selectedImage && (
              <div className="mt-4 text-center">
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="w-32 h-32 object-cover rounded-lg mx-auto"
                />
              </div>
            )}

            <div>
              <h4 className="text-white font-medium mb-2">AI-Generated Images</h4>
              <div className="grid grid-cols-3 gap-4">
                {imageOptions.map((option, index) => (
                  <div
                    key={index}
                    className={`bg-gray-100 rounded-lg overflow-hidden shadow-md cursor-pointer hover:ring-2 hover:ring-indigo-500 ${aiSelectedImage === option ? "border-4 border-white" : ""}`}
                    onClick={() => handleAiImageClick(option)}
                  >
                    <img
                      src={option}
                      alt={`AI Option ${index + 1}`}
                      className="w-full h-32 object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {aiSelectedImage && (
              <div className="mt-4 text-center">
                <button
                  className="w-full px-4 py-2 text-white bg-indigo-500 rounded-lg shadow-md hover:bg-indigo-700"
                  onClick={handleUploadImageClick}
                >
                  Upload Selected AI Image
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LibraryPage;
