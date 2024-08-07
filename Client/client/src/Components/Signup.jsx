import React, { useState } from "react";
import logo from "../images/Logo.png";
import "../Styles/Signup.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";

const clientID = "311238508492-i7o334gljj6h57ped9mdie180691do8e.apps.googleusercontent.com";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userNameRegex = /^[A-Za-z ]+$/;
    const emailRegex = /^[a-z][a-z0-9]*@gmail\.com$/;

    if (!userNameRegex.test(username)) {
      toast.error("Username can only contain alphabets");
    } else if (!emailRegex.test(email)) {
      toast.error("The email should contain at least one alphabet");
    } else if (password !== confirmPass) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name: username,
        email: email,
        password: password,
      };

      axios
        .post("http://localhost:3000/register", userData)
        .then((res) => {
          toast.success(res.data);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          toast.error("An error occurred. Please try again.");
        });
    }
  };

  const onSuccess = (res) => {
    console.log("LOGIN SUCCESS! Current User: ", res.profileObj);
    toast.success("Google Signup Successful!");
    setIsLoggedIn(true);
    
    setTimeout(() => {
      
      navigate("/"); // Navigate to the home page
    }, 2000);
  };

  const onFailure = (res) => {
    console.log("LOGIN FAILED! res: ", res);
    toast.error("Google Signup Failed. Please try again.");
  };

  const onLogoutSuccess = () => {
    setIsLoggedIn(false);
    toast.success("Logout Successful!");
    console.log("LOGOUT SUCCESS!");
  };

  return (
    <>
      <div className="top">
        <NavLink to={"/"}>
          <img className="iconlogo" width={200} src={logo} alt="Logo" />
        </NavLink>
      </div>
      <form className="signupbox" onSubmit={handleSubmit}>
        <h2 className="signuphead">Sign Up</h2>
        <label className="labels">
          Username:
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
          Email Id:
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
          Password:
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
          Confirm Password:
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
        <button className="signin">Sign Up</button>

        <p className="login-link">
          Already have an account?{" "}
          <NavLink to="/login" className="navlog">
            Login
          </NavLink>
        </p>
        {!isLoggedIn ? (
          <GoogleLogin
            clientId={clientID}
            buttonText="Sign up with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={"single_host_origin"}
          />
        ) : (
          <GoogleLogout
            clientId={clientID}
            buttonText="Logout"
            onLogoutSuccess={onLogoutSuccess}
          />
        )}
      </form>
      <ToastContainer
        position="top-center"
        autoClose={1500}
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

export default Signup;
