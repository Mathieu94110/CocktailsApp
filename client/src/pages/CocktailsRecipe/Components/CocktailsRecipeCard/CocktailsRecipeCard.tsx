import { CocktailInterface } from 'interfaces';
import styles from './CocktailsRecipeCard.module.scss';

export const CocktailsRecipeCard = ({
  recipe,
}: {
  recipe: CocktailInterface;
}) => {
  const {
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
        <img className={styles.cardImage} src={strDrinkThumb} alt={strDrink} />

        <h5 className={styles.cardTitle}>
          <span className={styles.subTitle}>Title:</span>{' '}
          <span>{strDrink}</span>
        </h5>
        <div className={styles.cardText}>
          <span className={styles.subTitle}>Category:</span>{' '}
          <span>{strCategory}</span>
        </div>
        <div className={styles.cardText}>
          <span className={styles.subTitle}>Alcool:</span>{' '}
          <span>{strAlcoholic}</span>
        </div>
        <div className={styles.cardText}>
          <span className={styles.subTitle}>Instructions:</span>{' '}
          <span>{strInstructions}</span>
        </div>
        <div className={styles.cardText}>
          <span className={styles.subTitle}>Glass:</span>{' '}
          <span>{strGlass}</span>
        </div>
        <div className={styles.cardText}>
          <span className={styles.subTitle}>IBA:</span>{' '}
          <span> {strIBA ? strIBA : 'No data'}</span>
        </div>

        <div className={styles.cardText}>
          <span className={styles.subTitle}>Tags:</span>{' '}
          <span> {strTags ? strTags : 'No data'}</span>
        </div>
        <div className={styles.cardText}>
          <span className={styles.subTitle}>Ingredients:</span>{' '}
          <span>
            {ingredients.map((item: string | null, index: number) => {
              return item ? (
                <span key={index}>{(index ? ', ' : '') + item}</span>
              ) : null;
            })}
          </span>
        </div>
        <div className={styles.cardText}>
          <span className={styles.subTitle}>Measures</span>:{' '}
          <span>
            {measures.map((item: string | null, index: number) => {
              return item ? (
                <span key={index}>{(index ? ', ' : '') + item}</span>
              ) : null;
            })}
          </span>
        </div>
      </div>
    </div>
  );
};
