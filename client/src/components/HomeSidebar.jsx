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
import { HiCpuChip } from "react-icons/hi2"
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
    <Sidebar className="w-full md:w-64 shadow-md">
      {/* Profile Section */}
      <div className="flex flex-col items-center p-6 border-b border-gray-200">
        <img
          src={
            currentUser?.profilePicture ||
            "https://cdn.pixabay.com/photo/2016/09/24/03/20/man-1690965_1280.jpg"
          }
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover shadow-md"
        />
        <p className="mt-3 font-semibold text-gray-800 dark:text-gray-100 text-center text-lg">
          {`${currentUser?.firstName || "User"} ${currentUser?.lastName || ""}`}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center truncate">
          {currentUser?.email || "email@example.com"}
        </p>
      </div>

      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          <Sidebar.Item
            icon={() => <HiHome className="text-blue-600 text-xl" />}
            as="div"
            onClick={() => navigate("/home")}
            active={location.pathname === "/home"}
          >
            Home
          </Sidebar.Item>
          <Sidebar.Item
            icon={() => <HiUserGroup  className="text-yellow-600 text-xl" />}
            as="div"
            onClick={() => navigate("/home")}
            active={location.pathname === "/home"}
          >
            Skill Posts
          </Sidebar.Item>

          <Sidebar.Item
            icon={() => <HiChartBar className="text-indigo-600 text-xl" />}
            as="div"
            onClick={() =>
              navigate("/home/progress/view-all-progress-updates")
            }
            active={location.pathname.startsWith(
              "/home/progress/view-all-progress-updates"
            )}
          >
            Progress Updates
          </Sidebar.Item>
          <Sidebar.Item
            icon={() => <HiBookOpen className="text-green-600 text-xl" />}
            as="div"
            onClick={() => navigate("/home/learning-plan")}
            active={location.pathname.startsWith("/home/learning-plan")}
          >
            Learning Plans
          </Sidebar.Item>
          <Sidebar.Item
            icon={() => <HiCpuChip className="text-teal-600 text-x" />}
            as="div"
            onClick={() => navigate("/home/generate-learning-plan")}
            active={location.pathname.startsWith(
              "/home/generate-learning-plan"
            )}
          >
            Generate Learning Plan
          </Sidebar.Item>

          {/* <Sidebar.Item
            icon={() => <HiDocumentText className="text-purple-600 text-xl" />}
            as="div"
            onClick={() => navigate("/home/progress/create/null?template=CUSTOM")}
            active={location.pathname.startsWith("/home/progress/create")}
          >
            Share Progress
          </Sidebar.Item> */}

          <Sidebar.Item
            icon={() => <HiLogout className="text-red-500 text-xl" />}
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
