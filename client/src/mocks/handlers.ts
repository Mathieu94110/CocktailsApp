import { rest } from 'msw';

export const handlers = [
  rest.get('/api/favorites/getFavoredCocktail/:userInfos', (req, res, ctx) => {
    const { userInfos } = req.params;
    return res(
      ctx.status(200),
      ctx.json([
        {
          userFrom: userInfos,
          idDrink: '11007',
          strDrink: 'Margarita',
          strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg',
        },
        {
          userFrom: userInfos,
          idDrink: '14008',
          strDrink: 'Victor',
          strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg',
        },
        {
          userFrom: userInfos,
          idDrink: '12007',
          strDrink: 'Tequila punch',
          strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/56oda6158957789f.jpg',
        },
      ])
    );
  }),
];
