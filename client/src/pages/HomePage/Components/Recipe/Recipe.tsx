import { CocktailInterface } from 'interfaces';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Recipe.module.scss';
import axios from 'axios';

function Recipe({ cocktails }: { cocktails: CocktailInterface }) {
  const [liked, setLiked] = useState<boolean>(false);
  const [Favorited, setFavorited] = useState(false);
  const navigate = useNavigate();
  const goToRecipe = () => navigate(`/recipe/${cocktails.idDrink}`);
  const userFrom = localStorage.getItem('userId');

  const variables = {
    idDrink: cocktails.idDrink,
    userFrom: userFrom,
    strDrink: cocktails.strDrink,
    strDrinkThumb: cocktails.strDrinkThumb,
    strCategory: cocktails.strCategory,
    strAlcoholic: cocktails.strAlcoholic,
  };

  function addToFavorite() {
    setFavorited(!Favorited);
    if (Favorited) {
      //when we are already subscribed
      axios
        .post('/api/favorite/removeFromFavorite', variables)
        .then((response) => {
          if (response.data.success) {
          } else {
            alert('Failed to Remove From Favorite');
          }
        });
    } else {
      setLiked(!liked);
      axios.post('/api/favorite/addToFavorite', variables).then((response) => {
        if (response.data.success) {
        } else {
          alert('Failed to Add To Favorite');
        }
      });
    }
  }
  useEffect(() => {
    axios.post('/api/favorite/favorited', variables).then((response) => {
      if (response.data.success) {
        setFavorited(response.data.subcribed);
      } else {
        alert('Failed to get Favorite Information');
      }
    });
  }, []);

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
          onClick={addToFavorite}
          className={`fa-solid fa-heart ${liked ? 'text-primary' : ''}`}
        ></i>
      </div>
    </div>
  );
}
export default Recipe;
