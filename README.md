# 📝 NoteShare — Online Notes Sharing Platform

A full-stack MERN application for creating, sharing, and discovering notes with search functionality, tag system, and public/private visibility.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18, Vite, React Router, Axios |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas, Mongoose |
| **Authentication** | JWT, bcrypt |
| **Styling** | Vanilla CSS (Dark Theme) |

## Features

- ✅ User registration and login with JWT authentication
- ✅ Create, read, update, delete notes (full CRUD)
- ✅ Public/Private notes toggle (authorization)
- ✅ Full-text search across titles and content
- ✅ Tag system with filtering
- ✅ Sorting (Newest, Oldest, Most Viewed, A-Z)
- ✅ Pagination
- ✅ Owner-only edit/delete (access control)
- ✅ Responsive design
- ✅ View count tracking

## Project Structure

```
NoteShare/
├── client/                 # React Frontend (Vite)
│   ├── src/
│   │   ├── api/            # Axios instance & API calls
│   │   ├── components/     # Navbar, NoteCard, SearchBar, TagFilter
│   │   ├── context/        # AuthContext (JWT state management)
│   │   ├── pages/          # Home, Login, Register, Dashboard, CreateNote, ViewNote, EditNote
│   │   ├── App.jsx         # Main app with routing
│   │   └── App.css         # Complete stylesheet
│   └── package.json
│
├── server/                 # Express Backend
│   ├── config/             # Database connection
│   ├── middleware/          # JWT auth middleware
│   ├── models/             # User & Note Mongoose schemas
│   ├── routes/             # Auth & Notes REST API routes
│   ├── seed.js             # Database seeding script
│   ├── server.js           # Express server entry point
│   └── package.json
│
└── README.md
```

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login & get JWT |
| GET | `/api/auth/me` | Get current user |

### Notes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/notes` | Public notes (search, filter, paginate) |
| GET | `/api/notes/mine` | Current user's notes |
| GET | `/api/notes/tags` | All tags with counts |
| GET | `/api/notes/:id` | Single note |
| POST | `/api/notes` | Create note |
| PUT | `/api/notes/:id` | Update note (owner only) |
| DELETE | `/api/notes/:id` | Delete note (owner only) |

## Setup & Run Locally

```bash
# 1. Clone the repo
git clone <repo-url>
cd NoteShare

# 2. Setup backend
cd server
npm install
# Create .env with MONGO_URI, JWT_SECRET, PORT
npm run seed    # Seed sample data
npm start       # Start API on port 5001

# 3. Setup frontend (in new terminal)
cd client
npm install
npm run dev     # Start on port 5173
```

## Environment Variables (server/.env)

```
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_jwt_secret
PORT=5001
```

## Course Outcomes Covered

| CO | Description | Implementation |
|----|-------------|---------------|
| CO1 | Frontend & backend fundamentals | React components, Express routes |
| CO2 | Interactive frontend with React | SPA with routing, state, forms |
| CO3 | RESTful APIs with database | Express REST API + MongoDB |
| CO4 | Debug, test, optimize | Middleware chain, error handling |
| CO5 | Full-stack with auth & DB | JWT auth, CRUD, deployment |

## Author

**Ariv Kansal** — Chandigarh University  
Full Stack-I (24CSP-293) Final Project
