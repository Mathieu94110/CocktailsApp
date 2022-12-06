import React, { useEffect } from 'react';
import styles from './CocktailsRecipeCard.module.scss';

function CocktailsRecipeCard({ recipe }) {
  const {
    strCategory,
    strDrink,
    strAlcoholic,
    strDrinkThumb,
    strInstructions,
  } = recipe;
  useEffect(() => {
    console.log(recipe);
  });
  return (
    <div className={styles.cardContainer}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div>
            <span className={styles.subTitle}>Category</span>: {strCategory}
          </div>
          <div className={styles.cardtitleGroup}>
            <h5 className={styles.cardTitle}>
              <span className={styles.subTitle}>Title</span>: {strDrink}
            </h5>
            <div className={styles.cardAlcool}>
              <span className={styles.subTitle}>Alcool</span>: {strAlcoholic}
            </div>
          </div>
        </div>
        <img className={styles.cardImage} src={strDrinkThumb} alt={strDrink} />
        <div className={styles.cardText}>
          <span className={styles.subTitle}>Instructions</span>:{' '}
          {strInstructions}
        </div>
      </div>
    </div>
  );
}

export default CocktailsRecipeCard;
