import React from "react";
import { useSelector } from "react-redux";

export default function DashProfile() {

    const { currentUser, error, loading } = useSelector((state) => state.user);

  return (
    <div className="min-h-screen w-full flex flex-col items-center py-10">
      {/* Profile Card */}
      <div className=" shadow-md rounded-lg p-6 w-11/12 md:w-2/3 lg:w-1/2">
        <div className="flex flex-col items-center gap-1 w-full">
          {/* Profile Picture */}
          <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-blue-500">
            <img
              src={currentUser.profilePicture}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col items-center">
            {/* User Name */}
            <h1 className="text-2xl font-semibold mt-4">{currentUser.firstName} {currentUser.lastName}</h1>
            {/* Email */}
            <p className="text-gray-600 dark:text-gray-400 text-center mt-1">
            {currentUser.email}
            </p>
          </div>
          {/* Stats */}
          <div className="flex justify-around w-full mt-4">
            <div className="text-center">
              <h2 className="text-lg">Posts</h2>
              <p className="text-gray-600 dark:text-gray-200 font-bold text-xl">12</p>
            </div>
            <div className="text-center">
              <h2 className="text-lg">Followers</h2>
              <p className="text-gray-600 dark:text-gray-200 font-bold text-xl">{currentUser.followers ? currentUser.followers.length : 0}</p>
            </div>
            <div className="text-center">
              <h2 className="text-lg">Following</h2>
              <p className="text-gray-600 dark:text-gray-200 font-bold text-xl">{currentUser.followings ? currentUser.followings.length : 0}</p>
            </div>
          </div>
        </div>

        {/* Horizontal Line */}
        <hr className="my-6 border-gray-300 dark:border-gray-700" />

        {/* Skills Section */}
        <div className="mt-6 w-full">
          <h2 className="text-lg font-semibold text-gray-800">Skills</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
              JavaScript
            </span>
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
              React
            </span>
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
              Tailwind CSS
            </span>
            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
              Node.js
            </span>
          </div>
        </div>

        {/* Posts Section */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-gray-800">Recent Posts</h2>
          <div className="mt-4 space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h3 className="text-md font-semibold">How to Build a REST API</h3>
              <p className="text-sm text-gray-600 mt-1">
                A quick guide to building REST APIs with Node.js and Express.
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h3 className="text-md font-semibold">
                Understanding Tailwind CSS
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Learn how to style your applications faster with Tailwind CSS.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
