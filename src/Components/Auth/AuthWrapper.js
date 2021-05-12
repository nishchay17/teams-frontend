import React from "react";
import { Box, Flex, Image } from "rebass";
import Container from "../library/Container";
import authSideImage from "../../Assets/img/building.png";
import { motion } from "framer-motion";

function AuthWrapper({ children }) {
  return (
    <motion.div exit={{ opacity: 0 }}>
      <Flex
        width="45%"
        height="100vh"
        bg="authbg"
        alignItems="center"
        sx={{ position: "fixed", right: 0 }}
      >
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <Image
            src={authSideImage}
            sx={{ transform: "translateX(-4rem)", userSelect: "none" }}
          />
        </motion.div>
      </Flex>
      <Container>{children}</Container>
    </motion.div>
  );
}

export default AuthWrapper;
