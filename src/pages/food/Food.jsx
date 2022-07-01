import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import YoutubeIcon from '../../images/youtube.svg';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import '../../component/recipeCard.css';
import * as localApi from '../../helpers/localApi/index';
import Gallery from '../../component/Gallery';
import { MeuContextoInterno } from '../../context';
import './food&drink.css';

const Food = () => {
  const { id: urlId } = useParams();

  const {
    recipes: { foods },
  } = useContext(MeuContextoInterno);

  const SIX = 5;
  const recomendation = foods.slice(2, SIX);

  const [recipeDetails, setRecipeDetails] = useState({});
  const [isBtnEnable, setIsBtnEnable] = useState(false);
  const [isRecipeInProgress, setContinueBtn] = useState(true);
  const [isURLcopied, setCopiedURL] = useState(false);
  const [isFavorite, setFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getRecipe = async () => {
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${urlId}`;
      const response = await fetch(url);
      const data = await response.json();
      setRecipeDetails(data.meals[0] || []);
      if (recipeDetails !== []) setIsLoading(false);
    };
    getRecipe();
    const verifyInProgress = () => {
      const inProgressRecipes = localApi
        .getLocalKey('inProgressRecipes') || { meals: {} };
      const isInProgress = urlId in inProgressRecipes.meals;
      setContinueBtn(isInProgress);
    };
    verifyInProgress();
    const verifyIsDone = () => {
      const doneRecipes = localApi.getLocalKey('doneRecipes') || [];
      const recipeIsDone = doneRecipes.some(({ id }) => id === urlId);
      setIsBtnEnable(!recipeIsDone);
    };
    verifyIsDone();
    const verifyIsFavorite = () => {
      const favoriteRecipes = localApi.getLocalKey('favoriteRecipes') || [];
      const checkIsFavorite = favoriteRecipes.some(({ id }) => id === urlId);
      setFavorite(checkIsFavorite);
    };
    verifyIsFavorite();
  }, [urlId, recipeDetails]);

  const {
    strArea,
    idMeal,
    strMealThumb,
    strMeal,
    strCategory,
    strInstructions,
    strYoutube,
  } = recipeDetails;

  const filterIngredients = (recipe) => {
    const TWENTY = 20;
    const ingredientList = [];

    for (let i = 1; i <= TWENTY; i += 1) {
      const ingredientKey = `strIngredient${i}`;
      const measureKey = `strMeasure${i}`;

      if (recipe[ingredientKey] !== '' && recipe[measureKey] !== '') {
        const ingredient = `${recipe[ingredientKey]}: ${recipe[measureKey]}`;
        ingredientList.push(ingredient);
      }
    }

    return ingredientList;
  };

  const linkToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopiedURL(true);
  };

  const handleFavoriteBtn = () => {
    localApi.setLocalKey('favoriteRecipes',
      [{ id: idMeal,
        type: 'food',
        nationality: strArea,
        category: strCategory,
        alcoholicOrNot: '',
        name: strMeal,
        image: strMealThumb }]);
    setFavorite(!isFavorite);
  };

  return (
    <div className="main-container">
      {
        isLoading
          ? (<h1 className="loading">Loading...</h1>)
          : (
            <div className="details-container">
              <img
                className="image"
                data-testid="recipe-photo"
                src={ strMealThumb }
                alt={ strMeal }
              />

              <h1 data-testid="recipe-title" className="l-food">{ strMeal }</h1>
              <p data-testid="recipe-category">{strCategory}</p>

              <section className="actions-btns">
                <button
                  type="button"
                  data-testid="share-btn"
                  onClick={ () => linkToClipboard() }
                >
                  <img src={ shareIcon } alt="Share" className="share-icon" />
                  { isURLcopied && <p>Link copied!</p> }
                </button>

                <button
                  type="button"
                  data-testid="favorite-btn"
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

              <section className="ingredients-container">
                <h6>Ingredients:</h6>
                <ul>
                  {filterIngredients(recipeDetails).map((ingredient, index) => (
                    <li
                      key={ index }
                      data-testid={ `${index}-ingredient-name-and-measure` }
                    >
                      { ingredient }
                    </li>
                  ))}
                </ul>
              </section>

              <section className="instructions">
                <p data-testid="instructions">{strInstructions}</p>
              </section>

              <section>
                Share recipe video:
                <a
                  data-testid="video"
                  href={ strYoutube }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={ YoutubeIcon } alt="Youtube" className="youtube-icon" />
                </a>
              </section>

              <Gallery className="gallery" recipes={ recomendation } type="Meal" />
            </div>
          )
      }
      {
        isBtnEnable && (
          <Link to={ `${urlId}/in-progress` }>
            <button
              type="button"
              data-testid="start-recipe-btn"
              className="start-btn btn btn-secondary btn-lg"
            >
              { isRecipeInProgress ? 'Continue Recipe' : 'Start Recipe' }
            </button>
          </Link>
        )
      }
    </div>
  );
};

export default Food;
