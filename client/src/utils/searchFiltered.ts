import type { CategoriesInterface } from 'interfaces';
import { CocktailInterface } from 'interfaces';
import { CATEGORYTYPES } from '../types/categories';

function isRequiredInfos(
  categories: CATEGORYTYPES[],
  cat1: CATEGORYTYPES,
  cat2: CATEGORYTYPES
): boolean {
  return (
    (categories.includes(cat1) && !categories.includes(cat2)) ||
    (!categories.includes(cat1) && categories.includes(cat2))
  );
}

function categoriesQueries(
  categories: CATEGORYTYPES[],
  requiredInfos: boolean,
  cat1: CATEGORYTYPES,
  cat2: CATEGORYTYPES
) {
  return requiredInfos && categories.includes(cat1)
    ? cat1.split('_').join(' ')
    : requiredInfos && categories.includes(cat2)
      ? cat2 === 'Non_Alcoholic'
        ? 'Non alcoholic'
        : cat2.split('_').join(' ')
      : null;
}
const checkRequestQueries = (categories: CATEGORYTYPES[]) => {
  const validAlcoholicIInfo = isRequiredInfos(
    categories,
    'Alcoholic',
    'Non_Alcoholic'
  );

  const validCocktailIInfo = isRequiredInfos(
    categories,
    'Ordinary_Drink',
    'Cocktail'
  );

  const validGlassInfo = isRequiredInfos(
    categories,
    'Cocktail_glass',
    'Champagne_flute'
  );

  const alcoholicQueries = categoriesQueries(
    categories,
    validAlcoholicIInfo,
    'Alcoholic',
    'Non_Alcoholic'
  );

  const cocktailQueries = categoriesQueries(
    categories,
    validCocktailIInfo,
    'Ordinary_Drink',
    'Cocktail'
  );

  const glassQueries = categoriesQueries(
    categories,
    validGlassInfo,
    'Cocktail_glass',
    'Champagne_flute'
  );

  const validQueries = {
    strAlcoholic: alcoholicQueries,
    strCategory: cocktailQueries,
    strGlass: glassQueries,
  };
  return validQueries;
};

function filterListByQueries(products: CocktailInterface[], filters: any) {
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
}

async function filterListByCategories(
  categories: CategoriesInterface[],
  currentList: CocktailInterface[]
): Promise<CocktailInterface[]> {
  const categoryValues: any = categories.map(
    (category: CategoriesInterface) => category.value
  );

  const validQueries = checkRequestQueries(categoryValues);
  const nonNullishQueries = Object.fromEntries(
    Object.entries(validQueries).filter(([, v]) => v !== null)
  );
  const filteredList = await filterListByQueries(
    currentList,
    nonNullishQueries
  );
  return filteredList;
}

export default {
  filterListByCategories,
};
