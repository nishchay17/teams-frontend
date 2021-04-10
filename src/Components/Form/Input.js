import React from "react";
import { Input as Inputr } from "@rebass/forms";

function Input({ type, name, register, required, placeholder }) {
  return (
    <Inputr
      width="100%"
      py="0.8rem"
      sx={{
        borderRadius: "8px",
        borderColor: "input",
        outline: "none",
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
