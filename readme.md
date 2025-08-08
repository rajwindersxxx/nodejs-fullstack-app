# 🚀 Full Stack Web App

A modern full stack web application built with **React**, **Node.js**, **Express**, **TypeScript**, **Zod**, and **PostgreSQL** (via Prisma). Designed with scalability, validation, and maintainability in mind.

- I use some patterns and library to make it reliable and clean.

## App preview

![App preview gif](sample/sample.gif)

## 🛠️ Tech Stack

### Frontend

- **React** (with Vite or CRA)
- **React Router**
- **React Query** (for batter catching System)
- **React Form hook** (for forms and validation)
- **Tailwind CSS** (for designing faster)

### Backend

- **Node.js**
- **Express.js**
- **TypeScript**
- **Zod** (for runtime validation)
- **Prisma ORM** (for typescript sync with database )
- **PostgreSQL**

### Dev Tools

- **Vite React**
- **docker**(optional)
- **Nodemon**
- **ESLint + Prettier**
- **JWT Auth** (with cookies)

---

## 📁 Project Structure

```bash
.
├── client/               # React frontend
│   └── src/
│       ├── api/      #Api handlers
│       ├── assets/
│       ├── components/
│       ├── config/
│       ├── context/
│       ├── helper/
│       ├── hooks/
│       ├── pages/
│       ├── types/  #type definition
│       ├── hooks/
│       ├── app.tsx
│       ├── index.css
│       └── main.tsx
├── server/            #express backend
│   ├── src/
│   │   ├── config/
│   │   ├── controller/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── Zod/     #Zod validation Definitions
│   │   ├── app.ts
│   │   └── server.ts
│   ├── uploads/           # uploads
│   └── prisma/            # Prisma schema + migrations
├── .gitignore
├── .env
└── README.md
```

## Setting up Project in localhost

If you have docker install just run docker yml to setup whole project

```bash
git clone https://github.com/rajwindersxxx/nodejs-fullstack-app.git
cd nodejs-fullstack-app
docker compose up --build
```

- visit: <http://localhost:5173> for frontend
- visit: <http://localhost:3000> for api

## manual Setup

### Backend setup

1. Clone the Repository

```bash

git clone https://github.com/rajwindersxxx/nodejs-fullstack-app.git
cd nodejs-fullstack-app
```

2. Install Dependencies

```bash
cd server
npm install
```

3. Config .env Dependencies inside server/

```bash
#Specify Port , connection string  ,jwt secret
PORT=3000
DATABASE_URL=postgresql://user:pass@localhost:5432/dbname
JWT_SECRET=your_jwt_secret
```

4. Sitting up Database

```bash
npx prisma db push         #this will push schema to dev database
npx prisma db seed         #This will create sample data
```

4. Run backend server

```bash
npm run dev
```

5. If you get this on terminal , then success

```bash
Server is running on http://localhost:3000
✅ Database connection successful
```

### Frontend setup

1. Install Dependencies

```bash
cd  ../client
npm install
```

2. If server is running on port other then 3000,then specify the url otherwise skip to 3rd step

```bash
 Edit file- client/src/config/apiConfig.ts # Specify correct URL
```

3. Run Fronted

```bash
npm run dev
```

Access App => <https://localhost:5173>

## Backend Api docs

To Access the api docs Visit link below

- [API Documentation](https://documenter.getpostman.com/view/36192494/2sB3BDKBRG)

