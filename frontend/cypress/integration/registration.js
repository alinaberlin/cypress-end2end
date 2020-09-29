/// <reference types="cypress" />
it('make the registrations', () => {
    // eslint-disable-next-line prettier/prettier
    cy.visit('http://picories.localhost/register')
    cy.get('#name').type('lina')
    cy.get('#age').type(5)
    cy.get('#email').type('lina@gmail.com')
    cy.get('#password').type('123')
    cy.get("input[type=submit]").click()
})