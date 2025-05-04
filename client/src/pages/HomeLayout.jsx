import { Outlet } from "react-router-dom";
import HomeSidebar from "../components/HomeSidebar";

export default function HomeLayout() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-56">
        <HomeSidebar />
      </div>
      <div className="flex-grow p-4">
        <Outlet />
      </div>
    </div>
  );
}
