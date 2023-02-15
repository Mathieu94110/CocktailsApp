import { useState, useEffect, useReducer } from 'react';
import { Loading } from 'components';
import {
  AlphabeticalFilter,
  DropdownFilters as CategoryFilters,
  Pagination,
  Recipe,
  SearchInput,
} from './Components';
import { searchCocktails, searchByFilters, searchByLetter } from 'api';
import cocktailsReducer from '../../reducers/cocktailsReducer';
import { options } from 'constant';
import { CocktailInterface, CategoriesInterface } from 'interfaces';
import styles from './Home.module.scss';

export const Home = () => {
  const [isInitialFetchDone, setIsInitialFetchDone] = useState<boolean>(false);
  const [searchInputValue, setSearchInputValue] = useState<string>('margarita');
  const [letter, setLetter] = useState<string>('');
  const [dropDownFilters, setDropDownFilters] = useState<CategoriesInterface[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [state, dispatch] = useReducer(cocktailsReducer, {
    cocktails: [],
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState<number>(6);

  const indexOfLastCocktail: number = currentPage * postsPerPage;
  const indexOfFirstCocktail: number = indexOfLastCocktail - postsPerPage;
  const currentCocktails: CocktailInterface[] = state.cocktails.slice(
    indexOfFirstCocktail,
    indexOfLastCocktail
  );
  // Initial fetch call
  useEffect((): any => {
    let cancel = false;
    async function fetchCocktails() {
      try {
        setIsLoading(true);
        if (searchInputValue && !cancel) {
          const response: CocktailInterface[] = await searchCocktails(
            searchInputValue
          );
          dispatch({
            type: 'CURRENT_COCKTAILS',
            payload: response ? response : [],
          });
        }
      } catch (e) {
        console.error(e);
      } finally {
        if (!cancel) {
          setIsLoading(false);
        }
      }
    }
    fetchCocktails();
    return () => (setIsInitialFetchDone(true), (cancel = true));
  }, []);

  // Dynamic fetch calls
  useEffect((): any => {
    let cancel = false;
    async function fetchCocktails() {
      try {
        setIsLoading(true);
        if (searchInputValue) {
          const response: CocktailInterface[] = await searchCocktails(
            searchInputValue
          );
          if (!cancel) {
            if (searchInputValue && !dropDownFilters.length) {
              dispatch({
                type: 'CURRENT_COCKTAILS',
                payload: response ? response : [],
              });
            } else if (searchInputValue && dropDownFilters.length) {
              const newCocktailsList: CocktailInterface[] =
                await searchByFilters(dropDownFilters, response);
              if (newCocktailsList) {
                dispatch({
                  type: 'CURRENT_COCKTAILS',
                  payload: newCocktailsList ? newCocktailsList : [],
                });
              }
            }
          }
        }
        if (letter) {
          const response: CocktailInterface[] = await searchByLetter(letter);
          if (!cancel) {
            if (dropDownFilters.length) {
              const newCocktailsList: CocktailInterface[] =
                await searchByFilters(dropDownFilters, response);
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
          }
        }
      } catch (e) {
        console.error(e);
      } finally {
        if (!cancel) {
          setIsLoading(false);
        }
      }
    }
    if (isInitialFetchDone) {
      fetchCocktails();
      return () => (cancel = true);
    }
  }, [searchInputValue, dropDownFilters, letter]);


  function paginate(pageNumber: number) {
    setCurrentPage(pageNumber);
  }

  function previousPage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function nextPage() {
    if (currentPage !== Math.ceil(state.cocktails.length / postsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  }

  const switchToSearchLetterMode = (value: string) => {
    setSearchInputValue('');
    setLetter(value);
  };

  const switchToSearchInputMode = (value: string) => {
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
            {state.cocktails.length > 0 ? (
              <div className={styles.grid}>
                {currentCocktails.map((c: CocktailInterface, index: number) => (
                  <Recipe key={index} cocktails={c} />
                ))}
              </div>
            ) : (
              <p>Aucun résultat trouvé</p>
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
