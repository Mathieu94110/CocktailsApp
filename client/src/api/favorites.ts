import { CocktailInterface } from 'interfaces';

const removeFromFavorites = async (
  favoriteInfos: Partial<CocktailInterface> & {
    userFrom: string;
  }
): Promise<Response> => {
  const response = await fetch('/api/favorites/removeFromFavorites', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(favoriteInfos),
  });
  return response;
};
const addToFavorites = async (
  favoriteInfos: Partial<CocktailInterface> & {
    userFrom: string;
  }
): Promise<Response> => {
  const response = await fetch('/api/favorites/addToFavorites', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(favoriteInfos),
  });
  return response;
};

const getFavorites = async (
  userFrom: string
): Promise<{ success: boolean; favorites: CocktailInterface[] }> => {
  const data = await fetch('/api/favorites/getFavoredCocktail/' + userFrom);
  let response;
  if (data) {
    response = await data.json();
  }
  return response;
};

const FavoritesApi = {
  removeFromFavorites,
  addToFavorites,
  getFavorites,
};

export default FavoritesApi;
