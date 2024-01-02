import Regex from '../helpers/regex'

const Validate = {
  presence (value, errors) {
    if (value.trim().length === 0) {
      errors.push({ type: 'presence', message: "Can't be blank" })
    }
  },

  length (value, length, errors) {
    if (value.length < length.min) {
      errors.push({
        type: 'length-min',
        message: `Too short. Minimum ${length.min} characters`
      })
    }
    if (value.length > length.max) {
      errors.push({
        type: 'length-max',
        message: `Too long. Maximum ${length.max} characters`
      })
    }
  },

  numericality (value, errors) {
    if (!Regex.numericality.test(value)) {
      errors.push({ type: 'numericality', message: 'Must be a number' })
    }
  },

  email (value, errors) {
    if (!Regex.email.test(value)) {
      errors.push({ type: 'email', message: 'Invalid email format' })
    }
  },

  strongPassword (validations, value, errors) {
    if (!Regex.singleCapitalLetter.test(value)) {
      errors.push({
        type: 'strong-password-capital-letter',
        message: 'Must contain at least one capital letter (A-Z)'
      })
    }

    if (!Regex.singleNumber.test(value)) {
      errors.push({
        type: 'strong-password-number',
        message: 'Must contain at least one number'
      })
    }

    if (!Regex.singleSpecialCharacter.test(value)) {
      errors.push({
        type: 'strong-password-special-character',
        message: 'Must contain at least one special character (!@#$%^&*)'
      })
    }

    if (validations.length && Object.prototype.hasOwnProperty.call(validations, 'length')) return
    if (value.length < 10) {
      errors.push({
        type: 'strong-password-length',
        message: 'Must be at least 10 characters long'
      })
    }
  }
}

export default Validate
