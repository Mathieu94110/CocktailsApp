import { categoryFilterMap } from 'data/constant';
import { CocktailInterface } from 'interfaces';
import { CocktailsFiltersKey } from 'interfaces/filters.interface';
import { filterListByCategories } from 'utils';

const coktailsApiUrl = 'https://www.thecocktaildb.com/api/json/v1/1';

export const searchCocktails = async (
  name: string
): Promise<CocktailInterface[]> => {
  try {
    const data = await fetch(`${coktailsApiUrl}/search.php?s=${name}`);
    if (data.ok) {
      const response = await data.json();
      return response.drinks;
    }
    return [];
  } catch (err) {
    throw new Error('Error fetch cocktails');
  }
};

export const searchByFilters = async (
  categories: CocktailsFiltersKey[],
  currentCocktailsList: CocktailInterface[]
): Promise<CocktailInterface[]> => {
  try {
    const filteredList = await filterListByCategories(
      categories,
      currentCocktailsList
    );
    return filteredList;
  } catch (err) {
    throw new Error('Error fetch cocktails by filters');
  }
};

export const searchByLetter = async (
  letter: string
): Promise<CocktailInterface[]> => {
  try {
    const data = await fetch(`${coktailsApiUrl}/search.php?f=${letter}`);
    const response = await data.json();
    return response.drinks;
  } catch (err) {
    throw new Error('Error fetch cocktails by first letter');
  }
};

export const getSuggestsByGlass = async (
  glass: string
): Promise<CocktailInterface[]> => {
  try {
    const data = await fetch(`${coktailsApiUrl}/filter.php?g=${glass}`);
    const response = await data.json();
    return response.drinks;
  } catch (err) {
    throw new Error('Error fetch suggested cocktails by glass');
  }
};

export const getSuggestsByCategory = async (
  category: string
): Promise<CocktailInterface[]> => {
  try {
    const data = await fetch(`${coktailsApiUrl}/filter.php?c=${category}`);
    const response = await data.json();
    return response.drinks;
  } catch (err) {
    throw new Error('Error fetch suggested cocktails by category');
  }
};

export const searchByCategoryFilter = async (filter: string) => {
  try {
    const filterEntry = categoryFilterMap[filter];
    if (!filterEntry) {
      return [];
    }
    const url = `${coktailsApiUrl}/filter.php?${filterEntry.param}=${filterEntry.value}`;
    const response = await fetch(url);
    const data = await response.json();

    return data.drinks || [];
  } catch (error) {
    console.error('Error fetching cocktails by filters:', error);
    throw new Error('Failed to fetch cocktails');
  }
};


const SearchApi = {
  searchCocktails,
  searchByFilters,
  searchByLetter,
  getSuggestsByGlass,
  getSuggestsByCategory,
  searchByCategoryFilter
};

export default SearchApi;
