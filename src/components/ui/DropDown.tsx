import { useState } from "react";
import { FaUserCircle, FaSignOutAlt, FaUserCog } from "react-icons/fa";
import { FiKey } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
interface DropdownProps {
  setIsProfileModalOpen: (value: boolean) => void;
  setIsPasswordModalOpen: (value: boolean) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  setIsPasswordModalOpen,
  setIsProfileModalOpen,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  // const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  // const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const navigate = useNavigate();
  const toggleDropdown = () => setIsOpen(!isOpen);
  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 text-white text-lg"
      >
        <FaUserCircle size={20} />
        <span>User</span>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
          <button
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
            onClick={() => setIsProfileModalOpen(true)}
          >
            <FaUserCog className="inline-block mr-2" /> Manage Profile
          </button>
          <button
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
            onClick={() => setIsPasswordModalOpen(true)}
          >
            <FiKey className="inline-block mr-2" /> Change Password
          </button>
          <button
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
            onClick={() => {
              navigate("/login");
            }}
          >
            <FaSignOutAlt className="inline-block mr-2" /> Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
