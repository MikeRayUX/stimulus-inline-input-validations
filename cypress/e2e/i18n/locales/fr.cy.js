describe("i18n/locales/fr", () => {
  beforeEach(() => {
    cy.visit("cypress/fixtures/i18n/locales/fr.html");
  });

  it(`Renders presence error in fr`, () => {
    cy.get(`input[data-validates-presence][data-field='fullName']`)
      .type("abc")
      .clear();

    cy.get(
      'div[data-input-validator-target="errors"][data-field="fullName"]'
    ).within(() => {
      cy.get(`div[error="presence"]`)
        .should("exist")
        .should("contain", "Je ne peux pas être vide");
    });
  });

  it(`Renders length-min error in fr`, () => {
    cy.get(`input[data-validates-length="5,10"][data-field='userName']`).type(
      "abc"
    );

    cy.get(
      'div[data-input-validator-target="errors"][data-field="userName"]'
    ).within(() => {
      cy.get(`div[error="length-min"]`)
        .should("exist")
        .should("contain", "Trop court. Minimum 5 caractères");
    });
  });

  it(`Renders length-max error in fr`, () => {
    cy.get(`input[data-validates-length="5,10"][data-field='userName']`).type(
      "12345678910"
    );

    cy.get(
      'div[data-input-validator-target="errors"][data-field="userName"]'
    ).within(() => {
      cy.get(`div[error="length-max"]`)
        .should("exist")
        .should("contain", "Trop long. 10 caractères maximum");
    });
  });

  it(`Renders numericality error in fr`, () => {
    cy.get(`input[data-validates-numericality][data-field='currency']`).type(
      "abc"
    );

    cy.get(
      'div[data-input-validator-target="errors"][data-field="currency"]'
    ).within(() => {
      cy.get(`div[error="numericality"]`)
        .should("exist")
        .should("contain", "Doit être un nombre");
    });
  });

  it(`Renders email format error in fr`, () => {
    cy.get(`input[data-validates-email][data-field='emailField']`).type("abc");

    cy.get(
      'div[data-input-validator-target="errors"][data-field="emailField"]'
    ).within(() => {
      cy.get(`div[error="email"]`)
        .should("exist")
        .should("contain", "Format d'email invalide");
    });
  });

  it(`Renders strong_password errors in fr`, () => {
    cy.get(
      `input[data-validates-strong-password][data-field='passwordField']`
    ).type("abc");

    cy.get(
      'div[data-input-validator-target="errors"][data-field="passwordField"]'
    ).within(() => {
      cy.get(`div[error="strong-password-capital-letter"]`)
        .should("exist")
        .should("contain", "Doit contenir au moins une lettre majuscule (A-Z)");
      cy.get(`div[error="strong-password-number"]`)
        .should("exist")
        .should("contain", "Doit contenir au moins un chiffre");
      cy.get(`div[error="strong-password-special-character"]`)
        .should("exist")
        .should(
          "contain",
          "Doit contenir au moins un caractère spécial (!@#$%^&*)"
        );
      cy.get(`div[error="strong-password-length"]`)
        .should("exist")
        .should("contain", "Doit contenir au moins 10 caractères");
    });
  });
});
