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
    searchApi
      .searchCocktails(filter)
      .then((cocktailsInfos) => {
        console.log(cocktailsInfos);
        setCocktails(cocktailsInfos);
      })
      .catch((e) => console.error(e))
      .finally(() => setIsLoading(false));
  }, []);

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
