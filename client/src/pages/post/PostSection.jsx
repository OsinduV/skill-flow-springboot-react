import { Carousel, Modal } from "flowbite-react";
import React, { useState } from "react";
import CommentSection from "../comments/CommentSection";
import { FaThumbsUp, FaRegCommentDots } from "react-icons/fa";
import { useSelector } from "react-redux";
import { formatDistanceToNow } from "date-fns";

export default function Post({ post }) {
  const { currentUser } = useSelector((state) => state.user);
  const [isFollowing, setIsFollowing] = useState(false);
  const [likes, setLikes] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFollow = () => setIsFollowing(!isFollowing);
  const handleLike = () => setLikes((prev) => prev + 1);
  const handleCommentClick = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const userAvatar = currentUser?.profilePicture || "/default-avatar.png";
  const userName = currentUser?.firstName || "User";
  const createdAt = post.createdAt
      ? formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })
      : "Just now";

  return (
    <div className="max-w-lg border border-gray-200 rounded-lg mx-auto shadow-md overflow-hidden my-4 dark:bg-gray-800 dark:border-gray-700">
      {/* User Info */}
      <div className="flex items-center justify-between px-4 pt-4">
        <div className="flex items-center">
          <img
            src={userAvatar}
            alt="User Avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="ml-3">
            <p className="font-semibold text-gray-800 dark:text-gray-100">
              {userName}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {createdAt}
            </p>
          </div>
        </div>

      </div>

      {/* Description */}
      <div className="p-4">
        <p>{post.description}</p>
      </div>

      {/* Media Carousel */}
      {post.mediaList?.length > 0 && (
        <div className="w-full h-96">
          <Carousel slide={false}>
            {post.mediaList.map((media, index) =>
              media.mediaType === "IMAGE" ? (
                <img
                  key={index}
                  src={media.fileUrl}
                  alt={`Post Media ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <video
                  key={index}
                  src={media.fileUrl}
                  controls
                  className="w-full h-full object-cover"
                />
              )
            )}
          </Carousel>
        </div>
      )}

      {/* Actions */}
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

      {/* Comments Modal */}
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
