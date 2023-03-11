import cocktails from '../../fixtures/cocktails.json';

const BASE_URL =
  'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=margarita';

const testUserId = '6408e15177cd25e36a047a8f';

describe('home', () => {
  beforeEach(() => {
    cy.login();
  });
  afterEach(() => {
    cy.logout();
  });
  it('should get favorites request succeed and getting the 4 favorites', () => {
    cy.intercept('GET', `/api/favorites/getFavoredCocktail/${testUserId}`, {
      fixture: 'favorites-cocktails.json',
    }).as('user-favorites');
    cy.wait('@user-favorites').its('response.statusCode').should('eq', 200);

    cy.get('@user-favorites')
      .its('response.body')
      .should('have.property', 'favorites')
      .and('have.length', 4)

      .and((fav) => {
        expect(fav[0]).to.deep.eq({
          strDink: 'Margarita',
          idDrink: '420',
          alcoholic: 'alcoholic',
        });

        expect(fav[1]).to.deep.eq({
          strDink: 'Whitecap Margarita',
          idDrink: '423',
          alcoholic: 'alcoholic',
        });

        expect(fav[2]).to.deep.eq({
          strDink: 'Strawberry Margarita',
          idDrink: '424',
          alcoholic: 'alcoholic',
        });

        expect(fav[3]).to.deep.eq({
          strDink: 'Queen Charlotte',
          idDrink: '210',
          alcoholic: 'alcoholic',
        });
      });
  });

  it('fetched cocktails with value margarita successfully', () => {
    cy.intercept(BASE_URL, { fixture: 'cocktails' }).as('fetchedCocktails');
    cy.fixture('cocktails').as('cocktails');
    cy.get('@cocktails').should('have.length', 6);
    cy.wrap(cocktails).should('have.length', 6);
    cy.getByTestId('cocktails-list').within(() => {
      cy.contains('Smashed Watermelon Margarita').should('exist');
    });
  });

  it('should display list with items containing Q letter', () => {
    cy.wait(1000);
    const Q = cy.get('ul > :nth-child(17)');
    Q.click();
    cy.getByTestId('Q').should('be.visible');
    cy.getByTestId('Q').contains('Queen Bee');
  });

  it('should display list with no results containing U letter', () => {
    const U = cy.get('ul > :nth-child(21)');
    U.click();

    cy.getByTestId('no-results-text')
      .should('be.visible')
      .and('contain', 'Aucun résultat trouvé');
  });

  it('should search input after typing have provide new value and cocktail list be reloaded with filtered search values', () => {
    cy.get('input[type=search]').should('have.value', '').type('po');
    cy.get('input[type=search]').should('have.value', 'po');
    cy.get('input[type=search]').clear().type('ma').should('have.value', 'ma');
    cy.getByTestId('cocktails-list')
      .children()
      .should('exist')
      .and('have.length', 6)
      .and('contain', 'ma');
  });

  it('should selected filters been displayed on the dropdown-container list', () => {
    cy.getByTestId('dropdown-container').click();
    const checkBoxOrdinaryDrink = cy.get(':nth-child(4) > input');
    const checkBoxCocktail = cy.get(':nth-child(5) > input');
    checkBoxOrdinaryDrink.click();
    cy.getByTestId('dropdown-container').click();
    checkBoxCocktail.click();
    cy.getByTestId('dropdown-container').click();
    cy.getByTestId('dropdown-tags-items')
      .children()
      .should('have.length', 2)
      .and((filters) => {
        expect(filters[0]).to.contain.text('Boisson ordinaire');
        expect(filters[1]).to.contain.text('Cocktail');
      });
  });

  it('should results for margarita pass from 6 to 4 with Ordinary Drink filter', () => {
    cy.getByTestId('cocktails-list')
      .children()
      .should('exist')
      .and('have.length', 6);
    cy.getByTestId('dropdown-container').click();
    const checkBoxOrdinaryDrink = cy.get(':nth-child(4) > input');
    checkBoxOrdinaryDrink.click();
    cy.getByTestId('cocktails-list')
      .children()
      .should('exist')
      .and('have.length', 4);
  });
});
