import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../component/header';
import Footer from '../../component/Footer';
import './explore.css';

const ExploreFoods = () => {
  const [id, setId] = useState('');

  useEffect(() => {
    const getAleatoryId = async () => {
      const url = 'https://www.themealdb.com/api/json/v1/1/random.php';
      const response = await fetch(url);
      const { meals } = await response.json();
      setId(meals[0].idMeal);
    };
    getAleatoryId();
  }, [setId]);

  return (
    <div className="l-explore-foods">
      <Header title="Explore Foods" />
      <div className="explore-container">
        <Link
          to="/explore/foods/ingredients"
          data-testid="explore-by-ingredient"
          className="btn btn-primary btn-dark"
        >
          By Ingredient
        </Link>
        <Link
          to="/explore/foods/nationalities"
          data-testid="explore-by-nationality"
          className="space btn btn-primary btn-dark"
        >
          By Nationality
        </Link>
        <Link
          to={ `/foods/${id}` }
          data-testid="explore-surprise"
          className="space btn btn-primary btn-dark"
        >
          Surprise me!
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default ExploreFoods;
