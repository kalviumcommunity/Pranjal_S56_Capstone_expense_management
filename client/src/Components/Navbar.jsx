import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import logo from "../images/Logo.png";
import "../Styles/Navbar.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleLogout } from "react-google-login";

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
    // window.location.reload()
  };

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <div className="main">
      <div className="nav">
        <div className="img">
          <NavLink to={"/"} aria-label="Home">
            <img className="imglogo" width={200} src={logo} alt="ifinance-logo" />
          </NavLink>
        </div>
        <div className="tags">
          <NavLink className="nav" to={"/dashboard"}>
            <p className="tag">Dashboard</p>
          </NavLink>
          <NavLink className="nav" to={"/friends"}>
            <p className="tag">Friends</p>
          </NavLink>
          <NavLink className="nav" to={"/aboutus"}>
            <p className="tag">About us</p>
          </NavLink>
          {isLoggedIn ? (
            <>
              <button className="logout" onClick={handleLogout}>Logout</button>
              <NavLink to={"/profile"}>
                <button className="photo">
                  <img src={localStorage.getItem("profile")} alt="Profile" />
                </button>
              </NavLink>
            </>
          ) : (
            <NavLink className="nav" to={"/login"}>
              <button className="login">Login</button>
            </NavLink>
          )}
        </div>
      </div>
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
