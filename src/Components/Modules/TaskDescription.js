import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Box, Flex, Text } from "rebass";
import { useUser } from "../../Provider/UserProvider";

import Container from "../library/Container";
import Username from "../library/Username";
import moment from "moment";

const TaskDescription = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState({});
  const [Description, setDescription] = useState({});

  const { userDetails } = useUser();

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

        <Flex>
          <Box
            bg="cardbg"
            px="3rem"
            py="1rem"
            sx={{
              borderRadius: "10px",
              minHeight: "12.5rem",
              minWidth: "50rem",
            }}
          >
            {console.log(Description)}
            <Text as="p" mb="0.5rem" fontSize="heading">
              {Description.name}
            </Text>
            <Text as="p" fontSize="text">
              {Description.description}
            </Text>
          </Box>
          <Box mt="0.2rem" ml="3rem">
            <Box mb="0.5rem">
              <Text as="p" fontSize="text">
                Task assigned by
              </Text>
              <Text as="p" fontSize="label">
                @{Description.assignedBy.name}
              </Text>
            </Box>
            <Box mb="0.5rem">
              <Text as="p" fontSize="text">
                Task assigned on
              </Text>
              <Text as="p" fontSize="label">
                {getDate(Description.assignedDate)}
              </Text>
            </Box>
            <Box>
              <Text as="p" fontSize="text">
                Task status
              </Text>
              <Text as="p" fontSize="label">
                {Description.status === 0 && "Assigned"}
                {Description.status === 1 && "In Progress"}
                {Description.status === 2 && "Completed"}
              </Text>
            </Box>
          </Box>
        </Flex>
      </Box>
    </Container>
  );
};

export default TaskDescription;
