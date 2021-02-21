import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { authenticate } from '../../utils/RequestPrivate';

const Post = (props) => {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const titleChange = (e) => {
    setTitle(e.target.value);
  };
  const textChange = (e) => {
    setText(e.target.value);
  };
  const handleSubmit = async () => {
    const data = {
      title: title,
      text: text,
    };
    try {
      const response = await authenticate('posts/', data);
      if (response.token) {
        history.push('/');
        setAuthToken(response);
      } else {
        setError(response);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mt-3">
      <Form.Group controlId="formBasicPost">
        <Form.Control
          type="text"
          placeholder="Title"
          value={title}
          onChange={titleChange}
        />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Text"
          value={text}
          onChange={textChange}
        />
      </Form.Group>
      <Button
        disabled={!text || !title || !props.community ? true : false}
        variant="primary"
        onClick={handleSubmit}
      >
        Post
      </Button>
    </div>
  );
};
export default Post;
