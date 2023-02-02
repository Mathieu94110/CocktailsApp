import { ACTIONTYPE } from 'types';
import { CocktailsInitialInterface } from 'interfaces';

function cocktailsReducer(
  state: CocktailsInitialInterface,
  action: ACTIONTYPE
) {
  switch (action.type) {
    case 'CURRENT_COCKTAILS': {
      return {
        ...state,
        cocktails: action.payload,
      };
    }
    default: {
      throw new Error('action inconnue');
    }
  }
}

export default cocktailsReducer;
