import FavoritesApi from 'api/favorites';
import { CocktailInterface } from 'interfaces';

export const toggleFavorite = async (
  cocktails: Partial<CocktailInterface>,
  favoritesState: Partial<CocktailInterface>[]
): Promise<Response> => {
  const userFrom = localStorage.getItem('userId')!;
  const favorited = favoritesState.some(
    (cocktail) => cocktail.idDrink === cocktails.idDrink
  );
  const coktailInfos: Partial<CocktailInterface> & {
    userFrom: string;
  } = {
    idDrink: cocktails.idDrink,
    userFrom: userFrom,
    strDrink: cocktails.strDrink,
    strDrinkThumb: cocktails.strDrinkThumb,
    strCategory: cocktails.strCategory,
    strAlcoholic: cocktails.strAlcoholic,
  };
  let response;
  if (favorited) {
    response = await FavoritesApi.removeFromFavorites(coktailInfos);
  } else {
    response = await FavoritesApi.addToFavorites(coktailInfos);
  }
  return response;
};
