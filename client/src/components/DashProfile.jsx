import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Avatar } from "flowbite-react";
import { motion } from "framer-motion";
import UserProgressPosts from "../pages/progressUpdate/UserProgressPosts";
import HomePost from "../pages/post/HomePost";
import { HiOutlineDocumentText, HiOutlineLightBulb, HiOutlineChartBar } from "react-icons/hi";
import LearningPlanList from "../pages/learningPlan/LearningPlan";

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState("posts");

  // Prevent rendering if user data is not ready
  if (!currentUser) {
    return (
      <div className="text-center mt-10 text-gray-600 dark:text-gray-300">
        Loading profile...
      </div>
    );
  }

  const fullName = `${currentUser?.firstName || ""} ${currentUser?.lastName || ""}`;

  const renderTabContent = () => {
    switch (activeTab) {
      case "posts":
        return <div className="grid gap-4"><HomePost /></div>;
      case "plans":
        return <div className="grid gap-4"><LearningPlanList /></div>;
      case "progress":
        return (
          <div className="grid gap-4">
            <UserProgressPosts />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl w-full mx-auto p-4 border border-gray-200 rounded-lg my-4 shadow-md overflow-hidden dark:bg-gray-800 dark:border-gray-700">
      {/* Cover Image */}
      <div className="h-48 w-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl shadow-md relative">
        <img
          src={currentUser?.profilePicture || "/images/default-profile.png"}
          alt="profile"
          className="w-36 h-36 rounded-full border-4 border-white absolute left-8 bottom-[-3rem] shadow-xl"
        />
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center max-w-xl w-full">
        {/* Profile Info */}
        <div className="mt-16 flex gap-6 items-center">
          <div>
            <h2 className="text-2xl font-bold">{fullName}</h2>
            <p className="text-sm text-gray-600">{currentUser?.email || "No email"}</p>
            <p className="text-sm text-gray-500">{currentUser?.gender || "Not specified"}</p>
          </div>
          <Button size="xs" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:bg-gradient-to-l focus:ring-purple-200 dark:focus:ring-purple-800" outline>
            Edit Profile
          </Button>
        </div>

        {/* Stats */}
        <div className="flex gap-8 mt-6 text-center">
          <div>
            <p className="text-xl font-semibold">{currentUser?.followers?.length || 0}</p>
            <p className="text-sm text-gray-600">Followers</p>
          </div>
          <div>
            <p className="text-xl font-semibold">{currentUser?.followings?.length || 0}</p>
            <p className="text-sm text-gray-600">Following</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-8 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap justify-center space-x-6 text-gray-600 dark:text-gray-300">
          <button
            className={`flex items-center gap-2 pb-3 px-4 transition-all duration-150 ease-in-out hover:text-purple-600 ${
              activeTab === "posts" ? "border-b-2 border-purple-600 font-semibold text-purple-700" : ""
            }`}
            onClick={() => setActiveTab("posts")}
          >
            <HiOutlineDocumentText className="text-lg" /> Posts
          </button>
          <button
            className={`flex items-center gap-2 pb-3 px-4 transition-all duration-150 ease-in-out hover:text-purple-600 ${
              activeTab === "plans" ? "border-b-2 border-purple-600 font-semibold text-purple-700" : ""
            }`}
            onClick={() => setActiveTab("plans")}
          >
            <HiOutlineLightBulb className="text-lg" /> Learning Plans
          </button>
          <button
            className={`flex items-center gap-2 pb-3 px-4 transition-all duration-150 ease-in-out hover:text-purple-600 ${
              activeTab === "progress" ? "border-b-2 border-purple-600 font-semibold text-purple-700" : ""
            }`}
            onClick={() => setActiveTab("progress")}
          >
            <HiOutlineChartBar className="text-lg" /> Progress Updates
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <motion.div
        className="mt-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {renderTabContent()}
      </motion.div>
    </div>
  );
}
