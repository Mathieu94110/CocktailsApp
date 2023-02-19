import { CocktailInterface } from 'interfaces';

export const removeFromFavorites = async (
  favoriteInfos:Partial<CocktailInterface> & {
    userFrom: string | null;
  }
): Promise<Response> => {
  const response = await fetch('/api/favorites/removeFromFavorites', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(favoriteInfos),
  });
  return response;
};

export const addToFavorites = async (
  favoriteInfos: Partial<CocktailInterface> & {
    userFrom: string | null;
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

export const getFavorites = async (userInfos: {
  userFrom: string;
}): Promise<{ success: boolean; favorites: CocktailInterface[] }> => {
  const data = await fetch('/api/favorites/getFavoredCocktail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userInfos),
  });
  const response = await data.json();
  return response;
};
