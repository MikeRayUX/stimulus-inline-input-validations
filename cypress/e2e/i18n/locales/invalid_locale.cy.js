describe("i18n/locales/invalid_locale", () => {
  beforeEach(() => {
    cy.visit("cypress/fixtures/i18n/locales/invalid_locale.html");
  });

  it(`Renders warning to console and defaults to en if unsupported locale value is passed to data-input-validator-i18n-locale`, () => {
    cy.on("window:console", (consoleMessage) => {
      if (consoleMessage.type === "warn") {
        expect(consoleMessage.content).to.contain(
          `Stimulus Inline Input Validations: Unsupported i18n locale 'asdf'. Supported data-input-validator-i18n-locale values are: en, es, fr, pt-BR, zh-CN, zh-TW. Using default language 'en'`
        );
      }
    });

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
});
