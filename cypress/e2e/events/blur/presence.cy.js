describe("blur/presence", () => {
  beforeEach(() => {
    cy.visit("cypress/fixtures/fields.html");
  });

  it(`Renders presence error on blur`, () => {
    if (Cypress.browser.name === "firefox") {
      cy.log("realPress events library is not supported on firefox. Skipping.");
      return;
    }
    cy.get(`input[data-validates-presence][data-field='fullName']`)
      .focus()
      .realPress("Tab");

    cy.get(
      'div[data-input-validator-target="errors"][data-field="fullName"]'
    ).within(() => {
      cy.get(`div[error="presence"]`)
        .should("exist")
        .should("contain", "Can't be blank");
    });
  });
});
