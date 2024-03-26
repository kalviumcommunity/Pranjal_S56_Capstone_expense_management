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
        <label className="labels">Username: <div><input className="inpbox" type="text" placeholder="Enter your name" /></div></label>
        <label className="labels">Email Id: <div><input className="inpbox" type="text" placeholder="Enter valid Email Id" /></div></label>
        <label className="labels">Password: <div><input className="inpbox" type="password" placeholder="Enter your password" /></div></label>
        <label className="labels">Confirm Password: <div><input className="inpbox" type="password" placeholder="Confirm password" /></div></label>
      
        </form>
    </>
  );
}

export default Signup;
