import { Carousel, Modal } from "flowbite-react";
import React, { useState } from "react";
import { FaThumbsUp, FaRegCommentDots } from "react-icons/fa";
import CommentSection from "../comments/CommentSection";
import { formatDistanceToNow } from "date-fns";
import { useSelector } from "react-redux";

export default function ProgressPostSection({ post }) {
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

      {/* Post Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{post.title}</h3>
        <p className="text-gray-700 dark:text-gray-300">{post.description}</p>
      </div>

      {/* Media Carousel */}
      {post.mediaList && post.mediaList.length > 0 && (
        <div className="w-full h-96">
          <Carousel slide={false}>
            {post.mediaList.map((media) =>
              media.mediaType === "IMAGE" ? (
                <img
                  key={media.id}
                  src={media.fileUrl}
                  alt="Progress media"
                  className="w-full object-cover"
                />
              ) : (
                <video
                  key={media.id}
                  src={media.fileUrl}
                  controls
                  className="w-full object-cover"
                />
              )
            )}
          </Carousel>
        </div>
      )}

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

      {/* Comment Modal */}
      <Modal show={isModalOpen} onClose={handleModalClose}>
        <Modal.Header>Comments</Modal.Header>
        <Modal.Body>
          <CommentSection postId={post.id} />
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
