import React, { useState } from "react";
import { Box, Button, Flex, Link, Text } from "rebass";
import { useForm } from "react-hook-form";
import axios from "axios";

import { useUser } from "../../../Provider/UserProvider";
import Logo from "../../library/Logo";
import FormInput from "../../Form/FormInput";
import AuthWrapper from "../AuthWrapper";
import URL from "../../../URL";

function LoginLayout() {
  const userContext = useUser();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    const res = await axios.post(`${URL}/user/login`, {
      ...data,
    });
    setIsLoading(false);

    userContext.dispatch({
      type: "USER_LOGIN",
      user: res.data,
    });
  };

  return (
    <AuthWrapper>
      <Flex
        height="100vh"
        justifyContent="center"
        flexDirection="column"
        width="55%"
      >
        <Logo mb="5rem" />
        <Text as="h1" fontWeight="500">
          Login
        </Text>
        <Text as="p" mt="0.5rem">
          New user sign-up{" "}
          <Link color="link" sx={{ cursor: "pointer" }}>
            here
          </Link>
        </Text>
        <Box as="form" onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            label="Email"
            register={register}
            name="email"
            errors={errors}
            required
          />
          <FormInput
            label="Password"
            register={register}
            name="password"
            errors={errors}
            type="password"
            required
          />
          <Button mt="0.5rem" disabled={isLoading}>
            Login
          </Button>
        </Box>
        <Text mt="2rem">
          Forgot password?{" "}
          <Link color="link" sx={{ cursor: "pointer" }}>
            reset password
          </Link>
        </Text>
      </Flex>
    </AuthWrapper>
  );
}

export default LoginLayout;
