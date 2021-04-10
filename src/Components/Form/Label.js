import React from "react";
import { Box } from "rebass";

function Label({ children, ...props }) {
  return (
    <Box as="label" display="block" fontSize="1.4rem" mb="0.5rem" {...props}>
      {children}
    </Box>
  );
}

export default Label;
