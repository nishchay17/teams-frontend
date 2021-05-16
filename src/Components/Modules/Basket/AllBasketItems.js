import axios from "axios";
import React, { useEffect, useState } from "react";
import { Text, Box, Flex, Image } from "rebass";

import { useUser } from "../../../Provider/UserProvider";

function AllBasketItems() {
  const { userDetails } = useUser();
  const [allItems, setAllItems] = useState([]);
  useEffect(async () => {
    const res = await axios.get(`${process.env.REACT_APP_URL}/bucket/get-all`, {
      headers: {
        Authorization: `Bearer ${userDetails.userState.token}`,
      },
    });
    console.log(res.data);
    setAllItems(res.data.bucketItems);
  }, [userDetails]);
  console.log(allItems);
  return (
    <Box my="1rem">
      <Text fontSize="subheading" mb="1rem">
        All Basket Items
      </Text>
      <Flex flexWrap="wrap" width="100%">
        {allItems.length > 0 &&
          allItems.map((item) => (
            <Box width="calc(100% / 3)">
              <Image src={item.file} />
              <Box>
                {item.name} {item.description}
              </Box>
              <Box>@{item.uploadedBy.name}</Box>
            </Box>
          ))}
      </Flex>
    </Box>
  );
}

export default AllBasketItems;
