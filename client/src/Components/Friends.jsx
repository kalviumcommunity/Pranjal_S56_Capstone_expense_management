import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { MdDelete } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { BiSolidSave } from "react-icons/bi";
import FrndsNavbar from './FrndsNavbar';
import axios from 'axios';
import Expense from './Expense';
import Display from './Display';
import API_URL from '../config';

function Friends() {
  const [friend, setFriend] = useState('');
  const [friendsList, setFriendsList] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentFriendId, setCurrentFriendId] = useState(null);
  const [editFriendName, setEditFriendName] = useState('');
  const [showFriendsList, setShowFriendsList] = useState(true)
  const [showExpenses, setShowExpenses] = useState(false)
  const [showTransactions, setShowTransactions] = useState(false)

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const user = localStorage.getItem("id");
        const response = await axios.get(
          `${API_URL}/friends/${user}`
        );
        setFriendsList(response.data.friends);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFriends();
  }, []);

  const addNewFriends = async () => {
    if (friend) {
      try {
        const user = localStorage.getItem("id");
        const response = await axios.post(`${API_URL}/addfriends/${user}`, { name: friend });
        setFriendsList([...friendsList, response.data]);
        setFriend('');
      } catch (err) {
        console.error(err);
      }
    }
  };

  const deleteFriend = async (id) => {
    try {
      const user = localStorage.getItem("id");
      await axios.delete(`${API_URL}/deletefriend/${id}/${user}`);
      setFriendsList(friendsList.filter((friend) => friend.name !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const startEditFriend = (name) => {
    setEditMode(true);
    setCurrentFriendId(name);
    setEditFriendName(name);
  };

  const saveEditFriend = async () => {
    try {
      if (editFriendName != "") {
        const user = localStorage.getItem("id");
        const response = await axios.put(`${API_URL}/updatefriend/${currentFriendId}/${user}`, { name: editFriendName });
        setFriendsList(friendsList.map(friend => (friend.name === currentFriendId ? { "name": response.data } : friend)));
        setEditMode(false);
        setCurrentFriendId(null);
        setEditFriendName('');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout>
      <FrndsNavbar
        setShowFriendsList={setShowFriendsList}
        setShowExpenses={setShowExpenses}
        setShowTransactions={setShowTransactions}
        activeTab={showFriendsList ? "friends" : showExpenses ? "expenses" : "transactions"}
      />

      {showFriendsList && (
        <div className="container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-4xl mx-auto">
            {/* Page Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Manage My Friends</h1>
              <p className="text-gray-600 text-lg">Split bills, track shared expenses, and stay on top of group finances.</p>
            </div>

            {/* Add Friend Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Friend</h2>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Enter friend's name"
                  value={friend}
                  onChange={(e) => setFriend(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      addNewFriends();
                    }
                  }}
                  className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all duration-300"
                />
                <button
                  onClick={addNewFriends}
                  className="px-8 py-3 rounded-lg font-bold text-black text-2xl bg-gradient-to-r from-primary-500 to-primary-700 hover:from-primary-600 hover:to-primary-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5, cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* Friends List */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Friends</h2>

              {friendsList.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-100">
                  <div className="text-6xl mb-4">👥</div>
                  <p className="text-gray-500 text-lg">No friends added yet. Add your first friend above!</p>
                </div>
              ) : (
                friendsList.map((friend) => (
                  <div
                    key={friend.name}
                    className="bg-white rounded-xl shadow-md hover:shadow-lg p-5 border border-gray-100 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="flex items-center justify-between">
                      {editMode && currentFriendId === friend.name ? (
                        <input
                          type="text"
                          value={editFriendName}
                          onChange={(e) => setEditFriendName(e.target.value)}
                          className="flex-1 px-4 py-2 rounded-lg border-2 border-primary-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all duration-300"
                        />
                      ) : (
                        <span className="text-lg font-semibold text-gray-800">{friend.name}</span>
                      )}

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => deleteFriend(friend.name)}
                          className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-300"
                        >
                          <MdDelete size={22} />
                        </button>

                        {editMode && currentFriendId === friend.name ? (
                          <button
                            onClick={saveEditFriend}
                            className="p-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-all duration-300"
                          >
                            <BiSolidSave size={22} />
                          </button>
                        ) : (
                          <button
                            onClick={() => startEditFriend(friend.name)}
                            className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-300"
                          >
                            <MdModeEditOutline size={22} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {showExpenses && <Expense friendsList={friendsList} />}
      {showTransactions && <Display />}

    </Layout>
  );
}

export default Friends;
