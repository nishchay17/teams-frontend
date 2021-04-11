import React from "react";
import { Box, Flex, Image, Text } from "rebass";
import logo from "../../Assets/svg/logo.svg";

const Avatar = (props) => {
  return (
    <Flex alignItems="center" {...props}>
      <Box
        width="215px"
        height="215px"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#C4C4C4",
          borderRadius: "50%",
        }}
      />

      <Box
        width="46px"
        height="46px"
        bg="green"
        sx={{
          borderRadius: "50%",
          marginTop: "9rem",
          marginLeft: "-3rem",
        }}
      />
      <Text as="p" ml="2rem" fontSize="big">
        Hello Username
      </Text>
    </Flex>
  );
};

export default Avatar;
