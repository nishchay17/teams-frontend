import React, { useEffect, useReducer, createContext, useContext } from "react";

const user = createContext();

function UserProvider(props) {
  const initialState = {
    userState: {},
  };

  const reducer = (state, action) => {
    const { type } = action;

    switch (type) {
      case "USER_LOGIN":
        return {
          ...state,
          userState: action.user,
        };
      default:
        return {
          ...state,
        };
    }
  };

  const [userDetails, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.log(userDetails);
  }, [userDetails]);

  return (
    <user.Provider value={{ userDetails, dispatch }}>
      {props.children}
    </user.Provider>
  );
}

export default UserProvider;

export const useUser = () => {
  return useContext(user);
};
