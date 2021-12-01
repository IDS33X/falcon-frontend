/// <reference types="cypress" />

import * as Commands from '../../support/commands';
//import {credentials} from '../../constants';

describe('Create user', () => {
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
    it('Should show errors if form is incomplete', () => {
        cy.get('[testId=addUserButton]').click();
        cy.get('#code').click();
        cy.get('#name').click();
        cy.get('#lastName').click();
        cy.get('[name=username]').click();
        cy.get('[name=password]').click();

        cy.get('#code-helper-text').should('exist').should('be.text', 'El codigo es requerido');
        cy.get('#name-helper-text').should('exist').should('be.text', 'El nombre es requerido');
        cy.get('#lastName-helper-text').should('exist').should('be.text', 'El apellido es requerido');
        cy.get('[testId=saveUserButton]').should('be.disabled');

    });

    it('Should add user', () => {
        cy.get('[testId=addUserButton]').click();
        cy.get('#code').click().type('code002');
        cy.get('#name').click().type('Nombre');
        cy.get('#lastName').click().type('Apellido');
        cy.get('[name=username]').click().type('usuarioTest');
        cy.get('[name=password]').click().type('password');
        cy.get('[testId=saveUserButton]').should('be.enabled').click();

    });


    it('Should show error message when code already exists', () => {
        cy.get('[testId=addUserButton]').click();
        cy.get('#code').click().type('code002');
        cy.get('#name').click().type('Nombre');
        cy.get('#lastName').click().type('Apellido');
        cy.get('[name=username]').click().type('usuarioTest');
        cy.get('[name=password]').click().type('password');
        cy.get('[testId=saveUserButton]').should('be.enabled').click();
        cy.get('[testId=userErrorMessage]').should('be.visible');
    });

     it('Should edit an user', () => {
        cy.get('[data-id="5"] > .MuiDataGrid-cell--withRenderer > div > .MuiButtonBase-root > .MuiIconButton-label > .MuiSvgIcon-root').click();
        cy.get('#name').clear();
        cy.get('#name').type('Onelkyyy');
        cy.get('[name=password]').type('hola');
        cy.get('.MuiButton-containedPrimary > .MuiButton-label').click();
        cy.get('[testId=userSearchBar]').click().type("Onelkyyy").type("{enter}");
        cy.contains('Onelky');
     });

});