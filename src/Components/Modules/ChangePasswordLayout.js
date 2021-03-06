import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, Flex, Text } from "rebass";
import { useHistory } from "react-router";

import FormInput from "../Form/FormInput";
import Container from "../library/Container";
import { useUser } from "../../Provider/UserProvider";

const ChangePasswordLayout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [responseMessage, setResponseMessage] = useState({
    success: "",
    err: "",
  });

  const history = useHistory();
  const { userDetails } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    setIsLoading(true);
    setError("");

    if (data.password !== data.newPasswordAgain) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    const res = await axios.put(
      `${process.env.REACT_APP_URL}/user/update-password`,
      {
        ...data,
      },
      { headers: { Authorization: `Bearer ${userDetails.userState.token}` } }
    );
    console.log(res.data);
    if (res.data.status) {
      setResponseMessage({
        success: res.data.message,
      });
      setTimeout(() => {
        history.push("/");
      }, 3000);
    } else {
      setResponseMessage({
        err: res.data.message,
      });
    }
    setIsLoading(false);
  };
  return (
    <Container>
      <Box>
        <Box mt="2.5rem">
          <Text mb="2rem" as="p" fontSize="heading">
            Change Password
          </Text>
          <Box as="form" onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              label="Old Password"
              type="password"
              register={register}
              name="oldPassword"
              errors={errors}
              required
            />
            {responseMessage.err && (
              <Text mb="2rem" as="p" color="error" fontSize="error">
                {responseMessage.err}
              </Text>
            )}
            <FormInput
              label="New Password"
              register={register}
              type="password"
              name="password"
              errors={errors}
              required
            />
            <FormInput
              label="Password Again"
              type="password"
              register={register}
              name="newPasswordAgain"
              errors={errors}
              customError={error}
            />
            {/* {error && (
              <Text color="error" fontSize="error">
                {error}
              </Text>
            )} */}
            <Button disabled={isLoading} mb="2rem">
              Change Password
            </Button>

            {responseMessage.success && (
              <Text mb="2rem" color="green" as="p" fontSize="text">
                {responseMessage.success}
              </Text>
            )}
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ChangePasswordLayout;
