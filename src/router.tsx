import React, { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import CocktailsRecipeCard from './pages/CocktailsRecipe/CocktailsRecipe';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));

export const router = createBrowserRouter([
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
        caseSensitive: true,
      },
    ],
  },
]);
// // import React, { lazy } from 'react';
// import { createBrowserRouter } from 'react-router-dom';
// import App from './App';
// import CocktailsRecipeCard from './pages/CocktailsRecipe/CocktailsRecipe';

// // const HomePage = lazy(() => import('./pages/HomePage/HomePage'));

// export const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />,
//   },
//   {
//     path: '/recipe',
//     element: <CocktailsRecipeCard />,
//   },
//   {
//     path: '/recipe/:id',
//     element: <CocktailsRecipeCard />,
//   },
// ]);
