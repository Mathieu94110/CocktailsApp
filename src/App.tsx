import React from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage/HomePage';
import Footer from './components/Footer';
import styles from './App.module.scss';

function App() {
  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <Header />
      <HomePage />
      <Footer />
    </div>
  );
}

export default App;
