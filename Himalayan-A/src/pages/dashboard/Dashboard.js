import React, { useState } from "react";
import { FaHome, FaChartBar, FaUser, FaCog } from "react-icons/fa"; // Import icons (install 'react-icons' if not installed)
import { Link, useNavigate } from "react-router-dom";
import Setting from "./admin/Setting";

const DashBoard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const navigate = useNavigate();
  return (
    <div
      className={`flex h-screen bg-gray-100 ${
        isSidebarOpen ? "overflow-hidden" : "overflow-x-hidden"
      }`}
    >
      {/* Sidebar */}
      <div
        className={`w-80 gap-4 bg-gray-800 text-white ${
          isSidebarOpen ? "" : "hidden"
        }`}
      >
        <div className="p-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
        <nav>
          <ul className="py-4">
            <li className="flex items-center">
              <Link to="/user/home">
                <FaHome className="mr-2" />
                <span>Home</span>
              </Link>
            </li>
            <li className="flex items-center">
              <FaChartBar className="mr-2" />
              <span>Analytics</span>
            </li>
            <li className="flex items-center">
              <FaUser className="mr-2" />
              <span>Profile</span>
            </li>
            <li className="flex items-center">
              <Link to="/user/setting">
                <FaCog className="mr-2" />
                <span>Settings</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        {/* Your main content goes here */}
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 p-2 bg-gray-800 text-white rounded-md"
        >
          Toggle Sidebar
        </button>
        <h2 className="text-2xl font-bold">Main Content</h2>
      </div>
    </div>
  );
};

export default DashBoard;
