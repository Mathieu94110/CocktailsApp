describe('test signin page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('test login page is displayed as expected', () => {
    cy.contains('h2', /Connexion/).should('have.class', 'mb-10');
    cy.get('.btn-primary').findByText('Connexion');
    cy.findByText(/mathieu/i);
  });

  it('should user not be recognized', () => {
    cy.getByTestId('email').type('badUserEmail@gmail.com');
    cy.getByTestId('password').type('byby');
    cy.get('form').submit();
    cy.get('.auth-form-error')
      .should('exist')
      .and('have.text', "Problème d'adresse mail ou de mot de passe");
  });

  it('should user connected successfully', () => {
    cy.getByTestId('email').type('byby@gmail.com');
    cy.getByTestId('password').type('byby');
    cy.get('form').submit();
    cy.get('h1')
      .contains(/Découvrez des nouvelles recettes/)
      .should('exist');
    cy.logout();
  });
});
