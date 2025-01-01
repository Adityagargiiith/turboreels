import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import { Button } from "flowbite-react";

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
    <div>
      {/* Hero Section */}
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto ">
        <h1 className="text-xl font-bold lg:text-4xl text-purple-500">
          Welcome to TurboReels
        </h1>
        <p className="text-gray-400 text-xs sm:text-sm">
          Welcome to TurboReels, your ultimate platform for creating and sharing
          engaging AI-generated video reels! Explore captivating content, upload
          your own creations, and grow your audience with ease. TurboReels offers
          a dynamic space to produce, share, and discover creative videos that
          connect you to a global community.
        </p>
        <div className="flex gap-4 mt-6">
          <Link to="/dashboard?tab=singleVideo">
            <Button outline gradientDuoTone="purpleToPink" className="text-lg">
              Create a Reel
            </Button>
          </Link>
          <Link
            to="/singleVideo"
            className="text-xs sm:text-sm text-teal-500 font-bold"
          >
            <Button outline gradientDuoTone="pinkToOrange" className="text-lg">
              Explore Reels
            </Button>
          </Link>
        </div>
      </div>

      {/* Call to Action */}
      <div className="p-3 bg-amber-100 dark:bg-slate-700 max-w-6xl mx-auto rounded-xl">
        <CallToAction />
      </div>

      {/* Recent Reels Section */}
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center text-purple-500">
              Recent Reels
            </h2>
            <div className="flex flex-wrap gap-4">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={"/explore"}
              className="text-lg text-teal-500 hover:underline text-center"
            >
              View all Reels
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
