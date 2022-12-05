import React, { useState, useEffect } from 'react';
import styles from './HomePage.module.scss';
import Search from './Components/Search/Search';
import Recipe from './Components/Recipe/Recipe';
import Loading from '../../components/Loading/Loading';
import searchApi from '../../api/search';

function HomePage() {
  const [filter, setFilter] = useState('margarita');
  const [isLoading, setIsLoading] = useState(true);
  const [cocktails, setCocktails] = useState([]);

  useEffect(() => {
    // cancel below is used in order to avoid performing request twice
    let cancel = false;
    searchApi
      .searchCocktails(filter)
      .then((cocktailsInfos) => {
        if (!cancel) {
          if (!cocktailsInfos) {
            setCocktails([]);
          } else if (Array.isArray(cocktailsInfos)) {
            setCocktails(cocktailsInfos);
          } else {
            setCocktails([cocktailsInfos]);
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

  return (
    <div className="flex-fill container d-flex flex-column p-20">
      <h1 className="my-30">Découvrez nos nouvelles recettes</h1>
      <div
        className={`card flex-fill d-flex flex-column p-20 mb-20  ${styles.contentCard}`}
      >
        <Search setFilter={setFilter} />
        {isLoading && !cocktails.length ? (
          <Loading />
        ) : (
          <div className={styles.grid}>
            {cocktails.map((c, i) => (
              <Recipe key={i} cocktails={c} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
