import { useLoaderData, useNavigate } from 'react-router-dom';
import { CocktailsRecipeCard } from './Components/CocktailsRecipeCard/CocktailsRecipeCard';
import { CocktailInterface } from 'interfaces';
import styles from './CocktailsRecipe.module.scss';

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
        <i className="fa-solid fa-arrow-left"></i>
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