/// <reference types="cypress" />

import * as Commands from '../../support/commands';
//import {credentials} from '../../constants';

describe('Asociation between risks and controls', () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
        cy.log('Visiting starting page');
        cy.visit('http://localhost:3000');
        Commands.login(Cypress.env("analystUsername"), Cypress.env("analystPassword"), 'areas');
        cy.get('[testId=smallCard]').first().click();
        cy.url().should('includes', 'risks');


    })

    it('Should add control to a risk', () => {        
        cy.get('[data-id="93d23aaf-afbc-4de9-bffa-2fffa0edcb60"] [aria-label="Mostrar controles"] > .MuiIconButton-label').click();
        cy.get('[testId=controlRiskSearchBar]').click();
        cy.get('.MuiAutocomplete-popper').click();
        cy.get('[testId=controlRiskSearchBar]').type('{enter}');

        let countOfElements = 0;
        cy.get(".MuiTableBody-root > tr.MuiTableRow-root").then($elements => {
            countOfElements= $elements.length;
        });

      
        cy.log(countOfElements)
       
        cy.get('[type=submit]').should('be.enabled').click();

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