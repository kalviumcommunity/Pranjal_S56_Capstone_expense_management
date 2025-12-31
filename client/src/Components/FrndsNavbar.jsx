import React from "react";
import { BsPersonFillAdd } from "react-icons/bs";
import { FaWallet } from "react-icons/fa6";
import { FiShare } from "react-icons/fi";


function FrndsNavbar({
  setShowFriendsList,
  setShowExpenses,
  setShowTransactions,
  activeTab
}) {
  return (
    <div className="bg-white shadow-md border-b border-gray-200 mb-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-center space-x-4 py-4">
          <button
            onClick={() => {
              setShowFriendsList(true);
              setShowExpenses(false);
              setShowTransactions(false);
            }}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 group ${activeTab === "friends"
                ? "text-purple-600 bg-purple-50 shadow-sm"
                : "text-gray-700 hover:text-purple-600 hover:bg-purple-50"
              }`}
          >
            <BsPersonFillAdd className={`text-xl transition-transform duration-300 group-hover:scale-110 ${activeTab === "friends" ? "scale-110" : ""
              }`} />
            <span>FRIENDS</span>
          </button>

          <button
            onClick={() => {
              setShowFriendsList(false);
              setShowExpenses(true);
              setShowTransactions(false);
            }}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 group ${activeTab === "expenses"
                ? "text-purple-600 bg-purple-50 shadow-sm"
                : "text-gray-700 hover:text-purple-600 hover:bg-purple-50"
              }`}
          >
            <FaWallet className={`text-xl transition-transform duration-300 group-hover:scale-110 ${activeTab === "expenses" ? "scale-110" : ""
              }`} />
            <span>EXPENSES</span>
          </button>

          <button
            onClick={() => {
              setShowFriendsList(false);
              setShowExpenses(false);
              setShowTransactions(true);
            }}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 group ${activeTab === "transactions"
                ? "text-purple-600 bg-purple-50 shadow-sm"
                : "text-gray-700 hover:text-purple-600 hover:bg-purple-50"
              }`}
          >
            <FiShare className={`text-xl transition-transform duration-300 group-hover:scale-110 ${activeTab === "transactions" ? "scale-110" : ""
              }`} />
            <span>TRANSACTIONS</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default FrndsNavbar;
