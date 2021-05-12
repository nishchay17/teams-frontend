import React from "react";
import { Box, Flex, Text } from "rebass";
import { GoTasklist } from "react-icons/go";
import { RiShoppingBasketLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { AiOutlineLogout } from "react-icons/ai";
import Logo from "./Logo";
import { useHistory } from "react-router-dom";

function Sidebar() {
  const history = useHistory();

  function NavItem({ Icon, name, to, ...props }) {
    return (
      <Flex
        as="a"
        alignItems="center"
        mb="1.5rem"
        sx={{ cursor: "pointer" }}
        onClick={() => history.push(to)}
        {...props}
      >
        <Box
          as={Icon}
          color={to === history.location.pathname ? "primary" : "white"}
          size="1.5rem"
          mr="1rem"
        />
        <Text color={to === history.location.pathname ? "primary" : "white"}>
          {name}
        </Text>
      </Flex>
    );
  }

  return (
    <Box
      sx={{
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
      }}
      width="20rem"
      bg="sidebarbg"
      px="4rem"
      py="2rem"
    >
      <Logo color="white" />
      <Flex flexDirection="column" height="100%" py="5rem">
        <NavItem Icon={RiShoppingBasketLine} name="Basket" to="/basket" />
        <NavItem Icon={CgProfile} name="Profile" to="/profile" />
        <NavItem Icon={GoTasklist} name="Tasks" to="/tasks" />
        <NavItem Icon={AiOutlineLogout} name="Logout" to="/logout" mt="auto" />
      </Flex>
    </Box>
  );
}

export default Sidebar;
