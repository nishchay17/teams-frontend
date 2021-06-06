import React from "react";
import { Box } from "rebass";

function FormGroup({ children, ...props }) {
  return (
    <Box {...props} mb="2rem" width={{ xs: "100%", sm: "20rem" }}>
      {children}
    </Box>
  );
}

export default FormGroup;
