import { CocktailInterface } from 'interfaces';

export enum ActionKind {
  CurrentCocktails =  'CURRENT_COCKTAILS',
  SuggestsCocktails = 'SUGGESTS_COCKTAILS',
}

export type Actions = {
  type: ActionKind;
  payload: CocktailInterface[];
};

const getCurrentAction: Actions = {
  type: ActionKind.CurrentCocktails,
  payload: [],
};

const getSuggestsAction: Actions = {
  type: ActionKind.SuggestsCocktails,
  payload: [],
};