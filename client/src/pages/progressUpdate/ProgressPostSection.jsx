import { Carousel, Modal } from "flowbite-react";
import React, { useState } from "react";
import { FaThumbsUp, FaRegCommentDots } from "react-icons/fa";
import CommentSection from "../comments/CommentSection";
import { formatDistanceToNow } from "date-fns";
import { useSelector } from "react-redux";
import { HiOutlineDotsVertical } from "react-icons/hi";
import axios from "../../utils/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { updateFollowings } from "../../redux/user/userSlice";

export default function ProgressPostSection({ post }) {
  const { currentUser } = useSelector((state) => state.user);
  const [isFollowing, setIsFollowing] = useState(false);
  const [likes, setLikes] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleFollow = () => setIsFollowing(!isFollowing);
  const handleLike = () => setLikes((prev) => prev + 1);
  const handleCommentClick = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const userAvatar = post.userImage || "/default-avatar.png";
  const userName = post.userName || "User";
  const createdAt = post.createdAt
    ? formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })
    : "Just now";

  if (!currentUser) return null;

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
        <div className="relative">
          {post.userId === currentUser?.id ? (
            <>
              <button
                onClick={toggleDropdown}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <HiOutlineDotsVertical className="text-xl text-gray-600 dark:text-white" />
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-28 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded shadow-lg z-10">
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => {
                      setShowDropdown(false);
                      navigate(`/home/progress/edit/${post.id}`);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100 dark:hover:bg-red-700"
                    onClick={() => {
                      setShowDropdown(false);
                      setShowDeleteModal(true);
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </>
          ) : currentUser?.followings?.includes(post.userId) ? (
            // If following
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="px-3 py-1 text-sm bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Following
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-28 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded shadow-lg z-10">
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100 dark:hover:bg-red-700"
                    onClick={async () => {
                      try {
                        await axios.put(
                          `/api/user/${currentUser.id}/follow/${post.userId}`
                        );
                        dispatch(updateFollowings(post.userId));
                        toast.success("Unfollowed user.");
                      } catch (err) {
                        toast.error("Failed to unfollow.");
                      }
                      setShowDropdown(false);
                    }}
                  >
                    Unfollow
                  </button>
                </div>
              )}
            </div>
          ) : (
            // If not following
            <button
              onClick={async () => {
                try {
                  await axios.put(
                    `/api/user/${currentUser.id}/follow/${post.userId}`
                  );
                  dispatch(updateFollowings(post.userId));
                  toast.success("Started following user.");
                } catch (err) {
                  toast.error("Failed to follow.");
                  console.log(err);
                }
              }}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Follow
            </button>
          )}
        </div>
      </div>

      {/* Post Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          {post.title}
        </h3>
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

      <Modal show={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <Modal.Header>Confirm Deletion</Modal.Header>
        <Modal.Body>
          <div className="text-gray-700 dark:text-gray-200">
            Are you sure you want to delete this progress post? This action
            cannot be undone.
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={() => setShowDeleteModal(false)}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={async () => {
              try {
                await axios.delete(`/progress/${post.id}`);
                setShowDeleteModal(false);
                toast.success("Progress post deleted successfully!");
                window.location.reload(); // or re-fetch posts
              } catch (err) {
                console.error("Failed to delete post", err);
                toast.error("Failed to delete the post. Please try again.");
              }
            }}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Confirm Delete
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
