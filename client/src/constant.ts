import { CategoriesInterface } from './interfaces/categories.interface';

export const options: CategoriesInterface[] = [
  { value: 'Alcoholic', label: 'Alcoholic', text: 'Avec alcool', id: 0 },
  {
    value: 'Non_Alcoholic',
    label: 'Non Alcoholic',
    text: 'Sans alcool',
    id: 1,
  },
  {
    value: 'Ordinary_Drink',
    label: 'Ordinary Drink',
    text: 'Boisson ordinaire',
    id: 2,
  },
  { value: 'Cocktail', label: 'Cocktail', text: 'Cocktail', id: 3 },
  {
    value: 'Cocktail_glass',
    label: 'Cocktail glass',
    text: 'Verre à cocktail',
    id: 4,
  },
  {
    value: 'Champagne_flute',
    label: 'Champagne flute',
    text: 'Flûte à champagne',
    id: 5,
  },
];
