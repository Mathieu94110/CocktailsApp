import { CategoriesInterface } from 'interfaces';

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

export const glasses: string[] = [
  'Collins glass',
  'Old-Fashioned glass',
  'Cocktail glass',
  'Shot glass',
  'Martini Glass',
  'Highball Glass',
  'Highball glass',
  'Margarita/Coupette glass',
  'Margarita\/Coupette glass',
  'Whiskey sour glass',
  'Champagne Flute',
  'Margarita glass',
  'Pint glass',
  'Coupe Glass',
  'Beer pilsner',
  'Beer mug',
  'Coffee mug',
  'Coffee Mug',
  'Copper Mug',
  'Hurricane glass',
  'Punch bowl',
  'Whiskey sour glass',
  'Pitcher',
  'Beer Glass',
  'Irish coffee cup',
  'Mason jar',
  'Balloon Glass',
  'Cordial glass',
  'Brandy snifter',
  'Jar',
  'Nick and Nora Glass',
  'White wine glass',
  'Whiskey Glass',
  'Pousse cafe glass',
  'Wine Glass',
];

export const categories: string[] = [
  'Ordinary Drink',
  'Cocktail',
  'Shot',
  'Punch\/Party Drink', // doesnt work
  'Coffee\/Tea', // doesnt work
  'Shake',
  'Soft Drink',
  'Beer',
  'Homemade Liqueur',
  'Cocoa',
];