import React from "react";
import { Flex, Image, Text } from "rebass";
import { motion } from "framer-motion";

import logo from "../../Assets/svg/logo.svg";

function Logo({ noAnimation, ...props }) {
  return (
    <Flex alignItems="center" {...props}>
      <motion.div
        initial={!noAnimation && { scale: 1.3, rotate: 90 }}
        animate={!noAnimation && { scale: 1, rotate: 0 }}
        transition={!noAnimation && { delay: 0.5 }}
      >
        <Image src={logo} width="2rem" />
      </motion.div>
      <motion.div
        initial={!noAnimation && { x: -30, opacity: 0 }}
        animate={!noAnimation && { x: 0, opacity: 1 }}
        transition={!noAnimation && { delay: 0.5 }}
      >
        <Text fontSize="subheading" ml="1rem" mt="0.1rem" color={props.color}>
          Teams
        </Text>
      </motion.div>
    </Flex>
  );
}

export default Logo;
