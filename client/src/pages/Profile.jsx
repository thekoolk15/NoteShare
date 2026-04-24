import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../api/axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: user?.username || '',
    email: user?.email || ''
  });
  const [saving, setSaving] = useState(false);

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data } = await updateProfile(form);
      // Update local storage with new info (keep the token)
      login({ ...data, token: user.token });
      toast.success('Profile updated!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    }
    setSaving(false);
  };

  const hasChanges = form.username !== user.username || form.email !== user.email;

  return (
    <div className="page-container">
      <div className="editor-page">
        <h1 className="page-title">My Profile</h1>
        <p className="page-subtitle">
          Member since {new Date(user.createdAt || Date.now()).toLocaleDateString('en-US', {
            year: 'numeric', month: 'long', day: 'numeric'
          })}
          {user.role === 'admin' && <span className="badge-admin"> 🛡️ Admin</span>}
        </p>

        <form onSubmit={handleSubmit} className="note-form" style={{ marginTop: '2rem' }}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              minLength={3}
              maxLength={30}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Role</label>
            <input
              type="text"
              value={user.role === 'admin' ? '🛡️ Admin' : '👤 User'}
              disabled
              style={{ opacity: 0.6 }}
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={saving || !hasChanges}>
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
