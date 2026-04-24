import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-icon">📝</span>
          <span>NoteShare</span>
        </Link>

        <div className="nav-links">
          <Link to="/" className="nav-link">Explore</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="nav-link">My Notes</Link>
              <Link to="/notes/new" className="nav-link btn-create">
                + New Note
              </Link>
              <div className="nav-user">
                <Link to="/profile" className="nav-username">{user.username}</Link>
                <button onClick={handleLogout} className="btn-logout">Logout</button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link btn-create">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
