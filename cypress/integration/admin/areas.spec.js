/// <reference types="cypress" />

import * as Commands from '../../support/commands';
//import {credentials} from '../../constants';

describe('Areas tests', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.log('Visiting starting page');
        cy.visit('http://localhost:3000');
        Commands.login(Cypress.env("adminUsername"), Cypress.env("adminPassword"), 'areas');
        cy.url().should('includes', 'areas');

    })
    it('Should show errors if form is invalid', () => {
        cy.get('[testId=addAreaButton]').click();
        cy.get('#name').click();
        cy.get('#description').click();
        cy.get('#name').click();
        //cy.get('#name-helper-text').should('exist').should('be.text', 'El nombre es requerido');
        cy.get('#description-helper-text').should('exist').should('be.text', 'La descripción es requerida');
        //cy.get('[testId=saveUserButton]').should('be.disabled');

    });

    it('Should add area', () => {
        cy.get('[testId=addAreaButton]').click();
        cy.get('form').should('be.visible');
        cy.get('#name').click().type('New area');
        cy.get('#description').click().type('Long description');
        cy.get('[type=submit]').click();
        cy.get('[testId=areaSearchBar]').click().type("New area").type("{enter}");
        cy.contains('New area');
    });

    it('Should edit an area', () => {
        cy.get('[testId=editButtonCard]').first().click();
        cy.get('#name').clear().type('Updated area');
        //cy.get('#name').click().type('New area');
        cy.get('#description').clear().click().type('New description');
        cy.get('[type=submit]').click();
        cy.get('[testId=areaSearchBar]').click().type("Updated area").type("{enter}");
        cy.contains('Updated area');
    });

});