import React from "react";
import { Box, Flex, Text } from "rebass";
import { useHistory } from "react-router-dom";
import {
  VscCheck,
  VscFiles,
  VscAccount,
  VscKey,
  VscAdd,
  VscPerson,
} from "react-icons/vsc";

import Logo from "./Logo";
import { useUser } from "../../Provider/UserProvider";

function Sidebar({ children }) {
  const history = useHistory();

  const userContext = useUser();

  function NavItem({ Icon, name, to, ...props }) {
    return (
      <Flex
        as="a"
        alignItems="center"
        mb="0.5rem"
        p="0.5rem"
        sx={{
          borderRadius: "5px",
          cursor: "pointer",
          textDecoration: "none",
          ":hover": {
            background: "primary",
          },
        }}
        bg={to === history.location.pathname ? "primary" : ""}
        onClick={() => history.push(to)}
        {...props}
      >
        <Box
          as={Icon}
          color={to === history.location.pathname ? "black" : "white"}
          size="1.4rem"
          mr="1rem"
        />
        <Text
          fontWeight="400"
          color={to === history.location.pathname ? "black" : "white"}
        >
          {name}
        </Text>
      </Flex>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
        width="17%"
        bg="sidebarbg"
        px="3rem"
        py="2rem"
      >
        <Logo color="white" noAnimation />
        <Flex flexDirection="column" height="100%" py="5rem">
          <NavItem Icon={VscFiles} name="Bucket" to="/bucket" />
          <NavItem Icon={VscAccount} name="Profile" to="/profile" />
          <NavItem Icon={VscCheck} name="Tasks" to="/tasks" />
          {/* ADD ADMIN's routes here */}
          {userContext?.userDetails.userState.isAdmin && (
            <>
              <NavItem Icon={VscPerson} name="All users" to="/all-users" />
              <NavItem Icon={VscAdd} name="Create Tasks" to="/add-task" />
            </>
          )}
          <NavItem
            Icon={VscKey}
            name="Logout"
            onClick={() => {
              userContext?.dispatch({
                type: "USER_LOGOUT",
              });
              history.push("/");
            }}
            mt="auto"
          />
        </Flex>
      </Box>
      <Box ml="17%">{children}</Box>
    </Box>
  );
}

export default Sidebar;
