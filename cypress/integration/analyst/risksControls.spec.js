/// <reference types="cypress" />

import * as Commands from '../../support/commands';
//import {credentials} from '../../constants';

describe('Asociation between risks and controls', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.log('Visiting starting page');
        cy.visit('http://localhost:3000');
        Commands.login(Cypress.env("adminUsername"), Cypress.env("adminPassword"), 'areas');
        cy.get('[name=areaCard]').first().click();
        cy.get('[name=divisionCard]').first().click();
        cy.get('[name=departmentCard]').first().click();
        cy.url().should('includes', 'users');

    })

    it('Should add control to a risk', () => {
        //cy.get('[testId=addButton]').should('be.visible');

        // cy.get('[testId=addUserButton]').click();
        // cy.get('#code').click().type('code002');
        // cy.get('#name').click().type('Nombre');
        // cy.get('#lastName').click().type('Apellido');
        // cy.get('[name=username]').click().type('usuarioTest');
        // cy.get('[name=password]').click().type('password');
        // cy.get('[testId=saveUserButton]').should('be.enabled').click();

    });



    it('Should delete a control from a risk', () => {
        //cy.get('[testId=addButton]').should('be.visible');

        // cy.get('[testId=addUserButton]').click();
        // cy.get('#code').click().type('code002');
        // cy.get('#name').click().type('Nombre');
        // cy.get('#lastName').click().type('Apellido');
        // cy.get('[name=username]').click().type('usuarioTest');
        // cy.get('[name=password]').click().type('password');
        // cy.get('[testId=saveUserButton]').should('be.enabled').click();

    });

});