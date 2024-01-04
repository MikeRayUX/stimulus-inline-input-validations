describe("blur/length", () => {
  beforeEach(() => {
    cy.visit("cypress/fixtures/fields.html");
  });

  it(`Renders length error on blur`, () => {
    if (Cypress.browser.name === "firefox") {
      cy.log("realPress events library is not supported on firefox. Skipping.");
      return;
    }
    cy.get(
      `input[data-validates-length][data-field='userName']`
    ).focus().realPress("Tab");

    cy.get(
      'div[data-input-validator-target="errors"][data-field="userName"]'
    ).within(() => {
      cy.get(`div[error="length-min"]`)
        .should("exist")
    });
  });

});
