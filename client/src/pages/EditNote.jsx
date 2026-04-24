import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNoteById, updateNote } from '../api/axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const EditNote = () => {
  const [form, setForm] = useState({
    title: '',
    content: '',
    tags: '',
    isPublic: true,
    isHTML: false
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchNote = async () => {
      try {
        const { data } = await getNoteById(id);
        if (data.author?._id !== user._id) {
          toast.error('You can only edit your own notes');
          navigate('/dashboard');
          return;
        }
        setForm({
          title: data.title,
          content: data.content,
          tags: data.tags?.join(', ') || '',
          isPublic: data.isPublic,
          isHTML: data.isHTML || false
        });
      } catch (err) {
        toast.error('Note not found');
        navigate('/dashboard');
      }
      setLoading(false);
    };
    fetchNote();
  }, [id, user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const noteData = {
        title: form.title,
        content: form.content,
        tags: form.tags.split(',').map(t => t.trim().toLowerCase()).filter(Boolean),
        isPublic: form.isPublic,
        isHTML: form.isHTML
      };
      await updateNote(id, noteData);
      toast.success('Note updated!');
      navigate(`/notes/${id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update note');
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading-state"><div className="spinner"></div><p>Loading note...</p></div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="editor-page">
        <h1 className="page-title">Edit Note</h1>

        <form onSubmit={handleSubmit} className="note-form">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Give your note a title..."
              required
              maxLength={200}
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              name="content"
              value={form.content}
              onChange={handleChange}
              placeholder="Write your note content here..."
              required
              rows={15}
            />
          </div>

          <div className="form-row">
            <div className="form-group flex-1">
              <label htmlFor="tags">Tags <span className="label-hint">(comma separated)</span></label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={form.tags}
                onChange={handleChange}
                placeholder="e.g. javascript, react, notes"
              />
            </div>

            <div className="form-group">
              <label className="toggle-label">
                <span>Visibility</span>
                <div className="toggle-wrapper">
                  <input
                    type="checkbox"
                    name="isPublic"
                    checked={form.isPublic}
                    onChange={handleChange}
                    id="visibility-toggle"
                  />
                  <span className="toggle-text">{form.isPublic ? '🌍 Public' : '🔒 Private'}</span>
                </div>
              </label>
            </div>

            {user.role === 'admin' && (
              <div className="form-group">
                <label className="toggle-label">
                  <span>HTML Mode</span>
                  <div className="toggle-wrapper">
                    <input
                      type="checkbox"
                      name="isHTML"
                      checked={form.isHTML}
                      onChange={handleChange}
                      id="html-toggle"
                    />
                    <span className="toggle-text">{form.isHTML ? '🌐 HTML' : '📝 Plain Text'}</span>
                  </div>
                </label>
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNote;
