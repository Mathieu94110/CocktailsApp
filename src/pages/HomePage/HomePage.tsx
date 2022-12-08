import React, { useState, useEffect, useReducer } from 'react';
import styles from './HomePage.module.scss';
import Search from './Components/Search/Search';
import Recipe from './Components/Recipe/Recipe';
import Loading from '../../components/Loading/Loading';
import searchApi from '../../api/search';
import cocktailsReducer from '../../reducers/cocktailsReducer';
import { CocktailInterface, CategoriesInterface } from 'interfaces';
import Paginate from './Components/Paginate/Paginate';
import DropdownFilters from './Components/Dropdown/DropdownFilters';

function HomePage() {
  const [filter, setFilter] = useState('margarita');
  const [dropDownFilters, setDropDownFilters] = useState<CategoriesInterface[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [state, dispatch] = useReducer(cocktailsReducer, {
    cocktails: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);

  const indexOfLastCocktail: number = currentPage * postsPerPage;
  const indexOfFirstCocktail: number = indexOfLastCocktail - postsPerPage;
  const currentCocktailsList: CocktailInterface[] = state.cocktails;
  const currentCocktails: CocktailInterface[] = state.cocktails.slice(
    indexOfFirstCocktail,
    indexOfLastCocktail
  );

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== Math.ceil(state.cocktails.length / postsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  function setFilters(categories?: any) {
    if (categories) {
      setDropDownFilters(categories);
      searchApi.searchByFilters(dropDownFilters, currentCocktailsList);
    }
    searchApi.searchByFilters(dropDownFilters, currentCocktailsList);
  }

  useEffect(() => {
    // Cancel below is used in order to avoid performing request twice
    let cancel = false;
    searchApi
      .searchCocktails(filter)
      .then((cocktailsInfos: CocktailInterface[]) => {
        if (!cancel) {
          if (!cocktailsInfos) {
            cocktailsInfos = [];
            dispatch({
              type: 'CURRENT_COCKTAILS',
              cocktailsInfos,
            });
          } else if (Array.isArray(cocktailsInfos)) {
            dispatch({
              type: 'CURRENT_COCKTAILS',
              cocktailsInfos,
            });
          } else {
            dispatch({
              type: 'CURRENT_COCKTAILS',
              cocktailsInfos,
            });
          }
        }
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        if (!cancel) {
          setIsLoading(false);
        }
      });
  }, [filter]);

  // On below we check category filter and current cocktails list in order to adapt new request
  useEffect(() => {
    if (currentCocktailsList && dropDownFilters) {
      setFilters();
    }
  }, [currentCocktailsList, dropDownFilters]);

  const options: CategoriesInterface[] = [
    { value: 'Alcoholic', label: 'Alcoholic' },
    { value: 'Non_Alcoholic', label: 'Non_Alcoholic' },
    { value: 'Ordinary_Drink', label: 'Ordinary_Drink' },
    { value: 'Cocktail', label: 'Cocktail' },
    { value: 'Cocktail_glass', label: 'Cocktail_glass' },
    { value: 'Champagne_flute', label: 'Champagne_flute' },
  ];

  return (
    <div className="flex-fill container d-flex flex-column p-20">
      <h1 className="my-30">Découvrez des nouvelles recettes</h1>
      <div
        className={`card flex-fill d-flex flex-column p-20 mb-20  ${styles.contentCard}`}
      >
        <DropdownFilters
          isSearchable
          isMulti
          placeHolder="Select filters"
          options={options}
          onChange={(categories: CategoriesInterface[]) =>
            categories ? setDropDownFilters(categories) : setDropDownFilters([])
          }
        />
        <Search setFilter={setFilter} currentFilter={filter} />
        {isLoading && !state.cocktails.length ? (
          <Loading />
        ) : (
          <>
            <div className={styles.grid}>
              {currentCocktails.map((c: CocktailInterface, i: number) => (
                <Recipe key={i} cocktails={c} />
              ))}
            </div>
            {!!state.cocktails.length && (
              <Paginate
                postsPerPage={postsPerPage}
                totalPosts={state.cocktails.length}
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
  );
}

export default HomePage;
