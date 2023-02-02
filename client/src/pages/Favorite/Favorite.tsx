import styles from './Favorite.module.scss';
import { useEffect, useState, useContext } from 'react';
import {Loading } from 'components';
import { CocktailInterface } from 'interfaces';
import { useNavigate } from 'react-router';
import { AuthContext } from 'context';
import { Navigate } from 'react-router-dom';
import { getFavorites, removeFromFavorite } from 'api';

export const Favorite = ()=> {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [Favorites, setFavorites] = useState([]);
  const { user } = useContext<any>(AuthContext);
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
      alert('Failed to get cocktail favorites');
    }
  }

  async function onClickDelete(favoriteId: string, userFrom: string) {
    const variables = {
      idDrink: favoriteId,
      userFrom: userFrom,
    };
    const response = await removeFromFavorite(variables);
    if (response.response.data.success) {
      fetchFavoredCocktail();
    } else {
      alert('Failed to Remove From Favorite');
    }
  }

  useEffect(() => {
    fetchFavoredCocktail();
  }, []);

  const renderCards = Favorites.map(
    (favorite: CocktailInterface, index: number) => {
      return (
        <tr key={index}>
          <td>
            {' '}
            {favorite.strDrinkThumb && (
              <img
                src={favorite.strDrinkThumb}
                alt={favorite.strDrink}
                height="100px"
              />
            )}
          </td>
          <td>{favorite.strDrink}</td>
          <td>{favorite.strCategory}</td>
          <td>{favorite.strAlcoholic}</td>
          <td>
            <button
              onClick={() => onClickDelete(favorite.idDrink, variable.userFrom)}
              className="mr-5 btn btn-reverse-danger"
            >
              {' '}
              Suppprimer{' '}
            </button>
            <button
              className="mr-5 btn btn-reverse-primary"
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
    <>
      {Favorites.length ? (
        <div className="flex-fill m-20">
          <h1> Vos favoris </h1>
          <hr />
          {isLoading ? (
            <div className={styles.loaderContainer}>
              <Loading />
            </div>
          ) : (
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
          )}
        </div>
      ) : (
        <div className="flex-fill vertical-center-content align-items-center">
          <h2>Vous n'avez pas enregistré de favoris</h2>
        </div>
      )}
      {!user && <Navigate to="/"></Navigate>}
    </>
  );
}
