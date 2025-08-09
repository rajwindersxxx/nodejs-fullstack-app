
---

# 🚀 Full Stack Job Board web app

A modern full-stack web application built with **React**, **Node.js**, **Express**, **TypeScript**, **Zod**, and **PostgreSQL** (via Prisma). Designed for **scalability**, **clean architecture**, and **runtime validation**.

This project follows clean code patterns and uses carefully chosen libraries to ensure **reliability**, **maintainability**, and **developer productivity**.

---

## 📸 Preview

![App preview gif](sample/sample.gif)

---

## 🛠 Tech Stack

### **Frontend**

* **React** (Vite or CRA)
* **React Router**
* **React Query** – Efficient server state management & caching
* **React Hook Form** – Form handling & validation
* **Tailwind CSS** – Rapid UI development

### **Backend**

* **Node.js**
* **Express.js**
* **TypeScript**
* **Zod** – Runtime validation for safety
* **Prisma ORM** – Type-safe DB access
* **PostgreSQL**

### **Dev Tools**

* **Vite**
* **Docker** (optional)
* **Nodemon**
* **ESLint + Prettier**
* **JWT Auth** (via cookies)

---

## 📂 Project Structure

```bash
.
├── client/               # React frontend
│   └── src/
│       ├── api/          # API handlers
│       ├── assets/
│       ├── components/
│       ├── config/
│       ├── context/
│       ├── helper/
│       ├── hooks/
│       ├── pages/
│       ├── types/        # Type definitions
│       ├── app.tsx
│       ├── index.css
│       └── main.tsx
├── server/               # Express backend
│   ├── src/
│   │   ├── config/
│   │   ├── controller/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── zod/          # Zod validation definitions
│   │   ├── app.ts
│   │   └── server.ts
│   ├── uploads/          # File uploads
│   └── prisma/           # Prisma schema & migrations
├── .gitignore
├── .env
└── README.md
```

---

## ⚙️ Setup Instructions

### **System Requirements**

* Debian Linux **or** Docker
* Node.js v22+
* PostgreSQL v16+

If you’re using Docker, you can spin up the full stack with:

```bash
git clone https://github.com/rajwindersxxx/nodejs-fullstack-app.git
cd nodejs-fullstack-app
docker compose up --build
```

* Frontend → [http://localhost:5173](http://localhost:5173)
* Backend API → [http://localhost:3000](http://localhost:3000)

---

## 🔧 Manual Setup

### **Backend**

1. Clone the repository:

   ```bash
   git clone https://github.com/rajwindersxxx/nodejs-fullstack-app.git
   cd nodejs-fullstack-app/server
   ```

**Note**: Replace `user`, `pass`, and `dbname` with your database credentials.


2. Install dependencies:

   ```bash
   npm install
   ```

3. Create `.env` file inside `server/`:

   ```env
   PORT=3000
   DATABASE_URL=postgresql://user:pass@localhost:5432/dbname
   JWT_SECRET=your_jwt_secret
   ```

4. Initialize database:

   ```bash
   npx prisma db push    # Push schema
   npx prisma db seed    # Seed sample data
   ```

5. Run backend:

   ```bash
   npm run dev
   ```

   You should see:

   ```bash
   Server is running on http://localhost:3000
   ✅ Database connection successful
   ```

---

### **Frontend**

1. Navigate to client folder:

   ```bash
   cd ../client
   npm install
   ```

2. If your backend is running on a port other than **3000**, update:

   ```bash
   client/src/config/apiConfig.ts
   ```

3. Start frontend:

   ```bash
   npm run dev
   ```

   Access → [http://localhost:5173](http://localhost:5173)

---

## 📜 API Documentation

The backend API is documented here:
[**View API Docs**](https://documenter.getpostman.com/view/36192494/2sB3BDKBRG)

---

## ✅ Features

* Type-safe backend & database
* Centralized runtime validation with Zod
* Optimized server state fetching & caching
* Responsive, Tailwind-powered UI
* JWT authentication with cookies
* Docker-ready configuration

---

