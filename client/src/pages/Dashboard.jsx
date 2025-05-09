import { React, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashUsers from "../components/DashUsers";
import DashProfile from "../components/DashProfile";
import EditProfile from "../components/EditProfile";
import PostComment from "./comments/PostComment";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      <div className="md:w-56">
        {/* Sidebar */}
        <DashSidebar />
      </div>
      {/* profile... */}
      {tab === 'profile' && <DashProfile />}
      {tab === 'edit_profile' && <EditProfile />}

      {/* users */}
      {tab === 'users' && <DashUsers />}

      {tab==='comments' && <PostComment/>}

    </div>
  );
}
