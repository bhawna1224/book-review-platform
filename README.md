# 📚 Book Review Platform

A full-stack **Book Review Web App** built with **React**, **Node.js/Express**, and **MongoDB**. Users can browse books, view detailed reviews, and authenticated users can submit reviews. Admin users can manage book listings.

---

## 🚀 Features

- 🔍 **Search** books by title or author  
- ⚙️ **Filter** books by genre and publication year  
- 📄 **View Book Details** including reviews and average ratings  
- ✍️ **Submit Reviews** (requires login)  
- 👤 **User Authentication** (JWT-based)  
- 🛡️ **Role-Based Access**:  
  - Admin users can **add books**  
  - Regular users can **submit reviews**  
- 🎨 Responsive and modern UI using **Tailwind CSS**

---

## 🛠️ Tech Stack

| Frontend        | Backend            | Database    |
|-----------------|--------------------|-------------|
| React + Vite    | Node.js + Express  | MongoDB     |
| React Router    | REST API (CRUD)    | Mongoose ODM|
| Axios           | JWT Auth           |             |
| Tailwind CSS    | Role-based access  |             |

---

## 🔒 Environment Variables

### Backend

In `/backend/.env`:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000

> ✅ Ensure your `.env` file is listed in `.gitignore`.

---

## ⚙️ Setup Instructions

### 1️⃣ Backend Setup

cd backend
npm install
npm run dev

Runs the Express server at http://localhost:5000/api.

---

### 2️⃣ Frontend Setup

cd frontend
npm install
npm run dev

Runs the React app at http://localhost:5173.

---

## 🔗 API Overview

| Method | Endpoint             | Access            | Purpose                          |
|--------|----------------------|--------------------|----------------------------------|
| GET    | /api/books           | Public            | Fetch all books (filters optional) |
| GET    | /api/books/genres    | Public            | Fetch distinct genres            |
| GET    | /api/books/:id       | Public            | Fetch book details               |
| POST   | /api/books           | Admin Only        | Add new book                     |
| GET    | /api/reviews/:id     | Public            | Fetch reviews for a book         |
| POST   | /api/reviews/:id     | Logged-in Users   | Submit a book review             |

---

## ⚠️ Role-Based Access

- 📚 Anyone can **browse** and **search** books.
- 🛡️ **Only logged-in users** can submit reviews.
- 🛠️ **Only admin users** can add new books.

---

## 🎨 UI/UX Highlights

- Responsive layout using Tailwind CSS.
- Search with suggestions and server-side filtering.
- Filter books by genre and published year.
- Protected routes (Add Book) based on user role.
- Simple, readable UI focused on content.

---

## 📋 Future Improvements

- Edit & delete books (admin).
- Forgot password functionality.
- Image upload for book covers.

---
