import { Carousel, Modal } from "flowbite-react";
import React, { useState } from "react";
import CommentSection from "../comments/CommentSection";
import { FaThumbsUp, FaRegCommentDots } from "react-icons/fa";

export default function Post() {
  const [isFollowing, setIsFollowing] = useState(false);
  const [likes, setLikes] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const postData = {
    user: {
      firstName: "Osindu",
      profilePicture:
        "https://cdn.pixabay.com/photo/2016/09/24/03/20/man-1690965_1280.jpg",
    },
    postedDate: "1w",
    media: [
      "https://cdn.pixabay.com/photo/2023/01/10/00/17/italy-7708551_1280.jpg",
      "https://cdn.pixabay.com/photo/2025/02/20/10/38/robin-9419575_1280.jpg",
      "https://cdn.pixabay.com/photo/2020/11/24/04/01/pond-5771499_1280.jpg",
    ],
    text: "lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat perspiciatis voluptates exercitationem vero ab et.",
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const handleLike = () => {
    setLikes((prevLikes) => prevLikes + 1);
  };

  const handleCommentClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-lg border border-gray-200 rounded-lg mx-auto shadow-md overflow-hidden my-4 dark:bg-gray-800 dark:border-gray-700">
      {/* User Info */}
      <div className="flex items-center justify-between px-4 pt-4">
        <div className="flex items-center  ">
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
        <button
          onClick={handleFollow}
          className={`px-3 py-1 text-sm rounded ${
            isFollowing
              ? "bg-gray-300 text-gray-700"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          {isFollowing ? "Following" : "Follow"}
        </button>
      </div>

      {/* Post Caption */}
      <div className="p-4">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat
          perspiciatis voluptates exercitationem vero ab et.
        </p>
      </div>

      {/* Image Carousel */}
      <div className="w-full h-96 ">
        <Carousel slide={false}>
          {postData.media.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Post Image ${index + 1}`}
              className="w-full object-cover"
            />
          ))}
        </Carousel>
      </div>

      {/* Post Actions */}
      <div className="mt-4 p-3 border-y dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={handleLike}
            className="flex items-center text-gray-500 hover:text-blue-500 text-lg"
          >
            <FaThumbsUp className="mr-1" />
            <span>{likes} Likes</span>
          </button>
          <button
            onClick={handleCommentClick}
            className="flex items-center text-gray-500 hover:text-blue-500 text-lg"
          >
            <FaRegCommentDots className="mr-1" />
            <span>Comment</span>
          </button>
        </div>
      </div>

      {/* <CommentSection /> */}
      {/* Comment Modal */}
      <Modal show={isModalOpen} onClose={handleModalClose}>
        <Modal.Header>Comments</Modal.Header>
        <Modal.Body>
        <CommentSection />
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={handleModalClose}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
