import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getNoteById, deleteNote } from '../api/axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const ViewNote = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const { data } = await getNoteById(id);
        setNote(data);
      } catch (err) {
        if (err.response?.status === 403) {
          toast.error('This note is private');
        } else {
          toast.error('Note not found');
        }
        navigate('/');
      }
      setLoading(false);
    };
    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Delete this note permanently?')) return;
    try {
      await deleteNote(id);
      toast.success('Note deleted');
      navigate('/dashboard');
    } catch (err) {
      toast.error('Failed to delete note');
    }
  };

  const isOwner = user && note && user._id === note.author?._id;

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-state"><div className="spinner"></div><p>Loading note...</p></div>
      </div>
    );
  }

  if (!note) return null;

  return (
    <div className="page-container">
      <div className="note-view">
        <div className="note-view-header">
          <div className="note-view-meta">
            <Link to="/" className="back-link">← Back to Explore</Link>
            <div className="note-view-badges">
              {note.isPublic ? (
                <span className="badge-public">🌍 Public</span>
              ) : (
                <span className="badge-private">🔒 Private</span>
              )}
              <span className="badge-views">{note.viewCount} views</span>
            </div>
          </div>

          <h1 className="note-view-title">{note.title}</h1>

          <div className="note-view-info">
            <span className="note-view-author">
              By <strong>{note.author?.username || 'Anonymous'}</strong>
            </span>
            <span className="note-view-date">
              {new Date(note.createdAt).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric'
              })}
            </span>
          </div>

          {note.tags?.length > 0 && (
            <div className="note-view-tags">
              {note.tags.map((tag, i) => (
                <span key={i} className="tag">{tag}</span>
              ))}
            </div>
          )}
        </div>

        {note.isHTML ? (
          <div className="note-view-content note-html-content" dangerouslySetInnerHTML={{ __html: note.content }} />
        ) : (
          <div className="note-view-content">
            {note.content.split('\n').map((line, i) => (
              <p key={i}>{line || '\u00A0'}</p>
            ))}
          </div>
        )}

        {isOwner && (
          <div className="note-view-actions">
            <Link to={`/notes/${note._id}/edit`} className="btn btn-secondary">
              ✏️ Edit
            </Link>
            <button onClick={handleDelete} className="btn btn-danger">
              🗑️ Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewNote;
