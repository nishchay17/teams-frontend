import React, { useState, useCallback } from "react";
import { Button, Flex, Text } from "rebass";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import axios from "axios";

import Container from "../../library/Container";
import FormInput from "../../Form/FormInput";
import { useUser } from "../../../Provider/UserProvider";
import AllBasketItems from "./AllBasketItems";

function BucketLayout() {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const onDrop = useCallback(
    (acceptedFiles) => {
      setError("");
      setFile(acceptedFiles[0]);
    },
    [setFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  const { userDetails } = useUser();
  console.log(userDetails);
  const addBasketItem = async (data) => {
    setError("");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", data.name);
    formData.append("description", data.description);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_URL}/bucket/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${userDetails.userState.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res.data);
      if (res.data.status) {
        setFile(null);
        reset();
      } else {
        setError(res.data.message);
      }
    } catch (error) {
      setFile(null);
      reset();
      console.log(error);
    }
  };

  return (
    <Container mt="2rem">
      <Text fontSize="heading">Basket</Text>
      <Text fontSize="text">
        A place for the team to share files, links, articles.
      </Text>
      <Flex
        my="1rem"
        justifyContent="center"
        alignItems="center"
        width="100%"
        minHeight="10rem"
        sx={{
          border: "1px solid black",
          borderRadius: "8px",
          cursor: "pointer",
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : file ? (
          <> {file?.name} is selected </>
        ) : (
          <div>
            <p>
              To add something in basket <br /> Drag n drop some files here, or
              click to select files.
            </p>
          </div>
        )}
      </Flex>
      {file && (
        <Flex
          as="form"
          alignItems="center"
          onSubmit={handleSubmit(addBasketItem)}
        >
          <FormInput
            label="Name"
            register={register}
            name="Name"
            errors={errors}
            required
          />
          <FormInput
            ml={{ xs: 0, sm: "1.5rem" }}
            label="Description"
            register={register}
            name="description"
            errors={errors}
            required
          />
          <Button
            mt="0.7rem"
            ml={{ xs: 0, sm: "1.5rem" }}
            height="fit-content"
            type="submit"
          >
            Add to basket{" "}
          </Button>
          <Button
            mt="0.7rem"
            ml={{ xs: 0, sm: "1.5rem" }}
            height="fit-content"
            type="button"
            bg="error"
            onClick={() => {
              reset();
              setFile(null);
            }}
          >
            Cancel
          </Button>
        </Flex>
      )}
      {error && <Text color="error">Error: {error}</Text>}
      <AllBasketItems />
    </Container>
  );
}

export default BucketLayout;
