import React, { useState } from "react";
import { Modal } from "flowbite-react";
import { FaPhotoVideo, FaVideo } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function CreatePost() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const userAvatar = currentUser?.profilePicture || "/default-avatar.png";

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setPostContent("");
    setUploadedPhoto(null);
  };

  const handlePost = () => {
    console.log("Post Content:", postContent);
    // Add logic to handle the post submission
    handleCloseModal();
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedPhoto(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-lg border rounded-lg mx-auto shadow-md overflow-hidden my-4 p-4 bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700">
      {/* Create Post Button */}
      <div className="flex items-center">
        <img
          src={userAvatar}
          alt="User Avatar"
          className="w-12 h-12 rounded-full object-cover"
        />
        <button
          onClick={() => navigate("/home/skill-post/create")}
          className="ml-4 flex-grow px-4 py-2 text-left text-gray-500 bg-gray-100 rounded-full hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          Create a post
        </button>
      </div>

      <div className="flex justify-between mt-4">
        <button className="flex items-center text-gray-500 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400" onClick={() => navigate("/home/skill-post/create")}>
          <FaPhotoVideo className="mr-2" />
          <span>Add Photo</span>
        </button>
        <button className="flex items-center text-gray-500 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400" onClick={() => navigate("/home/skill-post/create")}>
          <FaVideo className="mr-2" />
          <span>Add Video</span>
        </button>
      </div>

      {/* Modal */}
      <Modal show={isModalOpen} onClose={handleCloseModal}>
        <Modal.Header>Create a Post</Modal.Header>
        <Modal.Body>
          <div className="flex items-center mb-4">
            <img
              src="https://cdn.pixabay.com/photo/2016/09/24/03/20/man-1690965_1280.jpg"
              alt="User Avatar"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="ml-3">
              <p className="font-semibold text-gray-800 dark:text-gray-200">Osindu Vimukthi</p>
            </div>
          </div>
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="What do you want to talk about?"
            className="w-full h-32 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-200"
          ></textarea>
          <div className="flex justify-between mt-4">
            <label
              htmlFor="photo-upload"
              className="flex items-center text-gray-500 hover:text-blue-500 cursor-pointer dark:text-gray-300 dark:hover:text-blue-400"
            >
              <FaPhotoVideo className="mr-2" />
              <span>Add Photo</span>
            </label>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoUpload}
            />
            <button className="flex items-center text-gray-500 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400">
              <FaVideo className="mr-2" />
              <span>Add Video</span>
            </button>
          </div>
          {uploadedPhoto && (
            <div className="mt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">Photo Preview:</p>
              <img
                src={uploadedPhoto}
                alt="Uploaded Preview"
                className="w-full h-auto rounded-lg mt-2"
              />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={handleCloseModal}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handlePost}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            Post
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
