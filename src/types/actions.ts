import { CocktailInterface } from 'interfaces';

export type ACTIONTYPE = {
  type: 'CURRENT_COCKTAILS';
  cocktailsInfos: CocktailInterface[] | [];
};
