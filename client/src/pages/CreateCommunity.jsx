import React, { useState } from 'react';
import { Container, DropdownButton, Dropdown } from 'react-bootstrap';
import CommunityForm from '../components/CreateCommunity/CommunityForm';
import categories from '../assets/categories/Categories';

const CreateCommunity = () => {
  const [category, setCategory] = useState(null);
  return (
    <Container>
      <h4 className="mt-2">Create a community</h4>
      <DropdownButton
        className="mt-2"
        variant="light"
        id="dropdown-basic-button"
        title={category ? category : 'Choose a category'}
      >
        {categories.map((category, index) => {
          return (
            <Dropdown.Item onClick={() => setCategory(category)}>
              {category}
            </Dropdown.Item>
          );
        })}
      </DropdownButton>
      <div className="card-reddit">
        <CommunityForm category={category}/>
      </div>
    </Container>
  );
};
export default CreateCommunity;
