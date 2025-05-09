import { Sidebar } from "flowbite-react";
import {
  HiHome,
  HiBookOpen,
  HiPlusCircle,
  HiLogout,
  HiUserCircle,
  HiUserGroup,
  HiDocumentText,
  HiChartBar,
} from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";

export default function HomeSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const handleSignout = () => {
    localStorage.removeItem("authToken");
    dispatch(signoutSuccess());
    navigate("/sign-in");
  };

  return (
    <Sidebar className="w-full shadow-md md:w-64">
      {/* Profile Section */}
      <div className="flex flex-col items-center p-6 border-b border-gray-200">
        <img
          src={
            currentUser?.profilePicture ||
            "https://cdn.pixabay.com/photo/2016/09/24/03/20/man-1690965_1280.jpg"
          }
          alt="Profile"
          className="object-cover w-32 h-32 rounded-full shadow-md"
        />
        <p className="mt-3 text-lg font-semibold text-center text-gray-800 dark:text-gray-100">
          {`${currentUser?.firstName || "User"} ${currentUser?.lastName || ""}`}
        </p>
        <p className="text-sm text-center text-gray-500 truncate dark:text-gray-400">
          {currentUser?.email || "email@example.com"}
        </p>
      </div>

      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          <Sidebar.Item
            icon={() => <HiHome className="text-xl text-blue-600" />}
            as="div"
            onClick={() => navigate("/home")}
            active={location.pathname === "/home"}
          >
            Home
          </Sidebar.Item>

          <Sidebar.Item
            icon={() => <HiBookOpen className="text-xl text-green-600" />}
            as="div"
            onClick={() => navigate("/home/learning-plan")}
            active={location.pathname.startsWith("/home/learning-plan")}
          >
            Learning Plans
          </Sidebar.Item>
          <Sidebar.Item
            icon={() => <HiBookOpen className="text-xl text-green-600" />}
            as="div"
            onClick={() => navigate("/comment-post")}
            active={location.pathname.startsWith("/comment-post")}
          >
            Add Comment for post
          </Sidebar.Item>

          <Sidebar.Item
            icon={() => <HiDocumentText className="text-xl text-purple-600" />}
            as="div"
            onClick={() =>
              navigate("/home/progress/create/null?template=CUSTOM")
            }
            active={location.pathname.startsWith("/home/progress/create")}
          >
            Share Progress
          </Sidebar.Item>

          <Sidebar.Item
            icon={() => <HiChartBar className="text-xl text-indigo-600" />}
            as="div"
            onClick={() =>
              navigate("/home/progress/view-user-progress-updates")
            }
            active={location.pathname.startsWith(
              "/home/progress/view-user-progress-updates"
            )}
          >
            My Progress Updates
          </Sidebar.Item>

          <Sidebar.Item
            icon={() => <HiLogout className="text-xl text-red-500" />}
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
