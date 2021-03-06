import React, { useState, useContext, useEffect } from 'react';
import {
  Container,
  DropdownButton,
  Dropdown,
  Tabs,
  Tab,
  Button,
} from 'react-bootstrap';
import { getPublic } from '../utils/RequestPublic';
import { environmentContext } from '../contexts/Environment';
import Post from '../components/Post';
import ImageVideo from '../components/ImageVideo';
import LinkComponent from '../components/Link';
import { Link } from 'react-router-dom';
import { authContext } from './../contexts/Auth';
import { themeContext } from '../contexts/Theme';
import arrowLeftIcon from '../assets/icons/arrow-left.png';

const CreatePost = () => {
  const [key, setKey] = useState('post');
  const { environment, setEnvironmentContext } = useContext(environmentContext);
  const { auth } = useContext(authContext);
  const { theme } = useContext(themeContext);
  const [subreddits, setSubreddits] = useState([]);
  const changeEnv = (value) => {
    setEnvironmentContext(value);
  };
  const getSubreddit = async () => {
    try {
      const response = await getPublic('subreddits');
      setSubreddits(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSubreddit();
  }, []);
  return (
    <Container>
      <div style={{ display: 'flex' }}>
        <Button
          style={{
            padding: '0px',
            margin: '0px',
            marginTop: '10px',
            marginRight: '10px',
          }}
          variant="link"
          as={Link}
          to={environment}
        >
          <img
            style={{
              cursor: 'pointer',
              height: '28px',
              width: '28px',
            }}
            src={arrowLeftIcon}
            className="icon"
            alt="icon-arrow-left"
          />
        </Button>
        <h4 className="mt-2">Create a post</h4>
      </div>
      <DropdownButton
        className="mt-2"
        variant={theme === 'dark' ? 'outline-secondary' : 'light'}
        id="dropdown-basic-button"
        title={
          environment !== 'Home' && environment !== ''
            ? environment
            : 'Choose a subreddit'
        }
      >
        <Dropdown.Header>Profile</Dropdown.Header>
        <Dropdown.Item
          onClick={() => changeEnv(`user/${auth.data.data.username}`)}
        >
          user/{auth.data.data.username}
        </Dropdown.Item>
        <Dropdown.Header>Your communauty</Dropdown.Header>

        {subreddits.length
          ? subreddits.map((subreddit, index) => {
              return (
                <Dropdown.Item
                  key={index}
                  onClick={() => changeEnv(`subreddit/${subreddit.title}`)}
                >
                  {subreddit.title}
                </Dropdown.Item>
              );
            })
          : null}
      </DropdownButton>
      <div className="card-reddit">
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
        >
          <Tab eventKey="post" title="Post">
            <Post />
          </Tab>
          <Tab eventKey="imageVideo" title="Image & Video">
            <ImageVideo />
          </Tab>
          <Tab eventKey="linkLink" title="Link">
            <LinkComponent />
          </Tab>
        </Tabs>
      </div>
    </Container>
  );
};
export default CreatePost;
