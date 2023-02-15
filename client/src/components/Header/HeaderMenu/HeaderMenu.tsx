import { MouseEventHandler } from 'react';
import { NavLink, PathMatch } from 'react-router-dom';
import styles from './HeaderMenu.module.scss';

export const HeaderMenu = ({
  hideMenu,
  matchHomepage,
  logout,
}: {
  hideMenu: MouseEventHandler<HTMLUListElement>;
  matchHomepage: PathMatch<string> | null;
  logout: () => void;
}) => {
  return (
    <ul onClick={hideMenu} className={`${styles.MenuContainer} card p-20`}>
      <li>
        {matchHomepage ? (
          <NavLink to="/favorites">Favoris</NavLink>
        ) : (
          <NavLink to="/">Accueil</NavLink>
        )}
      </li>
      <li onClick={logout}>Déconnexion</li>
    </ul>
  );
};
