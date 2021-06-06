import React from "react";
import { Flex, Image, Text } from "rebass";

import logo from "../../Assets/svg/logo.svg";
import { useUser } from "../../Provider/UserProvider";
import Container from "../library/Container";

const Username = () => {
  const { userDetails } = useUser();

  return (
    <Container>
      <Flex
        mt="2rem"
        alignItems="center"
        justifyContent="flex-end"
        width="100%"
      >
        <Image src={logo} width="2rem" mr="1rem" />
        <Text
          fontSize="subheading"
          mt="0.1rem"
          sx={{ textTransform: "capitalize" }}
        >
          {userDetails.userState.name}
        </Text>
      </Flex>
    </Container>
  );
};

Username.defaultProps = {
  username: "NA",
};

export default Username;
