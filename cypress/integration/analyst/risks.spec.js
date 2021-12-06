/// <reference types="cypress" />

import * as Commands from '../../support/commands';
//import {credentials} from '../../constants';

describe('Risks tests', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.log('Visiting starting page');
        cy.visit('http://localhost:3000');
        Commands.login(Cypress.env("analystUsername"), Cypress.env("analystPassword"), 'areas');
        cy.get('[name=riskCard]').first().click();
        cy.url().should('includes', 'risks');

    })
    it('Should show errors if form is incomplete', () => {
        cy.get('[testId=addButton]').click();
        cy.get('[name=code]').click();
        cy.get('#descriptionRisk').click();
        cy.get('[name=rootCause]').click();
        cy.get('#codeRisk-helper-text').should('exist').should('be.text', 'El codigo es requerido');
        cy.get('#descriptionRisk-helper-text').should('exist').should('be.text', 'La descripción es requerida');
        cy.get('[type=submit]').should('be.disabled');

    });

    it('Should add risk', () => {
        cy.get('[testId=addButton]').click();
        cy.get('[name=code]').click().type('code001');
        cy.get('#descriptionRisk').click().type('A description');
        cy.get('#inherentRiskId').click();
        cy.get('.MuiList-root > [data-value="1"]').click();
        cy.get('#controlledRiskId').click();
        cy.get('.MuiList-root > [data-value="3"]').click();
        cy.get('#rootCause').click().type('A root cause');
        cy.get('[type=submit]').should('be.enabled').click();

    });

    it('Should edit a risk', () => {
        cy.get('[data-id="93d23aaf-afbc-4de9-bffa-2fffa0edcb60"] > .MuiDataGrid-cell--withRenderer > div > [aria-label="Editar"] > .MuiIconButton-label > .MuiSvgIcon-root').click();

        cy.get('[name=code]').should('be.disabled');
        cy.get('#descriptionRisk').clear().type('New description');

        cy.get('[type=submit]').should('be.enabled')
        cy.get('[type=submit]').click();
        //cy.get('[testId=searchBar]').click().type("New description").type("{enter}");
        cy.contains('New description');
    });

});