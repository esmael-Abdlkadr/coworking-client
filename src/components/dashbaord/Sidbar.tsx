import { NavLink } from "react-router-dom";
import { FaHome, FaCalendarAlt, FaUserCog } from "react-icons/fa";
import React from "react";ct-icons/fi";

function Sidebar() {
  const navItems = [
    { path: "/dashboard", label: "Home", icon: <FaHome /> },
    { path: "/dashboard/bookings", label: "Bookings", icon: <FaCalendarAlt /> },
    { path: "/dashboard/settings", label: "Settings", icon: <FaUserCog /> },
 
  ];

  return (
    <aside className="w-64 bg-gradient-to-r from-indigo-600 to-purple-600 text-white h-screen hidden lg:block">
      <div className="p-6 text-center border-b border-white/20">
        <h1 className="text-3xl font-bold tracking-wide">My Dashboard</h1>
      </div>
      <nav className="mt-8 space-y-6">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 rounded-lg text-lg ${
                isActive ? "bg-white/10" : "hover:bg-white/10"
              }`
            }
          >
            {item.icon}
            <span className="ml-4">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
