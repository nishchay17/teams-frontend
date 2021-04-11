import React from "react";
import { ThemeProvider } from "theme-ui";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { theme } from "./lib/theme";
import UserProvider from "./Provider/UserProvider";
import LoginLayout from "./Components/Auth/Login/LoginLayout";
import SignupLayout from "./Components/Auth/Signup/SignupLayout";
import ProfileLayout from "./Components/Profile/ProfileLayout";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <Router>
          <Switch>
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
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
}

function Home() {
  return <Link to="/login">login</Link>;
}

export default App;
