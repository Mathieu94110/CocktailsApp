import { CocktailInterface } from 'interfaces';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Recipe.module.scss';

function Recipe({ cocktails }: { cocktails: CocktailInterface }) {
  const [liked, setLiked] = useState<boolean>(false);
  const navigate = useNavigate();
  const goToRecipe = () => navigate(`/recipe/${cocktails.strDrink}`);
  function handleClick() {
    setLiked(!liked);
  }

  return (
    <div className={styles.recipe}>
      <div className={styles.imageContainer}>
        <img
          src={cocktails.strDrinkThumb}
          alt={cocktails.strDrink}
          onClick={goToRecipe}
        />
      </div>
      <div
        className={`${styles.recipeContent} d-flex flex-column space-between align-items-center pb-10 pt-5`}
      >
        <h3 className="text-center">{cocktails.strDrink}</h3>
        <i
          onClick={handleClick}
          className={`fa-solid fa-heart ${liked ? 'text-primary' : ''}`}
        ></i>
      </div>
    </div>
  );
}

export default Recipe;
