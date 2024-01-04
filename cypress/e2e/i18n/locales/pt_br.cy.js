describe("i18n/locales/pt_br", () => {
  beforeEach(() => {
    cy.visit("cypress/fixtures/i18n/locales/pt_br.html");
  });

  it(`Renders presence error in pt-BR`, () => {
    cy.get(`input[data-validates-presence][data-field='fullName']`)
      .type("abc")
      .clear();

    cy.get(
      'div[data-input-validator-target="errors"][data-field="fullName"]'
    ).within(() => {
      cy.get(`div[error="presence"]`)
        .should("exist")
        .should("contain", "Não posso ficar em branco");
    });
  });

  it(`Renders length-min error in pt-BR`, () => {
    cy.get(`input[data-validates-length="5,10"][data-field='userName']`).type(
      "abc"
    );

    cy.get(
      'div[data-input-validator-target="errors"][data-field="userName"]'
    ).within(() => {
      cy.get(`div[error="length-min"]`)
        .should("exist")
        .should("contain", "Muito curto. Mínimo 5 caracteres");
    });
  });

  it(`Renders length-max error in pt-BR`, () => {
    cy.get(`input[data-validates-length="5,10"][data-field='userName']`).type(
      "12345678910"
    );

    cy.get(
      'div[data-input-validator-target="errors"][data-field="userName"]'
    ).within(() => {
      cy.get(`div[error="length-max"]`)
        .should("exist")
        .should("contain", "Demasiado longo. Máximo de 10 caracteres");
    });
  });

  it(`renders numericality error in pt-BR`, () => {
    cy.get(`input[data-validates-numericality][data-field='currency']`).type(
      "abc"
    );

    cy.get(
      'div[data-input-validator-target="errors"][data-field="currency"]'
    ).within(() => {
      cy.get(`div[error="numericality"]`)
        .should("exist")
        .should("contain", "Deve ser um número");
    });
  });

  it(`renders email format error in pt-BR`, () => {
    cy.get(`input[data-validates-email][data-field='emailField']`).type("abc");

    cy.get(
      'div[data-input-validator-target="errors"][data-field="emailField"]'
    ).within(() => {
      cy.get(`div[error="email"]`)
        .should("exist")
        .should("contain", "Formato de email inválido");
    });
  });

  it(`renders strong_password errors in pt-BR`, () => {
    cy.get(
      `input[data-validates-strong-password][data-field='passwordField']`
    ).type("abc");

    cy.get(
      'div[data-input-validator-target="errors"][data-field="passwordField"]'
    ).within(() => {
      cy.get(`div[error="strong-password-capital-letter"]`)
        .should("exist")
        .should("contain", "Deve conter pelo menos uma letra maiúscula (A-Z)");
      cy.get(`div[error="strong-password-number"]`)
        .should("exist")
        .should("contain", "Deve conter pelo menos um número");
      cy.get(`div[error="strong-password-special-character"]`)
        .should("exist")
        .should(
          "contain",
          "Deve conter pelo menos um caractere especial (!@#$%^&*)"
        );
      cy.get(`div[error="strong-password-length"]`)
        .should("exist")
        .should("contain", "Deve ter pelo menos 10 caracteres");
    });
  });
});
