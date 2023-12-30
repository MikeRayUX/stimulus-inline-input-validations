describe("input/presence", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001/");
  });

  it(`renders error div on blank input field with validate-presence attribute set to true`, () => {
    cy.get(`input[data-validates-presence][data-field='fullName']`)
      .type("abc")
      .clear();

    cy.get(
      'div[data-input-validator-target="errors"][data-field="fullName"]'
    ).within(() => {
      cy.get(`div[error="presence"]`).should("exist").should("contain", "Can't be blank");
    });
  });

  it(`renders error div on blank input with blank data-validates-presence attribute`, () => {
    cy.get(
      `input[data-validates-presence][data-field='fullName']`
    ).invoke("attr", "data-validates-presence", "");

    cy.get(`input[data-validates-presence][data-field='fullName']`)
      .type("abc")
      .clear();

    cy.get(`input[data-validates-presence][data-field='fullName']`).should(
      "have.attr",
      "data-validates-presence",
      ""
    );
    cy.get(
      'div[data-input-validator-target="errors"][data-field="fullName"]'
    ).within(() => {
      cy.get(`div[error="presence"]`).should("exist").should("contain", "Can't be blank");
    });
  });

  it("hides errors div when valid", () => {
    let field = cy.get(
      `input[data-validates-presence][data-field='fullName']`
    );

    field.type("abc").clear().type("abc");

    cy.get(
      'div[data-input-validator-target="errors"][data-field="fullName"]'
    ).within(() => {
      cy.get(`div[error="presence"]`).should("not.exist");
    });
  });
});
