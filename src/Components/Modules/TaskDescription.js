import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Box, Flex, Text } from "rebass";
import { useUser } from "../../Provider/UserProvider";

import Container from "../library/Container";
import Sidebar from "../library/Sidebar";
import Username from "../library/Username";

const TaskDescription = ({ props }) => {
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
    // if (!userDetails.userState.token) history.push("/");
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

  const ConvertDateTime = () => {
    var date = new Date(Description.assignedDate);

    setAssignedOnDateTime(
      date.getDate() +
        "/" +
        (date.getMonth() + 1) +
        "/" +
        date.getFullYear() +
        " " +
        date.getHours() +
        ":" +
        date.getMinutes() +
        ":" +
        date.getSeconds()
    );
  };
  useEffect(() => {
    fetchProfileData();
    getTaskDescription();
  }, [userDetails]);

  useEffect(() => {
    ConvertDateTime();
  }, [Description]);
  return (
    <Container {...props}>
      <Sidebar />
      <Box ml="20rem">
        <Flex mt="2.3rem" justifyContent="flex-end">
          <Username username={userData.name} />
        </Flex>
        <Box mt="2.5rem">
          <Text mb="2rem" as="p" fontSize="heading">
            Task Description
          </Text>
        </Box>
        <Box>
          <Text mb="2rem" as="p" fontSize="subheading">
            Assigned Date -
          </Text>
          <Text mb="2rem" as="p" fontSize="text">
            {AssignedOnDateTime}
          </Text>
        </Box>
      </Box>
    </Container>
  );
};

export default TaskDescription;
