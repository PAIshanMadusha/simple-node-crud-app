# Simple Node Crud App

A simple Node Crud app using **Node.js** and **MongoDB**. This application allows you to add, update, delete, and view users, along with uploading images.

## 🚀 Features

- Add new users with name, email, phone, and image.
- View all users in a table format.
- Edit user details, including name, email, phone, and image.
- Delete users and their associated images.
- Display success/delete messages when performing actions.

## 🛠 Technologies Used

- **Node.js** (Backend)
- **Express.js** (Web framework)
- **MongoDB**  (You can use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for a cloud database or install MongoDB locally)
- **Mongoose** (MongoDB ORM)
- **EJS** (Template engine)
- **Multer** (For image uploading)
- **Bootstrap** (UI Framework)

## 📂 Installation & Setup
Follow these steps to clone and run the project:

### 1️⃣ Clone the Repository:
```bash
https://github.com/PAIshanMadusha/simple-node-crud-app.git
cd simple-node-crud-app
```

### 2️⃣ Install Dependencies:
Run the following command:
```bash
npm install
```

### 3️⃣ Create a `.env` File:
- Create a .env file in the root directory and add the port and your MongoDB connection:

Inside `.env`, add:
```bash
PORT=5000
DB_URI=your_mongodb_connection_here
```

### 4️⃣ Run the App:
To start the app, run this command:
```bash
npm start
```

### 5️⃣ After connected to the database:
Access the application in your browser:
```bash
http://localhost:5000
```

## 📸 System Screenshots:
---
<p align="center">
  <img src="https://github.com/user-attachments/assets/9d7e9e3c-c462-4f2f-8aee-5a4bea9aecc2" alt="Screenshot 1" width="560">
  <br>
  <img src="https://github.com/user-attachments/assets/0da2b46e-3c83-4741-b878-13870bb473fb" alt="Screenshot 2" width="560">
  <br>
  <img src="https://github.com/user-attachments/assets/49f046ff-650b-42a5-a8de-e922bc173d7d" alt="Screenshot 3" width="560">
</p>

## 📜 License
This project is open-source and available under the MIT License.
