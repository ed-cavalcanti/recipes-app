import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import './favoriteCard.css';

const SavedRecipes = ({ index, recipe }) => {
  const [isURLcopied, setCopiedURL] = useState(false);

  const getCategory = () => {
    if (recipe.type === 'food') {
      return `${recipe.nationality} - ${recipe.category}`;
    }
    return recipe.alcoholicOrNot;
  };

  const renderTags = () => (
    <ul>
      {
        recipe.tags.map((tag, i) => (
          <li key={ i } data-testid={ `0-${tag}-horizontal-tag` }>{tag}</li>
        ))
      }
    </ul>);

  const linkToClipboard = () => {
    const url = `http://localhost:3000/foods/${recipe.id}`;
    navigator.clipboard.writeText(url);
    setCopiedURL(true);
  };

  return (
    <div className="favorite-card">
      <Link to={ `${recipe.type}s/${recipe.id}` }>
        <img
          className="img"
          alt={ recipe.name }
          src={ recipe.image }
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      <section className="done">
        <p data-testid={ `${index}-horizontal-top-text` }>
          { getCategory() }
        </p>
        <Link to={ `${recipe.type}s/${recipe.id}` }>
          <p data-testid={ `${index}-horizontal-name` }>{ recipe.name }</p>
        </Link>
        <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate }</p>
      </section>
      <section className="btn-container2">
        <button
          type="button"
          onClick={ () => linkToClipboard() }
        >
          <img
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            alt="Share"
            className="share-icon"
          />
          { isURLcopied && <p>Link copied!</p> }
        </button>
      </section>
      { recipe.type === 'food' ? renderTags() : null }
    </div>
  );
};
SavedRecipes.propTypes = {
  recipe: propTypes.instanceOf(Object),
  index: propTypes.number,
}.isRequired;

export default SavedRecipes;
