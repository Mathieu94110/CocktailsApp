import { useState, useEffect, useContext } from 'react';
import { Loading } from 'components';
import {
  AlphabeticalFilter,
  DropdownFilters as CategoryFilters,
  Pagination,
  Recipe,
  SearchInput,
} from './Components';
import SearchApi from 'api/search';
import { CocktailStateContext, CocktailsDispatcherContext } from 'context';
import { options } from 'constant';
import { CocktailInterface, CategoriesInterface } from 'interfaces';
import styles from './Home.module.scss';

export const Home = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInitialFetchDone, setIsInitialFetchDone] = useState<boolean>(false);
  const [searchInputValue, setSearchInputValue] = useState<string>('margarita');
  const [letter, setLetter] = useState<string>('');
  const [dropDownFilters, setDropDownFilters] = useState<CategoriesInterface[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState<number>(6);

  const state = useContext(CocktailStateContext);
  const dispatch = useContext(CocktailsDispatcherContext);

  const indexOfLastCocktail: number = currentPage * postsPerPage;
  const indexOfFirstCocktail: number = indexOfLastCocktail - postsPerPage;
  const currentCocktails: CocktailInterface[] = state.cocktails.slice(
    indexOfFirstCocktail,
    indexOfLastCocktail
  );

  // Initial fetch call
  useEffect(() => {
    const fetchCocktails = async (): Promise<void> => {
      if (!state.cocktails.length && searchInputValue) {
        try {
          setIsLoading(true);
          const response: CocktailInterface[] = await SearchApi.searchCocktails(
            searchInputValue
          );
          dispatch({
            type: 'CURRENT_COCKTAILS',
            payload: response ? response : [],
          });
        } catch (e) {
          console.error(e);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchCocktails();
    setIsInitialFetchDone(true);
  }, []);

  // Dynamic fetch calls
  // Here calls depending on search mode, no call is emitted on first load
  useEffect(() => {
    const fetchCocktails = async (): Promise<void> => {
      try {
        setIsLoading(true);
        if (searchInputValue) {
          const response: CocktailInterface[] = await SearchApi.searchCocktails(
            searchInputValue
          );
          if (searchInputValue && !dropDownFilters.length) {
            dispatch({
              type: 'CURRENT_COCKTAILS',
              payload: response ? response : [],
            });
          } else if (searchInputValue && dropDownFilters.length) {
            const newCocktailsList: CocktailInterface[] =
              await SearchApi.searchByFilters(dropDownFilters, response);
            if (newCocktailsList) {
              dispatch({
                type: 'CURRENT_COCKTAILS',
                payload: newCocktailsList ? newCocktailsList : [],
              });
            }
          }
          setCurrentPage(1);
        }
        if (letter) {
          const response: CocktailInterface[] = await SearchApi.searchByLetter(
            letter
          );
          if (dropDownFilters.length) {
            const newCocktailsList: CocktailInterface[] =
              await SearchApi.searchByFilters(dropDownFilters, response);
            dispatch({
              type: 'CURRENT_COCKTAILS',
              payload: newCocktailsList ? newCocktailsList : [],
            });
          } else {
            dispatch({
              type: 'CURRENT_COCKTAILS',
              payload: response ? response : [],
            });
          }
          setCurrentPage(1);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    if (isInitialFetchDone) {
      fetchCocktails();
    }
  }, [searchInputValue, dropDownFilters, letter]);

  const paginate = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
  };

  const previousPage = (): void => {
    if (currentPage !== 1) {
      setCurrentPage((current: number) => {
        return current - 1;
      });
    }
  };

  const nextPage = (): void => {
    if (currentPage !== Math.ceil(state.cocktails.length / postsPerPage)) {
      setCurrentPage((current: number) => {
        return current + 1;
      });
    }
  };

  const switchToSearchLetterMode = (value: string): void => {
    setSearchInputValue('');
    setLetter(value);
  };

  const switchToSearchInputMode = (value: string): void => {
    setLetter('');
    setSearchInputValue(value);
  };

  return (
    <div className={styles.container}>
      <h1 className="my-10">Découvrez des nouvelles recettes</h1>
      <div
        className={`card flex-fill d-flex flex-column px-10 ${styles.contentCard}`}
      >
        <CategoryFilters
          isSearchable
          isMulti
          placeHolder="Sélectionner les filtres"
          options={options}
          onChange={(categories: CategoriesInterface[]) =>
            categories ? setDropDownFilters(categories) : setDropDownFilters([])
          }
        />
        <AlphabeticalFilter setLetter={switchToSearchLetterMode} />
        <SearchInput
          setFilter={switchToSearchInputMode}
          currentFilter={searchInputValue}
        />
        {isLoading && !state.cocktails.length ? (
          <Loading />
        ) : (
          <div className={styles.cocktailsResults}>
            {state.cocktails.length ? (
              <div className={styles.grid}>
                {currentCocktails.map((c: CocktailInterface, index: number) => (
                  <Recipe key={index} cocktails={c} />
                ))}
              </div>
            ) : (
              <div className={styles.noCocktailsResults}>
                <p>Aucun résultat trouvé</p>
              </div>
            )}
            {state.cocktails.length > 6 && (
              <Pagination
                postsPerPage={postsPerPage}
                totalPosts={state.cocktails.length}
                paginate={paginate}
                previousPage={previousPage}
                nextPage={nextPage}
                currentPageNumber={currentPage}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
