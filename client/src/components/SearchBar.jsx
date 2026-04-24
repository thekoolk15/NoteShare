import { useState } from 'react';

const SearchBar = ({ onSearch, initialValue = '' }) => {
  const [query, setQuery] = useState(initialValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search notes by title or content..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
        id="search-input"
      />
      <button type="submit" className="search-btn" id="search-btn">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
