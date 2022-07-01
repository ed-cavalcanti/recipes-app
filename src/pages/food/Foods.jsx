import React, { useState, useContext } from 'react';
import propTypes from 'prop-types';
import { MeuContextoInterno } from '../../context/index';
import Header from '../../component/header';
import SearchBar from '../../component/searchBar';
import Footer from '../../component/Footer';

import RecipeCard from '../../component/recipeCard';
import ToggleCatButtons from '../../component/toggleCatButtons';

import './Foods.css';

const MAX_RECIPES = 12;

const Foods = ({ history }) => {
  const [search, setSearch] = useState(false);
  const {
    recipes: { foods },
    functions: { fetchSearch },
  } = useContext(MeuContextoInterno);

  const toggleSearchBar = () => {
    setSearch(!search);
  };

  const noResults = () => {
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
    return <p>Sorry, we haven&apos;t found any recipes for these filters.</p>;
  };

  // TODO: Transformar em hook personalizado
  const fetchFoods = async (searchText, searchType) => {
    if (searchType === 'fl' && searchText.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      return;
    }
    const result = await fetchSearch(searchText, searchType, 'MEALS');
    if (result && result.length === 1) history.push(`/foods/${result[0].idMeal}`);
    toggleSearchBar();
  };

  return (
    <div className="l-foods">
      <Header title="Foods" search callback={ toggleSearchBar } />
      {search && (<SearchBar callback={ fetchFoods } />)}
      <ToggleCatButtons foodType="MEALS" />
      <section className="recipes-container">
        {foods
          ? foods.slice(0, MAX_RECIPES).map((food, index) => (
            <RecipeCard
              key={ food.idMeal }
              recipe={ food }
              type="Meal"
              index={ index }
            />))
          : noResults()}
        <Footer />
      </section>
    </div>
  );
};

Foods.propTypes = {
  history: propTypes.shape({
    push: propTypes.func,
  }),
}.isRequired;

export default Foods;
