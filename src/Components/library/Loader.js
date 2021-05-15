import React from "react";
import Lottie from "react-lottie";
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
  return <Lottie options={defaultOptions} height={"20rem"} width={"20rem"} />;
}

export default Loader;
