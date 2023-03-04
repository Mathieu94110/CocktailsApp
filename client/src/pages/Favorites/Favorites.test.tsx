import React from 'react';
import {
  render,
  screen,
  act,
  waitFor,
  getByTestId,
} from '@testing-library/react';
import { BrowserRouter, HashRouter, MemoryRouter } from 'react-router-dom';
import { Favorites } from './Favorites';
import '@testing-library/jest-dom';
import { setupServer } from 'msw/lib/node';
import { rest } from 'msw';
import server from '../../mocks/server';

describe.only('Favorites', () => {
  it('renders correctly', () => {
    render(<Favorites />, {
      wrapper: BrowserRouter,
    });
    const mainTitle = screen.getByText('Vos favoris');
    expect(mainTitle).toBeInTheDocument();
  });
  test('Renders the component without favorites', async () => {
    server.use(
      rest.get('/api/favorites/getFavoredCocktail/', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json([]));
      })
    );
    render(<Favorites />, {
      wrapper: BrowserRouter,
    });
    await screen.findByText(/Vous n'avez pas enregistré de favoris/i);
  });


  
  // it('should load the user favorite', async () => {
  // render(<MemoryRouter initialEntries={['/']}> <Favorites /></MemoryRouter>);
  //  const favs = await screen.getByText('Nom du cocktail')
  //  expect(favs).toBeVisible()
  // await waitFor(() => getByText('Nom du cocktail') )
  // const firstTitle = screen.getByTestId('custom-element');
  // expect(firstTitle).toContain('Nom du cocktail');
  // const favorites = await screen.findAllByTestId('favorites-items');
  // expect(favorites).toHaveLength(3);
  // screen.debug();
  // const favorites = await screen.findAllByTestId('favorites-items');
  // debug(favorites);
  // await waitFor(() => expect(title).toContain('Nom du cocktail'));
  // await waitFor(() => expect(favorites).toHaveLength(3));
  // });
});
