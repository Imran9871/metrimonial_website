import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import TopSafetyMarquee from "./Disclaimer/TopSafetyMarquee";
import GoogleTranslate from "./GoogleTranslate";
import { useAuth } from "../context/AuthContext";

// Added Globe icon
import {
  Menu,
  X,
  ChevronRight,
  LogOut,
  User,
  LayoutDashboard,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Our Plans", path: "/pricing" },
    { name: "Find Your Soulmate", path: "/MatrimonyFilter" },
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/login");
    setIsOpen(false);
    setDropdownOpen(false);
  };

  const getLinkStyle = (path) =>
    location.pathname === path
      ? "text-white bg-[var(--color-primary)]"
      : "text-[var(--text-primary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-primary-2)]";

  return (
    <>
      <nav
        className="fixed w-full top-0 z-50 border-b bg-[var(--bg-card)] border-[var(--border)] shadow-[var(--shadow-card)]"
        style={{ fontFamily: "var(--ff-primary)" }}
      >
        <TopSafetyMarquee />
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img className="h-10 w-auto" src="/logoo.png" alt="Logo" />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-2">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-4 py-2 rounded-[var(--radius-sm)] transition-all duration-300 font-[var(--fw-medium)] ${getLinkStyle(link.path)}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center gap-4">
            {/* --- LANGUAGE SUPPORT --- */}
            <GoogleTranslate />

            {!user ? (
              // <Link
              //   to="/login"
              //   className="px-6 py-2 bg-[var(--color-primary)] text-white rounded-[var(--radius-md)] hover:brightness-110 transition shadow-md"
              // >
              //   Login
              // </Link>
              <div className="flex items-center gap-3">
                {" "}
                {/* Added a container for both buttons */}
                <Link
                  to="/login"
                  className="px-6 py-2 bg-[var(--color-primary)] text-white rounded-full hover:brightness-110 transition shadow-md font-bold text-sm"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-6 py-2 bg-[#d64a5b] text-white rounded-full hover:bg-[#c23e4e] transition shadow-md font-bold text-sm whitespace-nowrap"
                >
                  Register for Free
                </Link>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-10 h-10 rounded-full cursor-pointer bg-[var(--color-primary)] text-white flex items-center justify-center font-bold border-2 border-[var(--color-base)]"
                >
                  {user.displayName
                    ? user.displayName[0].toUpperCase()
                    : user.email[0].toUpperCase()}
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-3 w-48 bg-white border border-[var(--border)] shadow-[var(--shadow-hover)] rounded-[var(--radius-md)] overflow-hidden z-50"
                    >
                      <Link
                        to="/connection"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-3 hover:bg-[var(--bg-soft)] text-[var(--text-primary)]"
                      >
                        <LayoutDashboard size={18} /> Dashboard
                      </Link>
                      <Link
                        to="/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-3 hover:bg-[var(--bg-soft)] text-[var(--text-primary)]"
                      >
                        <User size={18} /> Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-3 hover:bg-red-50 text-[var(--error)] font-bold border-t"
                      >
                        <LogOut size={18} /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Mobile Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-[var(--text-primary)] hover:bg-[var(--bg-soft)] rounded-full transition"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="md:hidden fixed inset-0 top-22.5 bg-[var(--bg-main)] z-40 flex flex-col p-6"
            >
              <div className="flex flex-col gap-3">
                <p className="text-[var(--text-light)] text-xs uppercase tracking-widest font-bold mb-2">
                  Navigation
                </p>
                {links.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex justify-between items-center py-4 px-5 rounded-[var(--radius-md)] text-[var(--fs-h6)] font-[var(--fw-semibold)] transition-all ${getLinkStyle(link.path)}`}
                  >
                    {link.name} <ChevronRight size={18} />
                  </Link>
                ))}

                {/* Mobile Language Selector */}
                {/* Mobile Language Selector (Dropdown Style) */}
                <GoogleTranslate />
              </div>

              <div className="mt-auto pb-10">
                {!user ? (
                  // <Link
                  //   to="/login"
                  //   onClick={() => setIsOpen(false)}
                  //   className="w-full block py-4 text-center bg-[var(--color-primary)] text-white rounded-[var(--radius-md)] font-bold text-lg shadow-lg"
                  // >
                  //   Login to Account
                  // </Link>

                  <div className="flex items-center gap-3">
                    {/* Added a container for both buttons */}
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="px-6 py-2 bg-[var(--color-primary)] text-white rounded-full hover:brightness-110 transition shadow-md font-bold text-sm"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsOpen(false)}
                      className="px-6 py-2 bg-[#d64a5b] text-white rounded-full hover:bg-[#c23e4e] transition shadow-md font-bold text-sm whitespace-nowrap"
                    >
                      Register for Free
                    </Link>
                  </div>
                ) : (
                  <div className="bg-[var(--bg-card)] p-4 rounded-[var(--radius-lg)] border border-[var(--border)] shadow-sm">
                    <div className="flex items-center gap-3 mb-4 p-2">
                      <div className="w-12 h-12 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-xl font-bold">
                        {user.email[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="font-bold text-[var(--text-primary)]">
                          {user.displayName || "User"}
                        </p>
                        <p className="text-xs text-[var(--text-light)]">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        to="/dashboard"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-center gap-2 py-3 bg-[var(--bg-soft)] rounded-[var(--radius-sm)] text-sm font-medium"
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/profile"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-center gap-2 py-3 bg-[var(--bg-soft)] rounded-[var(--radius-sm)] text-sm font-medium"
                      >
                        Profile
                      </Link>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full mt-3 py-3 text-center text-[var(--error)] font-bold border-t border-[var(--border)] pt-4 flex items-center justify-center gap-2"
                    >
                      <LogOut size={18} /> Logout
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
