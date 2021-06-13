import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { environmentContext } from '../contexts/Environment';
import { authenticate } from '../utils/RequestPrivate';

const Link = () => {
  let history = useHistory();
  const { environment } = useContext(environmentContext);
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const titleChange = (e) => {
    setTitle(e.target.value);
  };
  const linkChange = (e) => {
    setLink(e.target.value);
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
      linkUrl: link,
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
      <Form.Group controlId="formBasicTitle">
        <Form.Control
          className="theme-input"
          type="text"
          placeholder="Title"
          value={title}
          onChange={titleChange}
        />
      </Form.Group>
      <Form.Group controlId="formBasicLink">
        <Form.Control
          className="theme-input"
          type="text"
          placeholder="Url"
          value={link}
          onChange={linkChange}
        />
      </Form.Group>
      <Button
        disabled={
          !title.length || !link.length || environment == 'Home' ? true : false
        }
        variant="outline-secondary"
        onClick={handleSubmit}
      >
        Post
      </Button>
    </div>
  );
};
export default Link;
