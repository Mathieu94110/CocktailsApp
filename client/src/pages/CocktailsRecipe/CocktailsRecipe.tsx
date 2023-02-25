import { useState, useLayoutEffect, useContext } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { CocktailsRecipeCard } from './Components/CocktailsRecipeCard/CocktailsRecipeCard';
import { Recipe } from 'pages/Home/Components';
import { Button } from 'components/Button/Button';
import SearchApi from 'api/search';
import { CocktailStateContext, CocktailsDispatcherContext } from 'context';
import { categories, glasses } from 'data/constant';
import { CocktailInterface } from 'interfaces';
import { ActionKind } from 'types';
import styles from './CocktailsRecipe.module.scss';

export const CocktailsRecipe = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const recipe = useLoaderData() as CocktailInterface;
  const dispatch = useContext(CocktailsDispatcherContext);
  const navigate = useNavigate();
  const state = useContext(CocktailStateContext);

  const checkSuggestCategory = async (value: CocktailInterface) => {
    const { strGlass, strCategory, ...rest } = value;
    if (glasses.indexOf(value.strGlass) !== -1) {
      return { strGlass: value.strGlass };
    } else if (categories.indexOf(value.strCategory) !== -1) {
      return { strCategory: value.strCategory };
    } else {
      return {};
    }
  };

  // useLayoutEffect is used here in order to wait for all dom mutations to be done so we can retrieve recipe infos
  useLayoutEffect(() => {
    const fetchSuggests = async (): Promise<void> => {
      try {
        setIsLoading(true);
        const search = await checkSuggestCategory(recipe);
        if ('strGlass' in search) {
          const formattedGlassValue = search.strGlass!.split(' ').join('_');
          console.log(formattedGlassValue);
          const response = await SearchApi.getSuggestsByGlass(
            formattedGlassValue
          );
          console.log('response strGlass =', response);
          dispatch({
            type: ActionKind.SuggestsCocktails,
            payload: response ? response : [],
          });
        } else if (
          ('strCategory' in search &&
            search.strCategory !== 'Punch/Party Drink') ||
          ('strCategory' in search && search.strCategory !== 'Coffee/Tea')
        ) {
          console.log('strCategory =', search.strCategory);
          const response: CocktailInterface[] =
            await SearchApi.getSuggestsByCategory(search.strCategory!);
          console.log('response strCategory =', response);
          dispatch({
            type: ActionKind.SuggestsCocktails,
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
          <h2 className='text-center my-20 text-primary'>Recette {recipe.strDrink}</h2>
          <CocktailsRecipeCard recipe={recipe} />
        </div>
        <div className={styles.cocktailsResults}>
        <h2 className='text-center my-20 text-primary'>Suggestions</h2>
          {state.suggests.length ? (
            <div className={`${styles.grid} card`} >
   
              {state.suggests.map((c: CocktailInterface, index: number) => (
                <Recipe key={index} cocktails={c} />
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
