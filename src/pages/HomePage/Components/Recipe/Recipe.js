import React, { useState } from 'react';
import styles from './Recipe.module.scss';

function Recipe({ cocktails }) {
  const [liked, setLiked] = useState(false);

  function handleClick() {
    setLiked(!liked);
  }

  return (
    <div className={styles.recipe}>
      <i className="fa-solid fa-xmark"></i>
      <div className={styles.imageContainer}>
        <img src={cocktails.strDrinkThumb} alt={cocktails.strDrink} />
      </div>
      <div
        onClick={handleClick}
        className={`${styles.recipeTitle} d-flex flex-column justify-content-center align-items-center`}
      >
        <h3 className="mb-10">{cocktails.strDrink}</h3>
        <i className={`fa-solid fa-heart ${liked ? 'text-primary' : ''}`}></i>
      </div>
    </div>
  );
}

export default Recipe;
