Expense Management Website

The Expense Management Website is a comprehensive tool designed to help users track their income, expenses, and financial activities efficiently. This web application provides an intuitive interface for managing personal finances with features like categorization, expense sharing, and activity logging.

Features

1. User Authentication

Register/Login: Users can securely create an account or log in.

Logout: Ensures a secure logout process for users.

2. Expense Management

Income & Transactions: Users can record income and expenses conveniently.

Categorization: Transactions can be categorized for better organization.

Amount Tracking: Enables accurate tracking of income and expenses.

3. Activity Log

Activity Tracking: Logs all user actions for future reference.

Historical Data: Allows users to review past financial activities.

4. Friends Section

Expense Sharing: Facilitates the splitting of expenses among friends.

Contribution Calculation: Stores calculated contributions for each shared expense.

Debt Management: Tracks money owed to or by users.

Implementation Details

Technology Stack

Frontend: React

Backend: Node.js, Express.js

Database: MongoDB

Deployment Links

Backend: Expense Management Backend

Frontend: Expense Management Website

Future Enhancements

Data Visualization: Implement charts and graphs for better financial insights.

Budgeting Tools: Allow users to set and track their budgets.

Notification System: Remind users about upcoming bills and payments.

Mobile Application: Develop a mobile app for easier access.

Local Setup Instructions

Prerequisites

Ensure you have the following installed:

Node.js and npm

MongoDB (installed and running locally)

Setup Steps

Clone the Repository

git clone https://github.com/kalviumcommunity/Pranjal_S56_Capstone_expense_management.git
cd expense-management-website

Install Dependencies

cd backend
npm install
cd ../client
npm install

Set Up the Database

Ensure MongoDB is running locally.

Create a database named expense_management (or another preferred name).

Update the MongoDB connection URL in Server/config/db.js if needed.

Start the Backend Server

cd Server
npm start

Start the Frontend Development Server

cd client
npm start

Access the Website

Open your browser and visit http://localhost:3000.
