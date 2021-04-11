import React from "react";
import { Flex, Image, Text } from "rebass";
import logo from "../../Assets/svg/logo.svg";

const Username = (props) => {
  return (
    <Flex alignItems="center" {...props}>
      <Image src={logo} width="2rem" mr="1rem" />
      <Text fontSize="1.5rem" mt="0.1rem">
        Username
      </Text>
    </Flex>
  );
};

export default Username;
