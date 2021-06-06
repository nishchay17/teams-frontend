import React from "react";
import { Input as Inputr } from "@rebass/forms";

function Input({ type, name, register, required, placeholder, error }) {
  return (
    <Inputr
      width="100%"
      height="100%"
      py="0.8rem"
      fontSize="text"
      sx={{
        borderRadius: "8px",
        borderColor: error ? "error" : "input",
        outline: "none",
        "::placeholder": {
          color: error ? "error" : "input",
        },
        ":focus": {
          borderColor: "#001939",
        },
      }}
      type={type}
      placeholder={placeholder}
      {...register(name, { required: required })}
    />
  );
}

export default Input;
