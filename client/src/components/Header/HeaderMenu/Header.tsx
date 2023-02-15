import { useContext, useState } from 'react';
import { NavLink, useNavigate, useMatch } from 'react-router-dom';
import { AuthContext } from 'context';
import { HeaderList } from './HeaderList';
import cocktailsImg from 'assets/images/cocktails-logo.png';
import styles from './Header.module.scss';

export const Header = () => {
  const { user, signout } = useContext<any>(AuthContext);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const navigate = useNavigate();
  const matchHomepage = useMatch('/');
  const goFavorite = () => navigate('/favorites');
  const goToHome = () => navigate('/');
  return (
    <header className={`${styles.header} d-flex flex-row align-items-center`}>
      {user ? (
        <>
          <div className="d-flex flex-fill align-items-center">
            <img src={cocktailsImg} alt="logo cocktails" />
            <h1>Cocktails Master</h1>
          </div>
          <ul className={styles.headerList}>
            <button
              onClick={matchHomepage ? goFavorite : goToHome}
              className="mr-5 btn btn-reverse-primary"
            >
              <i className="fa-solid fa-basket-shopping mr-5"></i>
              {matchHomepage ? <span>Favoris</span> : <span>Accueil</span>}
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
              <HeaderList />
            </>
          )}
        </>
      ) : (
        <ul>
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
};
