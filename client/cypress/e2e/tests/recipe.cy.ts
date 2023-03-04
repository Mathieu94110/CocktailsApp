describe('recipe component', () => {
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
    cy.hash().should('match', /recipe\/.+$/);
  });
});
