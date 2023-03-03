describe('test signup page', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('should after registration link click registration page been displayed as expected', () => {
    cy.get('[data-cy="registration"]').click();
    cy.contains('h2', /Inscription/).should('exist');
    cy.get('[data-cy="registration-btn"]')
      .should('have.class', 'btn-primary')
      .and('have.text', 'Inscription');
  });
  it('should email provided during restration be invalid', () => {
    cy.get('[data-cy="registration"]').click();
    cy.get('[data-cy="registration-name"]').focus().type('toto9422', {
      delay: 100,
    });
    cy.get('[data-cy="registration-email"]').focus().type('toto', {
      delay: 50,
    });

    cy.get('[data-cy="registration-password"]').focus().type('toto', {
      delay: 50,
    });

    cy.get('[data-cy="registration-btn"]').click();
    cy.get('.auth-form-error')
      .should('exist')
      .and('have.text', "L'email n'est pas valide");
  });
  // On below we should change email every time
  it('should restration succeed', () => {
    cy.get('[data-cy="registration"]').click();
    cy.get('[data-cy="registration-name"]').focus().type('toto942221', {
      delay: 100,
    });
    cy.get('[data-cy="registration-email"]').focus().type('toto212@aol.com', {
      delay: 50,
    });

    cy.get('[data-cy="registration-password"]').focus().type('toto', {
      delay: 50,
    });

    cy.get('[data-cy="registration-btn"]').click();
    cy.url().should('match', /\/signin$/);
  });
});
