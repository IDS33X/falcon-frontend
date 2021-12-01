///<reference types="cypress" />

export const login = (username, password) => {
    cy.log('Typing Credentials');
    cy.get('[name=employeeUsername]').type(username);
    cy.get('[name=password]').type(password);

    cy.log('Click Submit Button...');
    cy.get('[testId=submitButton]').should('exist').click();
}
