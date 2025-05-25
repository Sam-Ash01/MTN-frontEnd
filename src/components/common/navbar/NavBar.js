import React, { useState }  from "react";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import { FaMoon, FaUser, FaGlobe } from "react-icons/fa";
const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="h-16 flex items-center justify-between px-7 py-1 bg-[var(--color-bg)] shadow-md w-full">
      {/* Left: Logo and Home */}
      <div className="flex items-center space-x-6">
        <div className="">
          <img
            src="/assets/img/mtn-logo.svg" // place your MTN logo in public/logo.png
            alt="Logo"
            className="w-12 h-14 object-contain"
          />
        </div>
        {/* <span className="text-xl font-semibold text-[#2c3567] hidden sm:inline">Home</span> */}
      </div>

      {/* Middle: Search bar */}
      <div className="flex-1 max-w-md mx-4">
        <div className="flex items-center bg-[#f5f7fa] rounded-full px-4 py-2">
          <FiSearch className="text-[#5f6e94] mr-2" />
          <input
            type="text"
            placeholder="Search for inquiry"
            className="bg-transparent outline-none w-full text-sm text-[#5f6e94]"
          />
        </div>
      </div>

      {/* Right: Icons */}
      <div className="hidden md:flex items-center space-x-6">
        <FaMoon className="text-[var(--color-dark-gray)] hover:text-[var(--color-primary)] cursor-pointer" />
        <FaUser className="text-[var(--color-dark-gray)] hover:text-[var(--color-primary)] cursor-pointer" />
        <FaGlobe className="text-[var(--color-dark-gray)] hover:text-[var(--color-primary)] cursor-pointer" />
      </div>

      {/* Mobile: Menu icon */}
      <div className="md:hidden">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Dropdown menu */}
        {menuOpen && (
          <div className="absolute top-16 right-7 bg-white shadow-md rounded-md p-4 space-y-4">
            <FaMoon className="text-[var(--color-dark-gray)] hover:text-[var(--color-primary)] cursor-pointer" />
            <FaUser className="text-[var(--color-dark-gray)] hover:text-[var(--color-primary)] cursor-pointer" />
            <FaGlobe className="text-[var(--color-dark-gray)] hover:text-[var(--color-primary)] cursor-pointer" />
          </div>
        )}
        </div>
    </header>
  );
};

export default NavBar
