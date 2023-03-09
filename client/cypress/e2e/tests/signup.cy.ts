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
    cy.get('[data-cy="registration-name"]').clear();
    cy.get('[data-cy="registration-name"]').focus().type('toto9422', {
      delay: 100,
    });
    cy.get('[data-cy="registration-email"]').clear();
    cy.get('[data-cy="registration-email"]').focus().type('toto', {
      delay: 50,
    });
    cy.get('[data-cy="registration-password"]').clear();
    cy.get('[data-cy="registration-password"]').focus().type('toto', {
      delay: 50,
    });
    cy.get('form').submit();
    cy.wait(500);
    cy.get('.auth-form-error')
      .should('exist')
      .and('have.text', "L'email n'est pas valide");
  });

  it('should restration succeed', () => {
    // random here is used in order to avoid 400 request
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    cy.intercept('POST', '/api/users').as('createUser');
    cy.get('[data-cy="registration"]').click();
    cy.get('[data-cy="registration-name"]').clear();
    cy.get('[data-cy="registration-name"]').focus().type('John', {
      delay: 100,
    });
    cy.get('[data-cy="registration-email"]').clear();
    cy.get('[data-cy="registration-email"]')
      .focus()
      .type(`john${randomNumber}@gmail.com`, {
        delay: 50,
      });
    cy.get('[data-cy="registration-password"]').clear();
    cy.get('[data-cy="registration-password"]').focus().type('johnSmith', {
      delay: 50,
    });
    cy.get('form').submit();
    cy.wait('@createUser').then(({ response }) => {
      response && expect(response.statusCode).to.eq(200);
    });
  });
});
