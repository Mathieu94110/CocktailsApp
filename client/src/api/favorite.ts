import axios from 'axios';

export default {
  removeFromFavorite: async (variables: any): Promise<any> => {
    try {
      let response = await axios.post(
        '/api/favorite/removeFromFavorite',
        variables
      );
      const objectResponse = {
        response: response,
        message: `${response.data.doc.strDrink} a été retiré de vos favoris`,
      };
      return objectResponse;
    } catch (err) {
      return 'Erreur lors de la suppression du cocktail de vos favoris';
      throw new Error('Error fetch cocktails');
    }
  },

  addToFavorite: async (variables: any): Promise<any> => {
    try {
      let response = await axios.post('/api/favorite/addToFavorite', variables);
      return response;
    } catch (err) {
      return "Erreur lors de l'ajout du cocktail à vos favoris";
    }
  },

  getFavorites: async (variable: any): Promise<any> => {
    try {
      let response = await axios.post(
        '/api/favorite/getFavoredCocktail',
        variable
      );
      return response;
    } catch (err) {
      return "Erreur lors de l'ajout du cocktail à vos favoris";
    }
  },
};
