describe("blur/strong_password", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001/");
  });

  it(`renders length error on blur`, () => {
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
