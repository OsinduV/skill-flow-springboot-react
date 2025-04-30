import { Sidebar } from "flowbite-react";
import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiAnnotation,
  HiChartPie,
} from "react-icons/hi";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { signoutSuccess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function HomeSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  const handleSignout = async () => {
    // try {
    //   // Clear the auth token from local storage
    //   localStorage.removeItem("authToken");
    //   // Dispatch the signoutSuccess action to clear the user state
    //   dispatch(signoutSuccess());
    //   // Navigate the user to the home page
    //   navigate("/");
    // } catch (error) {
    //   console.error("Error during signout:", error);
    // }
  };
  return (
    <Sidebar className="w-full md:w-56">
      {/* Profile Section */}
      <div className="flex flex-col items-center p-6 border-b border-gray-200">
        <img
          src={
            currentUser?.profilePicture ||
            "https://cdn.pixabay.com/photo/2016/09/24/03/20/man-1690965_1280.jpg"
          }
          alt="Profile"
          className="w-16 h-16 rounded-full object-cover"
        />
        <p className="mt-3 font-semibold text-gray-800 text-center">
          {currentUser?.name || "User Name"}
        </p>
      </div>

      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          <Link to="/?tab=homepost">
            <Sidebar.Item
              active={tab === "homepost" || !tab}
              icon={HiChartPie}
              as="div"
            >
              Home
            </Sidebar.Item>
          </Link>

          <Link to="/?tab=learningplan">
            <Sidebar.Item
              active={tab === "learningplan"}
              icon={HiChartPie}
              as="div"
            >
              Learnin Plan
            </Sidebar.Item>
          </Link>

          <Sidebar.Item
            icon={HiArrowSmRight}
            className="cursor-pointer"
            onClick={handleSignout}
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
