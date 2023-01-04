import React from 'react';
import styles from './HeaderMenuList.module.scss';

function HeaderMenuList() {
  return (
    <ul className={`${styles.MenuContainer} card p-20`}>
      <li>Favoris</li>
      <li>Connexion</li>
    </ul>
  );
}

export default HeaderMenuList;
