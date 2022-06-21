import React, { useState, useEffect, createContext } from 'react';
import PropTypes from 'prop-types';
import * as Api from '../helpers/Api/index';

export const MeuContextoInterno = createContext();

const APIS = {
  MEALS__ingredient: 'https://www.themealdb.com/api/json/v1/1/filter.php?i=',
  MEALS__name: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
  MEALS__fl: 'https://www.themealdb.com/api/json/v1/1/search.php?f=',
  DRINKS__ingredient: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=',
  DRINKS__name: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
  DRINKS__fl: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=',
};

function ProvedorContextoDoStars({ children }) {
  const [drinks, setDrinks] = useState([]);
  const [foods, setFoods] = useState([]);

  const fetchSearch = async (searchText, searchType, foodType) => {
    const foodTypeLower = foodType.toLowerCase();

    const response = await Api.fetchApis(
      APIS[`${foodType}__${searchType}`] + searchText, foodTypeLower,
    );

    console.log('Resposta: ', response);
    if (foodTypeLower === 'meal') setFoods(response);
    else setDrinks(response);
  };

  useEffect(() => {
    const fetchApiFoods = async () => {
      const json = await Api.fetchApis(APIS.MEALS__name, 'meals');
      setFoods(json);
    };
    fetchApiFoods();

    const fetchApiDrinks = async () => {
      const json = await Api.fetchApis(APIS.DRINKS__name, 'drinks');
      setDrinks(json);
    };
    fetchApiDrinks();
  }, []);

  const contexto = {
    recipes: {
      drinks,
      foods,
    },

    functions: {
      fetchSearch,
    },
  };

  return (
    <MeuContextoInterno.Provider value={ contexto }>
      { children }
    </MeuContextoInterno.Provider>
  );
}

ProvedorContextoDoStars.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default ProvedorContextoDoStars;