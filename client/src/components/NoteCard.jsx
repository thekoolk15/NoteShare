import { Link } from 'react-router-dom';

const NoteCard = ({ note }) => {
  const maxLen = 150;
  // Strip HTML tags for preview
  const plainText = note.isHTML
    ? note.content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
    : note.content;
  const snippet = plainText.length > maxLen
    ? plainText.substring(0, maxLen) + '...'
    : plainText;

  const timeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d ago`;
    return new Date(date).toLocaleDateString();
  };

  return (
    <Link to={`/notes/${note._id}`} className="note-card">
      <div className="note-card-header">
        <h3 className="note-card-title">{note.title}</h3>
        {!note.isPublic && <span className="badge-private">Private</span>}
      </div>
      <p className="note-card-content">{snippet}</p>
      <div className="note-card-tags">
        {note.tags?.slice(0, 4).map((tag, i) => (
          <span key={i} className="tag">{tag}</span>
        ))}
        {note.tags?.length > 4 && <span className="tag tag-more">+{note.tags.length - 4}</span>}
      </div>
      <div className="note-card-footer">
        <span className="note-author">
          {note.author?.username || 'Anonymous'}
        </span>
        <span className="note-meta">
          {timeAgo(note.createdAt)} · {note.viewCount || 0} views
        </span>
      </div>
    </Link>
  );
};

export default NoteCard;
