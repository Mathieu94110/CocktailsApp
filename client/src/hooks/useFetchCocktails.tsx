import { useState, useEffect, useContext } from 'react';
import SearchApi from 'api/search';
import { CocktailsDispatcherContext, CocktailStateContext } from 'context';
import { CocktailsFiltersKey } from 'interfaces/filters.interface';
import { filterListByCategories } from 'utils';

export function useFetchCocktails(
  searchInputValue: string,
  dropDownFilters: CocktailsFiltersKey[],
  letter: string
) {

  const [restartPage, setRestartPage] = useState<boolean>(false);
  const [fetchCocktailsLoading, setFetchCocktailsLoading] = useState<boolean>(false);

  const dispatch = useContext(CocktailsDispatcherContext);
  const state = useContext(CocktailStateContext);
  const cocktailsState = state.cocktails;

  useEffect(() => {
    const fetchCocktails = async (): Promise<void> => {
      try {
        setFetchCocktailsLoading(true);

        // Search with typed text
        if (searchInputValue) {
          const response = await SearchApi.searchCocktails(searchInputValue);

          if (!dropDownFilters.length) {
            dispatch({ type: 'GET_CURRENT_COCKTAILS', payload: response || [] });
          } else {
            const filteredList = filterListByCategories(dropDownFilters, response);
            dispatch({ type: 'GET_CURRENT_COCKTAILS', payload: filteredList || [] });
          }

          setRestartPage(true);
          return;
        }

        // Search by letter
        if (letter) {
          const response = await SearchApi.searchByLetter(letter);

          if (!dropDownFilters.length) {
            dispatch({ type: 'GET_CURRENT_COCKTAILS', payload: response || [] });
          } else {
            const filteredList = filterListByCategories(dropDownFilters, response);
            dispatch({ type: 'GET_CURRENT_COCKTAILS', payload: filteredList || [] });
          }

          setRestartPage(true);
          return;
        }

        // Search by category filter
        if (dropDownFilters.length > 0) {
          const filter = dropDownFilters[0];
          if (
            cocktailsState.length === 0
          ) {
            const filteredList = await SearchApi.searchByCategoryFilter(filter);

            dispatch({
              type: 'GET_CURRENT_COCKTAILS',
              payload: filteredList || [],
            });
          } else {
            const filteredExistingList = filterListByCategories(dropDownFilters, cocktailsState);
            dispatch({
              type: 'GET_CURRENT_COCKTAILS',
              payload: filteredExistingList || [],
            });
          }
          setRestartPage(true);
        }
        else {
          // No filters applied, restoring initial state
          dispatch({
            type: 'GET_CURRENT_COCKTAILS',
            payload: [],
          });
        }
      } catch (e) {
        console.error(e);
      } finally {
        setFetchCocktailsLoading(false);
      }
    };

    fetchCocktails();
  }, [searchInputValue, dropDownFilters, letter]);

  return { fetchCocktailsLoading, restartPage };
}
