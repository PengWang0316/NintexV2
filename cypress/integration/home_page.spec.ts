// import expect from 'expect';

describe('Home page testing', () => {
  it('Visits the home page without login', () => {
    cy.visit('https://localhost:8080/');

    cy.contains('Workflow Manager');
    cy.contains('Auto Fetching');
    cy.get('button[data-testid=loginButton]').should('contain', 'login');
    cy.contains('Sign in to your account');
    cy.contains('Username *');
    cy.contains('Password *');
    cy.contains('Forget your password? Reset password');
    cy.contains('No account? Create account');
    cy.get('button[type=submit]').should('contain', 'Sign In');
    cy.get('span[class=MuiSwitch-root]');
    cy.get('div[title=Dashboard]');
    cy.get('div[title="Workflow Manager"]');
    cy.get('div[title="Monitor Center"]');
    cy.get('div[title="API keys"]');
    cy.get('div[title="New tag"]');
    cy.get('div[title="Upload Files"]');
  });
});
