import React, { lazy } from 'react';
import { createHashRouter } from 'react-router-dom';
import App from './App';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const CocktailsRecipeCard = lazy(
  () => import('./pages/CocktailsRecipe/CocktailsRecipe')
);
const Signup = lazy(() => import('./pages/Signup/Signup'));

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
        path: 'signup',
        element: <Signup />,
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
