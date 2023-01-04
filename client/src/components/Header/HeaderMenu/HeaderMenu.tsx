import React, { useContext } from 'react';
import styles from './HeaderMenu.module.scss';
import cocktailsImg from '../../../assets/images/cocktails-logo.png';
import { useState } from 'react';
import HeaderMenuList from './HeaderMenuList';
import { NavLink } from 'react-router-dom';
import { AuthContext } from 'context';

function HeaderMenu() {
  const { user, signout } = useContext<any>(AuthContext);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  return (
    <header className={`${styles.header} d-flex flex-row align-items-center`}>
      {user ? (
        <>
          <div className="flex-fill vertical-center">
            <img src={cocktailsImg} alt="logo cocktails" />
            <h1>Cocktails Master</h1>
          </div>
          <ul className={styles.headerList}>
            <button className="mr-5 btn btn-reverse-primary">
              <i className="fa-solid fa-basket-shopping mr-5"></i>
              <span>Favoris</span>
            </button>
            <button
              className="mr-5 btn btn-reverse-danger"
              onClick={() => signout()}
            >
              Déconnexion
            </button>
          </ul>
          <i
            onClick={() => setShowMenu(true)}
            className={`fa-solid fa-bars ${styles.headerXs}`}
          ></i>
          {showMenu && (
            <>
              <div onClick={() => setShowMenu(false)} className="calc"></div>
              <HeaderMenuList />
            </>
          )}
        </>
      ) : (
        <ul className={styles.headerList}>
          <NavLink to="signup" className="mr-15">
            Inscription
          </NavLink>
          <NavLink end to="signin">
            Connexion
          </NavLink>
        </ul>
      )}
    </header>
  );
}

export default HeaderMenu;
