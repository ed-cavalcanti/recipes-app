import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import * as localApi from '../helpers/localApi';
import './favoriteCard.css';

const FavoriteCard = ({ index, recipe }) => {
  const [isURLcopied, setCopiedURL] = useState(false);
  const [isFavorite, setFavorite] = useState(true);

  const getCategory = () => {
    if (recipe.type === 'food') {
      return `${recipe.nationality} - ${recipe.category}`;
    }
    return recipe.alcoholicOrNot;
  };

  const linkToClipboard = () => {
    const url = `http://localhost:3000/foods/${recipe.id}`;
    navigator.clipboard.writeText(url);
    setCopiedURL(true);
  };

  const handleFavoriteBtn = () => {
    const favoriteRecipes = localApi.getLocalKey('favoriteRecipes');
    const newFavorites = favoriteRecipes.filter((favorite) => favorite.id !== recipe.id);
    localApi.setLocalKey('favoriteRecipes', newFavorites);
    setFavorite(!isFavorite);
    document.location.reload(true);
  };

  return (
    <div className="favorite-card">
      <Link className="link" to={ `${recipe.type}s/${recipe.id}` }>
        <img
          className="img"
          alt={ recipe.name }
          src={ recipe.image }
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      <p data-testid={ `${index}-horizontal-top-text` }>
        { getCategory() }
      </p>
      <Link to={ `${recipe.type}s/${recipe.id}` }>
        <p data-testid={ `${index}-horizontal-name` }>{ recipe.name }</p>
      </Link>
      <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate }</p>
      <section className="btn-container">
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
        <button
          type="button"
          data-testid={ `${index}-horizontal-favorite-btn` }
          onClick={ () => handleFavoriteBtn() }
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        >
          <img
            src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
            alt="Favorite"
            className="favorite-icon"
          />
        </button>
      </section>
    </div>
  );
};
FavoriteCard.propTypes = {
  recipe: propTypes.instanceOf(Object),
  index: propTypes.number,
}.isRequired;

export default FavoriteCard;
