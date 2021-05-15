import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Box, Flex, Text } from "rebass";
import { useUser } from "../../Provider/UserProvider";

import Container from "../library/Container";
import Sidebar from "../library/Sidebar";
import Username from "../library/Username";
import moment from "moment";

const TaskDescription = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState({});
  const [Description, setDescription] = useState({});
  const [AssignedOnDateTime, setAssignedOnDateTime] = useState();

  const { userDetails } = useUser();
  const history = useHistory();

  const { id } = useParams();

  console.log(id);

  const fetchProfileData = async () => {
    setIsLoading(true);

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
    }
  };
  const getTaskDescription = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_URL}/task/get/${id}`,
        {
          headers: { Authorization: `Bearer ${userDetails.userState.token}` },
        }
      );
      console.log(res.data);
      if (res.data.status) {
        setDescription(res.data.task);
      } else {
        setError(res.data.message);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const getDate = (assignDate) => {
    let date;
    date = moment(assignDate).format("MMMM D, YYYY");
    return date;
  };
  useEffect(() => {
    fetchProfileData();
    getTaskDescription();
  }, [userDetails]);

  return (
    <Container>
      <Box>
        <Flex mt="2.3rem" justifyContent="flex-end">
          <Username username={userData.name} />
        </Flex>
        <Box mt="2.5rem">
          <Text mb="2rem" as="p" fontSize="heading">
            Task Description
          </Text>
        </Box>
        <Box
          bg="cardbg"
          sx={{
            borderRadius: "0.5rem",
          }}
          py="0.5rem"
          px="2rem"
        >
          <Flex justifyContent="space-between">
            <Box>
              <Text mb="2rem" as="p" fontSize="subheading">
                Assigned Date -
              </Text>
              <Text mb="2rem" as="p" fontSize="text">
                {getDate(Description.assignedDate)}
              </Text>
            </Box>
          </Flex>
          <Flex justifyContent="space-between">
            <Box>
              <Text mb="2rem" as="p" fontSize="subheading">
                Assigned By -
              </Text>
              <Text mb="2rem" as="p" fontSize="text">
                {Description.assignedBy?.name}
              </Text>
            </Box>
            <Box>
              <Text mb="2rem" as="p" fontSize="subheading">
                Todays Date -
              </Text>
              <Text mb="2rem" as="p" fontSize="text">
                {getDate(Description.inProgressDate)}
              </Text>
            </Box>
          </Flex>
          <Flex alignItems="center" justifyContent="space-between">
            <Box>
              <Text mb="2rem" as="p" fontSize="subheading">
                Task Name -
              </Text>
              <Text mb="2rem" as="p" fontSize="text">
                {Description.name}
              </Text>
            </Box>
            <Box>
              <Text textAlign="center" mb="2rem" as="p" fontSize="subheading">
                Status -
              </Text>
              <Text
                px="2rem"
                sx={{
                  borderRadius: "0.25rem",
                  boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                }}
                py="0.5rem"
                bg="green"
                as="p"
                fontSize="text"
              >
                {Description.status}
              </Text>
            </Box>
          </Flex>
          <Box>
            <Text mb="2rem" as="p" fontSize="subheading">
              Description -
            </Text>
            <Text mb="2rem" as="p" fontSize="text">
              {Description.description}
            </Text>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default TaskDescription;
