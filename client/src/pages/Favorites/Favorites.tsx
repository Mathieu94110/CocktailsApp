import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Loading } from 'components';
import FavoritesApi from 'api/favorites';
import { useToasts } from 'context';
import { CocktailInterface } from 'interfaces';
import styles from './Favorites.module.scss';

export const Favorites = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [favorites, setFavorites] = useState<CocktailInterface[]>([]);
  const { pushToast } = useToasts();
  const userInfos: { userFrom: string } = {
    userFrom: localStorage.getItem('userId')!, //here userId always exist
  };
  const navigate = useNavigate();

  const fetchFavoredCocktail = async (): Promise<void> => {
    const response = await FavoritesApi.getFavorites(userInfos);
    if (response.success) {
      setFavorites(response.favorites);
      setIsLoading(false);
    } else {
      pushToast({
        title: 'Erreur',
        type: 'danger',
        content: 'Problème rencontré lors de la récupération de vos favoris',
        duration: 2,
      });
    }
  };

  const handleClickDeleteFavorite = async (
    favorite: CocktailInterface,
    userFrom: string
  ): Promise<void> => {
    const favoriteInfos: Partial<CocktailInterface> & {
      userFrom: string | null;
    } = {
      idDrink: favorite.idDrink,
      userFrom: userFrom,
    };
    const response = await FavoritesApi.removeFromFavorites(favoriteInfos);
    if (response.ok) {
      setFavorites(favorites.filter((f) => f.idDrink !== favorite.idDrink));
      pushToast({
        title: 'Succès',
        type: 'success',
        content: `${favorite.strDrink} a été retiré de vos favoris`,
        duration: 2,
      });
    } else {
      pushToast({
        title: 'Erreur',
        type: 'danger',
        content: 'Erreur rencontrée lors de la suppression du favoris',
        duration: 2,
      });
    }
  };

  useEffect(() => {
    fetchFavoredCocktail();
  }, []);
  const renderCards = favorites.map(
    (favorite: CocktailInterface, index: number) => {
      return (
        <tr key={index}>
          <td>
            {' '}
            {favorite.strDrinkThumb && (
              <img
                src={favorite.strDrinkThumb}
                alt={favorite.strDrink}
                className={styles.favoriteImg}
              />
            )}
          </td>
          <td data-testid="strDrink">{favorite.strDrink}</td>
          <td>{favorite.strCategory}</td>
          <td>{favorite.strAlcoholic}</td>
          <td>
            <button
              onClick={() =>
                handleClickDeleteFavorite(favorite, userInfos.userFrom)
              }
              className={`${styles.RecipeButtons} mr-5 mb-5 btn btn-reverse-danger`}
            >
              {' '}
              Suppprimer{' '}
            </button>
            <button
              className={`${styles.RecipeButtons} mr-5 btn btn-reverse-primary`}
              onClick={() => navigate(`/recipe/${favorite.idDrink}`)}
            >
              Recette
            </button>
          </td>
        </tr>
      );
    }
  );
  return (
    <div className="flex-fill m-20 position-relative">
      <h1> Vos favoris </h1>
      <hr />
      {isLoading && !favorites.length ? (
        <div className={`${styles.loaderContainer} center-content`}>
          <Loading />
        </div>
      ) : (
        <>
          {favorites.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Nom du cocktail</th>
                  <th>Catégorie</th>
                  <td>Alcool</td>
                </tr>
              </thead>
              <tbody>{renderCards}</tbody>
            </table>
          ) : (
            <div className="flex-fill center-content">
              <h2>Vous n'avez pas enregistré de favoris</h2>
            </div>
          )}
        </>
      )}
    </div>
  );
};
