import React, { useState } from 'react';
import "../Styles/Login.css";
import logo from "../images/Logo.png";
import { NavLink, useNavigate } from 'react-router-dom';

function Login() {
  const [userInput, setUserInput] = useState("");
  const [password, setPassword] = useState("");
  const [userError, setUserError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [message, setMessage] = useState(""); // New state for displaying messages
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
    
    if (userInput.trim() !== "" && password.trim() !== "") {
      // Perform login logic here
      setMessage("You have logged in successfully!");
      navigate("/");
    } else {
      setMessage("Please fill both fields.");
    }
  };

  return (
    <>
      <div className="top">
        <NavLink to={"/"}><img className="iconlogo" width={200} src={logo} alt="" /></NavLink>
      </div>
      <form className='loginpg' onSubmit={handleSubmit}>
        <h2 className='login'>Login</h2>
        <div className="page">
          <label className='labeling'>Username:
            <div>
              <input
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className='inbox'
                type="text"
                placeholder="Enter your name"
              />
            </div>
          </label>
          {userError && <div className="error">{userError}</div>}
          <label className='labeling'>Password:
            <div>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='inbox'
                type="password"
                placeholder="Enter your password"
              />
            </div>
          </label>
          {passwordError && <div className="error">{passwordError}</div>}
        </div>
        <button className='loginBtn'>Login</button>
        {message && <div className="message">{message}</div>} {/* Rendering the message */}
      </form>
    </>
  );
}

export default Login;
