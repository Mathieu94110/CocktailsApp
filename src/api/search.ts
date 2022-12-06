import axios from 'axios';
import { CocktailInterface } from 'interfaces';

const cocktailApi = axios.create({
  baseURL: 'https://www.thecocktaildb.com/api/json/v1/1/',
});

export default {
  searchCocktails: async (value: string): Promise<CocktailInterface[]> => {
    try {
      let cocktail = await cocktailApi.get(`search.php?s=${value}`);
      return cocktail.data.drinks;
    } catch (err) {
      throw new Error('Error fetch cocktails');
    }
  },
};
