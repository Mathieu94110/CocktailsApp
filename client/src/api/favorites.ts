import { CocktailInterface } from 'interfaces';

export const removeFromFavorites = async (
  variables: Partial<CocktailInterface>
): Promise<Response> => {
  const response = await fetch('/api/favorites/removeFromFavorites', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(variables),
  });
  return response;
};

export const addToFavorites = async (
  variables: Partial<CocktailInterface>
): Promise<Response> => {
  const response = await fetch('/api/favorites/addToFavorites', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(variables),
  });
  return response;
};

export const getFavorites = async (variable: {
  userFrom: string;
}): Promise<{ success: boolean; favorites: CocktailInterface[] }> => {
  const data = await fetch('/api/favorites/getFavoredCocktail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(variable),
  });
  const response = await data.json();
  return response;
};
