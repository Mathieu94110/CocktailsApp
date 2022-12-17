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
import { options } from '../../constant';

function HomePage() {
  const [filter, setFilter] = useState<string>('margarita');
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

  async function setFilters(categories?: CategoriesInterface[]) {
    if (categories) {
      setDropDownFilters(categories);
      console.log('called');
      const newCocktailsList: CocktailInterface[] =
        await searchApi.searchByFilters(dropDownFilters, currentCocktailsList);
      if (newCocktailsList) {
        dispatch({ type: 'CURRENT_COCKTAILS', payload: newCocktailsList });
      }
    }
    // searchApi.searchByFilters(dropDownFilters, currentCocktailsList);
  }

  useEffect(() => {
    // Cancel below is used in order to avoid performing request twice
    let cancel = false;
    searchApi
      .searchCocktails(filter)
      .then((cocktailsInfos: CocktailInterface[]) => {
        if (!cancel) {
          dispatch({
            type: 'CURRENT_COCKTAILS',
            payload: cocktailsInfos ? cocktailsInfos : [],
          });
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
    if (dropDownFilters) {
      setFilters(dropDownFilters);
    }
  }, [dropDownFilters]);

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
              {currentCocktails.map((c: CocktailInterface, index: number) => (
                <Recipe key={index} cocktails={c} />
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
