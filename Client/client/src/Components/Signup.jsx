import React, { useState } from "react";
import logo from "../images/Logo.png";
import "../Styles/Signup.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userNameRegex = /^[A-Za-z ]+$/;
    const emailRegex = /^[a-z][a-z0-9]*@gmail\.com$/;
    if (!userNameRegex.test(username)){
      alert("Username can only contain alphabets")
    }
    else if(!emailRegex.test(email)){
      alert("The email should contain atleast one alphabet")
    }
    else if (password !== confirmPass) {
      alert("Passwords do not match");
    } 
    else {
      const userData = {
        name: username,
        email: email,
        password: password,
      };
    

      axios
        .post("https://pranjal-s56-capstone-expense-management-7.onrender.com/register", userData)
        .then((res) => {
          alert(res.data);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <div className="top">
        <NavLink to={"/"}>
          <img className="iconlogo" width={200} src={logo} alt="" />
        </NavLink>
      </div>
      <form className="signupbox" onSubmit={handleSubmit}>
        <h2 className="signuphead">Sign Up</h2>
        <label className="labels">
          Username:{" "}
          <div>
            
            <input
              required
              className="inpbox"
              type="text"
              placeholder="Enter your name"
              value={username}
              
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </label>
        <label className="labels">
          Email Id:{" "}
          <div>
            <input
              required
              className="inpbox"
              type="email"
              placeholder="Enter valid Email Id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </label>
        <label className="labels">
          Password:{" "}
          <div>
            <input
              required
              className="inpbox"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </label>
        <label className="labels">
          Confirm Password:{" "}
          <div>
            <input
              required
              className="inpbox"
              type="password"
              placeholder="Confirm password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
            />
          </div>
        </label>
        {error && <div className="error">{error}</div>}
        <button className="signin">Sign Up</button>
        <p className="login-link">
          Already have an account?{" "}
          <NavLink to="/login" className={"navlog"}>
            Login
          </NavLink>
        </p>
      </form>
    </>
  );
}
export default Signup;
