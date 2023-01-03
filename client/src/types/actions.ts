import { CocktailInterface } from 'interfaces';

export type ACTIONTYPE = {
  type: 'CURRENT_COCKTAILS';
  payload: CocktailInterface[] | [];
};
