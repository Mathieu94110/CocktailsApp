import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CocktailInterface } from 'interfaces';
import styles from './Recipe.module.scss';
import { getFavorites, addToFavorite, removeFromFavorite, } from 'api';

export const Recipe = ({ cocktails }: { cocktails: CocktailInterface }) => {
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

  async function toggleOnFavorite() {
    if (Favorited) {
      const removed = await removeFromFavorite(variables);
      setFavorited(!Favorited);
      alert(removed.message);
    } else {
      const added = await addToFavorite(variables);
      if (added.data.success) {
        alert(`${variables.strDrink} a été ajouté à vos favoris`);
        setFavorited(!Favorited);
      }
    }
  }

  async function fetchFavoredCocktail() {
    const response = await getFavorites(variable);
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
          onClick={toggleOnFavorite}
          className={`fa-solid fa-heart ${Favorited ? 'text-primary' : ''}`}
        ></i>
      </div>
    </div>
  );
};
