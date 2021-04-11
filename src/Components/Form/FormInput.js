import React from "react";
import { Text } from "rebass";
import FormGroup from "./FormGroup";
import Input from "./Input";
import Label from "./Label";

function FormInput({
  label,
  type,
  name,
  register,
  required,
  errors,
  inputProps,
  customError,
  ...props
}) {
  return (
    <FormGroup {...props}>
      <Label> {label} </Label>
      <Input
        type={type}
        register={register}
        name={name}
        required={required}
        error={required && errors && errors[name]}
        placeholder={"Enter " + label}
        {...inputProps}
      />
      {required && errors && errors[name] && (
        <Text
          color="error"
          fontSize="error"
          mt="0.5rem"
          sx={{ textTransform: "capitalize" }}
        >
          {name} required
        </Text>
      )}
      {customError && (
        <Text
          color="error"
          fontSize="error"
          mt="0.5rem"
          sx={{ textTransform: "capitalize" }}
        >
          {customError}
        </Text>
      )}
    </FormGroup>
  );
}

export default FormInput;
