# Stimulus Inline Input Validations

A Stimulus controller for validating form inputs and rendering their errors in a custom error element. Validations are
performed on input listener and blur events.

## Getting started

1. Add `data-controller="input-validator"` to your form or any parent element of `<input>` elements you want to validate.


```html
<div data-controller="input-validator">
...
</div>

```
2. Add an `<input>` element with the `data-input-validator-target="textField"` and `data-field` attribute that uniquely identifies the field.

```html
<div data-controller="input-validator">
    <input 
      type="text" 
      data-input-validator-target="textField" 
      data-field='fullName'
    >
    ...
</div>

```

3. Add an errors element with the `data-input-validator-target="errors"` attribute and a `data-field` name that matches the
   corrosponding input element. This is where any errors from the matching field will be rendered.

```html
<div data-controller="input-validator">
    <input 
      type="text" 
      data-input-validator-target="textField" 
      data-field='fullName'>

    <div
      data-input-validator-target="errors"
      data-field="fullName"
      class=""></div>
</div>
```

4. Add, mix, and match validations attributes to the input field 

```html
<div data-controller="input-validator">
    <input 
      type="text" 
      data-input-validator-target="textField" 
      data-field='fullName'
      data-validate-presence
      data-validate-length="5,10"
      data-validate-numericality="true"
      data-validate-email="true"
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
| `data-validate-presence="true"` | Validates presence | `<div error="presence">Can't be blank</div>`
| `data-validate-length="5,10"` | Validates length in format `"min,max"` | `<div error="length-min">Too short. Must be 5 characters long</div>`|
| `data-validate-numericality="true"` | Ensures input value is a Number | `<div error="numericality">Must be a number</div>`|
| `data-validate-email="true"` | Ensures input value is in Email format | `<div error="email">Invalid email format</div>`|
| `data-validations="[{"presence": true}, {"email": true}, {"numericality": true}, {"length": {"min": 5, "max": 10}}]"` | Handles multiple validations from a json-friendly-string| `<div error="presence">...</div> <div error="length-min">...</div> <div error="numericality">...</div> <div error="email">...</div>`|

    
## Multiple validations passed as a json-friendly string

You can also pass multiple validations at once with the `data-validations` attribute.

Example:

```html
<input 
  type="text" 
  data-input-validator-target="textField" 
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











