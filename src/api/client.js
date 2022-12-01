import * as axios from 'axios';

const apiCocktails = axios.create({
  baseURL: 'https://api.api-ninjas.com/v1/cocktail',
});

apiCocktails.interceptors.request.use((req) => {
  req.headers['Authorization'] = `Bearer ${process.env.API_KEY}`;
  return req;
});

export default apiCocktails;
