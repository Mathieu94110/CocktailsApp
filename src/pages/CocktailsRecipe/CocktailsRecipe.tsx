// import { CocktailInterface } from 'interfaces';
import { CocktailInterface } from 'interfaces';
import React, { useEffect, useState } from 'react';
import { /* useParams, */ useLoaderData } from 'react-router-dom';
import styles from './CocktailsRecipe.module.scss';
import CocktailsRecipeCard from './Components/CocktailsRecipeCard/CocktailsRecipeCard';

function CocktailsRecipe() {
  const [isLoading, setIsLoading] = useState(true);
  const recipes = useLoaderData() as CocktailInterface[];
  // const { name } = useParams();

  useEffect(() => {
    if (recipes) {
      setIsLoading(false);
    }
  }, [recipes]);

  return (
    <div className={styles.cocktailsRecipe}>
      {isLoading ? (
        'Loading'
      ) : (
        <ul className={styles.cardContainer}>
          {' '}
          {recipes.map((r: CocktailInterface) => (
            <li key={r.strDrink}>
              <CocktailsRecipeCard recipe={r} />
            </li>
          ))}{' '}
        </ul>
      )}
    </div>
  );
}

export default CocktailsRecipe;
