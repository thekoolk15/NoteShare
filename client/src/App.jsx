import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateNote from './pages/CreateNote';
import ViewNote from './pages/ViewNote';
import EditNote from './pages/EditNote';
import Profile from './pages/Profile';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/notes/new" element={<CreateNote />} />
              <Route path="/notes/:id" element={<ViewNote />} />
              <Route path="/notes/:id/edit" element={<EditNote />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#1e1e2e',
                color: '#cdd6f4',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.1)',
              },
            }}
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
