# 🌿 EcoTrevo

> A full-stack eco-travel platform that helps users calculate their carbon footprint and make environmentally conscious travel decisions.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Installation & Running](#installation--running)
- [API Overview](#api-overview)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

**EcoTrevo** is a full-stack web application that merges eco-conscious travel with interactive tooling. It features user authentication, a carbon footprint calculator, an image carousel for travel inspiration, and a clean landing page — all built on a React + Vite frontend with a Node.js/Express backend connected to MongoDB.

---

## ✨ Features

- **User Authentication** — Register and login with JWT-based auth and bcrypt password hashing
- **Carbon Footprint Calculator** — Interactive calculator to estimate travel-related carbon emissions
- **Image Carousel** — Scenic travel imagery slideshow on the home page
- **Eco Travel Home Page** — Landing page with travel inspiration content
- **Protected Routes** — Auth middleware guards API endpoints
- **Responsive UI** — Built with Tailwind CSS for a clean, mobile-friendly design

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, React Router, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB (via Mongoose) |
| Auth | JWT, bcryptjs |
| Styling | Tailwind CSS, PostCSS |

---

## 📁 Project Structure

```
EcoTrevo/
│
├── server.js                          # Main Express app entry point
├── package.json                       # Root dependencies
├── package-lock.json
│
├── router/
│   └── router.js                      # Express route definitions
│
├── backend/
│   ├── .env                           # Backend environment variables
│   │
│   ├── controllers/
│   │   └── auth.js                    # Register & login controller logic
│   │
│   ├── middleware/
│   │   └── auth.js                    # JWT verification middleware
│   │
│   └── model/
│       └── auth.js                    # Mongoose user schema (name, email, password)
│
├── utils/
│   └── db.js                          # MongoDB connection setup
│
└── frontend/                          # React + Vite SPA
    ├── index.html                     # HTML entry shell
    ├── vite.config.js                 # Vite bundler config
    ├── tailwind.config.js             # Tailwind CSS config
    ├── postcss.config.js              # PostCSS config
    ├── eslint.config.js               # ESLint rules
    ├── package.json
    │
    ├── public/
    │   ├── scenery.png                # Public scenery background image
    │   └── vite.svg                   # Vite favicon
    │
    └── src/
        ├── main.jsx                   # React app bootstrap
        ├── App.jsx                    # Root component
        ├── App.css                    # Global styles
        ├── index.css                  # Tailwind base imports
        ├── Routes.jsx                 # App-wide route definitions (React Router)
        │
        ├── assets/
        │   ├── image1.png             # Hero/carousel image 1
        │   ├── image2.png             # Hero/carousel image 2
        │   ├── image3.png             # Hero/carousel image 3
        │   ├── guests.png             # Guests illustration
        │   ├── swap.png               # Swap/exchange icon
        │   └── react.svg              # React logo
        │
        └── components/
            ├── Home.jsx               # Main landing page with travel content
            ├── Navbar.jsx             # Navigation bar
            ├── CarbonFootprintCalculator.jsx  # Interactive carbon calculator (18KB)
            ├── ImageCarousel.jsx      # Auto-scrolling image carousel
            ├── Signup.jsx             # User registration form
            └── login.jsx              # User login form
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) (local or Atlas)

---

### Environment Variables

Create a `.env` file inside `backend/`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

---

### Installation & Running

**1. Clone the repository**

```bash
git clone https://github.com/bhaumik694/EcoTrevo.git
cd EcoTrevo
```

**2. Install root/backend dependencies**

```bash
npm install
```

**3. Start the backend server**

```bash
node server.js
```

**4. Install and run the frontend**

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173` and the backend at `http://localhost:5000`.

---
