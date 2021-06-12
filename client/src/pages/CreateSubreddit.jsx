import React, { useState } from 'react';
import { Container, DropdownButton, Dropdown } from 'react-bootstrap';
import SubredditForm from '../components/SubredditForm';
import categories from '../assets/categories/Categories';

const CreateSubreddit = () => {
  const [category, setCategory] = useState(null);
  return (
    <Container>
      <h4 className="mt-2">Create a subreddit</h4>
      <DropdownButton
        className="mt-2"
        variant="light"
        id="dropdown-basic-button"
        title={category ? category : 'Choose a category'}
      >
        {categories.length
          ? categories.map((category, index) => {
              return (
                <Dropdown.Item onClick={() => setCategory(category.name)}>
                  {category.name}
                </Dropdown.Item>
              );
            })
          : null}
      </DropdownButton>
      <div className="card-reddit">
        <SubredditForm category={category} />
      </div>
    </Container>
  );
};
export default CreateSubreddit;
