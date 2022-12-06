import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './CocktailsRecipe.module.scss';
import CocktailsRecipeCard from './Components/CocktailsRecipeCard/CocktailsRecipeCard';

function CocktailsRecipe() {
  const { name } = useParams();

  useEffect(() => {
    console.log(name);
  });

  return (
    <div className={styles.cocktailsRecipe}>
      <CocktailsRecipeCard />
    </div>
  );
}

export default CocktailsRecipe;
