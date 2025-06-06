import 'cypress-iframe'

Cypress.Commands.add('startGuestCheckout', (email = 'test@email.com') => {
  cy.get('input[id="guestUserEmailInput"]').type(email)
  cy.get('button[data-testid="guest-login-submit"]').click()
  cy.get('h2[data-testid="shipping-and-delivery-title"]')
    .should('be.visible')
    .and('contain', 'Delivery')
})

Cypress.Commands.add('selectElectronicDelivery', () => {
    cy.get('label[data-testid="delivery-option"]').contains('E-mail Delivery').click()
    cy.get('button[data-testid="address-submit"]').click()
})

Cypress.Commands.add('fillBillingInfo', (billingInfo = {}) => {
  const defaultInfo = {
    firstName: 'Test',
    lastName: 'User',
    phoneNumber: '3125551212',
    address: '123 Test St',
    city: 'Chicago',
    state: 'IL',
    country: 'United States',
    zip: '60601',
    ...billingInfo
  }

  cy.get('input[data-testid="addressForm.address.fullName"]').type(defaultInfo.firstName + ' ' + defaultInfo.lastName)
  cy.get('input[data-testid="addressForm.address.phoneNumber"]').type(defaultInfo.phoneNumber)
  cy.get('input[data-testid="addressForm.address.address1"]').type(defaultInfo.address)
  cy.get('input[data-testid="addressForm.address.city"]').type(defaultInfo.city)
  cy.get('select[data-testid="addressForm.address.state"]').select(defaultInfo.state)
  cy.get('input[data-testid="addressForm.address.zip"]').type(defaultInfo.zip)
  cy.get('select[data-testid="addressForm.address.country"]').select(defaultInfo.country)
})

Cypress.Commands.add('fillCreditCardInfo', (creditCardInfo = {}) => {
    const defaultInfo = {
        cardNumber: '4111111111111111',
        expirationDate: '1225',
        cvv: '123',
        ...creditCardInfo
    }

    cy.origin('https://assets.braintreegateway.com', () => {
        cy.get('#braintree-hosted-field-number').then(getBody => {
            getBody.find('#credit-card-number').type(defaultInfo.cardNumber)
        })
        cy.get('#braintree-hosted-field-expirationDate').then(getBody => {
            getBody.find('#expiration').type(defaultInfo.expirationDate)
        })
        cy.get('#braintree-hosted-field-cvv').then(getBody => {
            getBody.find('#cvv').type(defaultInfo.cvv)
        })
    })
}) 