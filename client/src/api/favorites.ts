import axios from 'axios';

export const removeFromFavorites = async (variables: any): Promise<any> => {
  try {
    let response = await axios.post(
      '/api/favorites/removeFromFavorites',
      variables
    );
    const objectResponse = {
      response: response,
      message: `${response.data.doc.strDrink} a été retiré de vos favoris`,
    };
    return objectResponse;
  } catch (err) {
    return 'Erreur lors de la suppression du cocktail de vos favoris';
  }
};

export const addToFavorites = async (variables: any): Promise<any> => {
  try {
    let response = await axios.post('/api/favorites/addToFavorites', variables);
    return response;
  } catch (err) {
    return "Erreur lors de l'ajout du cocktail à vos favoris";
  }
};

export const getFavorites = async (variable: any): Promise<any> => {
  try {
    let response = await axios.post(
      '/api/favorites/getFavoredCocktail',
      variable
    );
    return response;
  } catch (err) {
    return "Erreur lors de l'ajout du cocktail à vos favoris";
  }
};

