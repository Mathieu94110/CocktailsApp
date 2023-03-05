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
});
