import React, { useEffect } from "react";
import { ThemeProvider } from "theme-ui";
import {
  Switch,
  Route,
  useLocation,
  useHistory,
  Redirect,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { theme } from "./lib/theme";
import UserProvider, { useUser } from "./Provider/UserProvider";
import LoginLayout from "./Components/Auth/Login/LoginLayout";
import SignupLayout from "./Components/Auth/Signup/SignupLayout";
import Profile from "./Components/Modules/Profile";
import Tasks from "./Components/Modules/Tasks";
import ChangePasswordLayout from "./Components/Modules/ChangePasswordLayout";

function IsLoggedIn() {
  const { userDetails } = useUser();
  if (userDetails.userState.token) return true;
  else return false;
}

function App() {
  const location = useLocation();
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <AnimatePresence exitBeforeEnter>
          <Switch location={location} key={location.pathname}>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/login" exact>
              <LoginLayout />
            </Route>
            <Route path="/signup" exact>
              <SignupLayout />
            </Route>
            <Route path="/profile" exact>
              {IsLoggedIn ? <Profile /> : <Redirect to={"/login"} />}
            </Route>
            <Route path="/tasks" exact>
              {IsLoggedIn ? <Tasks /> : <Redirect to={"/login"} />}
            </Route>
            <Route path="/change-password" exact>
              <ChangePasswordLayout />
            </Route>
          </Switch>
        </AnimatePresence>
      </UserProvider>
    </ThemeProvider>
  );
}

function Home() {
  const history = useHistory();
  useEffect(() => history.push("/login"), []);
  return <></>;
}

export default App;
