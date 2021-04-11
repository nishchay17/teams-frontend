import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, Flex, Text } from "rebass";

import FormInput from "../Form/FormInput";
import Avatar from "../library/Avatar";
import Container from "../library/Container";
import Username from "../library/Username";
import { useUser } from "../../Provider/UserProvider";

const ChangePasswordLayout = ({ props }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const userContext = useUser();

  console.log(userContext.userDetails);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const headers = {
    Authorization: `Bearer ${userContext.userDetails.userState.token}`,
  };

  const onSubmit = async (data) => {
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
      { headers }
    );
    console.log(res.data);
    setIsLoading(false);
  };
  return (
    <Container {...props}>
      <Box ml="20rem">
        <Flex mt="2.3rem" justifyContent="flex-end">
          <Username />
        </Flex>
        <Flex alignItems="flex-end" justifyContent="space-between">
          <Avatar />
        </Flex>
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
            {}
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
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ChangePasswordLayout;
