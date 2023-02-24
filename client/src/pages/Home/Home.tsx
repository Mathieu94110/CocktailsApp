import { useState, useEffect, useContext } from 'react';
import { Loading } from 'components';
import {
  AlphabeticalFilter,
  DropdownFilters as CategoryFilters,
  Pagination,
  Recipe,
  SearchInput,
} from './Components';
import { useFetchInitialsCocktails, useFetchCocktails } from 'hooks';
import { CocktailStateContext } from 'context';
import { options } from 'data/constant';
import { CocktailInterface, CategoriesInterface } from 'interfaces';
import styles from './Home.module.scss';

export const Home = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchInputValue, setSearchInputValue] = useState<string>('margarita');
  const [letter, setLetter] = useState<string>('');
  const [dropDownFilters, setDropDownFilters] = useState<CategoriesInterface[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState<number>(6);

  const state = useContext(CocktailStateContext);
  const indexOfLastCocktail: number = currentPage * postsPerPage;
  const indexOfFirstCocktail: number = indexOfLastCocktail - postsPerPage;
  const currentCocktails: CocktailInterface[] = state.cocktails.slice(
    indexOfFirstCocktail,
    indexOfLastCocktail
  );

  // Initial fetch call
  const { isInitialFetchDone } = useFetchInitialsCocktails(searchInputValue);

  // Dynamic fetch calls
  // Here calls depending on search mode, no call is emit on first load
  const { restartPage, fetchLoading } = useFetchCocktails(
    searchInputValue,
    dropDownFilters,
    letter,
    isInitialFetchDone
  );

  useEffect(() => {
    if (isInitialFetchDone) {
      setIsLoading(false);
    } else if (restartPage) {
      setCurrentPage(1);
    } else if (fetchLoading) {
      setIsLoading(fetchLoading);
    }
  }, [isInitialFetchDone, restartPage, fetchLoading]);
  //
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
