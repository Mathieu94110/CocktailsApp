import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { Navigate } from 'react-router-dom';
import { AuthContext } from 'context';
import { Loading } from 'components';
import { getFavorites, removeFromFavorites } from 'api';
import { useToasts } from 'context';
import { CocktailInterface } from 'interfaces';
import styles from './Favorites.module.scss';

export const Favorites = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [favorites, setFavorites] = useState<CocktailInterface[]>([]);
  const { user } = useContext<any>(AuthContext);
  const { pushToast } = useToasts();
  const variable: { userFrom: string } = {
    userFrom: localStorage.getItem('userId')!, //here userId always exist
  };

  const navigate = useNavigate();
  const goToRecipe = (id: string) => navigate(`/recipe/${id}`);

  async function fetchFavoredCocktail() {
    const response = await getFavorites(variable);

    if (response.data.success) {
      setIsLoading(false);
      setFavorites(response.data.favorites);
    } else {
      pushToast({
        title: 'Erreur',
        type: 'success',
        content: 'Problème rencontré lors de la récupération de vos favoris',
        duration: 2,
      });
    }
  }

  async function handleClickDeleteFavorite(
    favorite: CocktailInterface,
    userFrom: string
  ) {
    const variables = {
      idDrink: favorite.idDrink,
      userFrom: userFrom,
    };
    const response = await removeFromFavorites(variables);
    if (response.response.data.success) {
      pushToast({
        title: 'Succès',
        type: 'success',
        content: `${favorite.strDrink} a été retiré de vos favoris`,
        duration: 2,
      });
      setFavorites(favorites.filter((f) => f.idDrink !== favorite.idDrink));
    } else {
      pushToast({
        title: 'Erreur',
        type: 'danger',
        content: 'Erreur rencontrée lors de la suppression du favoris',
        duration: 2,
      });
    }
  }

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
          <td>{favorite.strDrink}</td>
          <td>{favorite.strCategory}</td>
          <td>{favorite.strAlcoholic}</td>
          <td>
            <button
              onClick={() =>
                handleClickDeleteFavorite(favorite, variable.userFrom)
              }
              className={`${styles.RecipeButtons} mr-5 mb-5 btn btn-reverse-danger`}
            >
              {' '}
              Suppprimer{' '}
            </button>
            <button
              className={`${styles.RecipeButtons} mr-5 btn btn-reverse-primary`}
              onClick={() => goToRecipe(favorite.idDrink)}
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
      {!user && <Navigate to="/"></Navigate>}
    </div>
  );
};
