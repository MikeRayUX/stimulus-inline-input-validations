[![npm](https://img.shields.io/npm/v/stimulus-inline-input-validations.svg)](https://www.npmjs.com/package/stimulus-inline-input-validations) [![Tests](https://github.com/mikerayux/stimulus-inline-input-validations/actions/workflows/test.yml/badge.svg)](https://github.com/mikerayux/stimulus-inline-input-validations/actions/workflows/ci.yml)
# Stimulus Inline Input Validations

A Stimulus controller for validating form inputs and rendering their errors in a custom error element. Validations are
performed on input listener and blur events.

## Installation 

[StimulusJS](https://stimulusjs.org) installation is required.

Add the package to your project:

```bash
yarn add stimulus-inline-input-validations
```

## Getting started

1. Add `data-controller="input-validator"` to your form or any parent element of `<input>` elements you want to validate.


```html
<div data-controller="input-validator">
...
</div>

```
2. Add an `<input>` element with the `data-input-validator-target="field"` and `data-field` attribute that uniquely identifies the field.

```html
<div data-controller="input-validator">
    <input 
      type="text" 
      data-input-validator-target="field" 
      data-field='fullName'
    >
    ...
</div>

```

3. Add an errors element with the `data-input-validator-target="errors"` attribute and a `data-field` name that matches the
   corrosponding input element. This is where any errors from the matching `data-field` will be rendered.

```html
<div data-controller="input-validator">
    <input 
      type="text" 
      data-input-validator-target="field" 
      data-field='fullName'>

    <div
      data-input-validator-target="errors"
      data-field="fullName"
      class="">Errors will be rendered here</div>
</div>
```

4. Add, mix, and match validations attributes to the input field 

```html
<div data-controller="input-validator">
    <input 
      type="text" 
      data-input-validator-target="field" 
      data-field='fullName'
      data-validates-presence
      data-validates-length="5,10"
      data-validates-numericality
      data-validates-email
      >

    <div
      data-input-validator-target="errors"
      data-field="fullName"
      class=""></div>
</div>
```

## Standard Validation attributes

| Attribute | Description | Renders |
| -------- | ----------- |  ---------------  |
| `data-validates-presence` | Validates presence | `<div error="presence">Can't be blank</div>`
| `data-validates-length="5,10"` | Validates length in format `"min,max"` | `<div error="length-min">Too short. Must be 5 characters long</div>`|
| `data-validates-numericality` | Ensures value is a Number | `<div error="numericality">Must be a number</div>`|
| `data-validates-email` | Ensures value is in Email format | `<div error="email">Invalid email format</div>`|
| `data-validates-strong-password` | Ensures value is strong password | `<div error="strong-password-length">Must be at least 10 characters long</div>, <div error="strong-password-special-character">Must contain at least one special character (!@#$%^&*) </div>, <div error="strong-password-capital-letter">Must contain at least one capital letter (A-Z)</div>`|
| `data-validations="[{"presence": true}, {"email": true}, {"numericality": true}, {"length": {"min": 5, "max": 10}}]"` | Handles multiple validations from a json-friendly-string| `<div error="presence">...</div> <div error="length-min">...</div> <div error="numericality">...</div> <div error="email">...</div>`|

    
## Multiple validations passed as a json-friendly string

You can also pass multiple validations as a json-friendly string with the `data-validations` attribute.

Example:

```html
<input 
  type="text" 
  data-input-validator-target="field" 
  data-field='jsonBulkValidations'
  data-validations='[{"presence": true}, {"email": true}, {"numericality": true}, {"length": {"min": 5, "max": 10}}]'
>
```

Will render

```html
<div data-input-validator-target="errors" data-field="jsonBulkValidations">
    <div error="presence">Can't be blank</div>
    <div error="length-min">Too short. Must be 5 characters long</div>
    <div error="numericality">Must be a number</div>
    <div error="email">Invalid email format</div>
</div>
```
