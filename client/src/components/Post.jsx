import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { authenticate } from '../utils/RequestPrivate';
import { environmentContext } from '../contexts/Environment';
import { useHistory } from 'react-router-dom';

const Post = () => {
  let history = useHistory();
  const { environment } = useContext(environmentContext);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const titleChange = (e) => {
    setTitle(e.target.value);
  };
  const textChange = (e) => {
    setText(e.target.value);
  };
  const handleSubmit = async () => {
    let env = environment;
    env = env.split('/');
    if (env[0] === 'user') {
      env = null;
    } else {
      env = env[env.length - 1];
    }
    const data = {
      title: title,
      text: text,
      subreddit: env,
    };
    try {
      const response = await authenticate('posts/', data);
      if (response.data) {
        history.push('/' + environment);
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
          className="theme-input"
          type="text"
          placeholder="Title"
          value={title}
          onChange={titleChange}
        />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Control
          className="theme-input"
          as="textarea"
          rows={3}
          placeholder="Text"
          value={text}
          onChange={textChange}
        />
      </Form.Group>
      <Button
        variant="outline-secondary"
        disabled={!text || !title || !environment ? true : false}
        onClick={handleSubmit}
      >
        Post
      </Button>
    </div>
  );
};
export default Post;
