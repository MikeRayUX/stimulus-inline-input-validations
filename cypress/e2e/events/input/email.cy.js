describe("input/email", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:8080/");
  });

  it(`renders error div on blank input field with data-validate-numericality attribute set to true`, () => {
    cy.get(`input[data-validate-email][data-field='emailField']`)
      .type("abc")

    cy.get(
      'div[data-input-validator-target="errors"][data-field="emailField"]'
    ).within(() => {
      cy.get(`div[error="email"]`).should("exist").should("contain", "Invalid email format");
    });
  });

  it(`doesnt render error div on valid email`, () => {
    cy.get(`input[data-validate-email][data-field='emailField']`)
      .type("abc@sample.com")

    cy.get(
      'div[data-input-validator-target="errors"][data-field="emailField"]'
    ).within(() => {
      cy.get(`div[error="email"]`).should("not.exist")
    });
  });


  it(`renders error div on blank input field with data-validate-email attribute set to true`, () => {
    cy.get(`input[data-validate-email][data-field='emailField']`)
      .invoke("attr", "data-validate-email", "")

    cy.get(`input[data-validate-email][data-field='emailField']`)
      .type("abc")

    cy.get(
      'div[data-input-validator-target="errors"][data-field="emailField"]'
    ).within(() => {
      cy.get(`div[error="email"]`).should("exist").should("contain", "Invalid email format");
    });
  });
});
