import React, { lazy } from 'react';
import { createHashRouter } from 'react-router-dom';
import App from './App';
import CocktailsRecipeCard from './pages/CocktailsRecipe/CocktailsRecipe';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));

export const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/recipe/:name',
        element: <CocktailsRecipeCard />,
        loader: async ({ params }) => {
          const res = await fetch(
            `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${params.name}`
          );
          const recipe = await res.json();
          return recipe.drinks;
        },
      },
    ],
  },
]);