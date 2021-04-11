import React from "react";
import { Box, Flex, Text } from "rebass";

const Avatar = ({ username, props }) => {
  return (
    <Flex alignItems="center" {...props}>
      <Box
        width="12rem"
        height="12rem"
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
        width="2rem"
        height="2rem"
        bg="green"
        sx={{
          borderRadius: "50%",

          marginLeft: "-3.5rem",
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
