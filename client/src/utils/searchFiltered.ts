import type { CategoriesInterface } from 'interfaces';
import { CocktailInterface } from 'interfaces';
import { CATEGORIESTYPES } from '../types/categories';

const checkRequestQueries = (categories: CATEGORIESTYPES[]) => {
  const validAlcoholicIInfo =
    (categories.includes('Alcoholic') &&
      !categories.includes('Non_Alcoholic')) ||
    (!categories.includes('Alcoholic') && categories.includes('Non_Alcoholic'));

  const validCocktailIInfo =
    (categories.includes('Ordinary_Drink') &&
      !categories.includes('Cocktail')) ||
    (!categories.includes('Ordinary_Drink') && categories.includes('Cocktail'));

  const validGlassInfo =
    (categories.includes('Cocktail_glass') &&
      !categories.includes('Champagne_flute')) ||
    (!categories.includes('Cocktail_glass') &&
      categories.includes('Champagne_flute'));

  const alcoholicQueries =
    validAlcoholicIInfo && categories.includes('Alcoholic')
      ? 'Alcoholic'
      : validAlcoholicIInfo && categories.includes('Non_Alcoholic')
        ? 'Non alcoholic'
        : null;
  const cocktailQueries =
    validCocktailIInfo && categories.includes('Ordinary_Drink')
      ? 'Ordinary Drink'
      : validCocktailIInfo && categories.includes('Cocktail')
        ? 'Cocktail'
        : null;
  const glassQueries =
    validGlassInfo && categories.includes('Cocktail_glass')
      ? 'Cocktail glass'
      : validGlassInfo && categories.includes('Champagne_flute')
        ? 'Champagne flute'
        : null;

  const validQueries = {
    strAlcoholic: alcoholicQueries,
    strCategory: cocktailQueries,
    strGlass: glassQueries,
  };
  return validQueries;
};

const filterListByQueries = (products: CocktailInterface[], filters: any) => {
  const filterKeys = Object.keys(filters);
  if (!products) return [];
  return products.filter((product: any) => {
    return filterKeys.every((key) => {
      if (!filters[key].length) return true;
      if (Array.isArray(product[key])) {
        return product[key].some((keyEle: any) =>
          filters[key].includes(keyEle)
        );
      }
      return filters[key].includes(product[key]);
    });
  });
};

const filterListByCategories = async (
  categories: CategoriesInterface[],
  currentList: CocktailInterface[]
): Promise<CocktailInterface[]> => {
  const categoriesInArray: any = categories.map(
    (category: CategoriesInterface) => category.value
  );

  const validQueries = await checkRequestQueries(categoriesInArray);
  const nonNullishQueries = Object.fromEntries(
    Object.entries(validQueries).filter(([, v]) => v !== null)
  );
  const filteredList = await filterListByQueries(
    currentList,
    nonNullishQueries
  );
  return filteredList;
};

export default {
  filterListByCategories,
};
  