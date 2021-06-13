import React, { useState, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { environmentContext } from '../contexts/Environment';
import { useHistory } from 'react-router-dom';
import { authContext } from './../contexts/Auth';
import axios from 'axios';

const ImageVideo = () => {
  let history = useHistory();
  const { environment } = useContext(environmentContext);
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const { auth } = useContext(authContext);

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const onChangeFile = (e) => {
    setFile(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    let env = environment;
    env = env.split('/');
    if (env[0] === 'user') {
      env = null;
    } else {
      env = env[env.length - 1];
    }
    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', title);
    formData.append('subreddit', env);
    const config = {
      headers: {
        authorization: `Bearer ${auth.token}`,
        'content-type': 'multipart/form-data',
      },
    };
    axios
      .post(`http://localhost:4000/api/v1/posts/medias`, formData, config)
      .then((response) => {
        if (response.data) {
          history.push('/' + environment);
        } else {
          setError(response);
        }
      })
      .catch((error) => {});
  };
  return (
    <div className="mt-3">
      <Form.Group controlId="formBasicImageVideo">
        <Form.Control
          value={title}
          onChange={onChangeTitle}
          type="text"
          placeholder="Title"
        />
      </Form.Group>
      <Form.Group controlId="formBasicImageVideo">
        <label htmlFor="myImage">
          <input onChange={(e) => onChangeFile(e)} type="file" id="myImage" />
        </label>
      </Form.Group>
      <Button onClick={handleSubmit} variant="outline-secondary">
        Post
      </Button>
    </div>
  );
};
export default ImageVideo;
