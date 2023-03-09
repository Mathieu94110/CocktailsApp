const testUserId = '63b5c92082ebbfdb325c5db1';
let favLengthBefore: number;

describe('favorites', () => {
  beforeEach(() => {
    cy.login();
  });

  it('should display sucessfully favorites page', () => {
    cy.get('[data-cy="favorites-link"]').click();
    cy.wait(1000);
    cy.get('h1').should('be.visible').and('contain', 'Vos favoris');
  });

  it('should icon had text-primary class on first heart icon click and not when he clicked on the same a second time', () => {
    cy.get('[data-cy="heart-icon"]').first().click();
    cy.wait(1000);
    cy.get('[data-cy="heart-icon"]').should(($input) => {
      expect($input).to.have.class('text-primary');
    });
    cy.get('[data-cy="heart-icon"]').first().click();
    cy.wait(1000);
    cy.get('[data-cy="heart-icon"]').should(($input) => {
      expect($input).to.not.have.class('text-primary');
    });
    cy.logout();
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
    cy.get('[data-cy="favorites-link"]').click();
    cy.get('[data-cy="favorites-items"]').contains(
      'Smashed Watermelon Margarita'
    );
    // removed on a second time in order other tests does not failed
    cy.get('[data-cy="home-link"]').click();
    cy.wait(2000);
    cy.get('[data-cy="heart-icon"]').first().click();
    cy.get('[data-cy="heart-icon"]').last().click();
    cy.logout();
  });

  it("should Blue Margarita and Tommy's Margarita cocktails been removed from his favorites when clicked on removed button", () => {
    cy.get('[data-cy="heart-icon"]')
      .eq(1)
      .click()
      .should('have.class', 'text-primary');
    cy.wait(1000);
    cy.get('[data-cy="heart-icon"]').eq(2).click();
    cy.wait(1000);
    cy.get('[data-cy="favorites-link"]').click();
    cy.get('[data-cy="favorites-table"]')
      .find('tr')
      .its('length')
      .then((len) => {
        favLengthBefore = len;
        cy.log('Initial table length is: ' + favLengthBefore);
      });
    cy.get('[data-cy="delete-favorite-btn"]').last().click();
    cy.wait(500);
    cy.get('[data-cy="favorites-table"]')
      .find('tr')
      .its('length')
      .then((lenAfter) => {
        cy.log('After table length is: ' + lenAfter);
        expect(favLengthBefore).to.equal(lenAfter + 1);
      });
    cy.get('[data-cy="delete-favorite-btn"]').last().click();
    cy.get('h2').contains("Vous n'avez pas enregistré de favoris");
    cy.logout();
  });
});
