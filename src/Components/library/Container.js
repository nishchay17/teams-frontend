import React from "react";
import { Flex } from "rebass";

function Container({ children, ...props }) {
  return (
    <Flex
      flexDirection="column"
      maxWidth="1400px"
      px="5rem"
      mx="auto"
      {...props}
    >
      {children}
    </Flex>
  );
}

export default Container;
