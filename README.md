# Professional Network Web App

## Overview

Professional Network is a **full-stack web application** that allows users to register, log in, and interact in a professional social network environment. Users can create profiles, post updates, and connect with others.
## Live Demo

You can try the app live here: [Professional Network Live](https://professional-network.onrender.com)

---

## Tech Stack

| Layer          | Technology                             |
| -------------- | ----------------------------------- |
| Frontend       | React, TypeScript, Tailwind CSS, Shadcn UI |
| Backend        | Node.js, Express.js                  |
| Database       | MongoDB, Mongoose                    |
| Authentication | JWT (JSON Web Tokens)                |
| Validation     | Zod                                 |
| API Client     | Axios                               |

---

## Features

- User Registration with validation via **Zod**
- User Login with **JWT authentication**
- Secure password handling and session management
- Responsive UI using Tailwind CSS and Shadcn UI components
- Password show/hide toggle
- Demo users for easy testing
- Backend API built with Express and MongoDB
- Error handling and notifications with toast messages

---

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn
- MongoDB instance (local or MongoDB Atlas)

### Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/professional-network.git
   cd professional-network

2. **Setup Backendn**

   ```bash

   cd server
   npm install
3. **Create .env file**

   ```env
   MONGO_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
4. **Start Server**

    ```bash
    node index.js
5. **Setup Frontend**

   ```bash
   cd client
   npm install
6. **Configure VITE_API**

     ```env
     http://localhost:5000
7. **Run Server**
    ```bash
    npm run dev
## Demo Credentials

| User                            | Email                                         | Password |
| ------------------------------- | --------------------------------------------- | -------- |
| John Smith (Engineer)           | [john@example.com](mailto:john@example.com)   | demo12   |
| Sarah Johnson (Product Manager) | [sarah@example.com](mailto:sarah@example.com) | demo12   |
| Mike Chen (UX Designer)         | [mike@example.com](mailto:mike@example.com)   | demo12   |

## API Endpoints 
| Endpoint         | Method | Description                 |
| ---------------- | ------ | --------------------------- |
| `/auth/register` | POST   | Register a new user         |
| `/auth/login`    | POST   | Authenticate user & get JWT |
| `/auth/logout`   | GET    | Logout user & Blaclist JWT  |
| `/auth/me`       | GET    | Get current  user details   |
| `/posts`         | GET    | Get all posts               |
| `/posts`         | POST   | Create a new post           |
| `/posts/:id`     | DELETE | Delete a post               |

## Notes
- Passwords are securely hashed before storing in the database.

- JWT tokens are used to authorize requests to protected routes.
- JWT is blacklisted after Login.
