describe('Social links - should redirect to their base URLs', () => {

    beforeEach('Open Application', () => {
        cy.openHomePage()
    })

    it('Facebook link redirects to respective base url', () => {
        cy.get('.facebook').should('have.attr', 'href', 'https://www.facebook.com/')

    })

    it('Twitter link redirects to respective base url', () => {
        cy.get('.twitter').should('have.attr', 'href', 'https://twitter.com/')

    })

    it('LinkedIn link redirects to respective base url', () => {
        cy.get('.linkedin').should('have.attr', 'href', 'https://www.linkedin.com/')

    })

    it('Google Plus link redirects to respective base url', () => {
        cy.get('.google-plus').should('have.attr', 'href', 'https://plus.google.com/')

    })

    it('Youtube link redirects to respective base url', () => {
        cy.get('.youtube').should('have.attr', 'href', 'https://www.youtube.com/')

    })


})