import React from "react";
import { Flex, Image } from "rebass";
import Container from "../library/Container";
import authSideImage from "../../Assets/svg/building.svg";

function AuthWrapper({ children }) {
  return (
    <>
      <Flex
        width="45%"
        height="100vh"
        bg="authbg"
        alignItems="center"
        sx={{ position: "fixed", right: 0 }}
      >
        <Image
          src={authSideImage}
          sx={{ transform: "translateX(-4rem)", userSelect: "none" }}
        />
      </Flex>
      <Container>{children}</Container>
    </>
  );
}

export default AuthWrapper;
