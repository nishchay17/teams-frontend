import React from "react";
import { Box } from "rebass";

function FormGroup({ children, ...props }) {
  return (
    <Box mb="2rem" width={{ xs: "100%", sm: "20rem" }} {...props}>
      {children}
    </Box>
  );
}

export default FormGroup;
