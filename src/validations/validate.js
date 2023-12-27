const Validate = {
  presence(value, errors) {
    if (value.trim().length === 0) {
      errors.push({ type: "presence", message: "Can't be blank" });
    }
  },

  length(value, length, errors) {
    console.log("value", value)
    console.log("length", length)
    console.log("errors", errors)
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
};

export default Validate;
