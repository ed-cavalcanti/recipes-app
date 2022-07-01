import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import YoutubeIcon from '../images/youtube.svg';
import './recipeCard.css';

const RecipeCard = ({ recipe, type, index }) => {
  const {
    strYoutube, idMeal, idDrink,
    strVideo, strMeal, strDrink, strDrinkThumb, strMealThumb } = recipe;
  const name = type === 'Meal' ? strMeal : strDrink;
  const image = type === 'Meal' ? strMealThumb : strDrinkThumb;
  const video = type === 'Meal' ? strYoutube : strVideo;

  const redirect = () => ({
    pathname: type === 'Meal' ? `/foods/${idMeal}` : `/drinks/${idDrink}`,
    state: recipe,
  });

  return (
    <div
      className="card recipe-card"
      data-testid={ `${index}-recipe-card` }
    >
      <Link to={ redirect() }>
        <img
          className="card-img card-img-mine"
          src={ image }
          alt="Recipe"
          data-testid={ `${index}-card-img` }
        />
      </Link>

      <div
        className="
          card-img-overlay-mine d-flex
          justify-content-between
          align-items-center"
      >
        <h5
          className="c-title"
          data-testid={ `${index}-card-name` }
        >
          {name}

        </h5>
        {video && (
          <a href={ video } target="_blank" rel="noopener noreferrer">
            <img src={ YoutubeIcon } alt="Youtube" className="youtube-icon" />
          </a>
        )}
      </div>
    </div>
  );
};

RecipeCard.propTypes = {
  strMeal: propTypes.string,
  strCategory: propTypes.string,
  strArea: propTypes.string,
  strMealThumb: propTypes.string,
  strTags: propTypes.string,
  strYoutube: propTypes.string,
}.isRequired;

export default RecipeCard;
