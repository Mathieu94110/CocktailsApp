import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFavorites, addToFavorites, removeFromFavorites } from 'api';
import { useToasts } from 'context';
import { CocktailInterface } from 'interfaces';
import styles from './Recipe.module.scss';

export const Recipe = ({ cocktails }: { cocktails: CocktailInterface }) => {
  const [favorited, setFavorited] = useState(false);
  const userFrom = localStorage.getItem('userId');
  const navigate = useNavigate();
  const { pushToast } = useToasts();
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
      pushToast({
        title: 'Succès',
        type: 'success',
        content: `${variables.strDrink} a été retiré de vos favoris`,
        duration: 2,
      });
    } else {
      const added = await addToFavorites(variables);
      if (added.data.success) {
        pushToast({
          title: 'Succès',
          type: 'success',
          content: `${variables.strDrink} a été ajouté à vos favoris`,
          duration: 2,
        });
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
      pushToast({
        title: 'Erreur',
        type: 'danger',
        content: 'Problème rencontré lors de la récupération de vos favoris',
        duration: 2,
      });
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
