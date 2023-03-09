const testUserId = '63b5c92082ebbfdb325c5db1';
let favLengthBefore: number;

describe('favorites', () => {
  beforeEach(() => {
    cy.login();
  });

  it('should display sucessfully favorites page', () => {
    cy.get('[data-cy="favorites-btn-desktop"]').click();
    cy.wait(1000);
    cy.get('h1').should('be.visible').and('contain', 'Vos favoris');
  });

  it('should icon had text-primary class on first heart icon click and not when he clicked on the same a second time', () => {
    cy.get('[data-cy="heart-icon"]').first().click();
    cy.wait(1000);
    cy.get('[data-cy="heart-icon"]').should(($input) => {
      expect($input[0]).to.have.class('text-primary');
    });
    cy.get('[data-cy="heart-icon"]').first().click();
    cy.wait(1000);
    cy.get('[data-cy="heart-icon"]').should(($input) => {
      expect($input[0]).to.not.have.class('text-primary');
    });
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
    // removed on a second time in order other tests does not failed
    cy.get('[data-cy="home-link"]').click();
    cy.wait(2000);
    cy.get('[data-cy="heart-icon"]').first().click();
    cy.get('[data-cy="heart-icon"]').last().click();
  });

  // it('should Blue Margarita cocktail been removed from his favorites when clicked on removed button', () => {
  //   // need to find a way to replace text after .Recipe_recipeContent__
  //   cy.get(
  //     ':nth-child(2) > .Recipe_recipeContent__otWvd > [data-cy="heart-icon"]'
  //   )
  //     .click()
  //     .should('have.class', 'text-primary');
  //   cy.wait(1000);
  //   cy.get(
  //     ':nth-child(3) > .Recipe_recipeContent__otWvd > [data-cy="heart-icon"]'
  //   ).click();
  //   cy.wait(1000);
  //   cy.get('[data-cy="favorites-btn-desktop"]').click();
  //   cy.get('[data-cy="favorites-table"]')
  //     .find('tr')
  //     .its('length')
  //     .then((len) => {
  //       favLengthBefore = len;
  //       cy.log('Initial table Length is: ' + favLengthBefore);
  //     });
  //   cy.get('[data-cy="delete-favorite-btn"]').last().click();
  //   cy.wait(500);
  //   cy.get('[data-cy="favorites-table"]')
  //     .find('tr')
  //     .its('length')
  //     .then((lenAfter) => {
  //       cy.log('After table Length is: ' + lenAfter);
  //       expect(favLengthBefore).to.equal(lenAfter + 1);
  //     });
  //   cy.get('[data-cy="delete-favorite-btn"]').last().click();
  //   cy.get('h2').contains("Vous n'avez pas enregistré de favoris");
  // });
});
