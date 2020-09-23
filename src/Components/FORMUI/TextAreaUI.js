import React from 'react'
import {
    FormGroup,
    FormFeedback,
    textarea,
    Label,
  } from 'reactstrap';
export default function TextAreaUI({
    label,
    name,
    placeholder,
    innerRef,
    errors,
    fields,
    ...rest
  }) {
    return (
      <FormGroup>
        {/* <Label for={name}>{label}</Label> */}
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          ref={innerRef}
          className={`form-control teaxtarea ${errors[name] && 'is-invalid'}`}
          // invalid={!!errors[name]}
          defaultValue={(fields && fields[name]) || ''}
          {...rest}
        />
        <FormFeedback>{errors[name] && errors[name].message}</FormFeedback>
      </FormGroup>
    );
  }