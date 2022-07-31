import PropTypes from 'prop-types';
import { Component } from 'react';

export class Searchbar extends Component {
  state = {
    query: '',
  };
  handleChange = e => {
    const value = e.target.value.trimStart();
    this.setState({ query: value });
  };
  handleSubmit = e => {
    e.preventDefault();
    if (this.state.query.length === 0) return;
    this.props.onSubmit(this.state.query);
  };
  render() {
    const { query } = this.state;
    return (
      <header className="searchbar">
        <form className="searchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="searchForm-button">
            <span className="searchForm-button-label">Search</span>
          </button>

          <input
            className="searchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            value={query}
            onChange={this.handleChange}
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
