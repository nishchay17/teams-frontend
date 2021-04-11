import React from "react";
import { Box } from "rebass";

function FormGroup({ children, ...props }) {
  return (
    <Box {...props} mb="2rem" width="20rem">
      {children}
    </Box>
  );
}

export default FormGroup;
