import React from "react";
import { Box, Flex, Text } from "rebass";

const Avatar = ({ username, props }) => {
  return (
    <Flex alignItems="center" {...props}>
      <Box
        width="10rem"
        height="10rem"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#C4C4C4",
          borderRadius: "50%",
        }}
      />

      <Text as="p" ml="3rem" fontSize="2rem">
        Hello {username}
      </Text>
    </Flex>
  );
};

Avatar.defaultProps = {
  username: "",
};

export default Avatar;
