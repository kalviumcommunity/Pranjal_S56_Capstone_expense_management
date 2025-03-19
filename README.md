# Capstone Project:

# Expense Management Website

The Expense Management Website is a comprehensive tool designed to help users track their income, expenses, and financial activities. This web application aims to provide a user-friendly interface for managing personal finances efficiently.

# Features:

1. User Authentication
   Register/Login: Users can create an account or log in securely to access the website.
   Logout: Provides an option for users to securely log out of their accounts.
2. Expense Management
   Income and Transactions: Users can record their income and expenses conveniently.
   Categorization: Allows users to categorise transactions based on their nature for better organisation.
   Amount Tracking: Provides the ability to track expenses and income amounts accurately.
3. Activity Log
   Activity Tracking: Logs all the activities performed by the user for future reference.
   Historical Data: Enables users to review their past financial actions.
4. Friends Section
   Expense Sharing: Facilitates the splitting of expenses among friends.
   Contribution Calculation: Store calculated amount for each friend's contribution based on shared expenses.
   Debt Management: Keeps track of money owed by users or to users by others.

# Implementation Details

Technology Stack
Frontend: React
Backend: Node.js, Express.js
Database: MongoDB

# Conclusion

The Expense Management Website aims to simplify financial tracking and promote better money management practices. By providing features like income and expense recording, categorization, activity logging, and friends section, the website empowers users to take control of their finances effectively.

# Future Enhancements

Data Visualization:
Implement graphs and charts to visually represent financial data.
Budgeting Tools:
Introduce features for setting and tracking budgets.
Notification System:
Notify users about upcoming bills, due payments, etc.
Mobile Application:
Develop a companion mobile app for on-the-go expense management.

## Backend Deployment link:

https://pranjal-s56-capstone-expense-management-2.onrender.com

# To set up the Expense Management Website project locally, follow these steps:

- Prerequisites:
  Node.js and npm installed on your machine
  MongoDB installed and running locally
  Setup Steps

Clone the Repository:
git clone [<repository-url>](https://github.com/kalviumcommunity/Pranjal_S56_Capstone_expense_management.git)
cd expense-management-website

Install Dependencies:
cd backend
npm install
cd ../client
npm install

Set Up the Database:
Ensure MongoDB is running locally.
Create a new database named expense_management or any preferred name.
Update the MongoDB connection URL in Server/config/db.js if necessary.

Start the Backend Server:
cd Server
npm start

Start the Frontend Development Server:
cd client
npm start

- Access the Website:
  Open your web browser and go to http://localhost:3000 to access the Expense Management Website.

- Contributing
  If you'd like to contribute to the project, feel free to fork the repository, make your changes, and submit a pull request. Make sure to follow the project's coding standards and guidelines.

- Testing
  Ensure that both frontend and backend tests pass before submitting your changes.
  You can run tests using the following commands:
  Frontend: cd frontend && npm test
  Backend: cd backend && npm test

By following these steps, you'll have the Expense Management Website project set up locally on your machine, allowing you to contribute and test changes effectively.
