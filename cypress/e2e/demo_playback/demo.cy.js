// describe("demo_playback", () => {
//   const TYPING_DELAY_MS = 100;
//   const FOCUS_FIELD_DELAY_MS = 500;
//   const SHORT_DELAY_MS = 500;
//   const SHOW_OFF_DELAY_MS = 850;

//   it(`showcases validations functionality`, () => {
//     cy.visit("http://localhost:3001/");

//     // Presence START
//     cy.get(
//       `input[data-validates-presence="true"][data-field='fullName']`
//     ).click();
//     cy.wait(FOCUS_FIELD_DELAY_MS);

//     cy.get(`input[data-validates-presence="true"][data-field='fullName']`)
//       .type("sample text", { delay: TYPING_DELAY_MS })
//       .clear();
//     cy.wait(SHOW_OFF_DELAY_MS);
//     // Presence END

//     // Length START
//     cy.get(`input[data-validates-length="5,10"][data-field='userName']`).click();
//     cy.wait(FOCUS_FIELD_DELAY_MS);

//     cy.get(`input[data-validates-length="5,10"][data-field='userName']`).type(
//       "abcd",
//       { delay: TYPING_DELAY_MS }
//     );
//     cy.wait(SHOW_OFF_DELAY_MS);

//     cy.get(`input[data-validates-length="5,10"][data-field='userName']`).clear();
//     cy.wait(SHORT_DELAY_MS);

//     cy.get(`input[data-validates-length="5,10"][data-field='userName']`).type(
//       "longer text",
//       { delay: TYPING_DELAY_MS }
//     );
//     cy.wait(SHOW_OFF_DELAY_MS);
//     // Length END

//     // Numericality START
//     cy.get(`input[data-validates-numericality="true"][data-field='currency']`).click();
//     cy.wait(FOCUS_FIELD_DELAY_MS);

//     cy.get(
//       `input[data-validates-numericality="true"][data-field='currency']`
//     ).type("12345", { delay: TYPING_DELAY_MS });
//     cy.wait(SHOW_OFF_DELAY_MS);

//     cy.get(
//       `input[data-validates-numericality="true"][data-field='currency']`
//     ).clear();
//     cy.wait(SHORT_DELAY_MS);

//     cy.get(
//       `input[data-validates-numericality="true"][data-field='currency']`
//     ).type("abcdefg", { delay: TYPING_DELAY_MS });
//     cy.wait(SHOW_OFF_DELAY_MS);
//     // Numericality END

//     // Email START
//     cy.get(`input[data-validates-email="true"][data-field='emailField']`).click();
//     cy.wait(FOCUS_FIELD_DELAY_MS);

//     cy.get(
//       `input[data-validates-email="true"][data-field='emailField']`
//     ).type("example.test@example.com", { delay: 0 });
//     cy.wait(SHOW_OFF_DELAY_MS);

//     cy.get(
//       `input[data-validates-email="true"][data-field='emailField']`
//     ).clear();
//     cy.wait(SHORT_DELAY_MS);

//     cy.get(
//       `input[data-validates-email="true"][data-field='emailField']`
//     ).type("12345", { delay: 0 });
//     cy.wait(SHOW_OFF_DELAY_MS);
//     // Email END

//     // Multiple validations START
//     cy.get(`input[data-field='multiple']`).click();
//     cy.wait(FOCUS_FIELD_DELAY_MS);

//     cy.get(
//       `input[data-field='multiple']`
//     ).type("abc", { delay: TYPING_DELAY_MS });
//     cy.wait(SHOW_OFF_DELAY_MS);
//     // Multiple validations END
//   });
// });
