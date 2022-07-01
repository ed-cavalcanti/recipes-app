import React, { useState, useContext } from 'react';
import propTypes from 'prop-types';

import { MeuContextoInterno } from '../context';

import './categoryButtons.css';

const ToggleCatButtons = ({ foodType }) => {
  const [activeButton, setActiveButton] = useState('');

  const {
    mealsCat,
    drinksCat,
    functions: {
      fetchSearch,
    },
    fetchDefault: {
      reFetch,
      setReFetch,
    },
  } = useContext(MeuContextoInterno);

  const foodCat = foodType === 'MEALS' ? mealsCat : drinksCat;

  const handleClick = ({ target: { id } }) => {
    if (activeButton === id) {
      setActiveButton('');
      setReFetch(!reFetch);
      return;
    }
    fetchSearch(id, null, foodType);
    setActiveButton(id);
  };

  const handleAllClick = () => {
    setActiveButton('');
    setReFetch(!reFetch);
  };

  return (
    <div
      className="btn-group btn-group-toggle d-flex flex-wrap justify-content-center"
      data-toggle="buttons"
    >
      <label
        type="button"
        data-testid="All-category-filter"
        className="btn btn-sm btn-dark teste"
        htmlFor="All"
      >
        <input type="radio" name="options" id="All" onClick={ handleAllClick } />
        All
      </label>
      { foodCat && foodCat.map(({ strCategory: cat }, index) => (
        <label
          key={ index }
          data-testid={ `${cat}-category-filter` }
          className={ `btn btn-sm btn-dark ${activeButton === cat ? 'teste2' : ''}` }
          htmlFor={ cat }
        >
          <input type="radio" name="options" id={ cat } onClick={ handleClick } />
          {cat}
        </label>
      ))}
    </div>
  );
};

ToggleCatButtons.propTypes = {
  foodType: propTypes.string.isRequired,
};

export default ToggleCatButtons;
