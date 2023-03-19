import { useState, useLayoutEffect, useContext } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { CocktailsRecipeCard } from './Components/CocktailsRecipeCard/CocktailsRecipeCard';
import { Recipe } from 'pages/Home/Components';
import { Loading, Button } from 'components';
import { CocktailStateContext, CocktailsDispatcherContext, useToasts } from 'context';
import { toggleFavorite } from 'utils';
import SearchApi from 'api/search';
import { categories, glasses } from 'data/constant';
import { CocktailInterface } from 'interfaces';
import styles from './CocktailsRecipe.module.scss';

export const CocktailsRecipe = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const state = useContext(CocktailStateContext);
  const recipe = useLoaderData() as CocktailInterface;
  const dispatch = useContext(CocktailsDispatcherContext);
  const navigate = useNavigate();
  const { pushToast } = useToasts();
  const favoritesState: Partial<CocktailInterface>[] = state.favorites;

  const checkSuggestCategory = async (value: CocktailInterface) => {
    const { strGlass, strCategory } = value;
    if (glasses.indexOf(strGlass) !== -1) {
      return { strGlass: strGlass };
    } else if (categories.indexOf(strCategory) !== -1) {
      return { strCategory: strCategory };
    } else {
      return {};
    }
  };

  // useLayoutEffect is used here in order to wait for all dom mutations be done so we can retrieve recipe infos
  useLayoutEffect(() => {
    const fetchSuggests = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const search = await checkSuggestCategory(recipe);
        if ('strGlass' in search) {
          const formatedGlassValue = search.strGlass!.split(' ').join('_');
          const response = await SearchApi.getSuggestsByGlass(formatedGlassValue);
          dispatch({
            type: 'GET_SUGGESTED_COCKTAILS',
            payload: response ? response : [],
          });
        } else if (
          ('strCategory' in search && search.strCategory !== 'Punch/Party Drink') ||
          ('strCategory' in search && search.strCategory !== 'Coffee/Tea')
        ) {
          const response: CocktailInterface[] = await SearchApi.getSuggestsByCategory(
            search.strCategory!
          );
          dispatch({
            type: 'GET_SUGGESTED_COCKTAILS',
            payload: response ? response : [],
          });
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSuggests();
  }, []);

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
    <>
      <div className={styles.backButtonContainer}>
        <Button
          className={styles.backButton}
          onClick={() => {
            navigate(-1);
          }}
        >
          <i className="fa-solid fa-arrow-left"></i>
        </Button>
      </div>
      <div className={styles.cocktailsRecipe}>
        <div className={styles.cocktailsRecipeCard}>
          <h2 className={styles.cocktailsRecipeTitle}>Recette {recipe.strDrink}</h2>
          <CocktailsRecipeCard recipe={recipe} />
        </div>
        <div className={styles.cocktailsResults}>
          <h2 className={styles.cocktailsRecipeTitle}>Suggestions</h2>
          {isLoading && !state.suggests.length ? (
            <Loading />
          ) : state.suggests.length ? (
            <div className={`${styles.grid} card`}>
              {state.suggests.map((c: CocktailInterface, index: number) => (
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
              <p>Aucune suggestion trouvée</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
