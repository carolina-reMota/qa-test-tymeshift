export class FormLayoutsPage {

    submitValidForm(firstName, lastname, address, email, phone, skill, country, year, month, day, firstpassword, secondpassword) {
        cy.get('[data-id="firstname"]').click().type(firstName)
        cy.get('[data-test-id="lastname"]').click().type(lastname)
        cy.get('[ng-model="Adress"]').click().type(address)
        cy.get('[type="email"]').click().type(email)
        cy.get('[type="tel"]').clear().click().type(phone)
        cy.get('[value="Female"]').check()
        cy.get('#checkbox1').click()
        cy.get('#msdd').click() 
        cy.get('[class="ng-scope"]').eq(2).click()
        cy.get('body').click()
        cy.get('#Skills').select(skill)
        cy.get('[role="combobox"]').click({forece:true})
        cy.get('.select2-results__option').contains(country).click()
        cy.get('#yearbox').select(year)
        cy.get('[placeholder="Month"]').select(month)
        cy.get('#daybox').select(day)
        cy.get('#firstpassword').click().type(firstpassword)
        cy.get('#secondpassword').click().type(secondpassword)
        cy.get('#submitbtn').click()

    }

    refreshAndValidateForm () {
        cy.get('#Button1').click()
        cy.get('[data-id="firstname"]').should('have.value', '')
        cy.get('[data-test-id="lastname"]').should('have.value', '')
        cy.get('[ng-model="Adress"]').should('have.value', '')
        cy.get('[type="tel"]').should('have.value', '')
        cy.get('[value="Female"]').check().should('have.class', 'ng-untouched')
        cy.get('#checkbox1').should('not.be.checked')
        cy.get('#Skills').should('have.value', '')
        cy.get('[role="combobox"]').should('have.value', '')
        cy.get('#yearbox').should('have.value', '')
        cy.get('[placeholder="Month"]').should('have.value', '')
        cy.get('#daybox').should('have.value', '')
        cy.get('#firstpassword').should('have.value', '')
        cy.get('#secondpassword').should('have.value', '')
    }

    fieldIsRequired(element, required) {

        cy.get(element).invoke('attr', 'required').should(required ? 'exist' : 'not.exist')

    }

    fieldHasMaxlength(element, maxlength) {

        cy.get(element).should(maxlength ? 'have.attr' : 'not.have.attr', 'maxlength')

    }

    uploadPhoto(element, fileName, filePath) {

        cy.fixture(filePath, 'base64').then((fileContent) => {
            cy.get(element).then((input) => {
              const file = Cypress.Blob.base64StringToBlob(fileContent, 'image/png')
              const filename = fileName
              const testFile = new File([file], filename, { type: 'image/png' })
              const dataTransfer = new DataTransfer()
              dataTransfer.items.add(testFile)
              input[0].files = dataTransfer.files
              input[0].dispatchEvent(new Event('change', { bubbles: true }))
            })
         })
    }




}

export const onFormLayoutsPage = new FormLayoutsPage()