import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { Button } from "flowbite-react";
import DashSidebar from "../components/DashSidebar"; // Import the Sidebar component
import Guide from "../components/Guide";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/getPosts?limit=8");
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Section */}
      <div className="flex-shrink-0 w-56">
        <DashSidebar />
      </div>

      {/* Main Content Section */}
      <div className="flex-grow p-4">
        {/* Hero Section */}
        <div className="flex flex-col gap-6 p-8 max-w-6xl mx-auto">
          <h1 className="text-xl font-bold lg:text-4xl text-purple-500">
            Welcome to TurboReels
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm">
            Welcome to TurboReels, your ultimate platform for creating and
            sharing engaging AI-generated video reels! Explore captivating
            content, upload your own creations, and grow your audience with
            ease. TurboReels offers a dynamic space to produce, share, and
            discover creative videos that connect you to a global community.
          </p>
          <div className="flex gap-4 mt-6">
            <Link to="/dashboard?tab=singleVideo">
              <Button outline gradientDuoTone="purpleToPink" className="text-lg">
                Create a Reel
              </Button>
            </Link>
            <Link
              to="/guide"
              className="text-xs sm:text-sm text-teal-500 font-bold"
            >
              <Button outline gradientDuoTone="pinkToOrange" className="text-lg">
              Guide
              </Button>
            </Link>
          </div>
        </div>

        {/* Call to Action */}
        <div className="p-3 bg-amber-100 dark:bg-slate-700 max-w-6xl mx-auto rounded-xl mb-6">
          <CallToAction />
        </div>

        {/* Recent Reels Section */}
        {/* Add content for recent reels if applicable */}
      </div>
    </div>
  );
}
