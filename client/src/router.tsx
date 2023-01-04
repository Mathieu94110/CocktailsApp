import React, { lazy } from 'react';
import App from './App';
import { createHashRouter } from 'react-router-dom';
import { rootLoader } from './loaders/rootLoader';
import ProtectedRoute from 'components/ProtectedRoute/ProtectedRoute';
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const CocktailsRecipeCard = lazy(
  () => import('./pages/CocktailsRecipe/CocktailsRecipe')
);
const Signup = lazy(() => import('./pages/Signup/Signup'));
const Signin = lazy(() => import('./pages/Signin/Signin'));

export const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    loader: rootLoader,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: 'signup',
        element: <Signup />,
      },
      {
        path: 'signin',
        element: <Signin />,
      },
      {
        path: '/recipe/:name',
        element: (
          <ProtectedRoute>
            <CocktailsRecipeCard />
          </ProtectedRoute>
        ),
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
