import axios from 'axios';

const cocktailApi = axios.create({
  baseURL: 'https://www.thecocktaildb.com/api/json/v1/1/',
});

export default {
  searchCocktails: async (value) => {
    try {
      let cocktail = await cocktailApi.get(`search.php?s=${value}`);
      console.log(cocktail.data.drinks);
      return cocktail.data.drinks;
    } catch (err) {
      return err;
    }
  },
};
