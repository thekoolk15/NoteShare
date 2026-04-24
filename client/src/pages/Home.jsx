import { useState, useEffect } from 'react';
import { getPublicNotes, getTags } from '../api/axios';
import NoteCard from '../components/NoteCard';
import SearchBar from '../components/SearchBar';
import TagFilter from '../components/TagFilter';

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const params = { page, sort };
      if (search) params.search = search;
      if (selectedTag) params.tag = selectedTag;

      const { data } = await getPublicNotes(params);
      setNotes(data.notes);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error('Failed to fetch notes:', err);
    }
    setLoading(false);
  };

  const fetchTags = async () => {
    try {
      const { data } = await getTags();
      setTags(data);
    } catch (err) {
      console.error('Failed to fetch tags:', err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [page, sort, selectedTag]);

  useEffect(() => {
    fetchTags();
  }, []);

  const handleSearch = (query) => {
    setSearch(query);
    setPage(1);
    setTimeout(fetchNotes, 0);
  };

  useEffect(() => {
    fetchNotes();
  }, [search]);

  return (
    <div className="page-container">
      <div className="hero-section">
        <h1 className="hero-title">Discover & Share Notes</h1>
        <p className="hero-subtitle">
          Browse public notes shared by the community, or create your own.
        </p>
        <SearchBar onSearch={handleSearch} initialValue={search} />
      </div>

      <div className="content-section">
        <div className="content-header">
          <TagFilter tags={tags} selectedTag={selectedTag} onSelectTag={(t) => { setSelectedTag(t); setPage(1); }} />
          <div className="sort-controls">
            <select value={sort} onChange={(e) => { setSort(e.target.value); setPage(1); }} className="sort-select" id="sort-select">
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="views">Most Viewed</option>
              <option value="title">A-Z</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading notes...</p>
          </div>
        ) : notes.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">📭</span>
            <h3>No notes found</h3>
            <p>Try a different search or tag filter.</p>
          </div>
        ) : (
          <>
            <div className="notes-grid">
              {notes.map((note) => (
                <NoteCard key={note._id} note={note} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                <button disabled={page <= 1} onClick={() => setPage(p => p - 1)} className="page-btn">
                  ← Prev
                </button>
                <span className="page-info">Page {page} of {totalPages}</span>
                <button disabled={page >= totalPages} onClick={() => setPage(p => p + 1)} className="page-btn">
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
