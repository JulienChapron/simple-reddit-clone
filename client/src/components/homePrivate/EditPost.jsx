import React from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

const EditPost = () => {
  let history = useHistory();
  const createPostFunc = () => {
    history.push('/create-post');
  };
  

  return (
    <div>
      <InputGroup controlId="formBasicCreatePost">
        <Form.Control
          className="theme-input"
          onClick={createPostFunc}
          type="text"
          placeholder="Create post"
        />
        <InputGroup.Append>
          <Link className="ml-2" to="/create-post">
            <Button variant="outline-secondary">Image & video</Button>
          </Link>
          <Link className="ml-2" to="/create-post">
            <Button variant="outline-secondary">Link</Button>
          </Link>
        </InputGroup.Append>
      </InputGroup>
    </div>
  );
};
export default EditPost;
