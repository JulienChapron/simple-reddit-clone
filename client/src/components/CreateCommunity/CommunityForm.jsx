import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { authenticate } from '../../utils/RequestPrivate';

const CommunityForm = (props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const titleChange = (e) => {
    setTitle(e.target.value);
  };
  const descriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleSubmit = async () => {
    const data = {
      title: title,
      description: description,
      category: props.category.toLowerCase(),
      };
    try {
      const response = await authenticate('communities/', data);
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
      <Button
        disabled={!description || !title ? true : false}
        variant="primary"
        onClick={handleSubmit}
      >
        Add Community
      </Button>
    </div>
  );
};
export default CommunityForm;
