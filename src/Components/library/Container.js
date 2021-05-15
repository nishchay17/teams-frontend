import React from "react";
import { Flex } from "rebass";

function Container({ children, ...props }) {
  return (
    <Flex
      flexDirection="column"
      maxWidth="1500px"
      px={{ xs: "1.5rem", sm: "5rem" }}
      mx="auto"
      {...props}
    >
      {children}
    </Flex>
  );
}

export default Container;
