import React from "react";
import Layout from "./Layout";
import "../Styles/Home.css";
import mainimg1 from "../images/mainimg.jpg";
import mainimg2 from "../images/mainimg2.jpg";
import { NavLink } from "react-router-dom";
import Footer from "./Footer";
import { RiDashboardFill } from "react-icons/ri";
import { FaUserFriends } from "react-icons/fa";
import { FcAbout } from "react-icons/fc";

function Home() {
  return (
    <Layout>
      <div className="container">
        <div className="content">
          <h1 className="statement">
            Streamline Your Finances, Simplify Your Life: Effortlessly Manage
            Expenses with Our Intuitive Platform.
          </h1>
          <button className="started">
            <NavLink className="nave" to={"/signin"}>
              <p className="getstart">EXPLORE</p>
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
          <img className="mainimg1" src={mainimg1} alt="" />
          <img className="mainimg2" src={mainimg2} alt="" />
        </div>
      </div>
      <div className="working">
        <h1>How it Works?</h1>
        <div className="contain">
          <div className="box">
            <h2 style={{ fontSize: "24px" }}>
              <RiDashboardFill />
              <br />
              Dashboard
            </h2>
            <p>
              Our intuitive dashboard provides a comprehensive overview of your
              expenses. Track your spending habits, view transaction history,
              and gain insights into your financial activities.
            </p>
            <p>
              Visualize your expenses through interactive tables, diagrams, and
              pie charts. Analyze your expenditure patterns and make informed
              financial decisions.
            </p>
          </div>
          <div className="box">
            <h2 style={{ fontSize: "24px" }}>
              <FaUserFriends /> <br />
              Friends Section
            </h2>
            <p>
              Easily manage shared expenses with friends and family. Keep track
              of money owed and payments made among your social circle.
            </p>
            <p>
              Collaborate on expenses, split bills seamlessly, and ensure
              everyone stays on top of their financial commitments.
            </p>
          </div>
          <div className="box">
            <h2 style={{ fontSize: "24px" }}>
              <FcAbout /> <br />
              About Us
            </h2>
            <p>
              Learn more about iFinance and our mission to revolutionize expense
              management.
            </p>
            <p>
              Discover our commitment to providing innovative solutions for
              businesses and individuals alike.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
}

export default Home;
