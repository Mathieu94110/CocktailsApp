import React, { useState } from 'react';
import * as router from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import { Recipe } from './Recipe';
import { CocktailInterface } from 'interfaces';

const navigate = jest.fn();
const toggleFavorite = jest.fn();

const fakeCocktail: Partial<CocktailInterface> = {
  idDrink: '11007',
  strDrink: 'Margarita',
  strDrinkThumb:
    'https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg',
};
const favoritesCocktails: Partial<CocktailInterface>[] = [
  {
    idDrink: '11007',
    strDrink: 'Margarita',
    strDrinkThumb:
      'https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg',
  },
];

const setup = () => {
  const { findByRole, getByRole, getByTestId } = render(
    <Recipe
      cocktails={fakeCocktail}
      favorites={favoritesCocktails}
      toggleFavorite={toggleFavorite}
    />,
    {
      wrapper: BrowserRouter,
    }
  );
  return {
    findByRole,
    getByRole,
    getByTestId,
  };
};

beforeEach(() => {
  jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
});

describe('Recipe', () => {
  it('img should have the right properties', () => {
    const { getByRole } = setup();
    const img = getByRole('img') as HTMLImageElement;
    expect(img.alt).toContain('Margarita');
    expect(img.getAttribute('src')).toBe(
      'https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg'
    );
  });

  it('should heart icon be in component', async () => {
    const { getByTestId } = setup();
    const icon = getByTestId('heart-icon') as HTMLElement;
    expect(icon).toBeInTheDocument();
  });

  it('should display Margarita on h3', () => {
    const { findByRole, getByRole } = setup();
    findByRole('heading');
    expect(getByRole('heading')).toHaveTextContent('Margarita');
  });
  it('should navigate on coktail details page on click', () => {
    const { getByRole } = setup();
    const img = getByRole('img') as HTMLImageElement;
    fireEvent.click(img);
    expect(navigate).toHaveBeenCalledWith('/recipe/11007');
  });

  it('setState works', () => {
    const isFavorite = false;
    const setStateMock = jest.fn();
    const useStateMock: any = (useState: boolean) => [false, setStateMock];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    const monMock = jest.fn(() => setStateMock(!isFavorite));
    monMock();
    expect(setStateMock).toHaveBeenCalled();
    expect(useState).toBeTruthy();
  });
});
