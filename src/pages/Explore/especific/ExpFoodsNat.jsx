import React, { useState, useEffect } from 'react';
import Header from '../../../component/header';
import SearchBar from '../../../component/searchBar';
import Footer from '../../../component/Footer';
import RecipeCard from '../../../component/recipeCard';
import '../explore.css';

const ExpFoodsNat = () => {
  const [search, setSearch] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [nationalities, setNationalities] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const getNationalities = async () => {
      const url = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
      const response = await fetch(url);
      const { meals } = await response.json();
      setNationalities(meals);
    };
    getNationalities();

    const getRecipes = async () => {
      const MAX_RECIPES = 12;
      let url = '';
      if (filter === 'All') {
        url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      } else {
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${filter}`;
      }
      const response = await fetch(url);
      const { meals } = await response.json();
      setRecipes(meals.slice(0, MAX_RECIPES));
    };
    getRecipes();
  }, [setNationalities, setRecipes, filter]);

  const toggleSearchBar = () => {
    setSearch(!search);
  };

  const handleFilter = ({ target }) => {
    setFilter(target.value);
  };

  return (
    <div className="l-explore-foods-nationalities">
      <Header title="Explore Nationalities" search callback={ toggleSearchBar } />
      {search && (<SearchBar />)}
      <select
        className="nat-select space form-select"
        name="nationality"
        data-testid="explore-by-nationality-dropdown"
        onChange={ handleFilter }
      >
        <option data-testid="All-option" value="All">All</option>
        { nationalities.map(({ strArea }, index) => (
          <option
            key={ index }
            value={ strArea }
            data-testid={ `${strArea}-option` }
          >
            {strArea}
          </option>
        )) }
      </select>
      <section className="explore-nationality">
        {recipes.map((recipe, index) => (
          <RecipeCard key={ index } type="Meal" recipe={ recipe } index={ index } />
        ))}
      </section>
      <Footer />
    </div>
  );
};

export default ExpFoodsNat;
