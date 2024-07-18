import React from "react";
import logo from "../images/Logo.png";
import { NavLink } from "react-router-dom";
import "../Styles/Navbar.css";

function Navbar({ profilePhotoUrl }) {
  return (
    <div className="main">
      <div className="nav">
        <div className="img">
          <NavLink to={"/"} aria-label="Home">
            <img
              className="imglogo"
              width={200}
              src={logo}
              alt="ifinance-logo"
            />
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
          <NavLink className="nav" to={"/login"}>
            <p className="tag">Login</p>
          </NavLink>
          {/* {profilePhotoUrl && <img className="profile-photo" src={profilePhotoUrl} alt="Profile" />} */}
          <button className="logout">Logout</button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
