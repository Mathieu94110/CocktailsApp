import { CocktailInterface } from 'interfaces';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Recipe.module.scss';

function Recipe({ cocktails }: { cocktails: CocktailInterface }) {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();
  const goToRecipe = () => navigate(`/recipe/${cocktails.strDrink}`);
  function handleClick() {
    setLiked(!liked);
  }

  return (
    <div className={styles.recipe}>
      <i className="fa-solid fa-xmark"></i>
      <div className={styles.imageContainer}>
        <img
          src={cocktails.strDrinkThumb}
          alt={cocktails.strDrink}
          onClick={goToRecipe}
        />
      </div>
      <div
        className={`${styles.recipeTitle} d-flex flex-column justify-content-center align-items-center`}
      >
        <h3 className="mb-10">{cocktails.strDrink}</h3>
        <i
          onClick={handleClick}
          className={`fa-solid fa-heart ${liked ? 'text-primary' : ''}`}
        ></i>
      </div>
    </div>
  );
}

export default Recipe;
