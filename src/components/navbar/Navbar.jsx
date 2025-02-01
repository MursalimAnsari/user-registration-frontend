import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FaUser } from "react-icons/fa";

const Navbar = ({ authenticated, setAuthenticated }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to sign out?");
    if (confirmLogout) {
      setAuthenticated(false);
      localStorage.removeItem("user");
    }
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 relative transition-all duration-300 ease-in-out ${
      isActive ? "text-[#fad9b3] font-bold" : "text-white font-bold"
    } hover:text-[#fad9b3] after:block after:content-[''] after:h-[2px] 
    after:w-0 after:bg-[#02474d] after:transition-all after:duration-300 hover:after:w-full`;

  const renderAuthLinks = () => {
    return authenticated ? (
      <button
        onClick={handleLogout}
        className="flex flex-col items-center gap-1 border-2 border-white rounded-full p-2 transition-all duration-300 hover:border-[#fad9b3] hover:text-[#fad9b3]"
      >
        <FaUser size={15} />
        <span className="text-[10px] font-bold">Logout</span>
      </button>
    ) : (
      <NavLink
        to="/login"
        className="flex flex-col items-center gap-1 border-2 border-white rounded-full p-2 transition-all duration-300 hover:border-[#fad9b3] hover:text-[#fad9b3]"
      >
        <FaUser size={15} />
        <span className="text-[10px] font-bold">Sign In</span>
      </NavLink>
    );
  };

  return (
    <nav className="bg-[#02474d] text-white sticky top-0 z-50">
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between">
          <NavLink to="/" className={navLinkClass}>
            <h1 className="text-lg">MyApp</h1>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex flex-1 items-center ml-6">
            <div className="flex gap-6 flex-grow">
              {["Home", "About", "Services"].map((item) => (
                <NavLink
                  key={item.toLowerCase()}
                  to={`/${item.toLowerCase()}`}
                  className={navLinkClass}
                >
                  {item}
                </NavLink>
              ))}
            </div>

            <div className="flex items-center ml-auto gap-4">
              {renderAuthLinks()}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-white hover:bg-[#013238] focus:outline-none focus:ring-2 focus:ring-[#fad9b3]"
          >
            {isMenuOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            {["Home", "About", "Services"].map((item) => (
              <NavLink
                key={item.toLowerCase()}
                to={`/${item.toLowerCase()}`}
                className="block w-full text-center p-2 border-b border-[#013238] hover:bg-[#013238]"
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </NavLink>
            ))}

            {/* Mobile Authentication Buttons (Vertically Aligned) */}
            <div className="pt-4 border-t border-[#013238] flex justify-center">
              {renderAuthLinks()}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
