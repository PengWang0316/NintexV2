// import expect from 'expect';
describe('Home page testing', () => {
  const ENTRY_URL = 'https://localhost:8080/';
  beforeEach(() => {
    cy.visit(ENTRY_URL);
  });

  it('Should show a login page', () => {
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

  it('Should redirect to the home page', () => {
    cy.get('input[name=username]').type('rocwang0316@gmail.com').should('have.value', 'rocwang0316@gmail.com');
    cy.get('input[name=password]').type('Jiajia19822').should('have.value', 'Jiajia19822');
    cy.get('button[type=submit]').click();
    cy.contains('logout');
  });
});
