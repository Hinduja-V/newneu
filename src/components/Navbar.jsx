import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = ({ user, handleLogin, handleLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (id) => {
    setIsMenuOpen(false);

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full bg-gradient-to-r from-white via-blue-50 to-white backdrop-blur-md border-b border-gray-200 text-slate-800 shadow-sm">

      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3">

        {/* Logo */}
        <div
          className="text-xl font-bold cursor-pointer text-blue-600"
          onClick={() => navigate("/")}
        >
          MindCare AI
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center text-sm">

          <Link
            to="/"
            className={isActive("/") ? "text-blue-500 font-semibold" : "hover:text-blue-500"}
          >
            Home
          </Link>

          <Link
            to="/dashboard"
            className={isActive("/dashboard") ? "text-blue-500 font-semibold" : "hover:text-blue-500"}
          >
            Dashboard
          </Link>

          <button onClick={() => scrollToSection("explore")} className="hover:text-blue-500">
            Explore
          </button>

          <button onClick={() => scrollToSection("about")} className="hover:text-blue-500">
            About Us
          </button>

          <Link
            to="/chat"
            className={isActive("/chat") ? "text-blue-500 font-semibold" : "hover:text-blue-500"}
          >
            AI Chat
          </Link>

          <Link
            to="/sos"
            className={isActive("/sos") ? "text-blue-500 font-semibold" : "hover:text-blue-500"}
          >
            SOS
          </Link>

        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center gap-4 relative">

          {user ? (
            <>
              <img
                src={user.photoURL}
                alt="Profile"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-9 h-9 rounded-full cursor-pointer border border-gray-300 hover:scale-105 transition"
              />

              {isProfileOpen && (
                <div className="absolute right-0 top-12 w-44 bg-white shadow-lg rounded-lg border p-2 space-y-1 z-50">

                  <a href="/profile" className="block px-3 py-2 rounded hover:bg-gray-100">
                    Profile
                  </a>

                  <a href="/settings" className="block px-3 py-2 rounded hover:bg-gray-100">
                    Settings
                  </a>

                  <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-100">
                    Theme
                  </button>

                  <hr />

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-red-500 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <button
              onClick={handleLogin}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Login
            </button>
          )}

        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden text-2xl">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>☰</button>
        </div>

      </div>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="md:hidden p-4 space-y-3 bg-white border-t border-gray-200">

          <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>

          <button onClick={() => scrollToSection("explore")}>Explore</button>
          <button onClick={() => scrollToSection("about")}>About Us</button>

          <Link to="/chat" onClick={() => setIsMenuOpen(false)}>AI Chat</Link>
          <Link to="/sos" onClick={() => setIsMenuOpen(false)}>SOS</Link>

          <hr />

          {user ? (
            <>
              <a href="/profile">Profile</a>
              <a href="/settings">Settings</a>
              <button onClick={handleLogout} className="text-red-500">
                Logout
              </button>
            </>
          ) : (
            <button onClick={handleLogin} className="text-blue-500">
              Login
            </button>
          )}

        </div>
      )}
    </nav>
  );
};

export default Navbar;