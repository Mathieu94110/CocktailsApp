import React from 'react';
import styles from './CocktailsRecipeCard.module.scss';
import { CocktailInterface } from '../../../../interfaces/cocktails.interface';

function CocktailsRecipeCard({ recipe }: { recipe: CocktailInterface }) {
  const {
    // idDrink,
    strCategory,
    strDrink,
    strAlcoholic,
    strDrinkThumb,
    strInstructions,
    strGlass,
    strIBA,
    strTags,
    strIngredient1,
    strIngredient2,
    strIngredient3,
    strIngredient4,
    strIngredient5,
    strMeasure1,
    strMeasure2,
    strMeasure3,
    strMeasure4,
    strMeasure5,
    strMeasure6,
    strMeasure7,
    strMeasure8,
    strMeasure9,
    strMeasure10,
    strMeasure11,
    strMeasure12,
    strMeasure13,
    strMeasure14,
    strMeasure15,
  } = recipe;

  const ingredients = [
    strIngredient1,
    strIngredient2,
    strIngredient3,
    strIngredient4,
    strIngredient5,
  ];

  const measures = [
    strMeasure1,
    strMeasure2,
    strMeasure3,
    strMeasure4,
    strMeasure5,
    strMeasure6,
    strMeasure7,
    strMeasure8,
    strMeasure9,
    strMeasure10,
    strMeasure11,
    strMeasure12,
    strMeasure13,
    strMeasure14,
    strMeasure15,
  ];

  return (
    <div>
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
        <div className={styles.cardText}>
          <span className={styles.subTitle}>Glass</span>: {strGlass}
        </div>
        <div className={styles.cardText}>
          <span className={styles.subTitle}>IBA</span>:{' '}
          {strIBA ? strIBA : 'No data'}
        </div>

        <div className={styles.cardText}>
          <span className={styles.subTitle}>Tags</span>:{' '}
          {strTags ? strTags : 'No data'}
        </div>
        <div className={styles.cardText}>
          <span className={styles.subTitle}>Ingredients</span>:{' '}
          {ingredients.map((item, index) => {
            return item ? (
              <span key={index}>{(index ? ', ' : '') + item}</span>
            ) : null;
          })}
        </div>
        <div className={styles.cardText}>
          <span className={styles.subTitle}>Measures</span>:{' '}
          {measures.map((item, index) => {
            return item ? (
              <span key={index}>{(index ? ', ' : '') + item}</span>
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
}

export default CocktailsRecipeCard;
