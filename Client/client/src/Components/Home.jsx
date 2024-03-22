import React from "react";
import Navbar from "./Navbar";
import "../Styles/Home.css";
import mainimg1 from "../images/mainimg.jpg";
import mainimg2 from "../images/mainimg2.jpg";
import { Link,NavLink } from "react-router-dom";


function Home() {
  return (
    <>
      <Navbar />

      <div className="container">
        <div className="content">
          <h1 className="statement">
            Streamline Your Finances, Simplify Your Life: Effortlessly Manage
            Expenses with Our Intuitive Platform.
          </h1>
          <button className="started">
            <NavLink to={"/signin"}>
              <p className="getstart">Get Started</p>
            </NavLink>
          </button>
          <p className="substatement">
            Redefine the way you manage your finances and elevate your financial
            well-being with iFinance,an expense tracking, and financial
            analysis, equipping you with the knowledge and resources needed to
            navigate today's dynamic economic landscape with confidence and
            clarity...
          </p>
        </div>
        <div className="imgs">
          <img className="mainimg1"  src={mainimg1} alt="" />
          <img className="mainimg2"  src={mainimg2} alt="" />
        </div>
      </div>
    </>
  );
}

export default Home;
