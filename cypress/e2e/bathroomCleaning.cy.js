describe('NoBroker Painting Service UI Automation',()=>{
    beforeEach(() => {
        cy.viewport(375, 812); // iPhone X
    
        cy.visit("https://nobroker.in?ptk=c00d9fd36d2460566b2490dcfe0c2efd");
      });



    it('should find errors in Painting Service UserFlow until checkout page',()=>{
        // Find and click on Home Cleaning service option
        cy.contains("Home Cleaning").parent().click();

        cy.wait(3000);

        // Removes the advertisement pop-up

        cy.get('.cursor-pointer > img').click();

        cy.wait(1000);

        // Finds city selector popup div and selects Bangalore
        
        cy.get('#modalContent > .p-5').should('be.visible').contains('Bangalore').click();

        // Checks if update city popup is visible

        cy.get(':nth-child(2) > .min-h-screen > #modalContent > .p-5').should('be.visible').contains('Bangalore').click();

        // Clicks on the "Update" button

        cy.get(':nth-child(2) > .btn').click();

        // Selects Bathroom Cleaning

        cy.get(':nth-child(4) > .rounded-xl').contains('Bathroom Cleaning').click();

        // Adds a service
        cy.get(':nth-child(1) > .h-full > .flex-col > .justify-between > .justify-center > .text-14').click();

        // Proceeds to checkout
        cy.get('#service-page-proceed').click();

        // Adds a new address

        cy.get('.p-5 > :nth-child(1) > .p-4').contains('Add New Address').click();

        cy.wait(5000);

        // Confirms the address
        cy.get('.action-btn').contains('Confirm Location').click();

        cy.wait(1000);

        // Enters house number
        cy.get('#houseNumber').type('30-2-703');

        // Enters landmark
        cy.get('#address').type('Bren Mercury');

        // Selects location as Home
        cy.get('.Home-header').contains('Home').click();

        // Submits the address
        cy.get('#submit-address').click();

        // Selects the address
        cy.get('.p-5 > :nth-child(1) > .justify-between > .flex').contains('Home').click();

        // Selects the date

        cy.get('#date-container > :nth-child(2)').contains('Tomorrow').click();

        // Selects the time
        cy.get('#timeSlots > :nth-child(2) > :nth-child(2) > :nth-child(8)').click();

        // Book Slot
        cy.get('#slots-proceed-mobile').contains('Book Slot').click();

        cy.wait(3000);


        // Pay Now
        cy.get('.fixed > .flex > .btn').contains('Pay Now').click();

        // Skip VIP
        cy.get('.p-5 > :nth-child(1) > :nth-child(2) > :nth-child(1) > .btn').contains('Skip').click();

        cy.wait(5000);


        
        
        
            
        
    })
})