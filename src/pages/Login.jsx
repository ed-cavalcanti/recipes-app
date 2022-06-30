import React, { useState } from 'react';
import propTypes from 'prop-types';
import * as localApi from '../helpers/localApi/index';
import 'bootstrap/dist/css/bootstrap.css';

const Login = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorEmail, setErrorEmail] = useState(true);
  const [errorPassword, setErrorPassword] = useState(true);
  console.log(password);

  const validadorEmail = (value) => {
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    const errorCases = [
      !value || regex.test(value) === false,
    ];

    const attrAreOk = errorCases.every((er) => er !== true);
    return !attrAreOk;
  };

  const validadorSenha = (value) => {
    const minLength = 6;

    if (value.length <= minLength) return true;
    return false;
  };

  const handleSubmit = () => {
    localApi.setLocalKey('mealsToken', '1');
    localApi.setLocalKey('cocktailsToken', '1');
    localApi.setLocalKey('user', { email });
    localApi.setLocalKey('doneRecipes', []);
    localApi.setLocalKey('favoriteRecipes', [
      {
        id: '52771',
        type: 'food',
        nationality: 'Italian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: 'Spicy Arrabiata Penne',
        image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      },
      {
        id: '178319',
        type: 'drink',
        nationality: '',
        category: 'Cocktail',
        alcoholicOrNot: 'Alcoholic',
        name: 'Aquamarine',
        image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      },
    ]);
    localApi.setLocalKey('inProgressRecipes', { cocktails: {}, meals: {} });
    history.push('/foods');
  };

  const handleChange = ({ target }) => {
    if (target.type === 'email') {
      setEmail(target.value);
      setErrorEmail(validadorEmail(target.value));
    } else {
      setPassword(target.value);
      setErrorPassword(validadorSenha(target.value));
    }
  };

  return (
    <div className="l-login">
      <div className="l-login-container">
        <div className="l-login-header">
          <h1>Login</h1>
        </div>
        <form>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              data-testid="email-input"
              onChange={ handleChange }
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              data-testid="password-input"
              onChange={ handleChange }
            />
          </div>
          <button
            type="button"
            className="btn btn-primary"
            data-testid="login-submit-btn"
            disabled={ errorEmail || errorPassword }
            onClick={ handleSubmit }
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

Login.propTypes = {
  history: propTypes.objectOf(propTypes.any),
}.isRequired;

export default Login;
