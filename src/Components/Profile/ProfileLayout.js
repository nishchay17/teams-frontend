import React from "react";
import { Box, Button, Flex, Text } from "rebass";
import Avatar from "../library/Avatar";

import Username from "../library/Username";

const ProfileLayout = () => {
  return (
    <Flex>
      <Box width="396px" bg="sidebarbg" height="100vh"></Box>
      <Box>
        <Username ml="57rem" mt="37px" />
        <Flex alignItems="flex-end">
          <Avatar ml="5rem" />
          <Box ml="15rem">
            <Button mr="1rem">Edit Password</Button>
            <Button disabled>Something</Button>
          </Box>
        </Flex>
        <Box mt="4rem" ml="6rem">
          <Text as="p" fontSize="large">
            Personal information
          </Text>
          <Text mt="1rem" as="p" fontSize="title">
            Name
          </Text>
          <Text mt="0.5rem" as="p" fontSize="big">
            Username
          </Text>
          <Text mt="1rem" as="p" fontSize="title">
            Team Name
          </Text>
          <Text mt="0.5rem" as="p" fontSize="big">
            Frontend
          </Text>
          <Text mt="1rem" as="p" fontSize="title">
            Email
          </Text>
          <Text mt="0.5rem" as="p" fontSize="big">
            username@email.com
          </Text>
          <Text mt="1rem" as="p" fontSize="title">
            Emp id
          </Text>
          <Text mt="0.5rem" as="p" fontSize="big">
            #oih3-23
          </Text>
        </Box>
      </Box>
    </Flex>
  );
};

export default ProfileLayout;
