import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Box, Flex, Text } from "rebass";
import { useUser } from "../../Provider/UserProvider";

import Container from "../library/Container";
import moment from "moment";

const TaskDescription = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [description, setDescription] = useState({});

  const { userDetails } = useUser();

  const { id } = useParams();

  console.log(id);

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
    getTaskDescription();
  }, [userDetails]);

  return (
    <Container>
      <Box>
        <Flex mt="2.3rem" justifyContent="flex-end"></Flex>
        <Box mt="2.5rem">
          <Text mb="2rem" as="p" fontSize="heading">
            Task Description
          </Text>
        </Box>

        <Flex>
          <Box
            bg="cardbg"
            px="2rem"
            py="1rem"
            sx={{
              borderRadius: "7px",
              minHeight: "12.5rem",
              minWidth: "50rem",
            }}
          >
            {console.log(description)}
            <Text as="p" mb="0.3rem" fontSize="subheading">
              {description.name}
            </Text>
            <Text as="p" fontSize="text" opacity="0.9">
              {description.description}
            </Text>
          </Box>
          <Box mt="0.2rem" ml="3rem">
            <Box mb="0.8rem">
              <Text as="p" fontSize="text" opacity="0.9">
                Task assigned by
              </Text>
              <Text as="p" fontSize="1.3rem">
                @{description.assignedBy?.name}
              </Text>
            </Box>
            <Box mb="0.8rem">
              <Text as="p" fontSize="text" opacity="0.9">
                Task assigned on
              </Text>
              <Text as="p" fontSize="1.3rem">
                {getDate(description.assignedDate)}
              </Text>
            </Box>
            <Box>
              <Text as="p" fontSize="text" opacity="0.9">
                Task status
              </Text>
              <Text as="p" fontSize="1.3rem">
                {description.status === 0 && "Assigned"}
                {description.status === 1 && "In Progress"}
                {description.status === 2 && "Completed"}
              </Text>
            </Box>
          </Box>
        </Flex>
      </Box>
    </Container>
  );
};

export default TaskDescription;
