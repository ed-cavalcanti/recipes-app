import React, { useState, useEffect } from 'react';
import Header from '../component/header';
import SavedRecipesCard from '../component/SavedRecipesCard';
import * as localApi from '../helpers/localApi';
import './DoneRecipes.css';

const DoneRecipes = () => {
  const [doneRecipes] = useState(localApi.getLocalKey('doneRecipes'));
  const [filter, setFilter] = useState('all');
  const [filteredRecipes, setFilteredRecipes] = useState(doneRecipes);

  const getFilter = ({ target }) => {
    setFilter(target.name);
    console.log(target.name);
  };

  useEffect(() => {
    const filterRecipes = () => {
      if (filter !== 'all') {
        const filtered = doneRecipes.filter((recipe) => recipe.type === filter);
        console.log(filtered);
        setFilteredRecipes(filtered);
      }
      if (filter === 'all') {
        setFilteredRecipes(localApi.getLocalKey('doneRecipes'));
      }
    };
    filterRecipes();
  }, [filter, doneRecipes]);

  return (
    <div className="main-container">
      <Header title="Done Recipes" />
      <div className="l-done-recipes">
        <section className="btn-container-done">
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
            <SavedRecipesCard key={ index } recipe={ recipe } index={ index } />
          ))
        }
      </div>
    </div>
  );
};

export default DoneRecipes;
