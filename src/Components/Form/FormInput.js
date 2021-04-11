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
        placeholder={"Enter " + label}
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
    </FormGroup>
  );
}

export default FormInput;
