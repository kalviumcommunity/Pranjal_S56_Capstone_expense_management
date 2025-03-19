# Capstone Project: Expense Management Website  

The **Expense Management Website** is a tool designed to help users track their **income, expenses, and financial activities** efficiently. This web application provides a **user-friendly interface** for personal finance management, offering features like **transaction tracking, expense categorization, and debt management**.  

---

## 🛠️ Technology Stack  

### Frontend:  
- **React** – For building an interactive and responsive UI.  

### Backend:  
- **Node.js & Express.js** – For handling server-side logic and API requests.  

### Database:  
- **MongoDB** – For storing user data, transactions, and financial records securely.  

---

![alt text](<Screenshot 2025-03-19 102449.png>)


## Features  

### 1. **User Authentication**  
- **Register/Login** – Secure user authentication.  
- **Logout** – Allows users to log out safely.  

### 2. **Expense Management**  
- **Income & Transactions** – Users can record income and expenses.  
- **Categorization** – Organize transactions for better financial tracking.  
- **Amount Tracking** – Provides an overview of income and expenses.  

### 3. **Activity Log**  
- **Activity Tracking** – Logs all user activities.  
- **Historical Data** – Enables users to review past transactions.  

### 4. **Friends Section**  
- **Expense Sharing** – Facilitates splitting expenses among friends.  
- **Contribution Calculation** – Calculates individual shares in shared expenses.  
- **Debt Management** – Keeps track of money owed or lent.  

---

## Future Enhancements  

### 1. **Data Visualization**  
- Implement **graphs and charts** for a better financial overview.  

### 2. **Budgeting Tools**  
- Introduce **budgeting features** to help users plan expenses.  

### 3. **Notification System**  
- Notify users about **upcoming bills and due payments**.  

### 4. **Mobile Application**  
- Develop a **mobile app** for managing expenses on the go.  

---

## Deployment Links  

### Backend:  
- [Expense Management Backend](https://pranjal-s56-capstone-expense-management-2.onrender.com)  

### Frontend:  
- [Expense Management Frontend](https://ifinance.netlify.app/)  

---

## Local Setup Guide  

### Prerequisites  
Ensure the following are installed:  
- **Node.js** and **npm**  
- **MongoDB** (running locally)  

### Setup Steps  

#### 1️⃣ Clone the Repository  
```sh
git clone https://github.com/kalviumcommunity/Pranjal_S56_Capstone_expense_management.git
cd expense-management-website
2️⃣ Install Dependencies
sh
Copy
Edit
cd backend
npm install
cd ../client
npm install
3️⃣ Set Up the Database
Ensure MongoDB is running locally.
Create a new database named expense_management.
Update the MongoDB connection URL in Server/config/db.js if needed.
4️⃣ Start the Backend Server
sh
Copy
Edit
cd backend
npm start
5️⃣ Start the Frontend Development Server
sh
Copy
Edit
cd client
npm start
6️⃣ Access the Website
Open http://localhost:3000 in your browser.
