import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import '../../component/recipeCard.css';
import * as localApi from '../../helpers/localApi/index';
import {
  linkToClipboard, filterIngredients, verifyChecked, setFinished,
} from '../../helpers/Handlers/index';
import './food&drink.css';

const FoodInProgress = () => {
  const { id: urlId } = useParams();
  const inProgressRecipes = localApi.getLocalKey('inProgressRecipes');

  const getIngredient = () => {
    const resultIng = inProgressRecipes?.meals || [];
    const alreadyChecked = resultIng[urlId] || [];
    return alreadyChecked;
  };

  const [foodInProgress, setFoodInProgress] = useState({});
  const [isBtnEnable, setIsBtnEnable] = useState(false);
  const [isRecipeInProgress, setContinueBtn] = useState(true);
  const [isURLcopied, setCopiedURL] = useState(false);
  const [isFavorite, setFavorite] = useState(false);
  const [checkedIng, setCheckedIng] = useState(getIngredient());
  const [isLoading, setIsLoading] = useState(true);

  const setIngredient = () => {
    localApi.setLocalKey('inProgressRecipes',
      { ...inProgressRecipes, meals: { [urlId]: checkedIng } });
  };
  setIngredient();

  useEffect(() => {
    const getRecipe = async () => {
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${urlId}`;
      const response = await fetch(url);
      const data = await response.json();
      setFoodInProgress(data?.meals[0] || []);
      if (foodInProgress !== []) setIsLoading(false);
    };
    getRecipe();

    const verifyInProgress = () => {
      const APIresult = localApi
        .getLocalKey('inProgressRecipes') || { meals: {} };
      const isInProgress = urlId in APIresult.meals;
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
  }, [urlId, checkedIng, setCheckedIng, foodInProgress]);

  const {
    idMeal,
    strArea,
    strMealThumb,
    strMeal,
    strCategory,
    strInstructions,
  } = foodInProgress;

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
    <div>
      {isLoading
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
                onClick={ () => setCopiedURL((linkToClipboard(urlId, 'food'))) }
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
                {filterIngredients(foodInProgress).map((ingredient, index) => (
                  <li
                    style={
                      (checkedIng.includes(ingredient))
                        ? ({ textDecoration: 'line-through' }) : null
                    }
                    data-testid={ `${index}-ingredient-step` }
                    key={ index }
                  >
                    <input
                      type="checkbox"
                      name={ ingredient }
                      id={ ingredient }
                      checked={ checkedIng.includes(ingredient) }
                      onChange={ (e) => setCheckedIng(verifyChecked(e, checkedIng)) }
                    />
                    { ingredient }
                  </li>
                ))}
              </ul>
            </section>

            <section className="instructions">
              <p data-testid="instructions">{strInstructions}</p>
            </section>
          </div>
        )}
      {isBtnEnable && (
        <Link to="/done-recipes">
          <button
            type="button"
            data-testid="finish-recipe-btn"
            className="start-btn btn btn-secondary btn-lg"
            disabled={
              setFinished(checkedIng.length,
                filterIngredients(foodInProgress).length)
            }
          >
            { isRecipeInProgress ? 'Continue Recipe' : 'Finish Recipe' }
          </button>
        </Link>
      )}
    </div>
  );
};

export default FoodInProgress;
