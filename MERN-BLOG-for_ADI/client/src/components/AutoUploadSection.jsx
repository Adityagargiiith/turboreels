export default function AutoUpload() {
    return (
      <div className="min-h-screen   py-10 px-5">
        <div className="max-w-6xl  bg-indigo-600 mx-auto p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg">
            Auto Upload your Video
          </h1>
  
          <form className="space-y-6">
            {/* Enter Prompt or Script */}
            <div>
              <label className="block text-lg font-medium text-white mb-2">
                Enter Prompt or Script
              </label>
              <textarea
                className="w-full bg-indigo-600 border-gray-300 rounded-lg shadow-sm  placeholder-white"
                rows="4"
                placeholder="Enter a prompt to generate a script or paste your own script here..."
              ></textarea>
            </div>
  
            {/* Video Template and Theme */}
            <div>
              <label className="block text-lg font-medium  mb-2">
                Choose Video Template and Theme
              </label>
              <select className="w-full bg-indigo-600 border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                <option>Select a Template/Theme</option>
                <option>Modern</option>
                <option>Classic</option>
                <option>Minimalist</option>
              </select>
            </div>
  
            {/* Narrator Voice */}
            <div>
              <label className="block text-lg font-medium mb-2">
                Select Narrator Voice
              </label>
              <select className="w-full bg-indigo-600 border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                <option>Default Voice</option>
                <option>Male Voice 1</option>
                <option>Female Voice 1</option>
                <option>AI Generated Voice</option>
              </select>
            </div>
  
            {/* Language */}
            <div>
              <label className="block text-lg font-medium mb-2">
                Select Language
              </label>
              <select className="w-full bg-indigo-600 border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>
  
            {/* Aspect Ratio */}
            <div>
              <label className="block text-lg font-medium mb-2">
                Choose Aspect Ratio
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2">
                  <input type="radio" name="aspectRatio" value="16:9" />
                  <span>16:9</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="aspectRatio" value="1:1" />
                  <span>1:1</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="radio" name="aspectRatio" value="9:16" />
                  <span>9:16</span>
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
                placeholder="Enter a caption for the video..."
                className="w-full bg-indigo-600 border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 placeholder-white"
              />
            </div>
  
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
          </form>
        </div>
      </div>
    );
  }
  