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

const SignupLayout = () => {
  const userContext = useUser();

  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);
  const [isJoiningIdChecked, setIsJoiningIdChecked] = useState(false);
  const [joiningError, setJoiningError] = useState("");
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await axios.post(`${process.env.REACT_APP_URL}/user/signup`, {
        ...data,
      });
      setIsLoading(false);
      console.log(res.data);
      if (res.data.status) {
        userContext.dispatch({
          type: "USER_LOGIN",
          user: res.data,
        });
        history.push("/tasks");
      } else {
        setError(res.data.message);
      }
    } catch (error) {
      setError("Something went wrong");
    }
  };

  const checkJoiningId = async (data) => {
    console.log(data);
    setIsLoading(true);
    const res = await axios.post(`${process.env.REACT_APP_URL}/user/check-id`, {
      ...data,
    });
    if (res.data.status) {
      setIsJoiningIdChecked(true);
    } else {
      setJoiningError(res.data.message);
    }
    setIsLoading(false);
  };

  return (
    <AuthWrapper>
      <Flex
        height={{ xs: "auto", sm: "100vh" }}
        justifyContent="center"
        flexDirection="column"
        my={{ xs: "3rem", sm: 0 }}
        width={{ xs: "100%", sm: "55%" }}
      >
        <Logo mb={{ xs: "3rem", sm: "5rem" }} />
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={item}>
            <Text as="h1" fontSize="heading" fontWeight="500">
              Signup
            </Text>
          </motion.div>
          <motion.div variants={item}>
            <Text as="p" fontSize="text" my="0.3rem">
              Already a user? Log in{" "}
              <Link
                color="link"
                sx={{ cursor: "pointer" }}
                onClick={() => history.push("/login")}
              >
                here
              </Link>
            </Text>
          </motion.div>
          <motion.div variants={item}>
            {isJoiningIdChecked ? (
              <Box as="form" mt="2rem" onSubmit={handleSubmit(onSubmit)}>
                <Flex flexDirection={{ xs: "column", sm: "row" }}>
                  <FormInput
                    label="Name"
                    register={register}
                    name="name"
                    errors={errors}
                    required
                  />
                  <FormInput
                    ml={{ xs: 0, sm: "1.5rem" }}
                    label="Password"
                    register={register}
                    name="password"
                    type="password"
                    errors={errors}
                    required
                  />
                </Flex>
                <Flex flexDirection={{ xs: "column", sm: "row" }}>
                  <FormInput
                    label="Email"
                    register={register}
                    name="email"
                    errors={errors}
                    required
                  />
                  <FormInput
                    ml={{ xs: 0, sm: "1.5rem" }}
                    label="Re-enter Password"
                    register={register}
                    type="password"
                    name="repassword"
                    errors={errors}
                    required
                  />
                </Flex>
                <Flex flexDirection={{ xs: "column", sm: "row" }}>
                  <FormInput
                    label="Mobile number"
                    register={register}
                    name="number"
                    errors={errors}
                    required
                  />
                  <FormInput
                    ml={{ xs: 0, sm: "1.5rem" }}
                    label="Joining Id"
                    register={register}
                    name="joiningId"
                    errors={errors}
                    required
                  />
                </Flex>
                {error && (
                  <Text mb="2rem" color="error">
                    {error}
                  </Text>
                )}
                <Button disabled={isLoading} type="submit">
                  Sign up
                </Button>
              </Box>
            ) : (
              <Box as="form" mt="2rem" onSubmit={handleSubmit(checkJoiningId)}>
                <FormInput
                  label="Joining Id"
                  register={register}
                  name="joiningId"
                  errors={errors}
                  required
                />
                {joiningError && (
                  <Text mb="2rem" color="error">
                    {joiningError}
                  </Text>
                )}
                <Button disabled={isLoading} type="submit">
                  Sign up
                </Button>
              </Box>
            )}
          </motion.div>
        </motion.div>
      </Flex>
    </AuthWrapper>
  );
};

export default SignupLayout;
