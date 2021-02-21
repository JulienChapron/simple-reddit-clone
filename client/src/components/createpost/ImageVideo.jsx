import React from 'react';
import { Form, Button } from 'react-bootstrap';

const ImageVideo = () => {
  return (
    <div className="mt-3">
      <Form.Group controlId="formBasicImageVideo">
        <Form.Control type="text" placeholder="Title" />
      </Form.Group>
      <Form.Group>
        <Form.File id="exampleFormControlFile1"/>
      </Form.Group>
      <Button variant="primary" type="submit">
        Post
      </Button>
    </div>
  );
};
export default ImageVideo;
