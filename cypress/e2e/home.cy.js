describe('NoBroker Homepage',()=>{
    beforeEach(() => {
        const viewport = Cypress.env("viewport") || "desktop";
    
        if (viewport === "mobile") {
          cy.viewport(375, 812); // iPhone X
        } else {
          cy.viewport(1280, 720); // Desktop
        }
    
        cy.visit("https://nobroker.in?ptk=c00d9fd36d2460566b2490dcfe0c2efd");
      });
    it('should show the flow through homepage',()=>{

        // Visit the NoBroker homepage
        

        // Clicks on city dropdown
        cy.get("body > div#app:nth-child(3) > div.app-wrapper > div.mt-5p.po\\:mb-5\\.5p > div.pt-3p.px-2p.pb-3p.tpu\\:h-content:nth-child(3) > div.nb__1Qq92:nth-child(4) > div.prop-search-city-selector.nb-select.form-group.nb-select__lg:nth-child(1) > div > div#searchCity.css-1pcexqc-container.nb-select-container > div.css-v2nw5i-control.nb-select__control > div.css-1wy0on6.nb-select__indicators:nth-child(2) > div.css-16pqwjk-indicatorContainer.nb-select__indicator.nb-select__dropdown-indicator:nth-child(2)")
            .should('be.visible')
            .click();
        
        // Selects Bangalore from the dropdown
        cy.get("body > div#app:nth-child(3) > div.app-wrapper > div.mt-5p.po\\:mb-5\\.5p > div.pt-3p.px-2p.pb-3p.tpu\\:h-content:nth-child(3) > div.nb__1Qq92:nth-child(4) > div.prop-search-city-selector.nb-select.form-group.nb-select__lg:nth-child(1) > div > div#searchCity.css-1pcexqc-container.nb-select-container > div.css-kj6f9i-menu.nb-select__menu:nth-child(3) > div.css-q4imyt.nb-select__menu-list > div#react-select-2-option-1.css-1hc2nrp-option.nb-select__option.nb-select__option--is-selected:nth-child(2)")
            .should('be.visible')
            .click();

        


    })
})