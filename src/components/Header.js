import React from 'react';
import styles from './Header.module.scss';
import cocktailsImg from '../assets/images/cocktails-logo.png';

function Header() {
  return (
    <header className={`${styles.header} d-flex flex-row align-items-center`}>
      <i className="fa-solid fa-bars"></i>
      <div className="flex-fill-vertical-center">
        <img src={cocktailsImg} alt="logo cocktails" />
        <h1>Cocktails Master</h1>
      </div>
      <ul className="d-flex">
        <button className="mr-5 btn btn-reverse-primary header-buttons">
          <i className="fa-solid fa-basket-shopping mr-5"></i>
          <span>Favoris</span>
        </button>
        <button className="btn btn-primary header-buttons">Connexion</button>
      </ul>
    </header>
  );
}

export default Header;
