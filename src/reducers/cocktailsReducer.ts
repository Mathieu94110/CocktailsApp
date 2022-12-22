import { ACTIONTYPE } from '../types/actions';
import { CocktailsInitialInterface } from '../interfaces/cocktails.interface';

function cocktailsReducer(
  state: CocktailsInitialInterface,
  action: ACTIONTYPE
) {
  switch (action.type) {
    case 'CURRENT_COCKTAILS': {
      console.log(action.payload);
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
