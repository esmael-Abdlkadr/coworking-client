import { FaCalendarCheck, FaClock, FaUsers } from "react-icons/fa";

function DashboardStats() {
  const stats = [
    { label: "Total Bookings", value: 24, icon: <FaCalendarCheck /> },
    { label: "Active Bookings", value: 6, icon: <FaClock /> },
    { label: "Favorite Spaces", value: 3, icon: <FaUsers /> },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-6 rounded-lg shadow-lg flex items-center gap-4"
        >
          <div className="text-4xl">{stat.icon}</div>
          <div>
            <h4 className="text-xl font-semibold">{stat.value}</h4>
            <p className="text-sm opacity-80">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashboardStats;
