import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Text, Box, Flex, Image, Button } from "rebass";

import { useUser } from "../../../Provider/UserProvider";

function AllBasketItems({ refetch }) {
  const { userDetails } = useUser();
  const [allItems, setAllItems] = useState([]);
  const history = useHistory();

  useEffect(async () => {
    const res = await axios.get(`${process.env.REACT_APP_URL}/bucket/get-all`, {
      headers: {
        Authorization: `Bearer ${userDetails.userState.token}`,
      },
    });
    console.log(res.data);
    setAllItems(res.data.bucketItems);
  }, [userDetails, refetch]);

  return (
    <Box my="1rem">
      <Text fontSize="subheading" mb="1rem">
        All Basket Items
      </Text>
      <Flex flexWrap="wrap" width="100%">
        {allItems.length > 0 &&
          allItems.map((item) => (
            <Box
              width={{ xs: "100%", sm: "calc(100% / 3 - 1rem)" }}
              padding="1rem"
              margin="0.5rem"
              sx={{
                border: "1px solid",
                borderColor: "sidebarbg",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              <Box width="100%" height="10rem" sx={{ borderRadius: "9px" }}>
                {item.file.match(/\.(jpeg|jpg|gif|png)$/) !== null ? (
                  <Image
                    width="100%"
                    height="100%"
                    src={item.file}
                    sx={{ objectFit: "contain", objectPosition: "left" }}
                  />
                ) : (
                  <Flex
                    justifyContent="center"
                    alignItems="center"
                    width="100%"
                    height="100%"
                    bg="primary"
                    opacity="0.3"
                    sx={{ borderRadius: "5px" }}
                  >
                    No preview
                  </Flex>
                )}
              </Box>
              <Flex justifyContent="space-between" alignItems="flex-end">
                <Box>
                  <Box mt="1rem" fontSize="1.1rem">
                    {item.name}
                  </Box>
                  <Box fontSize="0.9rem" opacity="0.9">
                    {item.description}
                  </Box>
                </Box>
                <Button
                  as="a"
                  fontSize="0.9rem"
                  rel="noopener noreferrer"
                  target="_blank"
                  href={item.file}
                >
                  Download
                </Button>
              </Flex>
              <Box mt="0.3rem">Uploaded by @{item.uploadedBy.name}</Box>
            </Box>
          ))}
      </Flex>
    </Box>
  );
}

export default AllBasketItems;
