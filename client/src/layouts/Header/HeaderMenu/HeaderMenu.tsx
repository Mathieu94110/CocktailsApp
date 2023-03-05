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
            <NavLink to="/favorites">Favoris</NavLink>
          </li>
          <li>
            <NavLink to="/">Accueil</NavLink>
          </li>
        </>
      ) : matchHomepage ? (
        <li data-cy="favorites-btn-mobile">
          <NavLink to="/favorites">Favoris</NavLink>
        </li>
      ) : (
        <li>
          <NavLink to="/">Accueil</NavLink>
        </li>
      )}

      <li onClick={logout}>Déconnexion</li>
    </ul>
  );
};
