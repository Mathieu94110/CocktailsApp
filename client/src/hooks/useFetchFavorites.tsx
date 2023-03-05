import { useState, useEffect, useContext } from 'react';
import { CocktailsDispatcherContext } from 'context';
import { CocktailInterface } from 'interfaces';
import FavoritesApi from 'api/favorites';

const userFrom = localStorage.getItem('userId')!;

export function useFetchFavorites(
  favoritesState: Partial<CocktailInterface>[]
) {
  const [isFetchFavoriteDone, setIsFetchFavoriteDone] =
    useState<boolean>(false);
  const dispatch = useContext(CocktailsDispatcherContext);

  useEffect(() => {
    const fetchFavorites = async (): Promise<void> => {
      if (userFrom && favoritesState) {
        try {
          const response: {
            success: boolean;
            favorites: Partial<CocktailInterface>[];
          } = await FavoritesApi.getFavorites(userFrom);
          dispatch({
            type: 'GET_FAVORITES_COCKTAILS',
            payload: response ? response.favorites : [],
          });
        } catch (e) {
          console.error(e);
        }
      }
    };
    fetchFavorites();
    setIsFetchFavoriteDone(true);
  }, []);

  return { isFetchFavoriteDone };
}
