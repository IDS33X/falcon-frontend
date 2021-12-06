/// <reference types="cypress" />

import * as Commands from '../../support/commands';
//import {credentials} from '../../constants';

describe('Controls tests', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.visit('http://localhost:3000');
        Commands.login(Cypress.env("analystUsername"), Cypress.env("analystPassword"), 'areas');
        cy.get('[testId=smallCard]').first().click();
        cy.get('[testId=manageControlsButton]').click();
        cy.url().should('includes', 'controls');

    })
    it('Should show errors if form is incomplete', () => {
        cy.get('[testId=addButton]').should('exist');
        cy.get('[testId=addButton]').click();
        cy.get('[name=code]').click();
        cy.get('[name=activity]').click();
        cy.get('[name=objective]').click();
        cy.get('#activity-helper-text').should('exist').should('be.text', 'Debe ingresar la actividad');
        cy.get('[type=submit]').should('be.disabled');

    });

    it('Should add control', () => {
        cy.get('[testId=addButton]').click();
        cy.get('[name=code]').click().type('newControl');
        cy.get('[name=activity]').click().type('Activity 1');
        cy.get('[name=objective]').click().type('Objective 1000');
        cy.get('[name=responsablePosition]').click().type('Manager');
        cy.get('[name=policy]').click().type('Policy 1');
        cy.get('#automationLevelId').click();
        cy.get('.MuiList-root > [data-value="1"]').click();
        cy.get('#controlTypeId').click();
        cy.get('.MuiList-root > [data-value="2"]').click();
        cy.get('#controlStateId').click();
        cy.get('.MuiList-root > [data-value="3"]').click();
        cy.get('[name=frequency]').click().type('Every 2 months');
        cy.get('[name=evidence]').click().type('Some evidence');
        cy.get('[type=submit]').should('be.enabled').click();
        cy.get('[testId=searchBar]').click().type("newControl").type("{enter}");
        cy.contains('newControl');

    });

    it('Should edit a control', () => {


        cy.get('[data-id="d40c96d5-5c58-47db-d69b-08d997ae05ab"] > .MuiDataGrid-cell--withRenderer > div > .MuiButtonBase-root > .MuiIconButton-label > .MuiSvgIcon-root > path').click();

        cy.get('[name=creator]').should('be.disabled');
        cy.get('[name=code]').should('be.disabled');
        cy.get('[name=creationDate]').should('exist').should('be.disabled');
        cy.get('#activity').clear().type("new activity");
        cy.get('[name=objective]').clear().type("new objective");
        cy.get('[type=submit]').click();
        cy.contains('new activity');
    });

});