import React from "react";
import { Flex, Image, Text } from "rebass";
import logo from "../../Assets/svg/logo.svg";

const Username = ({ username, props }) => {
  return (
    <Flex alignItems="center" {...props}>
      <Image src={logo} width="2rem" mr="1rem" />
      <Text fontSize="subheading" mt="0.1rem">
        {username}
      </Text>
    </Flex>
  );
};

Username.defaultProps = {
  username: "Sachin",
};

export default Username;
