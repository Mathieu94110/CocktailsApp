export enum CocktailsFilters {
  alcoholic = 'Avec alcool',
  nonAlcoholic = 'Sans alcool',
  ordinaryDrink = 'Boisson ordinaire',
  cocktail = 'Cocktail',
  cocktailGlass = 'Verre à cocktail',
  champagneFlute = 'Flûte à champagne'
}

export type CocktailsFiltersKey = keyof typeof CocktailsFilters;
export const CocktailsFiltersKeys = Object.keys(CocktailsFilters) as Array<keyof typeof CocktailsFilters>;
