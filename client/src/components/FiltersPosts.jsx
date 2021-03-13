import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const FiltersPosts = () => {
  let history = useHistory();
  const createPostFunc = () => {
    history.push('/create-post');
  };

  return (
    <div>
      <Button className="mr-2" variant="outline-secondary">Best</Button>
      <Button className="mr-2" variant="outline-secondary">Top</Button>
      <Button className="mr-2" variant="outline-secondary">New</Button>
    </div>
  );
};
export default FiltersPosts;
