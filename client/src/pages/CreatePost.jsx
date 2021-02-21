import React, {useState} from 'react';
import {
  Container,
  DropdownButton,
  Dropdown,
  Tabs,
  Tab,
} from 'react-bootstrap';
import Post from '../components/createpost/Post';
import ImageVideo from '../components/createpost/ImageVideo';
import Link from '../components/createpost/Link';

const CreatePost = () => {
  const [key, setKey] = useState('post');
  const [community, setCommunity] = useState(null)
  return (
    <Container>
      <h4 className="mt-2">Create a post</h4>
      <DropdownButton
        className="mt-2"
        variant="light"
        id="dropdown-basic-button"
        title={community ? community : 'Choose a community'}
      >
        <Dropdown.Item onClick={() => setCommunity('action')}>Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </DropdownButton>
      <div className="card-reddit">
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
        >
          <Tab eventKey="post" title="Post">
            <Post community={community}/>
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
