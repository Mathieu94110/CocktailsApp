import { Actions } from 'types';
import { CocktailsInitialInterface } from 'interfaces';

const cocktailsReducer = (
  state: CocktailsInitialInterface,
  action: Actions
) => {
  switch (action.type) {
    case 'CURRENT_COCKTAILS': {
      return {
        ...state,
        cocktails: [...action.payload],
      };
    }
    case 'SUGGESTS_COCKTAILS': {
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
