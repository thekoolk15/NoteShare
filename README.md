# 📝 NoteShare — Full Stack Notes Platform

A full-stack MERN web application for creating, sharing, and discovering notes with JWT authentication, role-based access control, and rich HTML note rendering.

🌐 **Live Demo:** [note-share-sigma.vercel.app](https://note-share-sigma.vercel.app)

---

## ✨ Features

- **User Authentication** — Register/Login with JWT tokens
- **CRUD Operations** — Create, Read, Update, Delete notes
- **Full-Text Search** — MongoDB text index powered search
- **Tag System** — Filter notes by tags with aggregation pipeline
- **Public/Private Notes** — Visibility toggle per note
- **Rich HTML Notes** — Admin users can publish interactive HTML study guides
- **Role-Based Access Control (RBAC)** — Admin vs User roles
- **Profile Management** — Edit username and email
- **View Counter** — Track note popularity
- **Responsive Design** — Mobile-friendly with glassmorphism UI
- **Dark Theme** — Premium dark UI with animated gradients

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, Vite 6, React Router 7, Axios, React Hot Toast |
| **Backend** | Node.js, Express 5, JWT, bcryptjs, CORS |
| **Database** | MongoDB (Mongoose 9 ODM) |
| **Deployment** | Vercel (frontend), Render (backend), MongoDB Atlas (database) |

## 📂 Project Structure

```
NoteShare/
├── client/                  # React Frontend
│   ├── src/
│   │   ├── api/axios.js     # API layer with JWT interceptor
│   │   ├── context/         # React Context for auth state
│   │   ├── components/      # Navbar, NoteCard, SearchBar, TagFilter
│   │   ├── pages/           # Home, Dashboard, Login, Register, 
│   │   │                    #   CreateNote, EditNote, ViewNote, Profile
│   │   ├── App.jsx          # Router setup
│   │   └── App.css          # All styles (glassmorphism, animations)
│   └── vercel.json          # SPA routing config
│
├── server/                  # Express Backend
│   ├── config/db.js         # MongoDB connection
│   ├── middleware/auth.js   # JWT auth middleware (protect + optionalAuth)
│   ├── models/
│   │   ├── User.js          # User schema (bcrypt pre-save hook)
│   │   └── Note.js          # Note schema (text index for search)
│   ├── routes/
│   │   ├── auth.js          # Register, Login, Profile endpoints
│   │   └── notes.js         # CRUD + Search + Tags endpoints
│   ├── seed.js              # Database seeder
│   └── server.js            # Express entry point + middleware chain
│
└── *.html                   # Rich HTML study guide source files
```

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | Public | Create new account |
| POST | `/api/auth/login` | Public | Get JWT token |
| GET | `/api/auth/me` | 🔒 | Get current user |
| PUT | `/api/auth/profile` | 🔒 | Update username/email |

### Notes
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/notes` | Optional | List public notes (search, filter, sort, paginate) |
| GET | `/api/notes/mine` | 🔒 | Get user's own notes |
| GET | `/api/notes/tags` | Public | Get tags with counts (aggregation) |
| GET | `/api/notes/:id` | Optional | Get single note |
| POST | `/api/notes` | 🔒 | Create note |
| PUT | `/api/notes/:id` | 🔒 Owner | Update note |
| DELETE | `/api/notes/:id` | 🔒 Owner | Delete note |

## 🔒 Security

- **Passwords** hashed with bcrypt (10 salt rounds)
- **JWT** authentication with 7-day expiry
- **CORS** configured for cross-origin requests
- **Input validation** via Mongoose schema validators
- **Ownership checks** on edit/delete operations
- **RBAC** enforced server-side for HTML note publishing
- **Environment variables** for all secrets (never in code)

## 🚀 Local Development

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)

### Setup
```bash
# Clone the repo
git clone https://github.com/thekoolk15/NoteShare.git
cd NoteShare

# Backend
cd server
npm install
cp .env.example .env   # Add your MONGO_URI and JWT_SECRET
npm start

# Frontend (new terminal)
cd client
npm install
npm run dev
```

### Environment Variables
Create `server/.env`:
```
MONGO_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/noteshare
JWT_SECRET=your_secret_key
PORT=5000
```

## 📊 Database Schema

**Users Collection:**
`username` (unique) · `email` (unique) · `password` (hashed) · `role` (user/admin) · `timestamps`

**Notes Collection:**
`title` · `content` · `author` (→ User ref) · `tags[]` · `isPublic` · `viewCount` · `isHTML` · `timestamps`

**Relationship:** One User → Many Notes (via ObjectId reference)

## 👤 Authors

- **Ariv** — Full Stack Developer

---

*Built with the MERN Stack as a university project for Full Stack Development (24CSH-298)*
