import React, { useState, useEffect } from 'react';
import '../Styles/Friends.css'; 
import Layout from './Layout';

import { MdDelete } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { BiSolidSave } from "react-icons/bi";
import FrndsNavbar from './FrndsNavbar';
import axios from 'axios';
import Expense from './Expense';
import Display from './Display';

function Friends() {
  const [friend, setFriend] = useState('');
  const [friendsList, setFriendsList] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentFriendId, setCurrentFriendId] = useState(null);
  const [editFriendName, setEditFriendName] = useState('');

  const [ showFriendsList , setShowFriendsList ] = useState(true)
  const [ showExpenses, setShowExpenses ] = useState(false)
  const [ showTransactions , setShowTransactions ] = useState(false)

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const user = localStorage.getItem("id");
        const response = await axios.get(`http://localhost:3000/friends/${user}`);
        setFriendsList(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFriends();
  }, []);

  const addNewFriends = async () => {
    if (friend) {
      try {
        const response = await axios.post('http://localhost:3000/addfriends', { name: friend });
        setFriendsList([...friendsList, response.data]);
        setFriend('');
      } catch (err) {
        console.error(err);
      }
    }
  };

  const deleteFriend = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/friends/${id}`);
      setFriendsList(friendsList.filter((friend) => friend._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const startEditFriend = (id, name) => {
    setEditMode(true);
    setCurrentFriendId(id);
    setEditFriendName(name);
  };

  const saveEditFriend = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/friends/${currentFriendId}`, { name: editFriendName });
      setFriendsList(friendsList.map(friend => (friend._id === currentFriendId ? response.data : friend)));
      setEditMode(false);
      setCurrentFriendId(null);
      setEditFriendName('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
    <Layout>
      <FrndsNavbar setShowFriendsList={setShowFriendsList} setShowExpenses={setShowExpenses} setShowTransactions={setShowTransactions} />

      {showFriendsList &&  <div className="mainbox">
        <div className="input-box">
          <input
            type="text"
            placeholder="Add friend"
            value={friend}
            onChange={(e) => setFriend(e.target.value)}
          />
          <button onClick={addNewFriends}>+</button>
        </div>
        <div className="friends-list">
          {friendsList.map((friend) => (
            <div key={friend._id} className="friend-item">
              {editMode && currentFriendId === friend._id ? (
                <input
                  type="text"
                  value={editFriendName}
                  onChange={(e) => setEditFriendName(e.target.value)}
                />
              ) : (
                <span>{friend.name}</span>
              )}
              <div className="btnss">
                <button onClick={() => deleteFriend(friend._id)}><MdDelete /></button>
                
                {editMode && currentFriendId === friend._id ? (
                  <button onClick={saveEditFriend}><BiSolidSave /></button>
                ) : (
                  <button onClick={() => startEditFriend(friend._id, friend.name)}><MdModeEditOutline /></button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>}

      {showExpenses && <Expense />}
      {showTransactions && <Display />}
      
    </Layout>
    </>
  );
}

export default Friends;
