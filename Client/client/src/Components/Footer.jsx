import React from "react";
import "../Styles/Footer.css";
import { SocialIcon } from "react-social-icons";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section about">
            <h2>Simplify Your Finances, Amplify Your Life</h2>
            <p className="text">
              iFinance leads the industry in providing comprehensive expense
              management solutions for businesses. Our intuitive platform
              simplifies expense tracking, enhances financial visibility, and
              drives efficiency. With customizable reporting and seamless
              integration capabilities, we empower businesses to make informed
              decisions and optimize resources effectively. Join us and
              experience the difference in managing expenses efficiently and
              effectively.
            </p>
            <div className="icons">
              <SocialIcon
                network="twitter"
                target="_blank"
                url="https://twitter.com/Pranjal_G25"
                aria-label="Twitter"
              />
              <SocialIcon
                network="instagram"
                target="_blank"
                url="https://www.instagram.com/"
                aria-label="Instagram"
              />
              <SocialIcon
                network="linkedin"
                target="_blank"
                url="https://www.linkedin.com/in/pranjal-gosavi-21b182292/"
                aria-label="LinkedIn"
              />
              <SocialIcon
                network="facebook"
                target="_blank"
                url="https://www.facebook.com/"
                aria-label="Facebook"
              />
            </div>

            <p>© 2024 iFinance. All rights reserved.</p>
          </div>
          <div className="footer-section links">
            <h2>Quick Links</h2>
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Services</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>
          <div className="footer-section contact">
            <h2>Contact Us</h2>
            <ul>
              <li>
                <a href="#">+1 (123) 456-7890</a>
              </li>
              <li>
                <a href="#">info@ifinance.com</a>
              </li>
              <li>Pune, Maharashtra 411001</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
