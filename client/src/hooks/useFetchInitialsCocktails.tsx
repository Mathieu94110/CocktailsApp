import { useState, useEffect, useContext } from 'react';
import { CocktailStateContext, CocktailsDispatcherContext } from 'context';
import SearchApi from 'api/search';
import { CocktailInterface } from 'interfaces';

export function useFetchInitialsCocktails(initialCocktail: string) {
  const [isInitialFetchDone, setIsInitialFetchDone] = useState<boolean>(false);
  const state = useContext(CocktailStateContext);
  const dispatch = useContext(CocktailsDispatcherContext);

  useEffect(() => {
    const fetchCocktails = async (): Promise<void> => {
      if (!state.cocktails.length && initialCocktail) {
        try {
          const response: CocktailInterface[] = await SearchApi.searchCocktails(
            initialCocktail
          );
          dispatch({
            type: 'GET_CURRENT_COCKTAILS',
            payload: response ? response : [],
          });
        } catch (e) {
          console.error(e);
        }
      }
    };
    fetchCocktails();
    setIsInitialFetchDone(true);
  }, []);

  return { isInitialFetchDone };
}
