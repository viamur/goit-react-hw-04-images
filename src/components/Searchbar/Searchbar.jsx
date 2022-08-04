import PropTypes from 'prop-types';
import { useState } from 'react';

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleChange = e => {
    const value = e.target.value.trimStart();
    setQuery(value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (query.length === 0) return;
    onSubmit(query);
  };

  return (
    <header className="searchbar">
      <form className="searchForm" onSubmit={handleSubmit}>
        <button type="submit" className="searchForm-button">
          <span className="searchForm-button-label">Search</span>
        </button>

        <input
          className="searchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          value={query}
          onChange={handleChange}
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
