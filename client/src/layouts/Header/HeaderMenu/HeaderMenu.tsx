import { MouseEventHandler } from 'react';
import { NavLink, PathMatch } from 'react-router-dom';
import styles from './HeaderMenu.module.scss';

export const HeaderMenu = ({
  hideMenu,
  matchHomepage,
  matchRecipePage,
  logout,
}: {
  hideMenu: MouseEventHandler<HTMLUListElement>;
  matchHomepage: PathMatch<string> | null;
  matchRecipePage: PathMatch<string> | null;
  logout: () => void;
}) => {
  return (
    <ul onClick={hideMenu} className={`${styles.MenuContainer} card p-20`}>
      {matchRecipePage ? (
        <>
          <li data-cy="favorites-btn-mobile">
            <NavLink to="/favorites" data-cy="favorites-link">
              Favoris
            </NavLink>
          </li>
          <li>
            <NavLink to="/" data-cy="home-link">
              Accueil
            </NavLink>
          </li>
        </>
      ) : matchHomepage ? (
        <li>
          <NavLink to="/favorites" data-cy="favorites-link">
            Favoris
          </NavLink>
        </li>
      ) : (
        <li>
          <NavLink to="/" data-cy="home-link">
            Accueil
          </NavLink>
        </li>
      )}
      <li onClick={logout} data-cy="logout-button">
        Déconnection
      </li>
    </ul>
  );
};
