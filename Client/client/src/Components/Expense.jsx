import React, { useState } from 'react';
import '../Styles/Expense.css'; 
import axios from 'axios';

function Expense({ friendsList }) {
  const [expenses, setExpenses] = useState([
    { id: 1, name: 'xyz', amount: '0.00', color: 'blue' },
    { id: 2, name: 'pqr', amount: '0.00', color: 'green' },
    { id: 3, name: 'abc', amount: '0.00', color: 'red' }
  ]);
  const [selectedFriend, setSelectedFriend] = useState('');
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [frndId , setFrndId] = useState(null)

  const colors = ['gray', 'red', 'blue', 'orange', 'green', 'yellow'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const newExpense = {
    id: frndId,
    name: selectedFriend,
    amount,
    color: randomColor,
    reason
  };

  const handleAddExpense = async () => {
    if (!selectedFriend || !amount) {
      alert("Please select a friend and enter an amount.");
    } else {
      try {
        let user = localStorage.getItem("id")
        
        const res = await axios.post(`http://localhost:3000/addexpense/${user}`, newExpense);
        setExpenses([...expenses, res.data]);
        setSelectedFriend('');
        setAmount('');
        setReason('');
      } catch (error) {
        console.error("Error adding expense:", error);
      }
    }
  };

  return (
    <div className="expense-container">
      <h2>Add expenses</h2>
      <p>Select friend, input amount, and add expense</p>
      <div className="input-section">
        <select 
          className="friend-select" 
          value={selectedFriend} 
          onChange={(e) => {
            setSelectedFriend(e.target.value);
            setFrndId(e.target.selectedIndex - 1)
          }}
        > 
          <option key={0} value="">Choose Friend</option>
          {friendsList.map((el, i) => (
            <option key={i + 1} value={el.name}>{el.name}</option>
          ))}
        </select>
        <input 
          type="text" 
          placeholder="Amount" 
          className="amount-input" 
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button className="add-button" onClick={handleAddExpense}>+</button>
      </div>
      <input 
        type="text" 
        placeholder="Reason (optional)" 
        className="reason-input" 
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />
      <div className="expense-list">
        {expenses.map(expense => (
          <div key={expense.id} className="expense-item">
            <div className="expense-icon" style={{ backgroundColor: expense.color }}>
              {expense.name.charAt(0).toUpperCase()}
            </div>
            <span className="expense-name">
              {expense.name} paid ${expense.amount} {expense.reason && `for ${expense.reason}`}
            </span>
            <div className="expense-actions">
              <button className="edit-button">✏️</button>
              <button className="delete-button">🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Expense;
