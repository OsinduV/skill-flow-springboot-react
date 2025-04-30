import { Carousel } from "flowbite-react";
import React from "react";
import Post from "../post/PostSection";
import CreatePost from "./CreatePost";

export default function HomePost() {
  return (
    <div className="h-screen w-full overflow-y-scroll py-10 px-4">
      {/* Create Post Section */}
      <CreatePost />

      {/* Posts */}
      <Post />
      <Post />
      <Post />
    </div>
  );
}
