# Gigglit (Backend)

This is the **Node.js / Express** backend API for **Gigglit**.

If you’re looking for the frontend, see:

- `../gigglit/README.md`

---

## Tech stack

- Node.js
- Express
- MongoDB + Mongoose
- JWT auth (`jsonwebtoken`)
- Password hashing (`bcrypt`)
- `dotenv` for env vars
- `cors`
- `nodemon`

---

## Prerequisites

- Node.js (recommended: latest LTS)
- npm
- MongoDB connection string (MongoDB Atlas works)

---

## Environment variables

Create a `.env` file in this folder (`Gigglit_BackEnd/.env`):

```env
# Mongo connection string (WITHOUT the database name)
# server.js connects to: ${MONGODB_URL}/gigglit
MONGODB_URL=mongodb+srv://<user>:<password>@<cluster-host>

# JWT secret used by auth middleware/controllers
JWT_SECRET=your_super_secret
```

> Note: `server.js` does `mongoose.connect(process.env.MONGODB_URL + "/gigglit")`,
> so don’t include `/gigglit` in `MONGODB_URL`.

---

## Install

From this folder (`Gigglit_BackEnd/`):

```bash
npm install
```

---

## Run (development)

```bash
npm start
```

This runs `nodemon server.js` and starts the server on:

- `http://localhost:5555`

Health route:

- `GET /` → `Happy coding!`

Base API prefix:

- `http://localhost:5555/api`

---

## Routes

Mounted in `server.js`:

- `/api/posts` → `routes/post.js`
- `/api/topics` → `routes/topic.js`
- `/api/bookmarks` → `routes/bookmark.js`
- `/api/user` → `routes/user.js`

Many write actions require an auth header:

- `Authorization: Bearer <token>`

---

## Troubleshooting

### MongoDB won’t connect

- Check `MONGODB_URL` is set and valid.
- If using Atlas: allowlist your IP and verify user/password.

### Auth errors (401/403)

- Ensure the frontend is sending `Authorization: Bearer <token>`.
- Ensure `JWT_SECRET` matches what tokens were signed with.
