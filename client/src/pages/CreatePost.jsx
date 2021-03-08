import React, { useState, useContext } from 'react';
import {
  Container,
  DropdownButton,
  Dropdown,
  Tabs,
  Tab,
} from 'react-bootstrap';
import { environmentContext } from '../contexts/Environment';
import Post from '../components/Post';
import ImageVideo from '../components/ImageVideo';
import Link from '../components/Link';
import { themeContext } from '../contexts/Theme';

const CreatePost = () => {
  const [key, setKey] = useState('post');
  const [subreddit, setSubreddit] = useState(null);
  const { environment } = useContext(environmentContext);
  const { theme } = useContext(themeContext);

  return (
    <Container>
      <h4 className="mt-2">Create a post</h4>
      <DropdownButton
        className="mt-2"
        variant={theme === 'dark' ? 'outline-secondary' : 'light'}
        id="dropdown-basic-button"
        title={environment ? environment : 'Choose a subreddit'}
      >
        <Dropdown.Header>Profile</Dropdown.Header>
        <Dropdown.Item>{environment}</Dropdown.Item>
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
            <Link />
          </Tab>
        </Tabs>
      </div>
    </Container>
  );
};
export default CreatePost;
