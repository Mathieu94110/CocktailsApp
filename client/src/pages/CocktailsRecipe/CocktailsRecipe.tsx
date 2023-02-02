import { useLoaderData, useNavigate } from 'react-router-dom';
import { CocktailsRecipeCard } from './Components/CocktailsRecipeCard/CocktailsRecipeCard';
import styles from './CocktailsRecipe.module.scss';
import { CocktailInterface } from 'interfaces';

export const CocktailsRecipe = () => {
  const recipes = useLoaderData() as CocktailInterface[];
  const navigate = useNavigate();

  return (
    <div className={styles.cocktailsRecipe}>
      <button
        className={styles.backButton}
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </button>
      <ul className={styles.cardContainer}>
        {recipes &&
          recipes.map((r: CocktailInterface, index: number) => (
            <li key={index}>
              <CocktailsRecipeCard recipe={r} />
            </li>
          ))}
      </ul>
    </div>
  );
};