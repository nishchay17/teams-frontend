import React from "react";
import Lottie from "react-lottie";
import { Flex } from "rebass";
import loaderData from "../../Assets/loader.json";

function Loader() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loaderData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <Flex
      width="100%"
      height="100%"
      justifyContent="center"
      alignItems="center"
    >
      <Lottie options={defaultOptions} height={"10rem"} width={"10rem"} />;
    </Flex>
  );
}

export default Loader;
