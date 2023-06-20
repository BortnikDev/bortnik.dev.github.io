import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../css/Profile.css';

export default function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();

  const goToLogin = () => {
    history.push('/');
    localStorage.clear();
  };

  return (
    <div className="profile__page">
      <Header />
      <main>
        <div className="user-info">
          <h2 className="profile-subtitle"> User Email:</h2>
          <h3
            className="profile-email"
            data-testid="profile-email"
          >
            {user && user.email}
          </h3>
        </div>
        <div className="profile-btns">
          <button
            data-testid="profile-done-btn"
            onClick={ () => { history.push('/done-recipes'); } }
          >
            Done Recipes
          </button>
          <button
            data-testid="profile-favorite-btn"
            onClick={ () => { history.push('/favorite-recipes'); } }
          >
            Favorite Recipes
          </button>
          <button
            data-testid="profile-logout-btn"
            onClick={ goToLogin }
          >
            Logout
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
