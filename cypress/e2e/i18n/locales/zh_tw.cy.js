describe("i18n/locales/zh_tw", () => {
  beforeEach(() => {
    cy.visit("cypress/fixtures/i18n/locales/zh_tw.html");
  });

  it(`Renders presence error in zh-TW`, () => {
    cy.get(`input[data-validates-presence][data-field='fullName']`)
      .type("abc")
      .clear();

    cy.get(
      'div[data-input-validator-target="errors"][data-field="fullName"]'
    ).within(() => {
      cy.get(`div[error="presence"]`)
        .should("exist")
        .should("contain", "不能為空");
    });
  });

  it(`Renders length-min error in zh-TW`, () => {
    cy.get(`input[data-validates-length="5,10"][data-field='userName']`).type(
      "abc"
    );

    cy.get(
      'div[data-input-validator-target="errors"][data-field="userName"]'
    ).within(() => {
      cy.get(`div[error="length-min"]`)
        .should("exist")
        .should("contain", "過短。最少 5 個字符");
    });
  });

  it(`Renders length-max error in zh-TW`, () => {
    cy.get(`input[data-validates-length="5,10"][data-field='userName']`).type(
      "12345678910"
    );

    cy.get(
      'div[data-input-validator-target="errors"][data-field="userName"]'
    ).within(() => {
      cy.get(`div[error="length-max"]`)
        .should("exist")
        .should("contain", "太長。最多 10 個字符");
    });
  });

  it(`Renders numericality error in zh-TW`, () => {
    cy.get(`input[data-validates-numericality][data-field='currency']`).type(
      "abc"
    );

    cy.get(
      'div[data-input-validator-target="errors"][data-field="currency"]'
    ).within(() => {
      cy.get(`div[error="numericality"]`)
        .should("exist")
        .should("contain", "必須是一個數字");
    });
  });

  it(`Renders email format error in zh-TW`, () => {
    cy.get(`input[data-validates-email][data-field='emailField']`).type("abc");

    cy.get(
      'div[data-input-validator-target="errors"][data-field="emailField"]'
    ).within(() => {
      cy.get(`div[error="email"]`)
        .should("exist")
        .should("contain", "電子郵件格式無效");
    });
  });

  it(`Renders strong_password errors in zh-TW`, () => {
    cy.get(
      `input[data-validates-strong-password][data-field='passwordField']`
    ).type("abc");

    cy.get(
      'div[data-input-validator-target="errors"][data-field="passwordField"]'
    ).within(() => {
      cy.get(`div[error="strong-password-capital-letter"]`)
        .should("exist")
        .should("contain", "必須包含至少一個大寫字母 (A-Z)");
      cy.get(`div[error="strong-password-number"]`)
        .should("exist")
        .should("contain", "必須至少包含一個數字");
      cy.get(`div[error="strong-password-special-character"]`)
        .should("exist")
        .should(
          "contain",
          "必須至少包含一個特殊字元 (!@#$%^&*)"
        );
      cy.get(`div[error="strong-password-length"]`)
        .should("exist")
        .should("contain", "長度必須至少 10 個字符");
    });
  });
});
