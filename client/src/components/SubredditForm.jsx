import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { authenticate } from '../utils/RequestPrivate';
import { useHistory } from 'react-router-dom';

const SubredditForm = (props) => {
  let history = useHistory();
  const [title, setTitle] = useState('');
  const [subreddit, setSubreddit] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const titleChange = (e) => {
    setTitle(e.target.value);
  };
  const subredditChange = (e) => {
    setSubreddit(e.target.value);
  };
  const descriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleSubmit = async () => {
    const data = {
      title: title,
      subreddit: subreddit,
      description: description,
      category: props.category.toLowerCase(),
    };
    try {
      const response = await authenticate('subreddits/', data);
      if (response.data) {
        history.push('/subreddit/'+response.data.subreddit);
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
      <Form.Group controlId="formBasicSubreddit">
        <Form.Control
          type="text"
          placeholder="subreddit"
          value={subreddit}
          onChange={subredditChange}
        />
      </Form.Group>
      <Form.Group controlId="formBasicTitle">
        <Form.Control
          type="text"
          placeholder="Title"
          value={title}
          onChange={titleChange}
        />
      </Form.Group>
      <Form.Group controlId="formBasicDescription">
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Text"
          value={description}
          onChange={descriptionChange}
        />
      </Form.Group>
      <p className="text-danger">{error}</p>
      <Button
        disabled={!description || !title || !props.category || !subreddit}
        variant="outline-secondary"
        onClick={handleSubmit}
      >
        Add Subreddit
      </Button>
    </div>
  );
};
export default SubredditForm;
