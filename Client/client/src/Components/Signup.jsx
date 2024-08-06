import React, { useState, useEffect } from "react";
import logo from "../images/Logo.png";
import "../Styles/Signup.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [googleAuth, setGoogleAuth] = useState(null)
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

  useEffect(() => {
    const initGoogleSignIn = () => {
        window.gapi.load('auth2', () => {
            const auth2 = window.gapi.auth2.init({
                client_id:'311238508492-i7o334gljj6h57ped9mdie180691do8e.apps.googleusercontent.com',
                scope: 'email',
            });
            setGoogleAuth(auth2); 
        });
    };

    initGoogleSignIn();
}, []);

const handleGoogleLogin = async () => {
    try {
        const googleUser = await googleAuth.signIn();
        const profile = googleUser.getBasicProfile();
        const email = profile.getEmail();
        console.log('Logged in with Google:', email);
    } catch (error) {
        if (error.error === 'popup_closed_by_user') {
            console.log('Google sign-in popup was closed by the user.');
        } else {
            console.error('Google login failed:', error);
        }
    }
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
        <button className="googlelogin" onClick={handleGoogleLogin}>Sign up with Google</button>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={5000}
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
