import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFavorites,  addToFavorites, removeFromFavorites } from 'api';
import { CocktailInterface } from 'interfaces';
import styles from './Recipe.module.scss';

export const Recipe = ({ cocktails }: { cocktails: CocktailInterface }) => {
  const [favorited, setFavorited] = useState(false);
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

  async function toggleOnFavorite() {
    if (favorited) {
      const removed = await removeFromFavorites(variables);
      setFavorited(!favorited);
      alert(removed.message);
    } else {
      const added = await addToFavorites(variables);
      if (added.data.success) {
        alert(`${variables.strDrink} a été ajouté à vos favoris`);
        setFavorited(!favorited);
      }
    }
  }

  async function fetchFavoredCocktail() {
    const variable: { userFrom: string } = {
      userFrom: localStorage.getItem('userId')!,
    };
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
  }, [favorited, cocktails]);

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
          className={`fa-solid fa-heart ${favorited ? 'text-primary' : ''}`}
        ></i>
      </div>
    </div>
  );
};
