# EcoTrevo — Travel Manager & Carbon Footprint Calculator

> A travel web app where users can search for flights between global airports, pick travel dates, and calculate the CO₂ emissions of their journey — built for a hackathon to blend travel exploration with environmental awareness.

---

## 📌 Description

**SkyTrace** is a React-based travel application that puts two powerful ideas together: the joy of exploring the world, and the responsibility of understanding your environmental impact. Users land on a cinematic, full-screen flight search interface where they can select departure and destination airports from 50+ global options, pick travel dates, and hit "Book Now". The **Carbon Footprint Calculator** then lets them estimate CO₂ emissions per passenger based on distance, travel class, and trip type — turning every booking decision into an informed one.

---

## ✨ Features

- 🌍 **Cinematic Home Page** — Full-screen auto-scrolling image carousel with glassmorphism UI overlay
- 🛫 **Flight Search** — From/To airport selector with 50+ airports across India, USA, UK, Europe, Middle East, Asia, Africa, and more
- 📅 **Date Picker with Validation** — Smart date inputs that reject past dates and invalid ranges with toast notifications
- 🧮 **Carbon Footprint Calculator** — Real CO₂ estimates using ICAO-standard emission factors based on:
  - Distance (short / medium / long-haul rates)
  - Travel class (Economy → First Class multipliers)
  - One-way or Round Trip
  - Number of passengers
- 🌱 **Eco Insights** — Translates CO₂ into trees needed, driving equivalent, and energy consumption
- 🔐 **Authentication** — Signup and Login pages with smooth navigation
- 📱 **Responsive Design** — Built with Tailwind CSS for a clean, modern UI

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 18** | Frontend UI framework |
| **React Router DOM** | Client-side routing |
| **Tailwind CSS** | Utility-first styling |
| **Vite** | Build tool & dev server |
| **react-select** | Searchable airport dropdown |
| **react-toastify** | Toast notifications |
| **react-icons** | Icon library |

---

## 📁 Project Structure

```
src/
├── App.jsx                            # Root component with Router setup
├── App.css                            # Global styles
├── main.jsx                           # React DOM entry point
├── index.css                          # Tailwind CSS directives
├── Routes.jsx                         # Centralized route definitions
├── assets/
│   ├── image1.png                     # Carousel background 1
│   ├── image2.png                     # Carousel background 2
│   ├── image3.png                     # Carousel background 3
│   └── swap.png                       # Swap icon for From/To
└── components/
    ├── Navbar.jsx                     # Navigation bar (Home, Calculator, Reviews, Contact, About)
    ├── Home.jsx                       # Landing page with flight search UI
    ├── ImageCarousel.jsx              # Auto-scrolling full-screen background carousel
    ├── CarbonFootprintCalculator.jsx  # CO₂ emission calculator for flights
    ├── Signup.jsx                     # User registration page
    └── login.jsx                      # User login page
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Chaitu-Boss/Hackathon-Project-1.git

# 2. Navigate into the project
cd Hackathon-Project-1

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

App runs at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

---

## 🗺️ Routes

| Path | Component | Description |
|---|---|---|
| `/` | `Home` | Flight search landing page |
| `/calculator` | `CarbonFootprintCalculator` | CO₂ emission estimator |
| `/signup` | `Signup` | User registration |
| `/login` | `Login` | User login |

---

## 🧮 How Carbon Calculation Works

The calculator uses the **Haversine formula** to compute the great-circle distance between two airports using their coordinates, then applies ICAO-standard emission factors:

| Haul Type | Distance | kg CO₂ per km |
|---|---|---|
| Short-haul | < 1,500 km | 0.255 |
| Medium-haul | 1,500 – 4,000 km | 0.195 |
| Long-haul | > 4,000 km | 0.147 |

**Class multipliers** (relative to Economy):
- Economy: ×1.0
- Premium Economy: ×1.6
- Business: ×2.9
- First Class: ×4.0

---

## 🌱 Why This Matters

Aviation accounts for roughly 2.5% of global CO₂ emissions. Most travelers have no idea what their flight costs the planet. This app puts that number right in front of you — so you can fly informed, and maybe fly a little less.

---

