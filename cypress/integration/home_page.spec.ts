// import expect from 'expect';

const ENTRY_URL = 'https://localhost:8080/';

describe('Home page testing', () => {
  it('Visits the home page without login', () => {
    cy.visit(ENTRY_URL);

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

  it('Visits the home page and login', () => {
    cy.visit(ENTRY_URL);

    cy.get('input[name=username]').type('rocwang0316@gmail.com').should('have.value', 'rocwang0316@gmail.com');
    cy.get('input[name=password]').type('Jiajia19822').should('have.value', 'Jiajia19822');
    cy.get('button[type=submit]').click();
    cy.contains('logout');
    cy.contains('Total Workflows');
    cy.contains('Workflow Instances');
    cy.contains('Workflow Publisher');
    cy.contains('Workflow Health Score');
    cy.contains('terminated');
    cy.contains('cancelled');
    cy.contains('Production');
    cy.contains('N/A');
    cy.contains('NotApplicable');
    cy.contains('Development');
    cy.contains('UNKNOWN');
    cy.contains('Richard Roe');
    cy.contains('Richard');
    cy.contains('NTXSupport Administrator');
    cy.contains('Eric');
    cy.contains('locationCount');
    // Four icons
    cy.get('path[d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z"]');
    cy.get('path[d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM8 17.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM9.5 8c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5S9.5 9.38 9.5 8zm6.5 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"]');
    cy.get('path[d="M11.99 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm3.61 6.34c1.07 0 1.93.86 1.93 1.93 0 1.07-.86 1.93-1.93 1.93-1.07 0-1.93-.86-1.93-1.93-.01-1.07.86-1.93 1.93-1.93zm-6-1.58c1.3 0 2.36 1.06 2.36 2.36 0 1.3-1.06 2.36-2.36 2.36s-2.36-1.06-2.36-2.36c0-1.31 1.05-2.36 2.36-2.36zm0 9.13v3.75c-2.4-.75-4.3-2.6-5.14-4.96 1.05-1.12 3.67-1.69 5.14-1.69.53 0 1.2.08 1.9.22-1.64.87-1.9 2.02-1.9 2.68zM11.99 20c-.27 0-.53-.01-.79-.04v-4.07c0-1.42 2.94-2.13 4.4-2.13 1.07 0 2.92.39 3.84 1.15-1.17 2.97-4.06 5.09-7.45 5.09z"]');
    cy.get('path[d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM6.5 9L10 5.5 13.5 9H11v4H9V9H6.5zm11 6L14 18.5 10.5 15H13v-4h2v4h2.5z"]');

    // Word cloud
    cy.get('div[data-testId=WorkflowActionUseWordCloud]');
    cy.contains('Log to instance details');
    cy.contains('Send an Email');
    cy.contains('Log in history list');
    cy.contains('Change stage');
    cy.contains('Set a variable value');
  });
});
