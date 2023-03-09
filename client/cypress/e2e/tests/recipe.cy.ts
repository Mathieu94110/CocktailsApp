describe('recipe component', () => {
  beforeEach(() => {
    cy.login();
  });
  afterEach(() => {
    cy.logout();
  });
  it('should heart icon been active/ not active onClick', () => {
    cy.get('[data-cy="heart-icon"]')
      .last()
      .click()
      .should('have.class', 'text-primary')
      .click()
      .should('not.have.class', 'text-primary');
  });
  it('should navigate on cocktail recipe page on image click', () => {
    cy.get('[data-cy="recipe-img"]').last().click();
    cy.wait(1000);
    cy.hash().should('match', /recipe\/.+$/);
  });
});
