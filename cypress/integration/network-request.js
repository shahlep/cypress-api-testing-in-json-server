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
      it.only('XHR test for POST', () => {
        cy.intercept('POST','/comments').as('postComment')

        cy.get('.network-btn').click()

        cy.wait('@postComment').should(({ request, response }) => {
          console.log(request)
          expect(request.body).to.include('email')

          console.log(response)
          expect(response.body).to.have.property('name', 'Using POST in cy.intercept()')

          expect(request.headers).to.have.property('content-type')
          //expect(response && response.body).to.have.property('name', 'Using POST in cy.intercept()')
          expect(request.headers).to.have.property('origin','https://example.cypress.io/')
        })
      })
})