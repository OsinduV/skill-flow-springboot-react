import { React, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashUsers from "../components/DashUsers";
import DashProfile from "../components/DashProfile";
import EditProfile from "../components/EditProfile";
import HomePost from "../components/HomePost";
import HomeSidebar from "../components/HomeSidebar";

export default function Home() {
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
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        {/* Sidebar */}
        <HomeSidebar />
      </div>
      {/* home post ... */}
      {tab === 'homepost' && <HomePost />}


    </div>
  );
}
