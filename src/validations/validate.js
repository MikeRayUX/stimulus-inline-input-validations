import Regex from '../helpers/regex'
import ErrorMessages from '../i18n/error_messages'

const Validate = {
  presence (value, errors, locale) {
    if (value.trim().length === 0) {
      errors.push({
        type: 'presence',
        message: ErrorMessages.locales[locale].presence
      })
    }
  },

  length (value, length, errors, locale) {
    if (value.length < length.min) {
      errors.push({
        type: 'length-min',
        message: ErrorMessages.locales[locale].length.min.replace(/{value}/g, length.min)
      })
    }
    if (value.length > length.max) {
      errors.push({
        type: 'length-max',
        message: ErrorMessages.locales[locale].length.max.replace(/{value}/g, length.max)
      })
    }
  },

  numericality (value, errors, locale) {
    if (!Regex.numericality.test(value)) {
      errors.push({
        type: 'numericality',
        message: ErrorMessages.locales[locale].numericality
      })
    }
  },

  email (value, errors, locale) {
    if (!Regex.email.test(value)) {
      errors.push({ type: 'email', message: ErrorMessages.locales[locale].email })
    }
  },

  strongPassword (validations, value, errors, locale) {
    if (!Regex.singleCapitalLetter.test(value)) {
      errors.push({
        type: 'strong-password-capital-letter',
        message: ErrorMessages.locales[locale].strongPassword.capitalLetter
      })
    }

    if (!Regex.singleNumber.test(value)) {
      errors.push({
        type: 'strong-password-number',
        message: ErrorMessages.locales[locale].strongPassword.number
      })
    }

    if (!Regex.singleSpecialCharacter.test(value)) {
      errors.push({
        type: 'strong-password-special-character',
        message: ErrorMessages.locales[locale].strongPassword.specialCharacter
      })
    }

    if (
      validations.length &&
      validations.some((validation) =>
        Object.keys(validation).includes('length')
      )
    ) { return }
    if (value.length < 10) {
      errors.push({
        type: 'strong-password-length',
        message: ErrorMessages.locales[locale].strongPassword.length
      })
    }
  }
}

export default Validate
