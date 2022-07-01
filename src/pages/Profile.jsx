import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../component/header';
import Footer from '../component/Footer';
import * as localApi from '../helpers/localApi/index';
import './profile.css';

const Profile = () => {
  const [userEmail, setUserEmail] = useState('');
  const history = useHistory();

  useEffect(() => {
    const getUserEmail = () => {
      const localStorage = localApi.getLocalKey('user');
      if (localStorage) {
        const { email } = localStorage;
        setUserEmail(email);
      }
    };
    getUserEmail();
  }, [setUserEmail]);

  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div className="l-profile">
      <Header title="Profile" />
      <p data-testid="profile-email">{ userEmail }</p>
      <section className="buttons-container">
        <Link
          to="/done-recipes"
          data-testid="profile-done-btn"
          className="link btn btn-primary btn-dark"
        >
          Done Recipes
        </Link>

        <Link
          to="/favorite-recipes"
          data-testid="profile-favorite-btn"
          className="link btn btn-primary btn-dark"
        >
          Favorite Recipes
        </Link>

        <button
          type="button"
          onClick={ handleLogout }
          data-testid="profile-logout-btn"
          className="btn btn-primary btn-dark"
        >
          Logout
        </button>
      </section>
      <Footer />
    </div>
  );
};

export default Profile;
