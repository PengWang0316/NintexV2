import expect from 'expect';

describe('Home page testing', () => {
  it('Visit the home page without login', () => {
    cy.visit('https://localhost:8080/');
    cy.contains('Workflow Manager');
  });
});
