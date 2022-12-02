import React, { useState } from 'react';
import testCocktail from '../assets/images/test-cocktail.png';
import styles from './Recipe.module.scss';

function Recipe() {
  const [liked, setLiked] = useState(false);

  function handleClick() {
    setLiked(!liked);
  }

  return (
    <div onClick={handleClick} className={styles.recipe}>
      <div className={styles.imageContainer}>
        <img src={testCocktail} alt="test-image" />
      </div>
      <div
        className={`${styles.recipeTitle} d-flex flex-column justify-content-center align-items-center`}
      >
        <h3 className="mb-10">Sex and the beach</h3>
        <i className={`fa-solid fa-heart ${liked ? 'text-primary' : ''}`}></i>
      </div>
    </div>
  );
}

export default Recipe;
