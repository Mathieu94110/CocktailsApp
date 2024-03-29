/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', () => {
  cy.visit('/');
  cy.get('[data-cy="email"]').type('user-test@gmail.com');
  cy.get('[data-cy="password"]').type('test');
  cy.get('form').submit();
});

Cypress.Commands.add('logout', () => {
  cy.get('[data-cy="logout-button"]').click();
});

Cypress.Commands.add('getByTestId', (name) => {
  return cy.get(`[data-cy="${name}"]`) as Chainable<Element>;
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
declare global {
  namespace Cypress {
    interface Chainable {
      login(): Chainable<void>;
      logout(): Chainable<void>;
      getByTestId(name: string): Chainable<Element>;
    }
  }
}
import '@testing-library/cypress/add-commands';
