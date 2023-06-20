const sizes = ["iphone-6", "ipad-2", "macbook-13"];

describe("test what users first see when navigating to web page", () => {
  sizes.forEach((size) => {
    // make assertions on the web page using
    // an array of different viewports
    it(`Should display the office scene and animation on ${size} screen`, () => {
      cy.visit("http://localhost:5173/");

      //canvas
      cy.get("canvas") // Replace with the appropriate selector for the Three.js canvas element
        .should("exist")
        .should("be.visible");

      //hero text
      cy.get("#hero-text").should("be.visible");

      cy.get("#viewMyWorkButton").should("be.visible");
    });

    it(`Should allow users to click on the view my work button on the ${size} screen`, () => {
      cy.visit("http://localhost:5173/");

      //canvas
      cy.get("canvas") // Replace with the appropriate selector for the Three.js canvas element
        .should("exist")
        .should("be.visible");

      //hero text
      cy.get("#hero-text").should("be.visible");

      cy.get("#viewMyWorkButton")
        .contains("View my work")
        .should("be.visible")
        .click();

      cy.wait(3000);

      cy.get("iframe").should('be.visible');
    });
  });
});
