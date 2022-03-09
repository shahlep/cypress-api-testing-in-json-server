describe('XHR tests', () => {
    beforeEach(() => {
        cy.visit('https://example.cypress.io/commands/network-requests')  
      })
  
      it('First XHR test', () => {
          cy.intercept({
              method: "GET",
              url: "https://jsonplaceholder.cypress.io/comments/1"
          }).as('comment')
          cy.get('.network-btn').click()

          cy.wait('@comment').its('response.statusCode').should('eq',200)
     
  })
})