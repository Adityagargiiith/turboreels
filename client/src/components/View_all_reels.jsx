import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ReelPage = () => {
  const [reels, setReels] = useState([]);
  const [newReel, setNewReel] = useState({ title: "", description: "", url: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { currentUser } = useSelector((state) => state.user);

  const userId = currentUser?._id;

  const fetchReels = async () => {
    try {
      const response = await fetch(`/api/reel/user/${userId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch reels');
      }
      
      const data = await response.json();
      setReels(data.reels);
    } catch (error) {
      console.error('Fetch error:', error);
      setError("Error fetching reels: " + error.message);
    }
  };

  const handleAddReel = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const response = await fetch("/api/reel", {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...newReel, userId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add reel');
      }

      const data = await response.json();
      setReels([data.reel, ...reels]);
      setNewReel({ title: "", description: "", url: "" });
    } catch (error) {
      console.error('Submit error:', error);
      setError("Error adding reel: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchReels();
    }
  }, [userId]);

  if (!currentUser) {
    return <div className="text-center p-6">Please log in to view and create reels.</div>;
  }

  const handleTitleClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
  <h2 className="text-xl font-semibold my-7 text-indigo-600">Your Reels</h2>

  {error && (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {error}
    </div>
  )}

  {/* Add New Reel Form */}
  <div className="bg-indigo-600 p-6 rounded-lg shadow-lg mb-8">
    <h2 className="text-2xl font-bold mb-4 text-white">Add New Reel</h2>
    <form onSubmit={handleAddReel} className="space-y-4">
      <input
        type="text"
        placeholder="Title"
        className="w-full p-3 rounded-lg bg-indigo-500 text-white placeholder-white border border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        value={newReel.title}
        onChange={(e) => setNewReel({ ...newReel, title: e.target.value })}
        required
      />
      <textarea
        placeholder="Description"
        className="w-full p-3 rounded-lg bg-indigo-500 text-white placeholder-white border border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        value={newReel.description}
        onChange={(e) => setNewReel({ ...newReel, description: e.target.value })}
        required
      ></textarea>
      <input
        type="url"
        placeholder="Video URL"
        className="w-full p-3 rounded-lg bg-indigo-500 text-white placeholder-white border border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        value={newReel.url}
        onChange={(e) => setNewReel({ ...newReel, url: e.target.value })}
        required
      />
      <button
        type="submit"
        className="w-full bg-white text-indigo-600 font-semibold px-4 py-3 rounded-lg shadow-md hover:bg-indigo-100 transition duration-300 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Reel"}
      </button>
    </form>
  </div>
{/* </div> */}

      {/* Display Reels in Table Format */}
      <div className="overflow-x-auto my-5">
  <table className="min-w-full table-auto border border-gray-300">
    <thead className="bg-indigo-600 text-white">
      <tr>
        <th className="p-4 text-lg font-semibold border border-gray-300">Title</th>
        <th className="p-4 text-lg font-semibold border border-gray-300">Description</th>
      </tr>
    </thead>
    <tbody>
      {reels.map((reel) => (
        <tr
          key={reel._id}
          className="bg-indigo-100 hover:bg-indigo-200 transition duration-300"
        >
          <td className="p-4 text-indigo-700 font-medium border border-gray-300">
            <button
              onClick={() => handleTitleClick(reel.url)}
              className="hover:text-indigo-900 hover:underline transition duration-300"
            >
              {reel.title}
            </button>
          </td>
          <td className="p-4 text-gray-700 border border-gray-300">{reel.description}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

</div>
  );
};

export default ReelPage;