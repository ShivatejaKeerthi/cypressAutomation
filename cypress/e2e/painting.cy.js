describe('Visiting NoBroker - UserFlow', () => {
  it('should show userflow until schedule service page', () => {
    
    cy.visit('https://nobroker.in?ptk=c00d9fd36d2460566b2490dcfe0c2efd');

    
    cy.get("body > div#app:nth-child(3) > div.app-wrapper > div.mt-5p.po\\:mb-5\\.5p > div.nb__2FbPM:nth-child(6) > div#hsHomeTile.nb__3KVk4:nth-child(5) > img")
      .should('be.visible')
      .click();

    cy.visit("https://www.nobroker.in/home-services-in-bangalore?nbFr=HOME-TILE-")

    cy.get("body > div#app:nth-child(4) > div.app-wrapper > div > main > div.bg-white.mt-12:nth-child(2) > div:nth-child(2) > section.mb-0\\.6.md\\:px-2\\.4p.relative:nth-child(4) > div.m-auto.px-14p:nth-child(2) > div.flex.overflow-auto.hide-scroll-bar.gap-3.justify-center > div.flex.flex-col.items-center:nth-child(2) > div.rounded-full.p-0\\.5.flex.items-center.justify-center:nth-child(1) > div.rounded-full.bg-gray-300.align-middle.inline-block.overflow-hidden > img")
      .should('be.visible')
      .click();

    cy.get("body > div#app:nth-child(4) > div.app-wrapper > div.mt-12 > div.md\\:flex.md\\:flex-row-reverse.md\\:mt-4.md\\:gap-5.justify-end:nth-child(6) > div:nth-child(2) > div#KITCHEN_CLEANING.p-4.mb-2.bg-white:nth-child(1) > div.bg-white.rounded-md.pb-0:nth-child(2) > div > span:nth-child(4) > div#STEAM_CLEANING.pb-6:nth-child(1) > div.flex.items-center.justify-between.mb-4:nth-child(1) > div.flex.justify-between.w-full > div.flex.flex-col.items-center.gap-1:nth-child(2) > button")
      .should('be.visible')
      .click();

    cy.get("body > div#modal-root:nth-child(2) > div.fixed.inset-0.transition-opacity.duration-700.ease-in > div.flex.items-center.min-h-screen.px-4:nth-child(2) > div#modalContent.w-full.max-w-lg.mx-auto.bg-white.shadow-lg.relative.rounded-xl.smooth-transition > div:nth-child(2) > div.p-5.pb-9.pt-0.mb-12.md\\:pt-5 > div#bhk-selection-container")
      .should('be.visible')
    
    cy.get("body > div#modal-root:nth-child(2) > div.fixed.inset-0.transition-opacity.duration-700.ease-in > div.flex.items-center.min-h-screen.px-4:nth-child(2) > div#modalContent.w-full.max-w-lg.mx-auto.bg-white.shadow-lg.relative.rounded-xl.smooth-transition > div:nth-child(2) > div.p-5.pb-9.pt-0.mb-12.md\\:pt-5 > div#bhk-selection-container.flex.flex-wrap.items-center.gap-2 > div.px-3.font-bold.capitalize.rounded-lg.cursor-pointer.text-16:nth-child(2)")
      .should('be.visible')
      .click();
    
    cy.get("body > div#modal-root:nth-child(2) > div.fixed.inset-0.transition-opacity.duration-700.ease-in > div.flex.items-center.min-h-screen.px-4:nth-child(2) > div#modalContent.w-full.max-w-lg.mx-auto.bg-white.shadow-lg.relative.rounded-xl.smooth-transition > div.bg-white.flex.items-center.px-5.py-3.md\\:bottom-0.md\\:bg-white.md\\:sticky.md\\:left-0.border-t.border-solid.border-slate-200.rounded-b.justify-end.bottom-0.w-full.z-3:nth-child(3) > div.flex.items-center.justify-between.w-full > button#bhk-proceed.btn.btn-default:nth-child(2)")
      .should('be.visible')
      .click();

    cy.get("body > div#modal-root:nth-child(2) > div.fixed.inset-0.transition-opacity.duration-700.ease-in > div.flex.items-center.min-h-screen.px-4:nth-child(2) > div#modalContent.w-full.max-w-lg.mx-auto.bg-white.shadow-lg.relative.rounded-xl.smooth-transition.overflow-x-hidden > div:nth-child(2) > div#add-ons-container.p-5.mb-14")
      .should('be.visible');

    cy.get("body > div#modal-root:nth-child(2) > div.fixed.inset-0.transition-opacity.duration-700.ease-in > div.flex.items-center.min-h-screen.px-4:nth-child(2) > div#modalContent.w-full.max-w-lg.mx-auto.bg-white.shadow-lg.relative.rounded-xl.smooth-transition.overflow-x-hidden > div:nth-child(2) > div#add-ons-container.p-5.mb-14 > div.flex.items-center.justify-between.mb-5:nth-child(2) > div.flex.items-center.justify-between.gap-2:nth-child(2) > div#Fridge\\ Cleaning-add.flex.items-center.justify-center.font-bold.cursor-pointer.text-14")
      .should('be.visible')
      .click();

    cy.get("body > div#modal-root:nth-child(2) > div.fixed.inset-0.transition-opacity.duration-700.ease-in > div.flex.items-center.min-h-screen.px-4:nth-child(2) > div#modalContent.w-full.max-w-lg.mx-auto.bg-white.shadow-lg.relative.rounded-xl.smooth-transition.overflow-x-hidden > div.bg-white.flex.items-center.md\\:bottom-0.md\\:bg-white.md\\:sticky.md\\:left-0.border-t.border-solid.border-slate-200.rounded-b.justify-end.bottom-0.w-full.z-3:nth-child(3) > div.flex.items-center.justify-between.w-full.flex-col > div.flex.items-center.justify-between.w-full.px-5.py-3 > button#add-ons-proceed.btn.btn-default:nth-child(2)")
      .should('be.visible')
      .click();

    cy.get("body > div#app:nth-child(4) > div.app-wrapper > div.mt-12 > div.md\\:flex.md\\:flex-row-reverse.md\\:mt-4.md\\:gap-5.justify-end:nth-child(6) > div.md\\:flex.md\\:flex-col.md\\:items-center.md\\:w-70pe:nth-child(1) > div.hidden.md\\:contents.md\\:p-5 > div.sticky.px-5.py-4.bg-white.rounded-xl.top-20.z-1 > div > button.btn.btn-default.btn-block:nth-child(3)")
      .should('be.visible')
      .click();

    cy.get("body > div#app:nth-child(4) > div.app-wrapper > div.mt-5p > div.md\\:flex.md\\:items-baseline.md\\:justify-center.md\\:flex-wrap:nth-child(2) > div:nth-child(1) > div.h-screen.md\\:p-5:nth-child(1) > div.relative.h-screen.bg-white.md\\:h-8vh.md\\:rounded-xl.md\\:w-57p > div.p-4.md\\:h-full:nth-child(3) > div.overflow-auto.hide-scrollbar.mt-4:nth-child(2) > div.mb-2\\.2p:nth-child(1) > div#date-container.grid.grid-cols-4.gap-2.md\\:gap-4:nth-child(2) > div.rounded-5.text-16.cursor-pointer.p-2\\.5.flex.flex-col.items-center:nth-child(4)")
      .should('be.visible')
      .click();

    cy.get("body > div#app:nth-child(4) > div.app-wrapper > div.mt-5p > div.md\\:flex.md\\:items-baseline.md\\:justify-center.md\\:flex-wrap:nth-child(2) > div:nth-child(1) > div.h-screen.md\\:p-5:nth-child(1) > div.relative.h-screen.bg-white.md\\:h-8vh.md\\:rounded-xl.md\\:w-57p > div.p-4.md\\:h-full:nth-child(3) > div.overflow-auto.hide-scrollbar.mt-4:nth-child(2) > div#timeSlots.md\\:h-40pe:nth-child(3) > div:nth-child(2) > div.grid.grid-cols-3.gap-2.mb-5.md\\:overflow-auto.md\\:max-h-80pe.md\\:hide-scrollbar:nth-child(2) > div.relative.rounded-8.flex.items-center.justify-center.mb-1.cursor-pointer.text-13:nth-child(2)")
      .should('be.visible')
      .click();

    cy.get("body > div#app:nth-child(4) > div.app-wrapper > div.mt-5p > div.md\\:flex.md\\:items-baseline.md\\:justify-center.md\\:flex-wrap:nth-child(2) > div:nth-child(1) > div.h-screen.md\\:p-5:nth-child(1) > div.relative.h-screen.bg-white.md\\:h-8vh.md\\:rounded-xl.md\\:w-57p > footer.hidden.md\\:flex.md\\:flex-col.absolute.rounded-b-xl.bottom-0.left-0.z-1.w-full.bg-white.border-t.border-gray-200.shadow-hs-highlighter-shadow.dark\\:bg-gray-800.dark\\:border-gray-600.rounded-t-3xl:nth-child(4) > div.flex.items-center.justify-between.w-full.p-4:nth-child(2) > button#slots-proceed-mobile-as.btn.btn-default:nth-child(2)")
      .should('be.visible')
      .click();

    
    cy.get("body > div#app:nth-child(4) > div.app-wrapper > div.mt-5p > div.md\\:flex.md\\:items-baseline.md\\:justify-center.md\\:flex-wrap:nth-child(2) > div:nth-child(1) > div.md\\:p-5:nth-child(1) > div.relative.overflow-auto.bg-white.md\\:overflow-hidden.md\\:h-8vh.md\\:rounded-xl.md\\:w-57p > footer.absolute.bottom-0.left-0.flex-col.hidden.w-full.py-4.bg-white.border-gray-200.shadow.md\\:flex.rounded-b-xl.z-1.dark\\:bg-gray-800.dark\\:border-gray-600:nth-child(4) > div.flex.items-center.justify-between.w-full.gap-3.px-4.pt-3 > button.btn.btn-default.btn-block")
      .should('be.visible')
      .click();
  });
});
