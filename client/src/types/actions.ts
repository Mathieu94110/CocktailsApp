import { CocktailInterface } from 'interfaces';

export type ACTIONTYPE =
  | { type: 'GET_CURRENT_COCKTAILS'; payload: CocktailInterface[] }
  | { type: 'GET_FAVORITES_COCKTAILS'; payload: Partial<CocktailInterface>[] }
  | { type: 'REMOVE_FAVORITE_COCKTAIL'; payload: Partial<CocktailInterface> }
  | { type: 'ADD_FAVORITE_COCKTAIL'; payload: Partial<CocktailInterface> }
  | { type: 'GET_SUGGESTED_COCKTAILS'; payload: CocktailInterface[] };