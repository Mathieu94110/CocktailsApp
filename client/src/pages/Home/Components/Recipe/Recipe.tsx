import { useState, useEffect } from 'react';
import { useNavigate, useMatch } from 'react-router-dom';
import { CocktailInterface } from 'interfaces';
import styles from './Recipe.module.scss';

export const Recipe = ({
  cocktails,
  favorites,
  toggleFavorite,
}: {
  cocktails: Partial<CocktailInterface>;
  favorites: Partial<CocktailInterface>[];
  toggleFavorite: (c: Partial<CocktailInterface>) => void;
}) => {
  const [favorited, setFavorited] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isOnFavorites = favorites.some(
      (favorite) => favorite.idDrink === cocktails.idDrink
    );
    if (isOnFavorites) {
      setFavorited(true);
    } else {
      setFavorited(false);
    }
  }, [favorites, cocktails]);

  const handleClick = () => {
    toggleFavorite(cocktails);
  };

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
          onClick={handleClick}
          className={`fa-solid fa-heart ${favorited ? 'text-primary' : ''}`}
        ></i>
      </div>
    </div>
  );
};
