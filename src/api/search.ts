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
    console.log(currentCocktailsList);
    if (currentCocktailsList.length && categories.length) {
      const filteredList = await filterSearchUtil.currentListFilteredByCategories(
        categories,
        currentCocktailsList
      );
      return filteredList;
    } else if (currentCocktailsList.length && !categories.length) {
      console.log(
        'currentCocktailsList.length && !categories.length =',
        'currentCocktailsList',
        currentCocktailsList,
        'categories',
        categories
      );
    } else if (!currentCocktailsList.length && categories.length) {
      console.log(
        '!currentCocktailsList.length && categories.length =',
        'currentCocktailsList',
        currentCocktailsList,
        'categories',
        categories
      );
    } else {
      console.log(
        '!currentCocktailsList.length && !categories.length =',
        'currentCocktailsList',
        currentCocktailsList,
        'categories',
        categories
      );
    }
  },
};
