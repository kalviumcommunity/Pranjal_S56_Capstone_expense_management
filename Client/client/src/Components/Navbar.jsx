import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import logo from "../images/Logo.png";
import "../Styles/Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  console.log(localStorage.getItem("profile"))
   const handleLogout = () => {
    window.confirm("Are you sure you want to log out?")
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("id");
    setIsLoggedIn(false);
    
    alert("You have successfully logged out of Expense Manager. We hope to see you again soon to keep track of your finances!");
    navigate("/login");
  };

  const isLoggedIn = !!localStorage.getItem("token");

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
          {isLoggedIn ? (
            <button className="logout" onClick={handleLogout}>Logout</button>
          ) : (
            <NavLink className="nav" to={"/login"}>
              <button className="login">Login</button>
            </NavLink>
          )}

          {isLoggedIn && <NavLink to={"/profile"}><button className="photo"><img src={localStorage.getItem("profile")} alt="hello" /></button></NavLink>}
          
        </div>
      </div>
          
    </div>
  );
}

export default Navbar;
