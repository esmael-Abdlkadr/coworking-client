import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { AiOutlineCalendar, AiOutlinePlusCircle } from "react-icons/ai";

import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useSidebar } from "../store/sidebarStore";
import { useLogout } from "../hooks/auth";
import Dropdown from "../components/ui/DropDown";
import Modal from "../components/ui/Modal";
import ProfileSettings from "../components/dashbaord/ProfileForm";
import PasswordManager from "../components/dashbaord/PasswordManager";
import React from "react";
import { FiBookmark } from "react-icons/fi";

const navItems = [
  { label: "Bookings", path: "/dashboard/bookings", icon: AiOutlineCalendar },
  {
    label: "NewBooking",
    path: "/dashboard/booking/new",
    icon: AiOutlinePlusCircle,
  },
  {
    path: "/dashboard/bookmarked-blogs",
    label: "Saved Blogs",
    icon: FiBookmark,
  },
];

function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const { isCollapsed } = useSidebar();
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 bg-indigo-600 text-white w-64 transition-transform transform md:translate-x-0 z-50`}
      >
        <div className="flex items-center justify-between p-4">
          <h2 className="text-lg font-bold">Dashboard</h2>
          <button
            className="md:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <FaBars />
          </button>
        </div>

        <nav className="space-y-2 p-4">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded ${
                  isActive
                    ? "bg-indigo-800 text-white"
                    : "hover:bg-indigo-700 text-gray-200"
                }`
              }
            >
              <item.icon />
              {item.label}
            </NavLink>
          ))}
          <Dropdown
            setIsPasswordModalOpen={setIsPasswordModalOpen}
            setIsProfileModalOpen={setIsProfileModalOpen}
          />
        </nav>
      </div>
      {/* Main Content */}
      <div className="flex flex-col flex-1">
        <Navbar
          navs={[
            "Home",
            "Services",
            "Location",
            "Blogs",
            "Pricing",
            "About Us",
          ]}
          showButton={true}
          buttonTitle="Logout"
          buttonOnClick={handleLogout}
          title="Coworking"
          styles={`${
            isCollapsed ? "ml-[90px]" : "ml-[250px] overflow-hidden"
          }  `}
        />
        {/* Main Content Area */}
        <main
          className={`p-6 flex-grow overflow-x-hidden `}
          style={{ marginLeft: isCollapsed ? "90px" : "250px" }}
        >
          <Outlet />
          {isProfileModalOpen && (
            <Modal
              title="User Profile"
              onClose={() => setIsProfileModalOpen(false)}
              isOpen={isProfileModalOpen}
            >
              <ProfileSettings />
            </Modal>
          )}
          {isPasswordModalOpen && (
            <Modal
              title="Change Password"
              onClose={() => setIsPasswordModalOpen(false)}
              isOpen={isPasswordModalOpen}
            >
              <PasswordManager />
            </Modal>
          )}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
