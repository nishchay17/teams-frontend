import React from "react";
import { ThemeProvider } from "theme-ui";
import { Switch, Route, Link, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import { theme } from "./lib/theme";
import UserProvider from "./Provider/UserProvider";
import LoginLayout from "./Components/Auth/Login/LoginLayout";
import SignupLayout from "./Components/Auth/Signup/SignupLayout";
import ProfileLayout from "./Components/Profile/ProfileLayout";

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
              <ProfileLayout />
            </Route>
          </Switch>
        </AnimatePresence>
      </UserProvider>
    </ThemeProvider>
  );
}

function Home() {
  return <Link to="/login">login</Link>;
}

export default App;
