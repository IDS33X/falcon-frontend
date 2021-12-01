/// <reference types="cypress" />

import * as Commands from '../../support/commands';
//import {credentials} from '../../constants';

describe('Divisions tests', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.log('Visiting starting page');
        cy.visit('http://localhost:3000');
        Commands.login(Cypress.env("adminUsername"), Cypress.env("adminPassword"), 'areas');
        cy.get('[name=areaCard]').first().click();
        cy.get('[name=divisionCard]').first().click();
        cy.url().should('includes', 'departments');

    })
    it('Should show errors if form is invalid', () => {
        cy.get('[testId=addButton]').click();
        cy.get('#name').click();
        cy.get('#description').click();
        cy.get('#name').click();
        cy.get('#description-helper-text').should('exist').should('be.text', 'La descripción es requerida');

    });

    it('Should add department', () => {
        cy.get('[testId=addButton]').click();
        cy.get('form').should('be.visible');
        cy.get('#name').click().type('New department');
        cy.get('#description').click().type('New department description');
        cy.get('[type=submit]').click();
        cy.get('[testId=searchBar]').click().type("New department").type("{enter}");
        cy.contains('New department');
    });

    it('Should edit a division', () => {
        cy.get('[testId=editButtonCard]').first().click();
        cy.get('#name').clear().type('Updated division');
        cy.get('#description').clear().click().type('Another division description');
        cy.get('[type=submit]').click();
        cy.get('[testId=searchBar]').click().type("Updated division").type("{enter}");
        cy.contains('Updated division');
    });

});