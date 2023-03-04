import cocktails from '../../fixtures/cocktails.json';

const BASE_URL =
  'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=margarita';

describe('home', () => {
  beforeEach(() => {
    cy.login();
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

  it('should display list with items containing Q letter', () => {
    const Q = cy.get('ul > :nth-child(17)');
    Q.click();
    cy.getByCy('Q').should('be.visible');
    cy.get(
      ':nth-child(4) > .Recipe_recipeContent__otWvd > [data-cy="recipe-stDrink"]'
    ).contains('Q');
  });

  it('should display list with no results containing U letter', () => {
    const U = cy.get('ul > :nth-child(21)');
    U.click();
    cy.get(
      ':nth-child(4) > .Recipe_recipeContent__otWvd > [data-cy="recipe-stDrink"]'
    ).should('not.exist');
    cy.get('[data-cy="no-results-text"]')
      .should('be.visible')
      .and('contain', 'Aucun résultat trouvé');
  });

  it('should search input after typing have provided new value and cocktail list be reloaded with filtered search values', () => {
    cy.get('input[type=search]')
      .should('have.value', '')
      .type('po', { delay: 50 })
      .should('have.value', 'po')
      .clear()
      .type('ma', { delay: 50 })
      .should('have.value', 'ma');
    cy.get('[data-cy="cocktails-list"]')
      .children()
      .should('exist')
      .and('have.length', 6)
      .and('contain', 'ma');
  });

  it('should selected filters been displayed on the dropdown-container list', () => {
    cy.get('[data-cy="dropdown-container"]').click();
    const checkBoxOrdinaryDrink = cy.get(':nth-child(4) > input');
    const checkBoxCocktail = cy.get(':nth-child(5) > input');
    checkBoxOrdinaryDrink.click();
    cy.get('[data-cy="dropdown-container"]').click();
    checkBoxCocktail.click();
    cy.get('[data-cy="dropdown-container"]').click();
    cy.get('[data-cy="dropdown-tags-items"]')
      .children()
      .should('have.length', 2)
      .and((filters) => {
        expect(filters[0]).to.contain.text('Boisson ordinaire');
        expect(filters[1]).to.contain.text('Cocktail');
      });
  });

  it('should results for margarita pass from 6 to 4 with Ordinary Drink filter', () => {
    cy.get('[data-cy="cocktails-list"]')
      .children()
      .should('exist')
      .and('have.length', 6);
    cy.get('[data-cy="dropdown-container"]').click();
    const checkBoxOrdinaryDrink = cy.get(':nth-child(4) > input');
    checkBoxOrdinaryDrink.click();
    cy.get('[data-cy="cocktails-list"]')
      .children()
      .should('exist')
      .and('have.length', 4);
  });
});
