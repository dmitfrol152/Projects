/// <reference types="cypress" />

describe('Testing app Coin.', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
  })

  it('Login and get all accounts', () => {
    cy.get('input[name="login"]').type('developer')
    cy.get('input[name="password"]').type('skillbox')
    cy.contains('Войти').click()
    cy.location().should((loc) => {
      expect(loc.href).to.include('/accounts')
    })
  })

  it('Transaction', () => {

    const random = Math.ceil(Math.random()*100000)

    cy.get('input[name="login"]').type('developer')
    cy.get('input[name="password"]').type('skillbox')
    cy.contains('Войти').click()
    cy.location().should((loc) => {
      expect(loc.href).to.include('/accounts')
    })
    cy.get('.accounts__list>li:first-child')
    cy.contains('Открыть').click()
    cy.location().should((loc) => {
      expect(loc.href).to.include('/account/74213041477477406320783754')
    })
    cy.get('input[name="account"]').type('22222222222222222222222222')
    cy.get('input[name="count"]').type(random)
    cy.get('.form-transfer__btn').click()
    cy.wait(1000)
    cy.get('.account__table-body')
      .should('contain', random)
  })

  it('Get new account and transfer with him', () => {
    const random = Math.ceil(Math.random()*100000)

    // Entry
    cy.get('input[name="login"]').type('developer')
    cy.get('input[name="password"]').type('skillbox')
    cy.contains('Войти').click()
    cy.location().should((loc) => {
      expect(loc.href).to.include('/accounts')
    })

    // Add new account
    cy.get('.accounts__btn').click()
    cy.wait(1000)

    // Get new account number and transfer
    cy.get('.accounts__list>li:last-child .accounts__bank-account')
      .invoke('text')
      .then((newAccountNumber) => {
        // Transfer to new account
        cy.get('.accounts__list>li:first-child')
        cy.contains('Открыть').click()
        cy.location().should((loc) => {
          expect(loc.href).to.include('/account/74213041477477406320783754')
        })
        cy.get('input[name="account"]').type(newAccountNumber)
        cy.get('input[name="count"]').type(random)
        cy.get('.form-transfer__btn').click()
        cy.wait(1000)
        cy.get('.account__table-body')
          .should('contain', random)

        // Back to all accounts
        cy.get('.account__btn').click()

        // Check got new transfer
        cy.get('.accounts__list>li:last-child .accounts__bank-account')
        cy.get('.accounts__list>li:last-child .accounts__inner-btn').click()
        cy.location().should((loc) => {
          expect(loc.href).to.include(`/account/${newAccountNumber}`)
        })
        cy.get('.account__table-body')
        .should('contain', random)
      })
  })


})
