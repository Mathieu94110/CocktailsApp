import React from 'react';
import styles from './Footer.module.scss';

function Footer() {
  return (
    <footer
      className={`${styles.footer} d-flex flex-row align-items-center justify-content-center`}
    >
      <p>Copyright © 2022 Mathieu Enault, Inc.</p>
    </footer>
  );
}

export default Footer;
