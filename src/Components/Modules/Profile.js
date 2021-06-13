import React, { useState, useEffect } from "react";
import { Box, Button, Flex, Text } from "rebass";
import axios from "axios";

import Avatar from "../library/Avatar";
import Container from "../library/Container";
import { useHistory } from "react-router";

import { useUser } from "../../Provider/UserProvider";
import Loader from "../library/Loader";

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();
  const { userDetails } = useUser();

  useEffect(() => fetchProfileData(), [userDetails]);
  const fetchProfileData = async () => {
    setIsLoading(true);
    if (!userDetails.userState.token) history.push("/");
    try {
      const res = await axios.get(`${process.env.REACT_APP_URL}/user/me`, {
        headers: { Authorization: `Bearer ${userDetails.userState.token}` },
      });
      console.log(res.data);
      if (res.data.status) {
        setUserData(res.data.user);
      } else {
        setError(res.data.message);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError("Something went wrong");
    }
  };

  return (
    <Container>
      <Box>
        {isLoading ? (
          <Flex width="100%" height="85vh">
            <Loader />
          </Flex>
        ) : (
          <>
            <Flex mt="2.3rem" justifyContent="flex-end"></Flex>
            <Flex alignItems="flex-end" justifyContent="space-between">
              <Text as="p" fontSize="2rem">
                Hello {userData.name}
              </Text>
              <Box>
                <Button as="a" href="/change-password">
                  Edit Password
                </Button>
              </Box>
            </Flex>
            <Box mt="4rem">
              <Text mb="2rem" as="p" fontSize="heading">
                Information
              </Text>
              <Flex>
                <Box>
                  <Text as="p" fontSize="text">
                    Name
                  </Text>
                  <Text mt="0.1rem" as="p" fontSize="subheading">
                    {userData.name}
                  </Text>

                  <Text mt="1.2rem" as="p" fontSize="text">
                    Email
                  </Text>
                  <Text mt="0.1rem" as="p" fontSize="subheading">
                    {userData.email}
                  </Text>
                  <Text mt="1.2rem" as="p" fontSize="text ">
                    Employee ID
                  </Text>
                  <Text mt="0.1rem" as="p" fontSize="subheading">
                    {userData.employeeId}
                  </Text>
                </Box>
                <Box ml="4rem">
                  <Text as="p" fontSize="text ">
                    Task assigned
                  </Text>
                  <Text mt="0.1rem" as="p" fontSize="subheading">
                    {userData.taskAssigned?.length}
                  </Text>
                  <Text mt="1.2rem" as="p" fontSize="text ">
                    Task completed
                  </Text>
                  <Text mt="0.1rem" as="p" fontSize="subheading">
                    {userData.taskCompleted?.length}
                  </Text>
                  <Text mt="1.2rem" as="p" fontSize="text ">
                    Task progress
                  </Text>
                  <Text mt="0.1rem" as="p" fontSize="subheading">
                    {userData.taskInProgress?.length}
                  </Text>
                </Box>
              </Flex>
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
};

Profile.defaultProps = {
  username: "Sachin",
  teamName: "Front End",
  email: "sachinpasi2000@gmail.com",
  empId: "#oih3-23",
};

export default Profile;
