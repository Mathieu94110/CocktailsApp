import { useState, useEffect, useContext } from 'react';
import SearchApi from 'api/search';
import { CocktailsDispatcherContext } from 'context';
import { CategoriesInterface, CocktailInterface } from 'interfaces';

export function useFetchCocktails(
  searchInputValue: string,
  dropDownFilters: CategoriesInterface[],
  letter: string,
  isInitialFetchDone: boolean
) {
  const [restartPage, setRestartPage] = useState<boolean>(false);
  const [fetchLoading, setFetchLoading] = useState<boolean>(false);
  const dispatch = useContext(CocktailsDispatcherContext);

  useEffect(() => {
    const fetchCocktails = async (): Promise<void> => {
      try {
        setFetchLoading(true);
        if (searchInputValue) {
          const response: CocktailInterface[] = await SearchApi.searchCocktails(
            searchInputValue
          );
          if (searchInputValue && !dropDownFilters.length) {
            dispatch({
              type: 'GET_CURRENT_COCKTAILS',
              payload: response ? response : [],
            });
          } else if (searchInputValue && dropDownFilters.length) {
            const newCocktailsList: CocktailInterface[] =
              await SearchApi.searchByFilters(dropDownFilters, response);
            if (newCocktailsList) {
              dispatch({
                type: 'GET_CURRENT_COCKTAILS',
                payload: newCocktailsList ? newCocktailsList : [],
              });
            }
          }
          setRestartPage(true);
        }
        if (letter) {
          const response: CocktailInterface[] = await SearchApi.searchByLetter(
            letter
          );
          if (dropDownFilters.length) {
            const newCocktailsList: CocktailInterface[] =
              await SearchApi.searchByFilters(dropDownFilters, response);
            dispatch({
              type: 'GET_CURRENT_COCKTAILS',
              payload: newCocktailsList ? newCocktailsList : [],
            });
          } else {
            dispatch({
              type: 'GET_CURRENT_COCKTAILS',
              payload: response ? response : [],
            });
          }
          setRestartPage(true);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setFetchLoading(false);
      }
    };
    if (isInitialFetchDone) {
      fetchCocktails();
    }
  }, [searchInputValue, dropDownFilters, letter, isInitialFetchDone]);
  return { fetchLoading, restartPage };
}