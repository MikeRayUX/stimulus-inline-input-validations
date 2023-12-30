describe("input/email", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/");
  });

  it(`renders error div on blank input field with data-validates-numericality attribute set to true`, () => {
    cy.get(`input[data-validates-email][data-field='emailField']`)
      .type("abc")

    cy.get(
      'div[data-input-validator-target="errors"][data-field="emailField"]'
    ).within(() => {
      cy.get(`div[error="email"]`).should("exist").should("contain", "Invalid email format");
    });
  });

  it(`doesnt render error div on valid email`, () => {
    cy.get(`input[data-validates-email][data-field='emailField']`)
      .type("abc@sample.com")

    cy.get(
      'div[data-input-validator-target="errors"][data-field="emailField"]'
    ).within(() => {
      cy.get(`div[error="email"]`).should("not.exist")
    });
  });


  it(`renders error div on blank input field with data-validates-email attribute set to true`, () => {
    cy.get(`input[data-validates-email][data-field='emailField']`)
      .invoke("attr", "data-validates-email", "")

    cy.get(`input[data-validates-email][data-field='emailField']`)
      .type("abc")

    cy.get(
      'div[data-input-validator-target="errors"][data-field="emailField"]'
    ).within(() => {
      cy.get(`div[error="email"]`).should("exist").should("contain", "Invalid email format");
    });
  });
});
