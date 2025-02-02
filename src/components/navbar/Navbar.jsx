import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { toast } from 'react-hot-toast';

const Navbar = ({ authenticated, setAuthenticated }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setAuthenticated(true);  
    }
  }, []);
  

const handleLogout = () => {
   
  toast((t) => (
    <div className="p-4 flex flex-col items-center space-y-4">
      <p className="text-lg font-semibold">Are you sure you want to sign out?</p>
      <div className="flex space-x-4">
        <button
          onClick={() => {
            setAuthenticated(false);
            localStorage.removeItem("user");
            navigate("/login");
            toast.dismiss(t.id);  
          }}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
        >
          Confirm
        </button>
        <button
          onClick={() => toast.dismiss(t.id)}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 focus:outline-none"
        >
          Cancel
        </button>
      </div>
    </div>
  ));
  
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
        <FaUser size={12} />
        <span className="text-[10px] font-bold">Logout</span>
      </button>
    ) : (
      <NavLink
        to="/login"
        className="flex flex-col items-center gap-1 border-2 border-white rounded-full p-2 transition-all duration-300 hover:border-[#fad9b3] hover:text-[#fad9b3]"
      >
        <FaUser size={12} />
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
            {isMenuOpen ? (
              <AiOutlineClose size={21} />
            ) : (
              <AiOutlineMenu size={21} />
            )}
          </button>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            {["Home", "About", "Services"].map((item) => (
              <NavLink
                key={item.toLowerCase()}
                to={`/${item.toLowerCase()}`}
                className={({ isActive }) =>
                  `block w-full text-center p-2 border-b border-[#013238] 
      ${
        isActive
          ? "bg-[#013238] text-[#fad9b3]"
          : "hover:bg-[#013238] hover:text-[#fad9b3]"
      }`
                }
                onClick={() => setMenuOpen(false)}
              >
                {item}
              </NavLink>
            ))}

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
