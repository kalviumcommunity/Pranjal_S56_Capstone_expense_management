import React from "react";
import logo from "../images/Logo.png";
import "../Styles/Signup.css";

function Signup() {
  return (
    <>
      <div className="top">
        <img className="iconlogo" width={200} src={logo} alt="" />
      </div>
      <form className="signupbox">
     
        
        <h2>Sign Up</h2>
        <label >Username: <input type="text" placeholder="Enter your name" /></label>
        <label >Email Id: <input type="text" placeholder="Enter valid Email Id" /></label>
        <label >Password: <input type="password" placeholder="Enter your password" /></label>
        <label >Confirm Password: <input type="password" placeholder="Confirm password" /></label>
      
        </form>
    </>
  );
}

export default Signup;
