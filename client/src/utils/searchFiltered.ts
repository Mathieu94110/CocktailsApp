import {
  CocktailInterface,
  ValidQueriesInterface,
} from 'interfaces';
import { CocktailsFiltersKey } from 'interfaces/filters.interface';

/**
 * Function to determine the required information based on the selected categories.
 * @param categories List of selected categories
 * @returns An object containing valid queries
 */
const getRequiredInfos = (categories: string[]): ValidQueriesInterface => {
  const validQueries: ValidQueriesInterface = {};

  const categoryMappings: Record<string, () => void> = {
    alcoholic: () => {
      if (categories.includes('alcoholic') && !categories.includes('nonAlcoholic')) {
        validQueries.strAlcoholic = 'Alcoholic';
      } else if (!categories.includes('alcoholic') && categories.includes('nonAlcoholic')) {
        validQueries.strAlcoholic = 'Non alcoholic';
      }
    },
    ordinaryDrink: () => {
      if (categories.includes('ordinaryDrink') && !categories.includes('cocktail')) {
        validQueries.strCategory = 'Ordinary Drink';
      } else if (!categories.includes('ordinaryDrink') && categories.includes('cocktail')) {
        validQueries.strCategory = 'Cocktail';
      }
    },
    cocktailGlass: () => {
      if (!categories.includes('cocktailGlass') && categories.includes('champagneFlute')) {
        validQueries.strGlass = 'Champagne flute';
      } else if (categories.includes('cocktailGlass') && !categories.includes('champagneFlute')) {
        validQueries.strGlass = 'Cocktail glass';
      }
    },
  };

  // Apply category transformations
  Object.keys(categoryMappings).forEach((category) => {
    categoryMappings[category]();
  });

  return validQueries;
};

/**
 * Checks and retrieves the valid queries based on the selected categories.
 * @param categories Selected categories
 * @returns Valid information for the query
 */
const getValidQueries = (categories: CocktailsFiltersKey[]): ValidQueriesInterface => {
  return getRequiredInfos(categories);
};

/**
 * Filters the cocktails based on the provided filters.
 * @param cocktails List of cocktails to filter
 * @param filters Filtering criteria
 * @returns Filtered list of cocktails
 */
const filtercocktailsByQueries = (
  cocktails: CocktailInterface[],
  filters: Record<string, string>
): CocktailInterface[] => {
  const filterKeys = Object.keys(filters);

  if (!cocktails?.length) return [];

  return cocktails.filter((cocktail) => {

    return filterKeys.every((key) => {
      const filterValue = filters[key];
      if (!filterValue) return true;
      return cocktail[key as keyof CocktailInterface] === filterValue;
    });
  });
};

/**
 * Filters the list of cocktails based on the selected categories.
 * @param categories Categories to filter
 * @param currentList Current cocktails list
 * @returns Filtered cocktails list
 */
export const filterListByCategories = (
  categories: any[],
  currentList: CocktailInterface[]
): CocktailInterface[] => {
  const validQueries = getValidQueries(categories);
  const filteredQueries = Object.fromEntries(
    Object.entries(validQueries).filter(([, value]) => value)
  );
  // return filtered list by valid queries
  return filtercocktailsByQueries(currentList, filteredQueries);
};