import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Loading, Button } from 'components';
import FavoritesApi from 'api/favorites';
import { useToasts } from 'context';
import { CocktailInterface } from 'interfaces';
import styles from './Favorites.module.scss';

export const Favorites = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [favorites, setFavorites] = useState<CocktailInterface[]>([]);
  const { pushToast } = useToasts();
  const userFrom: string = localStorage.getItem('userId')!; //here userId always exist
  const navigate = useNavigate();

  const fetchFavoredCocktail = async (): Promise<void> => {
    // console.log('start');
    const response = await FavoritesApi.getFavorites(userFrom);
    // let response: any = await fetch('http://localhost:1234/x', {
    //   method: 'POST',
    // });
    // console.log('---------------------------------');
    // response = response.json();
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
    userId: string
  ): Promise<void> => {
    const favoriteInfos: Partial<CocktailInterface> & {
      userFrom: string;
    } = {
      idDrink: favorite.idDrink,
      userFrom: userId,
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
                  <th data-testid="custom-element">Nom du cocktail</th>
                  <th>Catégorie</th>
                  <td>Alcool</td>
                </tr>
              </thead>
              <tbody>
                {favorites.map((favorite: CocktailInterface, index: number) => (
                  <tr key={index} data-testid="favorites-items">
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
                        className={`${styles.RecipeButtons}  mb-5 btn-reverse-danger`}
                        onClick={() =>
                          handleClickDeleteFavorite(favorite, userFrom)
                        }
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
                ))}
              </tbody>
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
