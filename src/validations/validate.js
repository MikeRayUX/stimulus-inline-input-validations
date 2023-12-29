const Validate = {
  presence(value, errors) {
    if (value.trim().length === 0) {
      errors.push({ type: "presence", message: "Can't be blank" });
    }
  },

  length(value, length, errors) {
    if (value.length < length.min) {
      errors.push({
        type: "length-min",
        message: `Too short. Minimum ${length.min} characters`,
      });
    }
    if (value.length > length.max) {
      errors.push({
        type: "length-max",
        message: `Too long. Maximum ${length.max} characters`,
      });
    }
  },

  numericality(value, errors) {
    const numberRegex = /^[+-]?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/;

    if (!numberRegex.test(value)) {
      errors.push({ type: "numericality", message: "Must be a number" });
    }
  },

  email(value, errors) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(value)) {
      errors.push({ type: "email", message: "Invalid email format" });
    }
  },

  strongPassword(value, errors) {
    const capitalLetterRegex = /[A-Z]/;
    const numberRegex = /^[+-]?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/;
    const specialCharacterRegex = /[!@#$%^&*]/;

    if (value.length < 10) {
      errors.push({ type: "strong-password-length", message: "Must be at least 10 characters long" });
    }

    if (!capitalLetterRegex.test(value)) {
      errors.push({ type: "strong-password-capital-letter", message: "Must contain at least one capital letter (A-Z)" });
    }

    if (!numberRegex.test(value)) {
      errors.push({ type: "strong-password-number", message: "Must contain at least one number" });
    }

    if (!specialCharacterRegex.test(value)) {
      errors.push({ type: "strong-password-special-character", message: "Must contain at least one special character (!@#$%^&*)" });
    }
  },
};

export default Validate;
