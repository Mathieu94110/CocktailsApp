import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer
      className={`${styles.footer} d-flex flex-row align-items-center justify-content-center`}
    >
      <p>Copyright © 2022 Mathieu Enault, Inc.</p>
    </footer>
  );
};
