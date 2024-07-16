import React, { useState } from 'react';
import '../Styles/Expense.css'; 
import Navbar from './Navbar';
import Friends from './Friends';
import FrndsNavbar from './FrndsNavbar';

function Expense() {
  const [expenses, setExpenses] = useState([
    { id: 1, name: 'xyz', amount: '0.00', color: 'blue' },
    { id: 2, name: 'pqr', amount: '0.00', color: 'green' },
    { id: 3, name: 'abc', amount: '0.00', color: 'red' },
  ]);

  return (
    <>
    <div className="expense-container">
      <h2>Add expenses</h2>
      <p>Select friend, input amount, and add expense</p>
      <div className="input-section">
        <select className="friend-select">
          <option>Friend</option>
        </select>
        <input type="text" placeholder="Amount" className="amount-input" />
        <button className="add-button">+</button>
      </div>
      <input type="text" placeholder="Reason (optional)" className="reason-input" />
      <div className="expense-list">
        {expenses.map(expense => (
          <div key={expense.id} className="expense-item">
            <div className="expense-icon" style={{ backgroundColor: expense.color }}>{expense.name.charAt(0).toUpperCase()}</div>
            <span className="expense-name">{expense.name} paid ${expense.amount}</span>
            <div className="expense-actions">
              <button className="edit-button">✏️</button>
              <button className="delete-button">🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

export default Expense;
