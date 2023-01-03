import axios from 'axios';
import { CocktailInterface, CategoriesInterface } from 'interfaces';
import filterSearchUtil from '../utils/searchFiltered';

const cocktailApi = axios.create({
  baseURL: 'https://www.thecocktaildb.com/api/json/v1/1/',
});

export default {
  searchCocktails: async (name: string): Promise<CocktailInterface[]> => {
    try {
      let cocktail = await cocktailApi.get(`search.php?s=${name}`);
      return cocktail.data.drinks;
    } catch (err) {
      throw new Error('Error fetch cocktails');
    }
  },

  searchByFilters: async (
    categories: CategoriesInterface[],
    currentCocktailsList: CocktailInterface[]
  ): Promise<any> => {
    const filteredList = await filterSearchUtil.filterListByCategories(
      categories,
      currentCocktailsList
    );
    return filteredList;
  },
  searchByLetter: async (letter: string): Promise<any> => {
    try {
      let cocktail = await cocktailApi.get(`search.php?f=${letter}`);
      return cocktail.data.drinks;
    } catch (err) {
      throw new Error('Error fetch cocktails by first letter');
    }
  },
};
