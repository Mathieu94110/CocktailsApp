import styles from './HeaderList.module.scss';

export const HeaderList = () => {
  return (
    <ul className={`${styles.MenuContainer} card p-20`}>
      <li>Favoris</li>
      <li>Connexion</li>
    </ul>
  );
};

