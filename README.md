# 🍲 Recipes App — MERN (TypeScript, Vite, MUI)

A full‑stack recipes application with authentication, image uploads, comments, and per‑author feeds. Built with **React + Vite + TypeScript** on the frontend and **Express + MongoDB + Mongoose** on the backend. UI is powered by **Material UI**. Includes **JWT‑less token auth**, **Google OAuth**, **Multer** image uploads, and Redux Toolkit data flows.

> This README is tailored for recruiters and as a portfolio piece. Replace placeholders (e.g., screenshots) and push to GitHub.

---

## ✨ Features

- **Auth**: Register / login, Google OAuth, token refresh via DB token
- **Recipes**: Create, list, view details, delete (author‑only)
- **Images**: Upload via Multer, served from `/public/images/recipes`
- **Comments**: Thread per recipe, delete by comment author or recipe author
- **Per‑author feed**: `/recipes/by-user/:userId`
- **Protected routes** on frontend
- **TypeScript** end‑to‑end

---

## 🧱 Tech Stack

**Frontend**
- React 18, Vite, TypeScript
- Redux Toolkit, React Router
- Material UI (@mui)
- Axios

**Backend**
- Node.js, Express
- Mongoose (MongoDB)
- Multer (image uploads)
- bcrypt (password hashing)
- google-auth-library (OAuth)
- CORS

---

## 🗺️ API Overview

Base URL: `http://localhost:8000` (dev)

### Auth
- `POST /users` — register `{ username, password, displayName }`
- `POST /users/sessions` — login `{ username, password }`
- `DELETE /users/sessions` — logout (requires `Authorization: Token <token>`)
- `POST /users/google` — Google OAuth (credential)

### Recipes
- `GET /recipes` — list all
- `GET /recipes/:id` — get one
- `GET /recipes/by-user/:userId` — list by author
- `POST /recipes` — create (auth, multipart: `title`, `text`, `image`)
- `DELETE /recipes/:id` — delete (author‑only)

### Comments
- `GET /comments?recipe=<id>` — list comments for recipe
- `POST /comments` — create `{ recipe, text }` (auth)
- `DELETE /comments/:id` — delete (comment author or recipe author)

> Auth: Send header `Authorization: Token <token>`.

---

## ⚙️ Local Development

### 1) Backend
```bash
cd backend
cp .env.example .env
npm i
npm run dev    # starts on http://localhost:8000
```
The backend serves static files from `public/` and requires MongoDB connection string.

### 2) Frontend
```bash
cd frontend
cp .env.example .env
npm i
npm run dev    # starts Vite dev server
```

---

## 🔐 Environment Variables

### Backend `.env`
```
MONGODB_URI=mongodb://localhost:27017/recipes_app
GOOGLE_CLIENT_ID=your-google-oauth-client-id.apps.googleusercontent.com
PORT=8000
CORS_ORIGIN=http://localhost:5173
```

### Frontend `.env`
```
VITE_API_BASE_URL=http://localhost:8000
VITE_GOOGLE_CLIENT_ID=your-google-oauth-client-id.apps.googleusercontent.com
```

> The project currently imports configuration from `backend/config.ts`. Ensure the file reads from `process.env`.

---

## 🧪 Seeding

```bash
cd backend
npm run seed
```
Seeds sample users and recipes (see `backend/fixtures.ts`).

---

## 🚀 Deployment (Portfolio‑friendly)

### Option A: Render (Backend) + Vercel/Netlify (Frontend)

1. **MongoDB Atlas** — create a free cluster, grab connection string.
2. **Render** — create a Web Service from `backend/`. Set env vars:
    - `MONGODB_URI`, `GOOGLE_CLIENT_ID`, `PORT=8000`, `CORS_ORIGIN=https://your-frontend`
3. **Vercel** — deploy `frontend/`. Set env vars:
    - `VITE_API_BASE_URL=https://your-backend.onrender.com`
    - `VITE_GOOGLE_CLIENT_ID=...`
4. Update CORS and test end‑to‑end.

### Option B: Docker Compose (single host)
Create a `docker-compose.yml` with `api`, `web`, and `mongo` services.

---

## 📸 Screenshots (add yours)

- Home / Recipes list
- Recipe details with comments
- New recipe form (image upload)
- Auth screens (Register / Login)

> Place images in `frontend/public/` and reference in README.

---

## 🧰 Scripts

**Backend**
- `npm run dev` — nodemon + ts-node
- `npm run seed` — seed DB

**Frontend**
- `npm run dev` — Vite dev server
- `npm run build` — typecheck + build
- `npm run preview` — preview build

---

## ✅ Checklist for Recruiters

- [x] Auth with hashed passwords & Google OAuth
- [x] Multer image upload
- [x] Protected API routes (author‑only deletes)
- [x] Per‑author recipe feed
- [x] Comments with proper permissions
- [x] Typed models and slices

---

## 🔍 Notes & Possible Improvements

- Move secrets to `.env` and harden `config.ts`
- Add pagination for recipes & comments
- Improve error handling and return shapes

---

## 📄 License
MIT
