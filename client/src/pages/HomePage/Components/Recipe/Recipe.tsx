import { CocktailInterface } from 'interfaces';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Recipe.module.scss';
import favoriteApi from 'api/favorite';

function Recipe({ cocktails }: { cocktails: CocktailInterface }) {
  const [Favorited, setFavorited] = useState(false);
  const userFrom = localStorage.getItem('userId');
  const navigate = useNavigate();
  const goToRecipe = () => navigate(`/recipe/${cocktails.idDrink}`);

  const variables = {
    idDrink: cocktails.idDrink,
    userFrom: userFrom,
    strDrink: cocktails.strDrink,
    strDrinkThumb: cocktails.strDrinkThumb,
    strCategory: cocktails.strCategory,
    strAlcoholic: cocktails.strAlcoholic,
  };

  const variable: { userFrom: string } = {
    userFrom: localStorage.getItem('userId')!,
  };

  async function addToFavorite() {
    if (Favorited) {
      const removed = await favoriteApi.removeFromFavorite(variables);
      setFavorited(!Favorited);
      alert(removed.message);
    } else {
      const added = await favoriteApi.addToFavorite(variables);
      if (added.data.success) {
        alert(`${variables.strDrink} a été ajouté à vos favoris`);
        setFavorited(!Favorited);
      }
    }
  }

  async function fetchFavoredCocktail() {
    const response = await favoriteApi.getFavorites(variable);
    if (response.data.success) {
      const favorites = response.data.favorites;
      const cocktailOnFavorite = favorites.filter(
        (item: CocktailInterface) => item.idDrink === cocktails.idDrink
      );
      if (cocktailOnFavorite.length) {
        setFavorited(true);
      } else {
        setFavorited(false);
      }
    } else {
      alert('Échec lors de la récupération des favoris');
    }
  }

  useEffect(() => {
    fetchFavoredCocktail();
  }, [Favorited, cocktails]);

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
          onClick={addToFavorite}
          className={`fa-solid fa-heart ${Favorited ? 'text-primary' : ''}`}
        ></i>
      </div>
    </div>
  );
}
export default Recipe;
