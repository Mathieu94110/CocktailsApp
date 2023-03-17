describe('test signup page', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('should after registration link click registration page been displayed as expected', () => {
    cy.get('[data-cy="registration"]', { timeout: 2000 }).click();
    cy.contains('h2', /Inscription/).should('exist');
    cy.getByTestId('registration-btn')
      .should('have.class', 'btn-primary')
      .and('have.text', 'Inscription');
  });
  it('should email provided during restration be invalid', () => {
    cy.get('[data-cy="registration"]', { timeout: 2000 }).click();
    cy.getByTestId('registration-name').type('toto9422');
    cy.getByTestId('registration-email').type('toto');
    cy.getByTestId('registration-password').type('toto');
    cy.get('form').submit();
    cy.get('.auth-form-error').should('exist').and('have.text', "L'email n'est pas valide");
  });

  it('should restration succeed', () => {
    // random here is used in order to avoid 400 request
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    cy.intercept('POST', '/api/users').as('createUser');
    cy.getByTestId('registration').click();
    cy.getByTestId('registration-name').type('John');
    cy.getByTestId('registration-email').type(`john${randomNumber}@gmail.com`);
    cy.getByTestId('registration-password').type('johnSmith');
    cy.get('form').submit();
    cy.wait('@createUser').then(({ response }) => {
      response && expect(response.statusCode).to.eq(200);
    });
  });
});
