import cocktails from '../../fixtures/cocktails.json';

const BASE_URL =
  'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=margarita';

describe('home', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-cy="email"]').focus().type('byby@gmail.com', {
      delay: 50,
    });
    cy.get('[data-cy="password"]').focus().type('byby', {
      delay: 50,
    });
    cy.get('form').submit();
  });
  it('fetched cocktails with value margarita successfully', () => {
    cy.intercept(BASE_URL, { fixture: 'cocktails' }).as('fetchedCocktails');
    cy.fixture('cocktails').as('cocktails');
    cy.get('@cocktails').should('have.length', 6);
    cy.wrap(cocktails).should('have.length', 6);
    cy.get('[data-cy="cocktails-list"]').within(() => {
      cy.contains('Smashed Watermelon Margarita').should('exist');
    });
  });
});
