[![npm](https://img.shields.io/npm/v/stimulus-inline-input-validations.svg)](https://www.npmjs.com/package/stimulus-inline-input-validations) [![Tests](https://github.com/mikerayux/stimulus-inline-input-validations/actions/workflows/test.yml/badge.svg)](https://github.com/mikerayux/stimulus-inline-input-validations/actions/workflows/ci.yml)
# Stimulus Inline Input Validations

[Try the Demo Here](https://mikerayux.github.io/stimulus-inline-input-validations/)

[Check out the screencast](https://www.youtube.com/watch?v=XUPmmgzc2ZY)

A Stimulus controller for validating form inputs and rendering their errors in a custom error element. Validations are
performed on input and blur events.

Looking for another awesome validations library to try? Check out [Formulus](https://github.com/marcoroth/formulus)

## Installation 

[StimulusJS](https://stimulusjs.org) installation is required.

Add the package to your project:

```bash
yarn add stimulus-inline-input-validations
```

Import and register `InputValidator` to your application

```javascript
import {InputValidator} from "stimulus-inline-input-validations"
application.register("input-validator", InputValidator)
```

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

## Usage in Rails: Leveraging existing model validations in Rails form helpers

1. Add a `json_validations_for` method to `application_helper.rb`

```ruby
module ApplicationHelper
  def json_validations_for(model, field)
    validations_hash = {}

    validators = model.class.validators_on(field)
    validators.each do |validator|
      validator_name = validator.class.name.demodulize.underscore.to_sym

      if validator_name == :length_validator
        options = validator.options.dup
        validations_hash[:length] = { min: options[:minimum].present? ? options[:minimum] : 1,
                                      max: options[:maximum].present? ? options[:maximum] : 1000 }
      end

      validations_hash[:presence] = true if validator_name == :presence_validator
      validations_hash[:numericality] = true if validator_name == :numericality_validator
    end

    validations_hash[:strong_password] = true if field == :password
    validations_hash[:email] = true if field == :email

    validations = validations_hash.map do |key, value|
      { key.to_s => value }
    end

    validations.to_json.html_safe
  end
end
```

2. Use the `json_validations_for` helper method in your Rails form helpers

```erb
<%= f.text_field :email,
                  data: {
                    input_validator_target:"field",
                    field: :email,
                    validations: json_validations_for(@user, :email)
                  } %>
<div data-input-validator-target="errors" data-field="email"></div>
```

Make sure you have a matching errors element with `data-input-validator-target="errors"` and matching `data-field=""`
