import { Button } from "flowbite-react";
import downloadImage from "./image.png";
import { Link } from "react-router-dom";

// import 

export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl">Want to Create more Reels?</h2>
        <p className="text-gray-500 my-2">
          Checkout our latest reel creation to get inspired and create more engaging reels
        </p>
        <Button
          gradientDuoTone="purpleToPink"
          className="rounded-tl-xl rounded-bl-none"
        >
          <Link to="/dashboard?tab=singleVideo">
            Create a reel
          </Link>
        </Button>
      </div>
      <div className="p-7 flex-1">
        <img src={downloadImage} className="my-4 w-4/5" />
      </div>
    </div>
  );
}
