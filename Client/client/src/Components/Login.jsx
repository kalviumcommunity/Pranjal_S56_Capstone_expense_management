import React, { useState } from "react";
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
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput.trim() === "") {
      setUserError("Username is required");
    } else {
      setUserError("");
    }
    if (password.trim() === "") {
      setPasswordError("Password is required");
    } else {
      setPasswordError("");
    }

    const loginData = {
      name: userInput,
      password: password,
    };
    axios
      .post(
        "https://pranjal-s56-capstone-expense-management-2.onrender.com/login",
        loginData
      )
      .then((res) => {
        alert(res.data);
        if(res.data === "You logged in successfully"){
          navigate("/")
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <div className="top">
        <NavLink to={"/"}>
          <img className="iconlogo" width={200} src={logo} alt="" />
        </NavLink>
      </div>
      <form className="loginpg" onSubmit={handleSubmit}>
        <h2 className="login">Login</h2>
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
      </form>
    </>
  );
}

export default Login;
