describe("input/length", () => {
  beforeEach(() => {
    cy.visit("cypress/fixtures/fields.html");
  });

  it(`Renders min error if string too short`, () => {
    cy.get(`input[data-validates-length="5,10"][data-field='userName']`).type(
      "abc"
    );

    cy.get(
      'div[data-input-validator-target="errors"][data-field="userName"]'
    ).within(() => {
      cy.get(`div[error="length-min"]`)
        .should("exist")
        .should("contain", "Too short. Minimum 5 characters");
    });
  });

  it(`Renders max error if string too long`, () => {
    cy.get(`input[data-validates-length="5,10"][data-field='userName']`).type(
      "12345678910"
    );

    cy.get(
      'div[data-input-validator-target="errors"][data-field="userName"]'
    ).within(() => {
      cy.get(`div[error="length-max"]`)
        .should("exist")
        .should("contain", "Too long. Maximum 10 characters");
    });
  });

  it(`Shows no errors if valid min/max`, () => {
    cy.get(`input[data-validates-length="5,10"][data-field='userName']`).type(
      "123456"
    );

    cy.get(
      'div[data-input-validator-target="errors"][data-field="userName"]'
    ).within(() => {
      cy.get(`div[error="length-min"]`).should("not.exist");
      cy.get(`div[error="length-max"]`).should("not.exist");
    });
  });
});
