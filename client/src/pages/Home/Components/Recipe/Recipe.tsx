import { useState, useEffect } from 'react';
import { useNavigate, useMatch } from 'react-router-dom';
import FavoritesApi from 'api/favorites';
import { useToasts } from 'context';
import { CocktailInterface } from 'interfaces';
import styles from './Recipe.module.scss';

export const Recipe = ({
  cocktails,
}: {
  cocktails: Partial<CocktailInterface>;
}) => {
  const [favorited, setFavorited] = useState<boolean>(false);
  const userFrom = localStorage.getItem('userId')!;
  const navigate = useNavigate();
  const { pushToast } = useToasts();

  const toggleOnFavorite = async (): Promise<void> => {
    const coktailInfos: Partial<CocktailInterface> & {
      userFrom: string;
    } = {
      idDrink: cocktails.idDrink,
      userFrom: userFrom,
      strDrink: cocktails.strDrink,
      strDrinkThumb: cocktails.strDrinkThumb,
      strCategory: cocktails.strCategory,
      strAlcoholic: cocktails.strAlcoholic,
    };
    if (favorited) {
      const response = await FavoritesApi.removeFromFavorites(coktailInfos);
      if (response.ok) {
        setFavorited(!favorited);
        pushToast({
          title: 'Succès',
          type: 'success',
          content: `${coktailInfos.strDrink} a été retiré de vos favoris`,
          duration: 2,
        });
      } else {
        pushToast({
          title: 'Erreur',
          type: 'danger',
          content: `Erreur lors de la suppression de ${coktailInfos.strDrink} de vos favoris`,
          duration: 2,
        });
      }
    } else {
      const response = await FavoritesApi.addToFavorites(coktailInfos);
      if (response.ok) {
        setFavorited(!favorited);
        pushToast({
          title: 'Succès',
          type: 'success',
          content: `${coktailInfos.strDrink} a été ajouté à vos favoris`,
          duration: 2,
        });
      } else {
        pushToast({
          title: 'Erreur',
          type: 'danger',
          content: `Erreur lors de l'ajout de ${coktailInfos.strDrink} à vos favoris`,
          duration: 2,
        });
      }
    }
  };

  const fetchFavoredCocktail = async (): Promise<void> => {
    const userId: { userFrom: string } = {
      userFrom: localStorage.getItem('userId')!,
    };
    const response = await FavoritesApi.getFavorites(userFrom);
    // let response: any = await fetch('http://localhost:1234/a', {
    //   method: 'POST',
    // });
    if (response && response.success) {
      const cocktailOnFavorite = response.favorites.filter(
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
  };

  useEffect(() => {
    fetchFavoredCocktail();
  }, [favorited, cocktails]);

  return (
    <div
      className={`${styles.recipe} ${
        useMatch(`/recipe/${cocktails.idDrink}`) && 'border-primary' 
      }`}
    >
      <div className={styles.imageContainer}>
        <img
          src={cocktails.strDrinkThumb}
          alt={cocktails.strDrink}
          onClick={() => navigate(`/recipe/${cocktails.idDrink}`)}
        />
      </div>
      <div
        className={`${styles.recipeContent} d-flex flex-column space-between align-items-center pb-10 pt-5`}
      >
        <h3 className="text-center">{cocktails.strDrink}</h3>
        <i
          data-testid="heart-icon"
          onClick={toggleOnFavorite}
          className={`fa-solid fa-heart ${favorited ? 'text-primary' : ''}`}
        ></i>
      </div>
    </div>
  );
};
