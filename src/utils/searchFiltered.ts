import type { CategoriesInterface } from 'interfaces';
import { CocktailInterface } from 'interfaces';

const checkRequestQueries = (categories: any) => {
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

const multiPropsFilter = (products: any, filters: any) => {
  const filterKeys = Object.keys(filters);
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

const currentListFilteredByCategories = async (
  categories: CategoriesInterface[],
  currentList: CocktailInterface[]
): Promise<CocktailInterface[]> => {
  const categoriesInArray: any = categories.map((category) => category.value);

  const validQueries = await checkRequestQueries(categoriesInArray);
  const nonNullishQueries = Object.fromEntries(
    Object.entries(validQueries).filter(([, v]) => v !== null)
  );
  const response = await multiPropsFilter(currentList, nonNullishQueries);
  return response;
};

export default {
  currentListFilteredByCategories,
};
