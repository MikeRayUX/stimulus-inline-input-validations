describe("i18n/locales/zh_cn", () => {
  beforeEach(() => {
    cy.visit("cypress/fixtures/i18n/locales/zh_cn.html");
  });

  it(`Renders presence error in zh-CN`, () => {
    cy.get(`input[data-validates-presence][data-field='fullName']`)
      .type("abc")
      .clear();

    cy.get(
      'div[data-input-validator-target="errors"][data-field="fullName"]'
    ).within(() => {
      cy.get(`div[error="presence"]`)
        .should("exist")
        .should("contain", "不能为空");
    });
  });

  it(`Renders length-min error in zh-CN`, () => {
    cy.get(`input[data-validates-length="5,10"][data-field='userName']`).type(
      "abc"
    );

    cy.get(
      'div[data-input-validator-target="errors"][data-field="userName"]'
    ).within(() => {
      cy.get(`div[error="length-min"]`)
        .should("exist")
        .should("contain", "过短。最少 5 个字符");
    });
  });

  it(`Renders length-max error in zh-CN`, () => {
    cy.get(`input[data-validates-length="5,10"][data-field='userName']`).type(
      "12345678910"
    );

    cy.get(
      'div[data-input-validator-target="errors"][data-field="userName"]'
    ).within(() => {
      cy.get(`div[error="length-max"]`)
        .should("exist")
        .should("contain", "太长。最多 10 个字符");
    });
  });

  it(`renders numericality error in zh-CN`, () => {
    cy.get(`input[data-validates-numericality][data-field='currency']`).type(
      "abc"
    );

    cy.get(
      'div[data-input-validator-target="errors"][data-field="currency"]'
    ).within(() => {
      cy.get(`div[error="numericality"]`)
        .should("exist")
        .should("contain", "必须是一个数字");
    });
  });

  it(`renders email format error in zh-CN`, () => {
    cy.get(`input[data-validates-email][data-field='emailField']`).type("abc");

    cy.get(
      'div[data-input-validator-target="errors"][data-field="emailField"]'
    ).within(() => {
      cy.get(`div[error="email"]`)
        .should("exist")
        .should("contain", "电子邮件格式无效");
    });
  });

  it(`renders strong_password errors in zh-CN`, () => {
    cy.get(
      `input[data-validates-strong-password][data-field='passwordField']`
    ).type("abc");

    cy.get(
      'div[data-input-validator-target="errors"][data-field="passwordField"]'
    ).within(() => {
      cy.get(`div[error="strong-password-capital-letter"]`)
        .should("exist")
        .should("contain", "必须包含至少一个大写字母 (A-Z)");
      cy.get(`div[error="strong-password-number"]`)
        .should("exist")
        .should("contain", "必须至少包含一个数字");
      cy.get(`div[error="strong-password-special-character"]`)
        .should("exist")
        .should(
          "contain",
          "必须至少包含一个特殊字符 (!@#$%^&*)"
        );
      cy.get(`div[error="strong-password-length"]`)
        .should("exist")
        .should("contain", "长度必须至少 10 个字符");
    });
  });
});
