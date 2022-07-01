import React, { useState } from 'react';
import propTypes from 'prop-types';
import './searchBar.css';

const SearchBar = ({ callback }) => {
  const [searchText, setSearchText] = useState('');
  const [searchType, setSearchType] = useState('ingredient');

  const onChange = ({ target: { value }, target: { type } }) => {
    if (type === 'search') setSearchText(value);
    if (type === 'radio') setSearchType(value);
  };

  const onClick = () => {
    callback(searchText, searchType);
    setSearchText('');
  };

  return (
    <div className="input-group l-search">
      <div className="input-group l-search__input">
        <input
          type="search"
          className="form-control rounded"
          placeholder="Type to search"
          data-testid="search-input"
          aria-label="Search"
          aria-describedby="search-addon"
          value={ searchText }
          onChange={ onChange }
        />
        <button
          type="button"
          className="search"
          data-testid="exec-search-btn"
          onClick={ () => { onClick(); } }
        >
          Search
        </button>
      </div>

      <div className="input-group d-flex justify-content-around l-search__radio">
        <div className="form-check">
          <label
            className="form-check-label"
            htmlFor="ingredient"
          >
            <input
              className="form-check-input"
              type="radio"
              name="flexRadio"
              id="ingredient"
              value="ingredient"
              data-testid="ingredient-search-radio"
              checked={ searchType === 'ingredient' }
              onChange={ onChange }
            />
            Ingredient
          </label>
        </div>
        <div className="form-check">
          <label
            className="form-check-label"
            htmlFor="name"
          >
            <input
              className="form-check-input"
              type="radio"
              name="flexRadio"
              data-testid="name-search-radio"
              id="name"
              value="name"
              checked={ searchType === 'name' }
              onChange={ onChange }
            />
            Name
          </label>
        </div>
        <div className="form-check">
          <label
            className="form-check-label"
            htmlFor="fl"
          >
            <input
              className="form-check-input"
              type="radio"
              name="flexRadio"
              data-testid="first-letter-search-radio"
              id="fl"
              value="fl"
              checked={ searchType === 'fl' }
              onChange={ onChange }
            />
            First Letter
          </label>
        </div>
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  callback: propTypes.func,
}.isRequired;

export default SearchBar;
