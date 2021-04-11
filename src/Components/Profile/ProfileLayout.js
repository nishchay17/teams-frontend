import React from "react";
import { Box, Button, Flex, Text } from "rebass";
import Avatar from "../library/Avatar";
import Container from "../library/Container";

import Username from "../library/Username";

const ProfileLayout = ({ username, teamName, email, empId, props }) => {
  return (
    <Container {...props}>
      <Box ml="20rem">
        <Flex mt="2.3rem" justifyContent="flex-end">
          <Username />
        </Flex>
        <Flex alignItems="flex-end" justifyContent="space-between">
          <Avatar />
          <Box>
            <Button mr="1rem">Edit Password</Button>
            <Button disabled>Something</Button>
          </Box>
        </Flex>
        <Box mt="4rem">
          <Text mb="2rem" as="p" fontSize="heading">
            Personal information
          </Text>
          <Text as="p" fontSize="text">
            Name
          </Text>
          <Text mt="0.1rem" as="p" fontSize="subheading">
            {username}
          </Text>
          <Text mt="1.2rem" as="p" fontSize="text">
            Team Name
          </Text>
          <Text mt="0.1rem" as="p" fontSize="subheading">
            {teamName}
          </Text>
          <Text mt="1.2rem" as="p" fontSize="text">
            Email
          </Text>
          <Text mt="0.1rem" as="p" fontSize="subheading">
            {email}
          </Text>
          <Text mt="1.2rem" as="p" fontSize="text ">
            Emp id
          </Text>
          <Text mt="0.1rem" as="p" fontSize="subheading">
            {empId}
          </Text>
        </Box>
      </Box>
    </Container>
  );
};

ProfileLayout.defaultProps = {
  username: "Sachin",
  teamName: "Front End",
  email: "sachinpasi2000@gmail.com",
  empId: "#oih3-23",
};

export default ProfileLayout;
