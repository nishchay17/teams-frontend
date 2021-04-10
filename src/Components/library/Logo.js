import React from "react";
import { Flex, Image, Text } from "rebass";

import logo from "../../Assets/svg/logo.svg";

function Logo(props) {
  return (
    <Flex alignItems="center" {...props}>
      <Image src={logo} width="2rem" mr="1rem" />
      <Text fontSize="1.5rem" mt="0.1rem">
        Teams
      </Text>
    </Flex>
  );
}

export default Logo;
