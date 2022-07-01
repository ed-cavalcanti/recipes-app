import React, { useState, useEffect } from 'react';
import FavoriteCard from '../component/FavoriteCard';
import Header from '../component/header';

import * as localApi from '../helpers/localApi';

import './favorite.css';

const FavoriteRecipes = () => {
  const [favoriteRecipes] = useState(localApi.getLocalKey('favoriteRecipes'));
  const [filter, setFilter] = useState('all');
  const [filteredRecipes, setFilteredRecipes] = useState(favoriteRecipes);

  const getFilter = ({ target }) => {
    setFilter(target.name);
    console.log(target.name);
  };

  useEffect(() => {
    const filterRecipes = () => {
      if (filter !== 'all') {
        const filtered = favoriteRecipes.filter((recipe) => recipe.type === filter);
        setFilteredRecipes(filtered);
      }
      if (filter === 'all') {
        setFilteredRecipes(localApi.getLocalKey('favoriteRecipes'));
      }
    };
    filterRecipes();
  }, [filter, favoriteRecipes]);

  return (
    <div className="main-container">
      <Header title="Favorite Recipes" />
      <div className="l-favorite-recipes">
        <section className="filter-buttons">
          <button
            type="button"
            data-testid="filter-by-all-btn"
            name="all"
            onClick={ getFilter }
          >
            All
          </button>
          <button
            type="button"
            data-testid="filter-by-food-btn"
            name="food"
            onClick={ getFilter }
          >
            Food
          </button>
          <button
            type="button"
            data-testid="filter-by-drink-btn"
            name="drink"
            onClick={ getFilter }
          >
            Drinks
          </button>
        </section>
        {
          filteredRecipes?.map((recipe, index) => (
            <FavoriteCard key={ index } index={ index } recipe={ recipe } />
          ))
        }
      </div>
    </div>
  );
};

export default FavoriteRecipes;
