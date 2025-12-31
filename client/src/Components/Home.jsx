import React from "react";
import Layout from "./Layout";
import mainimg1 from "../images/mainimg.png";
import mainimg2 from "../images/mainimg2.png";
import { NavLink } from "react-router-dom";
import Footer from "./Footer";
import { RiDashboardFill } from "react-icons/ri";
import { FaUserFriends } from "react-icons/fa";
import { FcAbout } from "react-icons/fc";

function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-slide-up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight">
                <span className="bg-gradient-to-r from-indigo-700 via-purple-700 to-teal-700 bg-clip-text text-transparent drop-shadow-sm">
                  Streamline Your Finances,
                </span>
                <br />
                <span className="text-gray-900 drop-shadow-sm">
                  Simplify Your Life
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl">
                Effortlessly manage expenses with our intuitive platform. Redefine the way you manage your finances and elevate your financial well-being with iFinance.
              </p>

              <NavLink to={"/login"}>
                <button className="group px-10 py-5 rounded-xl font-bold text-white text-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600 hover:from-indigo-700 hover:via-purple-700 hover:to-teal-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 animate-gradient bg-[length:200%_200%] mb-12">
                  <span className="flex items-center">
                    EXPLORE NOW
                    <svg className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>
              </NavLink>

              <p className="text-gray-500 leading-relaxed">
                An expense tracking and financial analysis platform, equipping you with the knowledge and resources needed to navigate today's dynamic economic landscape with confidence and clarity.
              </p>
            </div>

            {/* Right Images */}
            <div className="relative h-96 md:h-[500px] lg:h-[600px] animate-fade-in">
              <div className="absolute top-0 right-0 w-3/4 h-3/4 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <img
                  src={mainimg1}
                  alt="Finance Dashboard"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 left-0 w-2/3 h-2/3 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500 z-10">
                <img
                  src={mainimg2}
                  alt="Expense Tracking"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative Elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* How it Works Section */}
      <div className="bg-gradient-to-br from-gray-100 to-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-800">
            How it Works?
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto mb-16 rounded-full"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Dashboard Card */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
              <div className="text-5xl mb-6 text-primary-600 flex justify-center transform group-hover:scale-110 transition-transform duration-300">
                <RiDashboardFill />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                Dashboard
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Our intuitive dashboard provides a comprehensive overview of your expenses. Track your spending habits, view transaction history, and gain insights into your financial activities.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Visualize your expenses through interactive tables, diagrams, and pie charts. Analyze your expenditure patterns and make informed financial decisions.
              </p>
            </div>

            {/* Friends Section Card */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
              <div className="text-5xl mb-6 text-secondary-600 flex justify-center transform group-hover:scale-110 transition-transform duration-300">
                <FaUserFriends />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                Friends Section
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Easily manage shared expenses with friends and family. Keep track of money owed and payments made among your social circle.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Collaborate on expenses, split bills seamlessly, and ensure everyone stays on top of their financial commitments.
              </p>
            </div>

            {/* About Us Card */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
              <div className="text-5xl mb-6 flex justify-center transform group-hover:scale-110 transition-transform duration-300">
                <FcAbout />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                About Us
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Learn more about iFinance and our mission to revolutionize expense management.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Discover our commitment to providing innovative solutions for businesses and individuals alike.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </Layout>
  );
}

export default Home;
