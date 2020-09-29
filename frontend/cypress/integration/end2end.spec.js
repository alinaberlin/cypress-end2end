/// <reference types="cypress" />
it('make the registrations', () => {
  // eslint-disable-next-line prettier/prettier
    cy.visit('http://picories.localhost/register')
    cy.get('#name').type('ulina')
    cy.get('#age').type(5)
    cy.get('#email').type('dulina@gmail.com')
    cy.get('#password').type('123')
    cy.get('input[type=submit]').click()
})

it('should navigate to the login page', () => {
  // positive test checking the login for an existing user
    cy.visit('http://picories.localhost/login')
    cy.get('input[type=email]').type('dulina@gmail.com')
    cy.get('input[type=password]').type('123')
    cy.get('input[type=submit]').click()
    cy.contains('alina').click()
    cy.contains('Logout').click()

})
