import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// components
import NavigationPublic from "../components/navigations/NavigationPublic";
// styles

// pages
import HomePublic from "../pages/HomePublic";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import NoMatch from "./NoMatch";
import Communities from '../pages/Communities';

const RoutesPublic = () => (
  <Router>
    <NavigationPublic />
    <Switch>
      <Route exact path="/">
        <HomePublic />
      </Route>
      <Route exact path="/signin">
        <Signin />
      </Route>
      <Route exact path="/signup">
        <Signup />
      </Route>
      <Route exact path="/communities">
        <NavigationPublic />
        <Communities />
      </Route>
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  </Router>
);
export default RoutesPublic;
