import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { Button } from 'components';
import FavoritesApi from 'api/favorites';
import {
  useToasts,
  CocktailStateContext,
  CocktailsDispatcherContext,
} from 'context';
import { CocktailInterface } from 'interfaces';
import styles from './Favorites.module.scss';

export const Favorites = () => {
  const state = useContext(CocktailStateContext);
  const dispatch = useContext(CocktailsDispatcherContext);
  const { pushToast } = useToasts();
  const navigate = useNavigate();
  const favoritesState = state.favorites;
  const userFrom: string = localStorage.getItem('userId')!;

  const handleClickDeleteFavorite = async (
    favorite: Partial<CocktailInterface>
  ): Promise<void> => {
    const favoriteInfos: Partial<CocktailInterface> & {
      userFrom: string;
    } = {
      idDrink: favorite.idDrink,
      userFrom: userFrom,
    };
    const response = await FavoritesApi.removeFromFavorites(favoriteInfos);
    if (response.ok) {
      dispatch({
        type: 'REMOVE_FAVORITE_COCKTAIL',
        payload: favorite,
      });

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

  return (
    <div className="flex-fill m-20 position-relative">
      <h1> Vos favoris </h1>
      <hr />
      {favoritesState.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th></th>
              <th data-testid="custom-element">Nom du cocktail</th>
              <th>Catégorie</th>
              <td>Alcool</td>
            </tr>
          </thead>
          <tbody data-cy="favorites-table">
            {favoritesState.map(
              (favorite: Partial<CocktailInterface>, index: number) => (
                <tr
                  key={index}
                  data-testid="favorites-items"
                  data-cy="favorites-items"
                >
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
                    <Button
                      data-cy="delete-favorite-btn"
                      className={`${styles.RecipeButtons}  mb-5 btn-reverse-danger`}
                      onClick={() => handleClickDeleteFavorite(favorite)}
                    >
                      Supprimer
                    </Button>

                    <Button
                      className={`${styles.RecipeButtons} btn-reverse-primary`}
                      onClick={() => navigate(`/recipe/${favorite.idDrink}`)}
                    >
                      Recette
                    </Button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      ) : (
        <div className="flex-fill center-content">
          <h2>Vous n'avez pas enregistré de favoris</h2>
        </div>
      )}
    </div>
  );
};
