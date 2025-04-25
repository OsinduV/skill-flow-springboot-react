import { Carousel } from "flowbite-react";
import React from "react";
import CommentSection from "./CommentSection";

export default function Post() {
  const postData = {
    user: {
      firstName: "Osindu",
      profilePicture:
        "https://cdn.pixabay.com/photo/2016/09/24/03/20/man-1690965_1280.jpg",
    },
    images: [
      "https://cdn.pixabay.com/photo/2023/01/10/00/17/italy-7708551_1280.jpg",
      "https://cdn.pixabay.com/photo/2025/02/20/10/38/robin-9419575_1280.jpg",
      "https://cdn.pixabay.com/photo/2020/11/24/04/01/pond-5771499_1280.jpg",
    ],
    text: "lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat perspiciatis voluptates exercitationem vero ab et.",
  };

  return (
    <div className="max-w-lg mx-auto shadow-md rounded-lg overflow-hidden my-4">
      {/* User Info */}
      <div className="flex items-center p-4 ">
        <img
          src={postData.user.profilePicture}
          alt="User Avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="ml-3">
          <p className="font-semibold text-gray-800 dark:text-gray-100">
            Osindu Vimukthi
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            2 hours ago
          </p>
        </div>
      </div>

      {/* Image Carousel */}
      <div className="w-full h-96 ">
        <Carousel slide={false}>
          {postData.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Post Image ${index + 1}`}
              className="w-full object-cover"
            />
          ))}
        </Carousel>
      </div>

      {/* Post Caption */}
      <div className="p-4">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat
          perspiciatis voluptates exercitationem vero ab et.
        </p>
      </div>

      <CommentSection />
    </div>
  );
}
