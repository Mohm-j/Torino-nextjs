# 🧳 Torino Travel Booking Platform

A **fullstack travel tour booking web application** built with **Next.js 15 (Pages Router)** and **Express.js**.  
This project demonstrates modern frontend architecture, secure user authentication, and a clean, responsive UI designed for real-world travel booking experiences.

---

## 🚀 Overview

**Torino** allows users to browse travel tours, view detailed tour information, make bookings, manage their basket, and access a personal dashboard where they can:

- Edit their personal and bank information
- View their reserved tours
- Check their transaction history

The application is **fully responsive**, **optimized for SEO**, and built with a **scalable architecture** using modern web development best practices.

---

## 🛠️ Tech Stack

### **Frontend**

- ⚛️ **Next.js 15 (Pages Router)**
- 💅 **CSS Modules** for scoped styling
- ⚡ **React 19** with **React DOM 19**
- 🔄 **TanStack React Query** (data fetching & caching)
- 🪝 **React Hook Form** + **Yup** (form handling & validation)
- 📆 **React Multi Date Picker**
- 🔐 **OTP-based Authentication**
- 🔔 **React Toastify** for notifications
- 🧭 **Swiper.js** for interactive UI sliders
- 📦 **Axios** for API requests

### **Backend**

- 🧰 **Express.js**
- 🗃️ **MongoDB & Mongoose**
- 🔑 **JWT Authentication**
- 📡 RESTful API endpoints for user, tours, basket, and orders

---

## 📂 Folder Structure

```bash
frontend/
├── src/
│   ├── pages/                     # Next.js Pages Router
│   │   ├── index.js               # Home Page (SSR with getServerSideProps)
│   │   ├── _app.js                # Global layout & providers
│   │   ├── tours/                 # Tours list & detail pages
│   │   ├── dashboard/             # User dashboard (protected)
│   │   ├── about-us.js
│   │   ├── contact-us.js
│   │   ├── basket.js
│   │   ├── 404.js / 500.js
│   │
│   ├── components/
│   │   ├── common/                # Reusable UI components
│   │   ├── layout/                # Global layout components
│   │   ├── modules/               # Reusable modules (ProtectedRoute, etc.)
│   │   ├── templates/             # Page-specific UI templates
│   │       ├── HomePage/
│   │       ├── ToursPage/
│   │       ├── TourDetailPage/
│   │       ├── DashboardPage/
│   │       ├── ProfileTabPage/
│   │       ├── MyToursTabPage/
│   │       ├── TransactionsTabPage/
│   │       ├── AboutUsPage/
│   │       ├── ContactUsPage/
│   │
│   ├── hooks/                     # Custom React Query hooks
│   │   ├── useAuth.js
│   │   ├── useUser.js
│   │   ├── useTours.js
│   │
│   ├── lib/                       # Axios & Cookie configuration
│   │   ├── api.js
│   │   ├── cookie.js
│   │
│   ├── services/                  # API service modules
│   │   ├── auth.js
│   │   ├── tours.js
│   │   ├── basket.js
│   │   ├── order.js
│   │   ├── user.js
│   │
│   ├── utils/                     # Helper & config utilities
│   │   ├── helper.js
│   │   ├── navLinks.js
│   │   ├── titles.js
│   │
│   ├── validation/                # Yup schemas for form validation
│   ├── styles/                    # Global & font styles
│   └── ...
│
└── package.json
```

---

## ⚙️ Features

✅ **Server-Side Rendering (SSR)** using `getServerSideProps`  
✅ **JWT Authentication with OTP login**  
✅ **Protected Routes** using custom `<ProtectedRoute />`  
✅ **User Dashboard**

- Profile Editing
- Tours list History
- Transaction list History  
  ✅ **Tour Booking and Basket Management**  
  ✅ **Dynamic SEO titles and meta descriptions**  
  ✅ **Reusable API and Validation Layers**  
  ✅ **Error Handling (404 & 500 pages)**  
  ✅ **Fully Responsive Design**

---

## 🔐 Authentication Flow

1. User enters their phone number
2. OTP is sent via `/auth/send-otp`
3. OTP is verified via `/auth/check-otp`
4. Access & Refresh tokens are stored as cookies
5. `axios` interceptors automatically refresh expired tokens

---

## 🧩 React Query Architecture

All data fetching is handled via **React Query**, enabling:

- Background data synchronization
- Smart caching
- Error & loading state management
- Optimistic updates after mutation

---

## 🧱 Form Validation

Forms (login, profile, passenger info, etc.) use:

- **React Hook Form** for efficient state management
- **Yup** schemas for validation logic

---

## 💾 API Integration

All API calls are centralized under `/services` and `/lib/api.js`.  
Axios interceptors handle:

- Token injection (`Authorization` header)
- Auto-refresh of expired tokens
- Global error handling

---

## 🧠 Backend (Overview)

The backend (Express.js + MongoDB) provides endpoints for:

- `/auth` → OTP login & token refresh
- `/tour` → Tour listing & details
- `/basket` → Manage user's booking basket
- `/order` → Create and confirm orders
- `/user` → Profile, Tours, Transactions

---

## 🧰 Installation & Setup

```bash
# Clone repository
git clone https://github.com/Mohm-j/Torino-nextjs.git

# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build
npm start
```

---

## 🌐 Environment Variables

Create a `.env.local` file in the `frontend/` directory:

```bash
NEXT_PUBLIC_BASE_URL=http://localhost:6500
```

---

## 👨‍💻 Developed by

**Mohmj**  
Front-End Developer | React & Next.js  
📧 [mohammadjamalimain@gmail.com]  
🌐 [https://github.com/Mohm-j]

---
