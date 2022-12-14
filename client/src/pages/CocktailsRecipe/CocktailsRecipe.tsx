import { CocktailInterface } from 'interfaces';
import { useLoaderData, useNavigate } from 'react-router-dom';
import CocktailsRecipeCard from './Components/CocktailsRecipeCard/CocktailsRecipeCard';
import styles from './CocktailsRecipe.module.scss';

function CocktailsRecipe() {
  const recipes = useLoaderData() as CocktailInterface[];
  const navigate = useNavigate();

  return (
    <div className={styles.cocktailsRecipe}>
      <button
        className={styles.backButton}
        onClick={() => {
          navigate('/', { replace: true });
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
}

export default CocktailsRecipe;
