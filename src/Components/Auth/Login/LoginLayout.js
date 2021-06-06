import React, { useState } from "react";
import { Box, Button, Flex, Link, Text } from "rebass";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { useUser } from "../../../Provider/UserProvider";
import Logo from "../../library/Logo";
import FormInput from "../../Form/FormInput";
import AuthWrapper from "../AuthWrapper";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: -100 },
  show: { opacity: 1, y: 0 },
};

function LoginLayout() {
  const userContext = useUser();

  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    if (data.password.length < 6) {
      setError("Password lenght should be more than 5");
      return;
    }
    setError("");
    setIsLoading(true);
    const res = await axios.post(`${process.env.REACT_APP_URL}/user/login`, {
      ...data,
    });
    setIsLoading(false);
    if (res.data.status) {
      userContext.dispatch({
        type: "USER_LOGIN",
        user: res.data,
      });
      console.log(res.data);
      history.push("/tasks");
    } else {
      setError("Wrong Credentials");
    }
  };

  return (
    <AuthWrapper>
      <Flex
        height="100vh"
        justifyContent="center"
        flexDirection="column"
        width={{ xs: "100%", sm: "55%" }}
      >
        <Logo mb={{ xs: "3rem", sm: "5rem" }} />
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={item}>
            <Text as="h1" fontSize="heading" fontWeight="500">
              Login
            </Text>
          </motion.div>
          <motion.div variants={item}>
            <Text as="p" fontSize="text" my="0.3rem">
              New user sign-up{" "}
              <Link
                color="link"
                sx={{ cursor: "pointer" }}
                onClick={() => history.push("/signup")}
              >
                here
              </Link>
            </Text>
          </motion.div>
          <motion.div variants={item}>
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
              <Text width="100%" mb="1.5rem" color="error">
                {error && error}
              </Text>
              <Button disabled={isLoading}>Login</Button>
            </Box>
          </motion.div>
          {/* <motion.div variants={item}>
            <Text mt="2rem">
              Forgot password?{" "}
              <Link color="link" sx={{ cursor: "pointer" }}>
                reset password
              </Link>
            </Text>
          </motion.div> */}
        </motion.div>
      </Flex>
    </AuthWrapper>
  );
}

export default LoginLayout;
