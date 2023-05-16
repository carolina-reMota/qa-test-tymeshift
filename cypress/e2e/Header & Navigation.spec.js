/// <reference types ="cypress" />


describe('Redirects', () => {

    beforeEach('Open Application', () => {
        cy.openHomePage()
    })

    it('Logo icon - click should redirect to the Index page', () => {
        cy.get('.navbar-brand').should('have.attr', 'href', 'index.html')
        cy.get('h2').should('contain', 'Register')

    })

    it('Home - should redirect to Index.html page', () => {
        cy.contains('Home').should('have.attr', 'href', 'index.html')

    })
    
    it('Register - should redirect to Index.html page', () => {
        cy.contains('Register').should('have.attr', 'href', 'index.html')
        cy.get('h2').should('contain', 'Register')
       
    })

    it('WebTable - should redirect to WebTable page', () => {
        cy.contains('WebTable').should('have.attr', 'href', 'WebTable.html')
        cy.get('h2').should('contain', 'WebTable')

    })

    it('SwitchTo - should redirect to SwitchTo.html page', () => {
        cy.contains('SwitchTo').should('have.attr', 'href', 'SwitchTo.html')
        cy.get('h2').should('contain', 'SwitchTo')

    })

    it('Widgets - should redirect Widgets.html page', () => {
        cy.contains('Widgets').should('have.attr', 'href', 'Widgets.html')
        cy.get('h2').should('contain', 'Widgets')

    })

    it('Interactions - should redirect to Wiki Interaction page', () => {
        cy.contains('Interactions').should('have.attr', 'href', 'https://en.wikipedia.org/wiki/Interaction')

    })

    it('Youtube - should redirect to YouTube page', () => {
        cy.contains('Video').click()
        cy.contains('Youtube').should('have.attr', 'href', 'https://www.youtube.com/')

    })

    it('Vimeo - should redirect to Vimeo page', () => {
        cy.contains('Video').click()
        cy.contains('Vimeo').should('have.attr', 'href', 'https://vimeo.com/')
        
    })

    it('Tymeshift - should redirect to Tymeshift page', () => {
        cy.contains('Tymeshift').should('have.attr', 'href', 'http://tymeshift.com/')
    
    })

})