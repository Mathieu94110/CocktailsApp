import { ACTIONTYPE } from 'types';
import { CocktailsInitialInterface } from 'interfaces';

const cocktailsReducer = (
  state: CocktailsInitialInterface,
  action: ACTIONTYPE
) => {
  switch (action.type) {
    case 'GET_CURRENT_COCKTAILS': {
      return {
        ...state,
        cocktails: [...action.payload],
      };
    }
    case 'GET_FAVORITES_COCKTAILS': {
      return {
        ...state,
        favorites: [...action.payload],
      };
    }
    case 'REMOVE_FAVORITE_COCKTAIL': {
      return {
        ...state,
        favorites: state.favorites.filter(
          (favorite) => favorite.idDrink !== action.payload.idDrink
        ),
      };
    }
    case 'ADD_FAVORITE_COCKTAIL': {
      return {
        ...state,
        favorites: [...state.favorites, { ...action.payload }],
      };
    }
    case 'GET_SUGGESTED_COCKTAILS': {
      return {
        ...state,
        suggests: [...action.payload],
      };
    }
    default: {
      throw new Error('action inconnue');
    }
  }
};

export default cocktailsReducer;
