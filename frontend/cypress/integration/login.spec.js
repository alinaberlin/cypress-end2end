///<reference types ='cypress'/>

it('should navigate to the login page', () => {
    // positive test checking the login for an existing user
    cy.visit('http://picories.localhost/login')
    cy.get('input[type=email]').type('alina.ghe@gmail.com')
    cy.get('input[type=password]').type('123')
    cy.get('[type=submit]').click()

})