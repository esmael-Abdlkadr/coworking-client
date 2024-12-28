import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; // Hamburger and close icons
import Button from "./ui/Button";

interface NavbarProps {
  navs: string[];
  showButton?: boolean;
  buttonTitle?: string;
  buttonOnClick?: () => void;
  title: string;
  styles?: string;
  customElement?: React.ReactNode;
}
function Navbar({
  navs,
  showButton = true,
  buttonTitle = "Book Now",
  buttonOnClick,
  title = "Coworking",
  styles,
  customElement,
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={` bg-black/80  top-0 left-0  sticky z-50  ${styles}`}>
      {/* Navbar for large screens */}
      <div className="hidden lg:flex justify-around items-center h-[80px]">
        <h1 className="text-white text-3xl">
          <Link to="/">{title}</Link>
        </h1>
        <nav className="flex items-center gap-10 ">
          {navs.map((item, index) => (
            <NavLink
              key={index}
              to={
                item === "Home"
                  ? "/"
                  : `/${item.toLowerCase().replace(/\s+/g, "-")}`
              }
              className="text-white text-lg hover:text-primary-100 transition duration-300"
            >
              {item}
            </NavLink>
          ))}
        </nav>
        {customElement && (
          <div className="flex items-center gap-6 z-100">{customElement}</div>
        )}
        {showButton && <Button title={buttonTitle} onClick={buttonOnClick} />}
      </div>

      {/* Hamburger Menu for Small Screens */}
      <div className="lg:hidden flex justify-between items-center px-6 py-4">
        <h1 className="text-white text-2xl">{title}</h1>

        <button onClick={toggleMenu} className="text-white text-3xl z-50">
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 flex justify-center items-center bg-black transition-transform duration-500 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="w-[300px] h-[500px] bg-[#1f2937] rounded-lg p-8 flex flex-col items-center gap-8">
          {navs.map((item, index) => (
            <NavLink
              key={index}
              to={
                item === "Home"
                  ? "/"
                  : `/${item.toLowerCase().replace(/\s+/g, "-")}`
              }
              className="text-white text-2xl hover:text-primary-100 transition duration-300"
              onClick={closeMenu}
            >
              {item}
            </NavLink>
          ))}
          {showButton && (
            <Button
              title={buttonTitle}
              onClick={() => navigate("/dashboard/booking/new")}
            />
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
