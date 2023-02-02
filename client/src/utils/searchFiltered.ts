import { CocktailInterface, CategoriesInterface, ValidQueriesInterface } from 'interfaces';

function requiredInfos(
  categories: CategoriesInterface['value'][],
): ValidQueriesInterface {
  let validQueries: ValidQueriesInterface = {
    strAlcoholic: '',
    strCategory: '',
    strGlass: '',
  };
  let i = 0;
  while ( i < categories.length ) {
    if (categories.includes('Alcoholic') && !categories.includes('Non_Alcoholic')) {
      validQueries.strAlcoholic = 'Alcoholic';
    } if (!categories.includes('Alcoholic') && categories.includes('Non_Alcoholic')) {
      validQueries.strAlcoholic = 'Non alcoholic';
    } if (categories.includes('Ordinary_Drink') && !categories.includes('Cocktail')) {
      validQueries.strCategory = 'Ordinary Drink';
    } if (!categories.includes('Ordinary_Drink') && categories.includes('Cocktail') ) {
      validQueries.strCategory = 'Cocktail';
    } if (!categories.includes('Cocktail_glass') && categories.includes('Champagne_flute')) {
      validQueries.strGlass = 'Champagne flute';
    } if (categories.includes('Cocktail_glass') && !categories.includes('Champagne_flute')) {
      validQueries.strGlass = 'Cocktail glass';
    }
    i++;
  }

  return validQueries;
}

const checkRequestQueries = (categories: CategoriesInterface['value'][]):ValidQueriesInterface => {
  const validInfos = requiredInfos(categories);
  return validInfos;
};

function filteredListByQueries(products: CocktailInterface[], filters: { [key: string]: string } ) {
  const filterKeys = Object.keys(filters);
  if (!products) return [];
  return products.filter((product: any) => {
    return filterKeys.every((key:string) => {
      if (!filters[key].length) return true;
      if (Array.isArray(product[key])) {
        return product[key].some((keyEle: string) =>
          filters[key].includes(keyEle)
        );
      }
      return filters[key].includes(product[key]);
    });
  });
}

export async function filterListByCategories(
  categories: CategoriesInterface[],
  currentList: CocktailInterface[]
): Promise<CocktailInterface[]> {
  const categoryValues:  CategoriesInterface['value'][] = categories.map(
    (category: CategoriesInterface) => category.value
  );
  const validQueries = checkRequestQueries(categoryValues);
  const filteredQueries = Object.fromEntries(
    Object.entries(validQueries).filter(([, v]) => v !== '')
  );
  const filteredList: CocktailInterface[] = await filteredListByQueries(
    currentList,
    filteredQueries
  );
  return filteredList;
}