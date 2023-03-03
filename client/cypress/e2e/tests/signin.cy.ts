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
    cy.get('[data-cy="email"]').focus().type('badUserEmail@gmail.com', {
      delay: 50,
    });

    cy.get('[data-cy="password"]').focus().type('byby', {
      delay: 50,
    });

    cy.get('form').submit();
    cy.get('.auth-form-error')
      .should('exist')
      .and('have.text', "Problème d'adresse mail ou de mot de passe");
  });
  it('should user connected successfully', () => {
    cy.get('[data-cy="email"]').focus().type('byby@gmail.com', {
      delay: 50,
    });

    cy.get('[data-cy="password"]').focus().type('byby', {
      delay: 50,
    });

    cy.get('form').submit();
    cy.get('h1')
      .contains(/Découvrez des nouvelles recettes/)
      .should('exist');
  });
});
