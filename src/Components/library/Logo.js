import React from "react";
import { Flex, Image, Text } from "rebass";
import { motion } from "framer-motion";

import logo from "../../Assets/svg/logo.svg";

function Logo(props) {
  return (
    <Flex alignItems="center" {...props}>
      <motion.div
        initial={{ scale: 1.3, rotate: 90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Image src={logo} width="2rem" />
      </motion.div>
      <motion.div
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Text fontSize="subheading" ml="1rem" mt="0.1rem">
          Teams
        </Text>
      </motion.div>
    </Flex>
  );
}

export default Logo;
