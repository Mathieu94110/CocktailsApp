const testUserId = '63b5c92082ebbfdb325c5db1';

describe('favorites', () => {
  beforeEach(() => {
    cy.login();
  });

  it('should display sucessfully favorites page', () => {
    cy.get('[data-cy="favorites-btn-desktop"]').click();
    cy.wait(1000);
    cy.get('h1').should('be.visible').and('contain', 'Vos favoris');
  });

  it('should user remove margarita and watermelon margarita from his favorite list', () => {
    cy.get('[data-cy="heart-icon"]').first().click();
    cy.wait(1000);

    cy.get('[data-cy="heart-icon"]').last().click();
    cy.wait(1000);
    cy.get('[data-cy="favorites-btn-desktop"]').click();
    cy.contains('Smashed Watermelon Margarita').should('not.exist');
  });
  it('should user add margarita smashed watermelon and margarita cocktails on his favorites list', () => {
    cy.get('[data-cy="heart-icon"]')
      .first()
      .click()
      .should('have.class', 'text-primary');
    cy.wait(1000);

    cy.get('[data-cy="heart-icon"]')
      .last()
      .click()
      .should('have.class', 'text-primary');
    cy.wait(1000);
    cy.get('[data-cy="favorites-btn-desktop"]').click();
    cy.get('[data-cy="favorites-items"]').contains(
      'Smashed Watermelon Margarita'
    );
  });
  let favLengthBefore: number;
  it('should Blue Margarita cocktail been removed from his favorites when clicked on removed button', () => {
    cy.get(
      ':nth-child(2) > .Recipe_recipeContent__otWvd > [data-cy="heart-icon"]'
    )
      .click()
      .should('have.class', 'text-primary');
    cy.wait(1000);

    cy.get('[data-cy="favorites-btn-desktop"]').click();

    cy.get('[data-cy="favorites-table"]')
      .find('tr')
      .its('length')
      .then((len) => {
        favLengthBefore = len;
        cy.log('Initial table Length is: ' + favLengthBefore);
      });

    cy.get('[data-cy="delete-favorite-btn"]').last().click();
    cy.wait(500);
    cy.get('[data-cy="favorites-table"]')
      .find('tr')
      .its('length')
      .then((lenAfter) => {
        cy.log('After table Length is: ' + lenAfter);
        expect(favLengthBefore).to.equal(lenAfter + 1);
      });
  });
});
