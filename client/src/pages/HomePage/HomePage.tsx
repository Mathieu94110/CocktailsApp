import React, { useState, useEffect, useReducer } from 'react';
import styles from './HomePage.module.scss';
import SearchInput from './Components/SearchInput/SearchInput';
import Recipe from './Components/Recipe/Recipe';
import Loading from '../../components/Loading/Loading';
import searchApi from '../../api/search';
import cocktailsReducer from '../../reducers/cocktailsReducer';
import { CocktailInterface, CategoriesInterface } from 'interfaces';
import Paginate from './Components/Paginate/Paginate';
import DropdownFilters from './Components/Dropdown/DropdownFilters';
import AlphabeticalFilter from './Components/AphabeticalFilter/AlphabeticalFilter';
import { options } from '../../constant';

function HomePage() {
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

  useEffect((): any => {
    let cancel = false;
    async function fetchCocktails() {
      try {
        if (searchInputValue) {
          setLetter('');
          const response: CocktailInterface[] = await searchApi.searchCocktails(
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
                await searchApi.searchByFilters(dropDownFilters, response);
              if (newCocktailsList) {
                dispatch({
                  type: 'CURRENT_COCKTAILS',
                  payload: newCocktailsList,
                });
              }
            } else {
              const emptyListArray: CocktailInterface[] = [];
              dispatch({
                type: 'CURRENT_COCKTAILS',
                payload: emptyListArray,
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
    fetchCocktails();
    return () => (cancel = true);
  }, [searchInputValue, dropDownFilters]);

  useEffect((): any => {
    let cancel = false;
    async function fetchCocktails() {
      try {
        if (letter) {
          setSearchInputValue('');
          const response: CocktailInterface[] = await searchApi.searchByLetter(
            letter
          );
          if (!cancel) {
            if (!dropDownFilters.length) {
              dispatch({
                type: 'CURRENT_COCKTAILS',
                payload: response ? response : [],
              });
            } else {
              const newCocktailsList: CocktailInterface[] =
                await searchApi.searchByFilters(dropDownFilters, response);
              if (newCocktailsList) {
                dispatch({
                  type: 'CURRENT_COCKTAILS',
                  payload: newCocktailsList,
                });
              }
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
    fetchCocktails();
    return () => (cancel = true);
  }, [letter, dropDownFilters]);

  return (
    <div className={styles.container}>
      <h1 className="my-10">Découvrez des nouvelles recettes</h1>
      <div
        className={`card flex-fill d-flex flex-column px-10 ${styles.contentCard}`}
      >
        <DropdownFilters
          isSearchable
          isMulti
          placeHolder="Sélectionner les filtres"
          options={options}
          onChange={(categories: CategoriesInterface[]) =>
            categories ? setDropDownFilters(categories) : setDropDownFilters([])
          }
        />
        <AlphabeticalFilter setLetter={setLetter} />
        <SearchInput setFilter={setSearchInputValue} currentFilter={searchInputValue} />
        {isLoading && !state.cocktails.length ? (
          <Loading />
        ) : (
          <>
            {state.cocktails.length && !isLoading ? (
              <div className={styles.cocktailsResults}>
                <div className={styles.grid}>
                  {currentCocktails.map(
                    (c: CocktailInterface, index: number) => (
                      <Recipe key={index} cocktails={c} />
                    )
                  )}
                </div>
                {
                  state.cocktails.length > 6 && (
                    <Paginate
                    postsPerPage={postsPerPage}
                    totalPosts={state.cocktails.length}
                    paginate={paginate}
                    previousPage={previousPage}
                    nextPage={nextPage}
                    currentPageNumber={currentPage}
                  />
                  )
                }

              </div>
            ) : !state.cocktails.length && !isLoading ? (
              <div className={styles.cocktailsResults}>
                Aucun résultat trouvé
              </div>
            ) : (
              <div className={styles.cocktailsResults}></div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default HomePage;
