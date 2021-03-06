import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// components
import NavigationPrivate from '../components/navigations/NavigationPrivate';
// styles

// pages
import HomePrivate from '../pages/HomePrivate';
import CreatePost from '../pages/CreatePost';
import CreateCommunity from '../pages/CreateCommunity';
import Communities from '../pages/Communities';
import Community from '../pages/Community';
import User from '../pages/User';
import RedirectAuth from './RedirectAuth';

const RoutesPublic = () => (
  <Router>
    <NavigationPrivate />
    <Switch>
      <Route exact path="/">
        <HomePrivate />
      </Route>
      <Route exact path="/create-post">
        <CreatePost />
      </Route>
      <Route exact path="/create-community">
        <CreateCommunity />
      </Route>
      <Route exact path="/communities">
        <Communities />
      </Route>
      <Route exact path="/subreddit/:subreddit">
        <Community />
      </Route>
      <Route exact path="/user/:username">
        <User />
      </Route>
      <Route exact path="/user/:username/create-post">
        <CreatePost />
      </Route>
      <Route path="*">
        <RedirectAuth />
      </Route>
    </Switch>
  </Router>
);
export default RoutesPublic;
