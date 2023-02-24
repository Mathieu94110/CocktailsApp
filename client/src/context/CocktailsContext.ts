import { createContext, Dispatch } from 'react';
import { CocktailInterface } from 'interfaces';
import { Actions } from 'types';

const defaultCocktailsState = {
  cocktails: [] as CocktailInterface[],
  suggests: [] as CocktailInterface[],
};

export const CocktailStateContext = createContext(defaultCocktailsState);
export const CocktailsDispatcherContext = createContext<Dispatch<Actions>>(() => null);