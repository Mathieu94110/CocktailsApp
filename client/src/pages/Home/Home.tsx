import { useState, useEffect, useContext } from 'react';
import { Loading } from 'components';
import {
  AlphabeticalFilter,
  DropdownFilters as CategoryFilters,
  Pagination,
  Recipe,
  SearchInput,
} from './Components';
import { useFetchCocktails, useFetchFavorites } from 'hooks';
import { CocktailStateContext, CocktailsDispatcherContext, useToasts } from 'context';
import { toggleFavorite } from 'utils';
import { CocktailInterface } from 'interfaces';
import { CocktailsFiltersKey, CocktailsFiltersKeys } from 'interfaces/filters.interface';
import cocktailGifImg from 'images/cocktail.gif';
import styles from './Home.module.scss';

export const Home = () => {
  const [searchInputValue, setSearchInputValue] = useState<string>('');
  const [letter, setLetter] = useState<string>('');
  const [dropDownFilters, setDropDownFilters] = useState<CocktailsFiltersKey[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage] = useState<number>(6);


  const state = useContext(CocktailStateContext);
  const cocktailsState = state.cocktails;
  const favoritesState = state.favorites;

  const indexOfLastCocktail: number = currentPage * postsPerPage;
  const indexOfFirstCocktail: number = indexOfLastCocktail - postsPerPage;
  const currentCocktails: CocktailInterface[] = cocktailsState.slice(
    indexOfFirstCocktail,
    indexOfLastCocktail
  );

  const { fetchCocktailsLoading, restartPage } = useFetchCocktails(
    searchInputValue,
    dropDownFilters,
    letter
  );
  const { isFavoritesFetched } = useFetchFavorites(favoritesState);

  const isInitiaState = searchInputValue === '' && letter === '' && dropDownFilters.length === 0;
  const shouldShowGif = isInitiaState && !currentCocktails.length;
  const shouldShowNoResults = !isInitiaState && !currentCocktails.length && !fetchCocktailsLoading;
  const shouldShowPagination = !!currentCocktails.length && cocktailsState.length > 6 && !fetchCocktailsLoading;

  const { pushToast } = useToasts();
  const dispatch = useContext(CocktailsDispatcherContext);

  useEffect(() => {
    if (restartPage) {
      setCurrentPage(1);
    }
  }, [restartPage]);

  const paginate = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
  };

  const previousPage = (): void => {
    if (currentPage >= 2) {
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

  const toggleOnFavorites = async (cocktail: Partial<CocktailInterface>): Promise<void> => {
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
      <h1 className="my-10 ml-10 text-primary">Découvrez des nouvelles recettes</h1>
      <div className={`card flex-fill d-flex flex-column px-10 ${styles.contentCard}`}>
        <CategoryFilters
          isSearchable
          isMulti={false} // Requests with category filters to thecocktaildb.com API return results without category properties
          placeHolder="Sélectionner un filtre"
          options={CocktailsFiltersKeys}
          onChange={(categories: any[]) =>
            categories ? setDropDownFilters(categories) : setDropDownFilters([])
          }
        />
        <AlphabeticalFilter setLetter={switchToSearchLetterMode} />
        <SearchInput setFilter={switchToSearchInputMode} currentFilter={searchInputValue} />
        <div className={styles.cocktailsResults} data-cy={letter}>
          {fetchCocktailsLoading || !isFavoritesFetched ? (
            <Loading />
          ) : (
            <>
              {!!cocktailsState.length && !fetchCocktailsLoading && (
                <div className={styles.grid} data-cy="cocktails-list">
                  {currentCocktails.map((c: CocktailInterface, index: number) => (
                    <Recipe
                      key={index}
                      cocktails={c}
                      favorites={favoritesState}
                      toggleFavorite={toggleOnFavorites}
                    />
                  ))}
                </div>
              )}
              {shouldShowGif && <div>
                <img className={styles.cocktailGif} src={cocktailGifImg} />
              </div>}
              {shouldShowNoResults && (
                <p data-cy="no-results-text" className='text-white'>Aucun résultat trouvé</p>
              )}
              {shouldShowPagination && (
                <Pagination
                  postsPerPage={postsPerPage}
                  totalPosts={cocktailsState.length}
                  paginate={paginate}
                  previousPage={previousPage}
                  nextPage={nextPage}
                  currentPageNumber={currentPage}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
