import { lazy } from 'react';
import App from './App';
import { createHashRouter } from 'react-router-dom';
import { rootLoader } from './loaders/rootLoader';
import { ProtectedRoute } from 'components';

const HomePage = lazy(() =>
  import('./pages/Home/Home').then((module) => ({ default: module.Home }))
);

const CocktailsRecipeCard = lazy(() =>
  import('./pages/CocktailsRecipe/CocktailsRecipe').then((module) => ({
    default: module.CocktailsRecipe,
  }))
);

const Signup = lazy(() =>
  import('./pages/Signup/Signup').then((module) => ({ default: module.Signup }))
);

const Signin = lazy(() =>
  import('./pages/Signin/Signin').then((module) => ({ default: module.Signin }))
);

const Favorites = lazy(() =>
  import('./pages/Favorites/Favorites').then((module) => ({
    default: module.Favorites,
  }))
);

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
        path: 'favorites',
        element: (
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        ),
      },
      {
        path: '/recipe/:id',
        element: (
          <ProtectedRoute>
            <CocktailsRecipeCard />
          </ProtectedRoute>
        ),
        loader: async ({ params }) => {
          const res = await fetch(
            `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${params.id}`
          );
          const recipe = await res.json();
          return recipe.drinks;
        },
      },
    ],
  },
]);
