import { Controller } from "@hotwired/stimulus";
import { validatePresence } from "./validations/presence";
import { getField } from "./helpers/node_helper";

// Connects to data-controller="input-validator"
export default class extends Controller {
  static targets = ["textField", "errors"];

  connect() {
    this.textFieldTargets.forEach(field => {
      field.setAttribute("data-action", "input->input-validator#validateInput")
    })
  }

  getErrors(value, validations) {
    let errors = [];
    validations.forEach((validation) => {
      const validationName = Object.keys(validation)[0];
      switch (validationName) {
        case "presence":
          if (value.trim().length === 0) errors.push("Can't be blank");
          break;
        case "length":
          if (validation.length.min && value.length < validation.length.min) {
            errors.push(
              `Too short. Minimum ${validation.length.min} characters`
            );
          }
          if (validation.length.max && value.length > validation.length.max) {
            errors.push(
              `Too long. Maximum ${validation.length.max} characters`
            );
          }
          break;
        default:
          break;
      }
    });

    return errors;
  }

  handleValidationsList(target, field, value, errors) {
    if (target.hasAttribute("data-validate-presence")) {
      validatePresence(target, field, value, errors);
    }
  }

  validateInput({ params: { validations }, target, target: { value } }) {
    let field = getField(target);
    let [errors] = this.errorsTargets.filter(
      (item) => item.getAttribute("data-field") == field
    );
    this.handleValidationsList(target, field, value, errors);
  }
}
