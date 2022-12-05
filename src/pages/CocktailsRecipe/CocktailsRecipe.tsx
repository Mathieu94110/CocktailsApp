import React from 'react';
import styles from './CocktailsRecipe.module.scss';
import CocktailsRecipeCard from './Components/CocktailsRecipeCard/CocktailsRecipeCard';

function CocktailsRecipe() {
  return (
    <div className={styles.cocktailsRecipe}>
      <CocktailsRecipeCard />
    </div>
  );
}

export default CocktailsRecipe;
