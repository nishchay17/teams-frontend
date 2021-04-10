import React from "react";
import { Box } from "rebass";

function FormGroup({ children, ...props }) {
  return (
    <Box {...props} my="1.5rem" width="25rem">
      {children}
    </Box>
  );
}

export default FormGroup;
