describe("blur/strong_password", () => {
  beforeEach(() => {
    cy.visit("cypress/fixtures/fields.html");
  });

  it(`Renders length error on blur`, () => {
    if (Cypress.browser.name === "firefox") {
      cy.log("realPress events library is not supported on firefox. Skipping.");
      return;
    }
    cy.get(`input[data-validates-strong-password][data-field='passwordField']`)
      .type("abc")
      .focus()
      .realPress("Tab");

    cy.get(
      'div[data-input-validator-target="errors"][data-field="passwordField"]'
    ).within(() => {
      cy.get(`div[error="strong-password-length"]`)
        .should("exist")
        .should("contain", "Must be at least 10 characters long");
      cy.get(`div[error="strong-password-number"]`)
        .should("exist")
        .should("contain", "Must contain at least one number");
      cy.get(`div[error="strong-password-capital-letter"]`)
        .should("exist")
        .should("contain", "Must contain at least one capital letter (A-Z)");
      cy.get(`div[error="strong-password-special-character"]`)
        .should("exist")
        .should(
          "contain",
          "Must contain at least one special character (!@#$%^&*)"
        );
    });
  });
});
