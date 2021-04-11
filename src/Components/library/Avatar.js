import React from "react";
import { Box, Flex, Image, Text } from "rebass";
import logo from "../../Assets/svg/logo.svg";

const Avatar = ({ username, props }) => {
  return (
    <Flex alignItems="center" {...props}>
      <Box
        width="15rem"
        height="15rem"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#C4C4C4",
          borderRadius: "50%",
        }}
      />

      <Box
        alignSelf="flex-end"
        width="3rem"
        height="3rem"
        bg="green"
        sx={{
          borderRadius: "50%",

          marginLeft: "-4rem",
        }}
      />
      <Text as="p" ml="4rem" fontSize="subheading">
        Hello {username}
      </Text>
    </Flex>
  );
};

Avatar.defaultProps = {
  username: "Sachin",
};

export default Avatar;
