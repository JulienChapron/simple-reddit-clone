import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// components
import NavigationPrivate from '../components/NavigationPrivate';
// styles

// pages
import HomePrivate from '../pages/HomePrivate';
import CreatePost from '../pages/CreatePost';
import CreateSubreddit from '../pages/CreateSubreddit';
import Subreddits from '../pages/Subreddits';
import PostView from '../components/PostView';
import Subreddit from '../pages/Subreddit';
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
      <Route exact path="/:type/:name/comments/:id/:title">
        <PostView />
      </Route>
      <Route exact path="/create-subreddit">
        <CreateSubreddit />
      </Route>
      <Route exact path="/subreddits">
        <Subreddits />
      </Route>
      <Route exact path="/subreddit/:subreddit">
        <Subreddit />
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
