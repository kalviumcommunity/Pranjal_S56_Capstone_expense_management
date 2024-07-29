import React, { useState, useEffect } from "react";
import "../Styles/Login.css";
import logo from "../images/Logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [userInput, setUserInput] = useState("");
  const [password, setPassword] = useState("");
  const [userError, setUserError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userInput.trim() === "") {
      setUserError("Username is required");
      return;
    } else {
      setUserError("");
    }
    if (password.trim() === "") {
      setPasswordError("Password is required");
      return;
    } else {
      setPasswordError("");
    }

    const loginData = {
      name: userInput,
      password: password,
    };
    axios
      .post("http://localhost:3000/login", loginData)
      .then((res) => {
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", loginData.name);
          localStorage.setItem("id", res.data.id);

          console.log(res.data);
          alert(res.data.message);
          setIsLoggedIn(true);

          navigate("/");
        } else {
          alert("User not found. Please create an account.");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // const handleLogout = () => {
  //   window.confirm("Are you sure you want to log out?")
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("user");
  //   localStorage.removeItem("id");
  //   setIsLoggedIn(false);
    
  //   alert("You have successfully logged out of Expense Manager. We hope to see you again soon to keep track of your finances!");
  //   navigate("/login");
  // };

  return (
    <>
      <div className="top">
        <NavLink to={"/"}>
          <img className="iconlogo" width={200} src={logo} alt="" />
        </NavLink>
       
      </div>
      {!isLoggedIn && (
        <form className="loginpg" onSubmit={handleSubmit}>
          <h2 className="Login">Login</h2>
          <div className="page">
            <label className="labeling">
              Username:
              <div>
                <input
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="inbox"
                  type="text"
                  placeholder="Enter your name"
                />
              </div>
            </label>
            {userError && <div className="error">{userError}</div>}
            <label className="labeling">
              Password:
              <div>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="inbox"
                  type="password"
                  placeholder="Enter your password"
                />
              </div>
            </label>
            {passwordError && <div className="error">{passwordError}</div>}
          </div>
          <button className="loginBtn">Login</button>
          {message && <div className="message">{message}</div>}

          <p className="register-link">
            Don't have an account?{" "}
            <NavLink to="/signin" className={"navsign"}>
              Register
            </NavLink>
          </p>
        </form>
      )}
    </>
  );
}

export default Login;
