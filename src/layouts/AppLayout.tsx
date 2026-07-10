import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

const AppLayout = () => {
  return (
    <div className="flex min-h-screen bg-[#f9f8fb] text-[#24212b]">
      <Sidebar />

      <div className="flex min-h-screen min-w-0 flex-1 flex-col lg:pl-[288px]">
        <Navbar />
        <main className="flex-1 min-w-0 overflow-x-hidden px-4 py-6 sm:px-6 lg:px-8 xl:px-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
