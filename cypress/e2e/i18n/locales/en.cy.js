describe("i18n/locales/en", () => {
  beforeEach(() => {
    cy.visit("cypress/fixtures/i18n/locales/en.html");
  });

  it(`Renders presence error in en`, () => {
    cy.get(`input[data-validates-presence][data-field='fullName']`)
      .type("abc")
      .clear();

    cy.get(
      'div[data-input-validator-target="errors"][data-field="fullName"]'
    ).within(() => {
      cy.get(`div[error="presence"]`)
        .should("exist")
        .should("contain", "Can't be blank");
    });
  });

  it(`Renders length-min error in en`, () => {
    cy.get(`input[data-validates-length="5,10"][data-field='userName']`).type(
      "abc"
    );

    cy.get(
      'div[data-input-validator-target="errors"][data-field="userName"]'
    ).within(() => {
      cy.get(`div[error="length-min"]`)
        .should("exist")
        .should("contain", "Too short. Minimum 5 characters");
    });
  });

  it(`Renders length-max error in en`, () => {
    cy.get(`input[data-validates-length="5,10"][data-field='userName']`).type(
      "12345678910"
    );

    cy.get(
      'div[data-input-validator-target="errors"][data-field="userName"]'
    ).within(() => {
      cy.get(`div[error="length-max"]`)
        .should("exist")
        .should("contain", "Too long. Maximum 10 characters");
    });
  });

  it(`Renders numericality error in en`, () => {
    cy.get(`input[data-validates-numericality][data-field='currency']`).type(
      "abc"
    );

    cy.get(
      'div[data-input-validator-target="errors"][data-field="currency"]'
    ).within(() => {
      cy.get(`div[error="numericality"]`)
        .should("exist")
        .should("contain", "Must be a number");
    });
  });

  it(`Renders email format error in en`, () => {
    cy.get(`input[data-validates-email][data-field='emailField']`).type("abc");

    cy.get(
      'div[data-input-validator-target="errors"][data-field="emailField"]'
    ).within(() => {
      cy.get(`div[error="email"]`)
        .should("exist")
        .should("contain", "Invalid email format");
    });
  });

  it(`Renders strong_password errors in en`, () => {
    cy.get(
      `input[data-validates-strong-password][data-field='passwordField']`
    ).type("abc");

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
