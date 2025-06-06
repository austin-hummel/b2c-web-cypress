describe('API Call Examples', () => {
  it('demonstrates POST request with custom payload', () => {
    // Basic POST request with custom payload
    cy.request({
      method: 'POST',
      url: 'https://api.example.com/endpoint',
      body: {
        key1: 'value1',
        key2: 'value2'
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer your-token-here'
      }
    }).then((response) => {
      // Verify the response
      expect(response.status).to.eq(200)
      expect(response.body).to.have.property('success', true)
    })
  })

  it('demonstrates intercepting and modifying API calls', () => {
    // Intercept and modify a request
    cy.intercept('POST', '/api/endpoint', (req) => {
      // Modify the request payload
      req.body = {
        ...req.body,
        additionalField: 'custom value'
      }
      
      // Continue with the modified request
      req.continue((res) => {
        // Optionally modify the response
        res.body.customField = 'modified response'
      })
    }).as('modifiedRequest')

    // Make the request that will be intercepted
    cy.request({
      method: 'POST',
      url: '/api/endpoint',
      body: {
        originalField: 'original value'
      }
    })

    // Wait for the intercepted request and verify
    cy.wait('@modifiedRequest').then((interception) => {
      expect(interception.request.body).to.have.property('additionalField')
      expect(interception.response.body).to.have.property('customField')
    })
  })

  it('demonstrates handling different response scenarios', () => {
    // Example with retry logic and custom timeout
    cy.request({
      method: 'POST',
      url: '/api/endpoint',
      body: {
        data: 'test data'
      },
      retryOnStatusCodeFailure: true,
      timeout: 10000, // 10 seconds
      failOnStatusCode: false // Won't fail test on non-2xx response
    }).then((response) => {
      if (response.status === 429) {
        // Handle rate limiting
        cy.wait(2000) // Wait 2 seconds
        // Retry the request
        cy.request({
          method: 'POST',
          url: '/api/endpoint',
          body: {
            data: 'test data'
          }
        })
      }
    })
  })

  it('demonstrates using fixtures for test data', () => {
    // Load test data from a fixture
    cy.fixture('testData.json').then((testData) => {
      cy.request({
        method: 'POST',
        url: '/api/endpoint',
        body: {
          ...testData,
          timestamp: new Date().toISOString()
        }
      })
    })
  })

  it('demonstrates chaining multiple API calls', () => {
    // First API call
    cy.request('GET', '/api/auth')
      .then((authResponse) => {
        const token = authResponse.body.token
        
        // Second API call using data from first
        return cy.request({
          method: 'POST',
          url: '/api/data',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: {
            data: 'test'
          }
        })
      })
      .then((dataResponse) => {
        // Use the response from second call
        expect(dataResponse.status).to.eq(200)
      })
  })
}) 