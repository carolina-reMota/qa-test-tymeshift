/// <reference types ="cypress" />
import { onFormLayoutsPage } from "../support/pageObjects/formLayoutsPage"


describe('Registration Form Elements', () => {

    beforeEach('Open Application', () => {
        cy.openHomePage()
    })

    it('First name - should accept the limitless amount of characters and be required', ()=> {
        onFormLayoutsPage.fieldIsRequired('[data-id="firstname"]', true)
        onFormLayoutsPage.fieldHasMaxlength('[data-id="firstname"]', false)
        cy.get('[data-id="firstname"]').click().type('Carol')
    })

    it('Last name - should accept the limitless amount of characters and be required', ()=> {
        onFormLayoutsPage.fieldIsRequired('[data-test-id="lastname"]', true)
        onFormLayoutsPage.fieldHasMaxlength('[data-test-id="lastname"]', false)
        cy.get('[data-test-id="lastname"]').click().type('Mota')
            
        
    })

    it('Address is not a required field', () => {
        onFormLayoutsPage.fieldIsRequired('[ng-model="Adress"]', false)
    })

    it('Address - should accept the limitless number of characters, have a scroll on a large number of characters, and be expanded', () => {
        onFormLayoutsPage.fieldHasMaxlength('[ng-model="Adress"]', false)
        cy.get('[ng-model="Adress"]').click().type('Lorem ipsum dolor sit amet. At quas consequatur ut delectus aliquam qui enim galisum eum minima quod qui autem ipsa sed dolor laborum. Et voluptatibus maiores ex repellendus consequuntur et tempora ipsa.')
            .scrollTo('bottom')
            .scrollTo('top') 
        cy.get('[ng-model="Adress"]').clear().scrollTo('top')
        cy.get('[ng-model="Adress"]').scrollTo('top')
        Cypress.on('fail', (error, runnable) => {
                if(!error.message.includes('failed because this element is not scrollable')){
                    throw error
                 }
      })

    })

    it('Email address - should accept the limitless number of characters and accept only the standard email form test@test.com', () => {  
        onFormLayoutsPage.fieldIsRequired('[type="email"]', true)
        onFormLayoutsPage.fieldHasMaxlength('[type="email"]', false)
        cy.get('[type="email"]').should('have.class', 'ng-invalid')
        cy.get('[type="email"]').click().type('carol@')
        cy.get('[type="email"]').should('have.class', 'ng-invalid')
        cy.get('[type="email"]').clear().click().type('carol@test.com')
        cy.get('[type="email"]').should('have.class', 'ng-valid')

    })

    it('Phone is not a required field', () => {
        onFormLayoutsPage.fieldIsRequired('[type="tel"]', false)
    })

    it('Phone: should accept only numbers and special characters', () => {
        cy.get('[type="tel"]').should('have.class', 'ng-invalid')
        cy.get('[type="tel"]').click().type('A12345678').should('have.class', 'ng-invalid')
        cy.get('[type="tel"]').clear().click().type('+12345678').should('have.class', 'ng-invalid')
        cy.get('[type="tel"]').clear().click().type('123-456-7890').should('have.class', 'ng-valid')
        
    })

    it('The maximum number of characters is 9', () => {
        cy.get('[type="tel"]').should('have.attr', 'pattern', '^\\d{9}$') 
    })

    it('Gender field is required', () => {
        onFormLayoutsPage.fieldIsRequired('[value="Male"]', true)
        cy.get('[value="Female"]').should('have.class', 'ng-untouched')
    })

    it('Gender - only one option can be selected', () => {
        cy.get('[value="Female"]').check().should('have.class', 'ng-valid')
        cy.get('[value="Male"]').should('have.class', 'ng-valid').and('have.class', 'ng-untouched')
        cy.get('[value="Male"]').check().should('have.class', 'ng-valid')
        cy.get('[value="Female"]').should('have.class', 'ng-valid').and('have.class', 'ng-touched')
    })

    it('Hobbies - multiple options can be selected', () => {
        cy.get('#checkbox1').click()
        cy.get('#checkbox2').click()
        cy.get('#checkbox3').click()

    })

    it('Languages - multiple options can be selected', () => {
        
        cy.get('#msdd').click() 
        cy.get('[class="ng-scope"]').eq(0).click()
        cy.get('[class="ng-scope"]').eq(4).click({force: true})
        cy.get('[class="ng-scope"]').eq(9).click()
        cy.get('[class="ng-scope"]').eq(15).click()
           
    })

    it('Skills - only one option can be selected', () => {

        cy.get('#Skills').select('Adobe InDesign')
        cy.get('#Skills').find(':selected').should('contain', 'Adobe InDesign')
        cy.get('#Skills').select('Javascript')
        cy.get('#Skills').find(':selected').should('not.contain', 'Adobe InDesign')
        cy.get('#Skills').find(':selected').should('contain', 'Javascript')
         
    })

    it('Country field is required', () => {
        onFormLayoutsPage.fieldIsRequired('#countries', true)

    })

    it('Country - only one option can be selected', () => {
        cy.get('#countries').should('have.length', 1)

    })

    it('Select Country field is required', () => {
        onFormLayoutsPage.fieldIsRequired('#country', true)

    })

    it('Select Country - search bar is enabled', () => {

        cy.get('[role="combobox"]').click()
        cy.get('[type="search"]').type('de')
        cy.get('#select2-country-results').should('contain', 'Bangladesh')
        .should('contain', 'Denmark')

        cy.get('[type="search"]').clear().type('LOL')
        cy.get('[role="treeitem"]').should('contain', 'No results found')
        cy.get('[type="search"]').clear()

    })

    it('Select Country - multiple options can be selected', () => {

        cy.get('[role="combobox"]').click({forece:true})
        cy.get('.select2-results__option').contains('Australia').click()
        cy.get('#select2-country-container').should('contain', 'Australia')
        cy.get('[role="combobox"]').click({forece:true})
        cy.get('.select2-results__option').contains('India').click()
        cy.get('#select2-country-container').should('contain','India').and('contain', 'Australia')
        
    })

    it('Date of birth - All 3 fields ( year, month, day) are required to be selected', () => {
        onFormLayoutsPage.fieldIsRequired('#yearbox', true)
        onFormLayoutsPage.fieldIsRequired('[placeholder="Month"]', true)
        onFormLayoutsPage.fieldIsRequired('#daybox', true)

        cy.get('#yearbox').select('1993').should('have.class', 'ng-valid')
        cy.get('[placeholder="Month"]').select('March').should('have.class', 'ng-valid')
        cy.get('#daybox').select('24').should('have.class', 'ng-valid')

    })

    it('Password field is required', () => {
        onFormLayoutsPage.fieldIsRequired('#firstpassword', true)

    })

    it('Password must contain an UpperCase,Lowercase Alphabet, and a Number', () => {

        cy.get('#firstpassword').should('have.class', 'ng-invalid')
        cy.get('#firstpassword').click().type('Carol123!').should('have.class', 'ng-valid')
        cy.get('#firstpassword').clear().click().type('12345678a').should('have.class', 'ng-invalid')
        cy.get('#firstpassword').clear().click().type('CAROL1').should('have.class', 'ng-invalid')
        
    })

    it('Confirm Password - Must match a Password field', () => {

        cy.get('#firstpassword').click().type('Carol123!')
        cy.get('#secondpassword').click().type('Carol1').should('have.class', 'ng-invalid')
        cy.get('#secondpassword').click().type('Carol123!').should('have.class', 'ng-valid')

    })

    it('Submit triggers validations if all required fields arent filled in', () => {
        cy.on('window:alert', (message) => {
            expect(message).to.equal('Please fill in all required fields')
          })
        cy.get('#Button1').click()
        cy.get('#submitbtn').click()
  
    })

    it('Submit displays popUp message "Successful registration" if everything is filled correctly', () => {

        onFormLayoutsPage.submitValidForm('Carol', 'Mota', 'Av. Alm. Reis 54, 1150-019 Lisboa', 'carol@test.com', '123-456-7890', 'APIs', 'Australia', '1993', 'March', '24', 'Carol123!', 'Carol123!')
        cy.contains('Successful registration')
        
    })

    it('Refresh - Resets the whole form', () => {

        onFormLayoutsPage.submitValidForm('Carol', 'Mota', 'Av. Alm. Reis 54, 1150-019 Lisboa', 'carol@test.com', '123-456-7890', 'APIs', 'Australia', '1993', 'March', '24', 'Carol123!', 'Carol123!')
        onFormLayoutsPage.refreshAndValidateForm()
    
    })

    it('Photo upload - should change the image in the Upload section', () => {

        onFormLayoutsPage.uploadPhoto('input[type=file]', 'download.jpeg', 'images/download.jpeg')
        cy.get('#imagesrc').should('have.value', 'C:\\fakepath\\download.jpeg')
        cy.get('#imagesrc').get('[src="download.jpeg"]')
        onFormLayoutsPage.submitValidForm('Carol', 'Mota', 'Av. Alm. Reis 54, 1150-019 Lisboa', 'carol@test.com', '123-456-7890', 'APIs', 'Australia', '1993', 'March', '24', 'Carol123!', 'Carol123!')

    })

    it('Photo upload - should change the Logo icon', () => {

        onFormLayoutsPage.uploadPhoto('input[type=file]', 'download.jpeg', 'images/download.jpeg')
        cy.get('[alt="image not displaying"]').get('[src="download.jpeg"]')
        onFormLayoutsPage.submitValidForm('Carol', 'Mota', 'Av. Alm. Reis 54, 1150-019 Lisboa', 'carol@test.com', '123-456-7890', 'APIs', 'Australia', '1993', 'March', '24', 'Carol123!', 'Carol123!')
        
    })
        
})