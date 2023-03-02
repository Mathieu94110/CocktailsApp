import { useState, useEffect, useContext } from 'react';
import { Loading } from 'components';
import {
  AlphabeticalFilter,
  DropdownFilters as CategoryFilters,
  Pagination,
  Recipe,
  SearchInput,
} from './Components';
import {
  useFetchInitialsCocktails,
  useFetchCocktails,
  useFetchFavorites,
} from 'hooks';
import {
  CocktailStateContext,
  CocktailsDispatcherContext,
  useToasts,
} from 'context';
import { toggleFavorite } from 'utils';
import { options } from 'data/constant';
import { CocktailInterface, CategoriesInterface } from 'interfaces';
import styles from './Home.module.scss';

export const Home = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchInputValue, setSearchInputValue] = useState<string>('margarita');
  const [letter, setLetter] = useState<string>('');
  const [dropDownFilters, setDropDownFilters] = useState<CategoriesInterface[]>(
    []
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState<number>(6);

  const { pushToast } = useToasts();
  const state = useContext(CocktailStateContext);
  const cocktailsState = state.cocktails;
  const favoritesState = state.favorites;
  const dispatch = useContext(CocktailsDispatcherContext);
  // const userFrom = localStorage.getItem('userId')!;
  const indexOfLastCocktail: number = currentPage * postsPerPage;
  const indexOfFirstCocktail: number = indexOfLastCocktail - postsPerPage;
  const currentCocktails: CocktailInterface[] = cocktailsState.slice(
    indexOfFirstCocktail,
    indexOfLastCocktail
  );

  // Initial Coktails fetch call
  const { isInitialFetchDone } = useFetchInitialsCocktails(searchInputValue);

  // Favorites fetch calls
  const { isFetchFavoriteDone } = useFetchFavorites(favoritesState);

  // Dynamic Coktails fetch calls
  // Here calls depending on search mode, no call is emit on first load
  const { restartPage, fetchLoading } = useFetchCocktails(
    searchInputValue,
    dropDownFilters,
    letter,
    isInitialFetchDone
  );

  useEffect(() => {
    if (isInitialFetchDone && isFetchFavoriteDone) {
      setIsLoading(false);
    } else if (restartPage) {
      setCurrentPage(1);
    } else if (fetchLoading) {
      setIsLoading(fetchLoading);
    }
  }, [isInitialFetchDone, restartPage, fetchLoading]);

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
    if (currentPage !== Math.ceil(cocktailsState.length / postsPerPage)) {
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

  const toggleOnFavorites = async (
    cocktail: Partial<CocktailInterface>
  ): Promise<void> => {
    const response = await toggleFavorite(cocktail, favoritesState);
    if (response.ok) {
      if (response.url.includes('addToFavorites')) {
        dispatch({
          type: 'ADD_FAVORITE_COCKTAIL',
          payload: cocktail,
        });
        pushToast({
          title: 'Succès',
          type: 'success',
          content: `${cocktail.strDrink} a été ajouté à vos favoris !`,
          duration: 2,
        });
      } else {
        dispatch({
          type: 'REMOVE_FAVORITE_COCKTAIL',
          payload: cocktail,
        });
        pushToast({
          title: 'Succès',
          type: 'success',
          content: `${cocktail.strDrink} a été retiré de vos favoris`,
          duration: 2,
        });
      }
    } else {
      if (response.url.includes('addToFavorites')) {
        pushToast({
          title: 'Erreur',
          type: 'danger',
          content: `Erreur rencontrée lors de l'ajout de ${cocktail.strDrink} à vos favoris !`,
          duration: 2,
        });
      } else {
        pushToast({
          title: 'Erreur',
          type: 'danger',
          content: `Erreur rencontrée lors de la suppression de ${cocktail.strDrink} de vos favoris`,
          duration: 2,
        });
      }
    }
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
        {isLoading && !cocktailsState.length ? (
          <Loading />
        ) : (
          <div className={styles.cocktailsResults}>
            {cocktailsState.length ? (
              <div className={styles.grid}>
                {currentCocktails.map((c: CocktailInterface, index: number) => (
                  <Recipe
                    key={index}
                    cocktails={c}
                    favorites={favoritesState}
                    toggleFavorite={toggleOnFavorites}
                  />
                ))}
              </div>
            ) : (
              <div className={styles.noCocktailsResults}>
                <p>Aucun résultat trouvé</p>
              </div>
            )}
            {cocktailsState.length > 6 && (
              <Pagination
                postsPerPage={postsPerPage}
                totalPosts={cocktailsState.length}
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
