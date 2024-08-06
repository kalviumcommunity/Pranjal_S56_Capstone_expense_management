import React, { useState, useEffect } from "react";
import "../Styles/Login.css";
import logo from "../images/Logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [userInput, setUserInput] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userInput.trim() === "") {
      toast.error("Username is required");
      return;
    }
    if (password.trim() === "") {
      toast.error("Password is required");
      return;
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
          localStorage.setItem("profile", res.data.profile);
          toast.success("Login successful");
          setIsLoggedIn(true);
        } else {
          toast.error("User not found. Please create an account.");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("An error occurred. Please try again.");
      });
      navigate("/");
  };

  return (
    <>
      <div className="top">
        <NavLink to={"/"}>
          <img className="iconlogo" width={200} src={logo} alt="Logo" />
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
          </div>
          <button className="loginBtn">Login</button>
          <p className="register-link">
            Don't have an account?{" "}
            <NavLink to="/signin" className="navsign">
              Register
            </NavLink>
          </p>
        </form>
      )}
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
    </>
  );
}

export default Login;
