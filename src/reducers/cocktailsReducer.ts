import { ACTIONTYPE } from '../types/actions';
import { cocktailsInitialInterface } from '../interfaces/cocktails.interface';

function cocktailsReducer(
  state: cocktailsInitialInterface,
  action: ACTIONTYPE
) {
  switch (action.type) {
    case 'CURRENT_COCKTAILS': {
      return {
        ...state,
        cocktails: action.cocktailsInfos,
      };
    }
    default: {
      throw new Error('action inconnue');
    }
  }
}

export default cocktailsReducer;
