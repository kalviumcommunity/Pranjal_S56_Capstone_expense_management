import React from "react";
import logo from "../images/Logo.png";
import "../Styles/Navbar.css";

function Navbar() {
  return (
    <>
      <div className="main">
        <div className="nav">
          <div className="img">
            <img width={200} src={logo} alt="" />
          </div>

          <div className="tags">
            <p className="tag">Dashboard</p>
            <p className="tag">Friends</p>
            <p className="tag">About us</p>
            <p className="tag">Login</p>

            <button className="logout">Logout</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
