/// <reference types="cypress" />

import * as Commands from '../../support/commands';
import {credentials} from '../../constants';

describe('Login', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.log('Visiting starting page');
        cy.visit('http://localhost:3000');
    })
    it('Should not login if form is incomplete', () => {
        cy.log('Typing just username');
        cy.get('[name=employeeUsername]').type('username');

        cy.log('Click Submit Button...');
        cy.get('[testId=submitButton]').should('exist').click();
    });
    it('Should not login if user is invalid', () => {
        Commands.login('invalidUser', 'invalidpassword');
    });
    it('Should login as administrator', () => {
        Commands.login(Cypress.env("adminUsername"), Cypress.env("adminPassword"), 'areas');

        cy.log('Verifying Areas Page is open');
        cy.url().should('includes', 'areas');
    });
    it('Should login as analyst', () => {
        Commands.login(Cypress.env("analystUsername"), Cypress.env("analystPassword"), 'riskcategories');

        cy.log('Verifying Risk Categories Page is open');
        cy.url().should('includes', 'riskcategories');
    });
    
});