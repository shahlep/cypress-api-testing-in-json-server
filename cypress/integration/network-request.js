describe('XHR tests', () => {
    beforeEach(() => {
        cy.visit('https://example.cypress.io/commands/network-requests')  
      })
  
      it('XHR test with stubbing response', () => {
          cy.intercept({
              method: "GET",
              url: "https://jsonplaceholder.cypress.io/comments/1",},
              {
              body: 
                {
                    "postId": 1,
                    "id": 1,
                    "name": "test",
                    "email": "test@test.com",
                    "body": "Fun With cypress"
                  }
        
          }).as('comment')
          cy.get('.network-btn').click()

          cy.wait('@comment').its('response.statusCode').should('eq',200)
     
  })
})