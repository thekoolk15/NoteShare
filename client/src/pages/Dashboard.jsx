import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getMyNotes, deleteNote } from '../api/axios';
import { useAuth } from '../context/AuthContext';
import NoteCard from '../components/NoteCard';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, public, private
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchNotes();
  }, [user]);

  const fetchNotes = async () => {
    try {
      const { data } = await getMyNotes();
      setNotes(data.notes);
    } catch (err) {
      toast.error('Failed to load your notes');
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;
    try {
      await deleteNote(id);
      setNotes(notes.filter(n => n._id !== id));
      toast.success('Note deleted');
    } catch (err) {
      toast.error('Failed to delete note');
    }
  };

  const filteredNotes = notes.filter(note => {
    if (filter === 'public') return note.isPublic;
    if (filter === 'private') return !note.isPublic;
    return true;
  });

  const publicCount = notes.filter(n => n.isPublic).length;
  const privateCount = notes.filter(n => !n.isPublic).length;

  return (
    <div className="page-container">
      <div className="dashboard-header">
        <div>
          <h1 className="page-title">My Notes</h1>
          <p className="page-subtitle">
            {notes.length} note{notes.length !== 1 ? 's' : ''} · {publicCount} public · {privateCount} private
          </p>
        </div>
        <Link to="/notes/new" className="btn btn-primary">+ New Note</Link>
      </div>

      <div className="dashboard-filters">
        {['all', 'public', 'private'].map(f => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading your notes...</p>
        </div>
      ) : filteredNotes.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">📝</span>
          <h3>{filter !== 'all' ? `No ${filter} notes` : 'No notes yet'}</h3>
          <p>Create your first note to get started!</p>
          <Link to="/notes/new" className="btn btn-primary" style={{marginTop: '1rem'}}>Create Note</Link>
        </div>
      ) : (
        <div className="notes-grid">
          {filteredNotes.map(note => (
            <div key={note._id} className="dashboard-card-wrapper">
              <NoteCard note={note} />
              <div className="card-actions">
                <Link to={`/notes/${note._id}/edit`} className="action-btn edit">Edit</Link>
                <button onClick={() => handleDelete(note._id)} className="action-btn delete">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
