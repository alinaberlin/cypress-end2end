///<reference types ='cypress'/>

it('should navigate to the login page', () => {
    // positive test checking the login for an existing user
    cy.visit('http://picories.localhost/login')
    cy.get('input[type=email]').type('alina.ghe@gmail.com')
    cy.get('input[type=password]').type('123')
    cy.get('[type=submit]').click()

})
//negative test with wrong password for existing user
it('should navigate to the login page', () => {
    cy.visit('http://picories.localhost/login')
    cy.get('input[type=email]').type('a@gmail.com')
    cy.get('input[type=password]').type('whatever123')
    cy.get('[type=submit]').click()
    cy.contains('Register').click()

})
//negative test for login with false email

it('should navigate to the login page', () => {
    cy.visit('http://picories.localhost/login')
    cy.get('input[type=email]').type('2@gmail.com')
    cy.get('input[type=password]').type('whatever123')
    cy.get('[type=submit]').click()
    cy.contains('Register').click()
})