import { createContext, Dispatch } from 'react';
import { CocktailInterface } from 'interfaces';
import { ACTIONTYPE } from 'types';
const defaultCocktailsState = {
  cocktails: [] as CocktailInterface[],
  favorites: [] as Partial<CocktailInterface>[],
  suggests: [] as CocktailInterface[],
};

export const CocktailStateContext = createContext(defaultCocktailsState);
export const CocktailsDispatcherContext = createContext<Dispatch<ACTIONTYPE>>(
  () => null
);