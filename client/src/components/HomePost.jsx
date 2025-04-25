import { Carousel } from "flowbite-react";
import React from "react";
import Post from "./Post";

export default function HomePost() {

  return (
    <div className="h-screen w-full overflow-y-scroll py-10 px-4">
      
        <Post />
        <Post />
        <Post />

      
    </div>
  );
}
