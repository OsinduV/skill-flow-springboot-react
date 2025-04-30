import { React, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashUsers from "../components/DashUsers";
import DashProfile from "../components/DashProfile";
import EditProfile from "../components/EditProfile";
import HomePost from "../components/HomePost";
import HomeSidebar from "../components/HomeSidebar";
import LearningPlan from "../components/LearningPlan";
import CreateLearningPlan from "../components/CreateLearningPlan";
import ViewLearningPlan from "../components/ViewLearningPlan.jsx";


export default function Home() {
  const location = useLocation();
  const [tab, setTab] = useState("homepost");
  const [planId, setPlanId] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    const planIdFromUrl = urlParams.get("planId");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
    if (planIdFromUrl) {
      setPlanId(planIdFromUrl);
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

      {/* learning plan... */}
      {tab === 'learningplan' && <LearningPlan />}
      {/* create learning plan... */}
      {tab === 'createLearningplan' && <CreateLearningPlan />}

      {tab === 'viewLearningplan' && <ViewLearningPlan planId={planId} />}

     

    </div>
  );
}
