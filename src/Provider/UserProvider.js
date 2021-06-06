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
      case "USER_LOGOUT":
        return {
          ...state,
          userState: {},
        };
      default:
        return {
          ...state,
        };
    }
  };

  const [userDetails, dispatch] = useReducer(reducer, initialState);

  const loadFromStorage = () => {
    const userStateString = localStorage.getItem("user_state");
    if (userStateString) {
      dispatch({
        type: "USER_LOGIN",
        user: { ...JSON.parse(userStateString).userState },
      });
    } else {
      dispatch({
        type: "IS_LOGGED_IN",
      });
    }
  };

  const syncWithStorage = () => {
    localStorage.setItem("user_state", JSON.stringify(userDetails));
  };

  useEffect(() => {
    loadFromStorage();
  }, []);

  useEffect(() => {
    syncWithStorage();
  }, [userDetails, syncWithStorage]);

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
