import styles from './Favorite.module.scss';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loading from '../../components/Loading/Loading';
import { CocktailInterface } from 'interfaces';
import { useNavigate } from 'react-router';
import { useContext } from 'react';
import { AuthContext } from '../../context';
import { Navigate } from 'react-router-dom';

function Favorite() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [Favorites, setFavorites] = useState([]);
  const { user } = useContext<any>(AuthContext);
  const variable: { userFrom: string } = {
    userFrom: localStorage.getItem('userId')!,
  };

  const navigate = useNavigate();
  const goToRecipe = (id: string) => navigate(`/recipe/${id}`);

  const fetchFavoredMovie = () => {
    axios
      .post('/api/favorite/getFavoredCocktail', variable)
      .then((response) => {
        if (response.data.success) {
          setIsLoading(false);
          setFavorites(response.data.favorites);
        } else {
          alert('Failed to get cocktail favorites');
        }
      });
  };
  const onClickDelete = (favoriteId: string, userFrom: string) => {
    const variables = {
      idDrink: favoriteId,
      userFrom: userFrom,
    };

    axios
      .post('/api/favorite/removeFromFavorite', variables)
      .then((response) => {
        if (response.data.success) {
          fetchFavoredMovie();
        } else {
          alert('Failed to Remove From Favorite');
        }
      });
  };
  useEffect(() => {
    fetchFavoredMovie();
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
      {user ? (
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
        <Navigate to="/"></Navigate>
      )}
    </>
  );
}

export default Favorite;
