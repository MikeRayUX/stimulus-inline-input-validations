describe("i18n/locales/es", () => {
  beforeEach(() => {
    cy.visit("cypress/fixtures/i18n/locales/es.html");
  });

  it(`Renders presence error in es`, () => {
    cy.get(`input[data-validates-presence][data-field='fullName']`)
      .type("abc")
      .clear();

    cy.get(
      'div[data-input-validator-target="errors"][data-field="fullName"]'
    ).within(() => {
      cy.get(`div[error="presence"]`)
        .should("exist")
        .should("contain", "no puede estar en blanco");
    });
  });

  it(`Renders length-min error in es`, () => {
    cy.get(`input[data-validates-length="5,10"][data-field='userName']`).type(
      "abc"
    );

    cy.get(
      'div[data-input-validator-target="errors"][data-field="userName"]'
    ).within(() => {
      cy.get(`div[error="length-min"]`)
        .should("exist")
        .should("contain", "Demasiado corto. Mínimo 5 caracteres");
    });
  });

  it(`Renders length-max error in es`, () => {
    cy.get(`input[data-validates-length="5,10"][data-field='userName']`).type(
      "12345678910"
    );

    cy.get(
      'div[data-input-validator-target="errors"][data-field="userName"]'
    ).within(() => {
      cy.get(`div[error="length-max"]`)
        .should("exist")
        .should("contain", "Demasiado largo. Máximo 10 caracteres");
    });
  });

  it(`Renders numericality error in es`, () => {
    cy.get(`input[data-validates-numericality][data-field='currency']`).type(
      "abc"
    );

    cy.get(
      'div[data-input-validator-target="errors"][data-field="currency"]'
    ).within(() => {
      cy.get(`div[error="numericality"]`)
        .should("exist")
        .should("contain", "Tiene que ser un número");
    });
  });

  it(`Renders email format error in es`, () => {
    cy.get(`input[data-validates-email][data-field='emailField']`).type("abc");

    cy.get(
      'div[data-input-validator-target="errors"][data-field="emailField"]'
    ).within(() => {
      cy.get(`div[error="email"]`)
        .should("exist")
        .should("contain", "Formato de correo inválido");
    });
  });

  it(`Renders strong_password errors in es`, () => {
    cy.get(
      `input[data-validates-strong-password][data-field='passwordField']`
    ).type("abc");

    cy.get(
      'div[data-input-validator-target="errors"][data-field="passwordField"]'
    ).within(() => {
      cy.get(`div[error="strong-password-capital-letter"]`)
        .should("exist")
        .should("contain", "Debe contener al menos una letra mayúscula (A-Z)");
      cy.get(`div[error="strong-password-number"]`)
        .should("exist")
        .should("contain", "Debe contener al menos un número");
      cy.get(`div[error="strong-password-special-character"]`)
        .should("exist")
        .should(
          "contain",
          "Debe contener al menos un carácter especial (!@#$%^&*)"
        );
      cy.get(`div[error="strong-password-length"]`)
        .should("exist")
        .should("contain", "Debe tener al menos 10 caracteres");
    });
  });
});
