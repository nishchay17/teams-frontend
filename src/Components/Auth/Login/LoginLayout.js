import React, { useState } from "react";
import { Box, Button, Flex, Link, Text } from "rebass";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { useUser } from "../../../Provider/UserProvider";
import Logo from "../../library/Logo";
import FormInput from "../../Form/FormInput";
import AuthWrapper from "../AuthWrapper";

function LoginLayout() {
  const userContext = useUser();

  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    history.push("/profile");
    setIsLoading(true);
    const res = await axios.post(`${process.env.REACT_APP_URL}/user/login`, {
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
        <Text as="h1" fontSize="heading" fontWeight="500">
          Login
        </Text>
        <Text as="p" fontSize="text" my="0.3rem">
          New user sign-up{" "}
          <Link color="link" sx={{ cursor: "pointer" }}>
            here
          </Link>
        </Text>
        <Box as="form" mt="2rem" onSubmit={handleSubmit(onSubmit)}>
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
          <Button disabled={isLoading}>Login</Button>
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
