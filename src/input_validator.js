import { Controller } from "@hotwired/stimulus";
import StandardValidations from "./validations/standard_validations";
import RailsValidations from "./validations/rails_validations";
import { getField } from "./helpers/node_helper";

// Connects to data-controller="input-validator"
export default class extends Controller {
  static targets = ["textField", "errors"];

  connect() {
    this.textFieldTargets.forEach((field) => {
      field.setAttribute("data-action", "input->input-validator#validateInput");
    });
  }

  // getErrors(value, validations) {
  //   let errors = [];
  //   validations.forEach((validation) => {
  //     const validationName = Object.keys(validation)[0];
  //     switch (validationName) {
  //       case "presence":
  //         if (value.trim().length === 0) errors.push("Can't be blank");
  //         break;
  //       case "length":
  //         if (validation.length.min && value.length < validation.length.min) {
  //           errors.push(
  //             `Too short. Minimum ${validation.length.min} characters`
  //           );
  //         }
  //         if (validation.length.max && value.length > validation.length.max) {
  //           errors.push(
  //             `Too long. Maximum ${validation.length.max} characters`
  //           );
  //         }
  //         break;
  //       default:
  //         break;
  //     }
  //   });

  //   return errors;
  // }

  handleStandardValidations(target, errors) {
    if (target.hasAttribute("data-validate-presence")) {
      StandardValidations.presence(target, errors);
    }

    if (target.hasAttribute("data-validate-length")) {
      StandardValidations.length(target, errors);
    }

    if (target.hasAttribute("data-validate-numericality")) {
      StandardValidations.numericality(target, errors);
    }
  }

  validateInput({ params: { validations }, target }) {
    let field = getField(target);
    let [errorsContainer] = this.errorsTargets.filter(
      (item) => item.getAttribute("data-field") == field
    );

    errorsContainer.innerHTML = ``;

    let errors = [];

    this.handleStandardValidations(target, errors);

    console.log("errors", errors);
    if (errors.length) {
      errors.forEach((error) => {
        errorsContainer.innerHTML += `<div class="text-sm text-red-500">${error}</div>`;
        errorsContainer.style.visibility = "visible";
      });
    } else {
      errorsContainer.style.visibility = "invisible";
    }
  }
}
