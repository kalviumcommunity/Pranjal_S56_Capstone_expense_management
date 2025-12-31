import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const clientID = "311238508492-i7o334gljj6h57ped9mdie180691do8e.apps.googleusercontent.com"
function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("id");
      localStorage.removeItem("profile");

      toast.success("You have successfully logged out. We hope to see you again soon!");

    }
    navigate("/");
  };

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <div className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-gray-200 shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Text */}
          <div className="flex-shrink-0">
            <NavLink to={"/"} aria-label="Home">
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tighter bg-gradient-to-r from-indigo-700 to-teal-700 bg-clip-text text-transparent hover:scale-105 transition-all duration-300 drop-shadow-sm">
                iFinance
              </h1>
            </NavLink>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1 md:space-x-2">
            <NavLink
              to={"/dashboard"}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-all duration-300 ${isActive
                  ? 'bg-indigo-500 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-indigo-600'
                }`
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to={"/friends"}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-all duration-300 ${isActive
                  ? 'bg-indigo-500 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-indigo-600'
                }`
              }
            >
              Friends
            </NavLink>

            <NavLink
              to={"/aboutus"}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-all duration-300 ${isActive
                  ? 'bg-indigo-500 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-indigo-600'
                }`
              }
            >
              About us
            </NavLink>

            {isLoggedIn ? (
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={handleLogout}
                  className="px-5 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Logout
                </button>
                <NavLink to={"/profile"}>
                  <button className="w-10 h-10 rounded-full overflow-hidden border-2 border-indigo-500 hover:border-indigo-600 transition-all duration-300 hover:scale-110 shadow-md">
                    <img
                      src={localStorage.getItem("profile")}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </button>
                </NavLink>
              </div>
            ) : (
              <NavLink to={"/login"} className="ml-4">
                <button className="px-6 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-indigo-500 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                  Login
                </button>
              </NavLink>
            )}
          </div>
        </div>
      </nav>

      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default Navbar;
