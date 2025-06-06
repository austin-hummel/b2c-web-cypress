// Command to make a request to the test data BFF
Cypress.Commands.add('makeTestDataPost', (endpoint, payload = {}) => {
  // Access the config from e2e object
  const testDataBffUrl = Cypress.config('testDataBffUrl')
  
  // Log the full URL for debugging
  const fullUrl = `${testDataBffUrl}${endpoint}`
  cy.log(`Making request to: ${fullUrl}`)
  cy.log(`With payload: ${JSON.stringify(payload, null, 2)}`)
  
  return cy.request({
    method: 'POST',
    url: fullUrl,
    body: payload,
    headers: {
      'Content-Type': 'application/json'
    },
    failOnStatusCode: false
  })
})

Cypress.Commands.add('makeTestDataGet', (endpoint, payload = {}) => {
    const testDataBffUrl = Cypress.config('testDataBffUrl')
    const fullUrl = `${testDataBffUrl}${endpoint}`
    cy.log(`Making request to: ${fullUrl}`)
    cy.log(`With payload: ${JSON.stringify(payload, null, 2)}`)
    
    return cy.request({
        method: 'GET',
        url: fullUrl,
        body: payload,
        headers: {
            'Content-Type': 'application/json'
        },
        failOnStatusCode: false
    })
})

Cypress.Commands.add('createBrokerListing', (customData = {}) => {
  return cy.fixture('brokerListing.json').then((testData) => {
    const baseData = testData || {}
    const payload = {
      ...baseData,
      ...customData
    }
    
    return cy.makeTestDataPost('eicache/setup/broker-listing', payload)
  })
})

Cypress.Commands.add('getAuthTokenForEmail', (email = {}) => {
    return cy.makeTestDataGet(`eicache/logintoken/${email}`)
        .then((response) => {
            //expect(response.status).to.eq(200)
            //const authToken = response.body.token
            return response
        })
})

// Command to set up checkout test with broker listing
Cypress.Commands.add('setupCheckoutTest', () => {
  return cy.createBrokerListing()
    .then((response) => {
      expect(response.status).to.eq(201)
      const listingId = response.body[0].brokerListing.listing.id.toString()
      const productionId = response.body[0].productionAssets.production.id.toString()
      return { listingId, productionId }
    })
})