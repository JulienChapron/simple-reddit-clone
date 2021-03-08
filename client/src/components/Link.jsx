import React from 'react';
import { Form, Button } from 'react-bootstrap';

const Link = () => {
    return (
      <div className="mt-3">
      <Form.Group controlId="formBasicPost">
        <Form.Control type="text" placeholder="Title" />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Control as="textarea" rows={3} placeholder="Url"/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Post
      </Button>
    </div>
    );
  };
  export default Link;