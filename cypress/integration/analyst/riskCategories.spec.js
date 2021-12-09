/// <reference types="cypress" />

import * as Commands from '../../support/commands';
//import {credentials} from '../../constants';

describe('Risk categories tests', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.log('Visiting starting page');
        cy.visit('http://localhost:3000');
        Commands.login(Cypress.env("analystUsername"), Cypress.env("analystPassword"), 'areas');
        cy.url().should('includes', 'riskcategories');

    })
    it('Should show errors if form is invalid', () => {
        cy.get('[testId=addButton]').click();
        cy.get('#name').click();
        cy.get('#description').click();
        cy.get('#name').click();
        cy.get('#description-helper-text').should('exist').should('be.text', 'La descripción es requerida');
    });

    it('Should add risk category', () => {
        cy.get('[testId=addButton]').click();
        cy.get('form').should('be.visible');
        cy.get('#name').click().type('New category');
        cy.get('#description').click().type('Long risk category description');
        cy.get('[type=submit]').click();
        cy.get('[testId=searchBar]').click().type("New category").type("{enter}");
        cy.contains('New category');
    });

    it('Should edit a risk category', () => {
        cy.get('[testId=editButtonCard]').first().click();
        cy.get('#name').clear().type('Updated category');
        cy.get('#description').clear().click().type('New description');
        cy.get('[type=submit]').click();
        cy.get('[testId=searchBar]').click().type('Updated category').type("{enter}");
        cy.contains('Updated category');
    });

});