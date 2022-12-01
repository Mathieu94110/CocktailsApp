import React from 'react';
import styles from './Recipe.module.scss';
import testCocktail from '../assets/images/test-cocktail.png';
function Recipe() {
  return (
    <div className={styles.recipe}>
      <div className={styles.imageContainer}>
        <img src={testCocktail} alt="recipe" />
      </div>
      <div
        className={`${styles.recipeTitle} d-flex flex-row justify-content-center align-items-center`}
      >
        <h3>Sex and the beach</h3>
      </div>
    </div>
  );
}

export default Recipe;
