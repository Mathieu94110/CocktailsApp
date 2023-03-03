import { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate, useMatch } from 'react-router-dom';
import { AuthContext } from 'context';
import { HeaderMenu } from './HeaderMenu/HeaderMenu';
import { Button } from 'components';
import cocktailsImg from 'assets/images/cocktails-logo.png';
import styles from './Header.module.scss';

export const Header = () => {
  const { user, signout } = useContext<any>(AuthContext);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const navigate = useNavigate();
  const matchHomepage = useMatch('/');
  const matchRecipePage = useMatch('/recipe/:id');
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
          <div className={styles.headerList}>
            {matchRecipePage ? (
              <>
                <Button onClick={goToHome} className="btn-reverse-primary">
                  <i className="fa-solid fa-house mr-5"></i>
                  <span>Accueil</span>
                </Button>
                <Button onClick={goFavorite} className="btn-reverse-primary">
                  <i className="fa-solid fa-basket-shopping mr-5"></i>
                  <span>Favoris</span>
                </Button>
              </>
            ) : (
              <Button
                onClick={matchHomepage ? goFavorite : goToHome}
                className="btn-reverse-primary"
              >
                <i
                  className={
                    matchHomepage
                      ? 'fa-solid fa-basket-shopping mr-5'
                      : 'fa-solid fa-house mr-5'
                  }
                ></i>
                {matchHomepage ? <span>Favoris</span> : <span>Accueil</span>}
              </Button>
            )}
            <Button className="btn-reverse-danger" onClick={() => signout()}>
              Déconnexion
            </Button>
          </div>
          <i
            onClick={() => setShowMenu(true)}
            className={`fa-solid fa-bars ${styles.headerXs}`}
          ></i>
          {showMenu && (
            <>
              <div onClick={() => setShowMenu(false)} className="calc"></div>
              <HeaderMenu
                logout={() => signout()}
                matchRecipePage={matchRecipePage}
                matchHomepage={matchHomepage}
                hideMenu={() => setShowMenu(false)}
              />
            </>
          )}
        </>
      ) : (
        <nav>
          <ul>
            <li>
              <NavLink
                to="signup"
                data-cy='registration'
                className={({ isActive }) =>
                  isActive ? `${styles.active} mr-15` : `${styles.links} mr-15`
                }
              >
                Inscription
              </NavLink>
            </li>
            <li>
              <NavLink
                end
                to="signin"
                className={({ isActive }) =>
                  isActive ? styles.active : styles.links
                }
              >
                Connexion
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};
