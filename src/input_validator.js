import { Controller } from '@hotwired/stimulus'
import Validate from './validations/validate'
import Regex from './helpers/regex'
import SUPPORTED_LOCALES from './i18n/supported_locales'

// Connects to data-controller="input-validator"
export default class extends Controller {
  static targets = ['field', 'errors']

  connect () {
    this.handlei18n()

    this.fieldTargets.forEach((field) => {
      field.setAttribute('data-action', 'input->input-validator#validateInput')

      field.addEventListener('blur', (event) => {
        this.validateInput(event)
      })
    })
  }

  handlei18n () {
    const locale =
      this.element.getAttribute('data-input-validator-i18n-locale') || 'en'

    if (SUPPORTED_LOCALES.includes(locale)) {
      this.locale = locale
    } else {
      console.warn(
        `Stimulus Inline Input Validations: Unsupported i18n locale '${locale}'. Supported data-input-validator-i18n-locale values are: ${SUPPORTED_LOCALES.join(
          ', '
        )}. Using default language 'en'`
      )
      this.locale = 'en'
    }
  }

  handleJSONValidations (value, validations, errors) {
    validations.forEach((validation) => {
      const [validationType] = Object.keys(validation)

      switch (validationType) {
        case 'presence':
          if (validation.presence) {
            Validate.presence(value, errors, this.locale)
          }
          break
        case 'length':
          if (validation.length.min && validation.length.max) {
            Validate.length(value, validation.length, errors, this.locale)
          } else {
            console.log("Couldn't validate length (missing keys min or max)")
          }
          break
        case 'numericality':
          if (validation.numericality) {
            Validate.numericality(value, errors, this.locale)
          }
          break
        case 'email':
          if (validation.email) {
            Validate.email(value, errors, this.locale)
          }
          break
        case 'strong_password':
          if (validation.strong_password) {
            Validate.strongPassword(validations, value, errors, this.locale)
          }
          break
        default:
          break
      }
    })
  }

  handleValidations (target, value, errors) {
    if (
      target.hasAttribute('data-validates-presence') &&
      target.getAttribute('data-validates-presence') !== 'false'
    ) {
      Validate.presence(value, errors, this.locale)
    }

    if (
      target.hasAttribute('data-validates-length') &&
      target.getAttribute('data-validates-length').length > 2
    ) {
      const [min, max] = target
        .getAttribute('data-validates-length')
        .split(',')
        .map(Number)

      Validate.length(value, { min, max }, errors, this.locale)
    }

    if (
      target.hasAttribute('data-validates-numericality') &&
      target.getAttribute('data-validates-numericality') !== 'false'
    ) {
      Validate.numericality(value, errors, this.locale)
    }

    if (
      target.hasAttribute('data-validates-email') &&
      target.getAttribute('data-validates-email') !== 'false'
    ) {
      Validate.email(value, errors, this.locale)
    }

    if (
      target.hasAttribute('data-validates-strong-password') &&
      target.getAttribute('data-validates-strong-password') !== 'false'
    ) {
      Validate.strongPassword([], value, errors, this.locale)
    }
  }

  errorElement (errorsContainer, error) {
    let styles = 'font-size: 14px; color: red'
    let classes

    if (errorsContainer.hasAttribute('data-errors-styles-css')) {
      styles = errorsContainer.getAttribute('data-errors-styles-css')
    }

    if (errorsContainer.hasAttribute('data-errors-styles-class')) {
      styles = null
      classes = errorsContainer.getAttribute('data-errors-styles-class')
    }

    return `<div error="${error.type}" ${
      styles ? "style='" + styles + "'" : ''
    } ${classes ? "class='" + classes + "'" : ''} >${error.message}</div>`
  }

  validateInput ({ target, target: { value } }) {
    const errors = []
    const field = target.getAttribute('data-field')

    if (!field) {
      console.log(
        'one or more <input> elements are the missing data-field="" attribute.'
      )
      return
    }

    const [errorsContainer] = this.errorsTargets.filter(
      (item) => item.getAttribute('data-field') === field
    )

    if (target.hasAttribute('data-validations')) {
      try {
        let validations = target.getAttribute('data-validations')

        if (Regex.singleQuotes.test(validations)) {
          validations = validations.replace(/'/g, '"')
        }

        this.handleJSONValidations(value, JSON.parse(validations), errors)
      } catch (error) {
        console.log(error)
        console.log(
          `Error parsing JSON string on the data-validations attribute on data-field="${field}". Is the json string formatted properly?`
        )
        return
      }
    } else {
      this.handleValidations(target, value, errors)
    }

    errorsContainer.innerHTML = ''

    if (errors.length) {
      errors.forEach((error) => {
        errorsContainer.innerHTML += this.errorElement(errorsContainer, error)
        errorsContainer.style.visibility = 'visible'
      })
    } else {
      errorsContainer.style.visibility = 'invisible'
    }
  }
}
