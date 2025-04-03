describe('AC Service', () => {
    beforeEach(()=>{
        cy.viewport(390, 844);
        cy.visit('https://nobroker.in?ptk=c00d9fd36d2460566b2490dcfe0c2efd');

    });
    it('should display the user flow for AC Service', () => {

        // Selects AC Service & Repair from the services menu
        cy.contains('AC Service & Repair').click();

        // Closes the bottom ad popup
        cy.get('.cursor-pointer > img').click();

        // Finds & selects AC Service Option
        cy.get('#hs_fhc > .rounded-xl').contains('AC Service').click();

        // Foam Blast AC Service 'Show More'
        cy.get('#AC_MAINTENANCE_SERVICE > .rounded-md > :nth-child(1) > :nth-child(3) > .pb-6 > :nth-child(3) > .flex > .cursor-pointer').contains('Show').click();

        // Adds Split AC Service to cart
        cy.get('#add-ons-container > :nth-child(1)').contains('Add').click();

        

        // // // Enters mobile number
        // // cy.get('#signUp-phoneNumber').type('9116176100');

        // // // Enters OTP
        // // cy.get('[maxlength="4"]').type('9');
        // // cy.get('.flex-col > .justify-center > :nth-child(2)').type('9');
        // // cy.get('.justify-center > :nth-child(3)').type('9');
        // // cy.get('.justify-center > :nth-child(4)').type('9');

        // // // Clicks on 'Continue' button
        // // cy.get('.px-4 > :nth-child(1) > .text-14').click();

        
        

        // // // Removes Split AC Service from cart
        // // cy.get('#add-ons-container > :nth-child(1) > .justify-between').contains('-').click();

        // cy.wait(2000);

        //Checks Estimated Pricing
        cy.get('.bg-background-gray-light > .pb-6 > .gap-2').click();

        // Goes through FAQ
        cy.get(':nth-child(3) > :nth-child(1) > :nth-child(1) > .nb__1aa1A > .nb__22OmC').click();
        cy.get('[style="border-top: none;"] > :nth-child(1) > :nth-child(1) > .nb__1aa1A > .nb__22OmC').click();
        cy.wait(2000);


        // Proceeds for next step
        cy.get('#add-ons-proceed').contains('Proceed').click();

        // Proceed to payment
        cy.get('#category-page-proceed').contains('Proceed').click();

        // Selects Address
        cy.get('.p-5 > :nth-child(1) > .justify-between > .flex').contains('Home').click();

        // Selects date
        cy.get('[style="border: 1px solid rgb(0, 149, 135); width: 100%; background-color: rgba(0, 149, 135, 0.1); color: rgb(0, 149, 135);"]')
        .click();

        // Selects time
        cy.get('#timeSlots > :nth-child(2) > :nth-child(2) > :nth-child(6)').click();

        // Books Slot
        cy.get('#slots-proceed-mobile').contains('Book Slot').click();

        // Pay Now
        cy.get('.fixed > .flex > .btn').contains('Pay Now').click();

        // Adds VIP
        cy.get(':nth-child(2) > .btn').contains('Add VIP').click();

        // Proceeds to payment
        cy.get('.fixed > .flex > .btn').contains('Pay Now').click();

        // // QR CODE
        // cy.get('.qr-img-section > img').click();

    });


});