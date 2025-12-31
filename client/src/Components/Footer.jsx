import React from "react";
import { SocialIcon } from "react-social-icons";

const Footer = () => {
  return (
    <footer className="bg-zinc-950 text-white mt-24 border-t border-zinc-900">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16">
          {/* Brand Section */}
          <div className="md:col-span-1 space-y-6">
            <h2 className="text-3xl font-black bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text ">
              iFinance
            </h2>
            <p className="text-zinc-400 leading-relaxed text-sm">
              The ultimate platform for modern finance tracking. Split expenses, manage transactions, and take control of your financial journey with ease and elegance.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-4 pt-2">
              <SocialIcon network="twitter" target="_blank" url="https://twitter.com/Pranjal_G25" style={{ height: 32, width: 32 }} className="hover:opacity-80 transition-opacity" />
              <SocialIcon network="instagram" target="_blank" url="https://www.instagram.com/" style={{ height: 32, width: 32 }} className="hover:opacity-80 transition-opacity" />
              <SocialIcon network="linkedin" target="_blank" url="https://www.linkedin.com/in/pranjal-gosavi-21b182292/" style={{ height: 32, width: 32 }} className="hover:opacity-80 transition-opacity" />
              <SocialIcon network="github" target="_blank" url="https://github.com/pranjal-2507" style={{ height: 32, width: 32 }} className="hover:opacity-80 transition-opacity" />
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-200 mb-6">Product</h3>
            <ul className="space-y-4">
              <li><a href="/" className="text-zinc-400 hover:text-white transition-colors text-sm">Features</a></li>
              <li><a href="/dashboard" className="text-zinc-400 hover:text-white transition-colors text-sm">Dashboard</a></li>
              <li><a href="/friends" className="text-zinc-400 hover:text-white transition-colors text-sm">Split Bills</a></li>
              <li><a href="/aboutus" className="text-zinc-400 hover:text-white transition-colors text-sm">About Us</a></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-200 mb-6">Legal</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-zinc-400 hover:text-white transition-colors text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-zinc-400 hover:text-white transition-colors text-sm">Terms of Service</a></li>
              <li><a href="#" className="text-zinc-400 hover:text-white transition-colors text-sm">Cookie Policy</a></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-200 mb-6">Support</h3>
            <ul className="space-y-4">
              <li>
                <a href="mailto:info@ifinance.com" className="text-zinc-400 hover:text-white transition-colors flex items-center text-sm">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  info@ifinance.com
                </a>
              </li>
              <li className="text-zinc-400 flex items-start text-sm">
                <svg className="w-4 h-4 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Pune, India
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-zinc-900 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-500 text-xs text-center md:text-left">
            © 2024 iFinance. Empowering your financial future.
          </p>
          <div className="flex space-x-6 text-zinc-500 text-xs">
            <span className="flex items-center">
              <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
              All Systems Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
