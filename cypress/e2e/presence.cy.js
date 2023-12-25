describe("presence", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:8080/");
  });

  it(`renders error div on blank input field with validate-presence attribute set to true`, () => {
    cy.get(`input[data-validate-presence="true"][data-field='fullName']`)
      .type("abc")
      .clear();

    cy.get(
      'div[data-input-validator-target="errors"][data-field="fullName"]'
    ).within(() => {
      cy.get(`div[error="presence"]`).should("exist").should("contain", "Can't be blank");
    });
  });

  it(`renders error div on blank input with blank data-validate-presence attribute`, () => {
    cy.get(
      `input[data-validate-presence="true"][data-field='fullName']`
    ).invoke("attr", "data-validate-presence", "");

    cy.get(`input[data-validate-presence][data-field='fullName']`)
      .type("abc")
      .clear();

    cy.get(`input[data-validate-presence][data-field='fullName']`).should(
      "have.attr",
      "data-validate-presence",
      ""
    );
    cy.get(
      'div[data-input-validator-target="errors"][data-field="fullName"]'
    ).within(() => {
      cy.get(`div[error="presence"]`).should("exist").should("contain", "Can't be blank");
    });
  });

  it(`doesn't render error data-validate-presence="false`, () => {
    cy.get(
      `input[data-validate-presence="true"][data-field='fullName']`
    ).invoke("attr", "data-validate-presence", "false");

    cy.get(`input[data-validate-presence][data-field='fullName']`)
      .type("abc")
      .clear();

    cy.get(
      'div[data-input-validator-target="errors"][data-field="fullName"]'
    ).within(() => {
      cy.get(`div[error="presence"]`).should("not.exist");
    });
  });

  it("hides errors div when valid", () => {
    let field = cy.get(
      `input[data-validate-presence="true"][data-field='fullName']`
    );

    field.type("abc").clear().type("abc");

    cy.get(
      'div[data-input-validator-target="errors"][data-field="fullName"]'
    ).within(() => {
      cy.get(`div[error="presence"]`).should("not.exist");
    });
  });
});
