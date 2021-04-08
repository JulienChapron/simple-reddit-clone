import React from 'react';
import { useHistory } from 'react-router-dom';
import categories from '../assets/categories/Categories';

const CategoriesList = (props) => {
  let history = useHistory();

  return (
    <div className="card-reddit">
      <h5>Categories</h5>
      <hr />
      {[{name: 'All Categories'}, ...categories].map((category, index) => {
        return (
          <div
            key={index}
            className={
              category.name === props.selectedCategory
                ? 'selected-category pointer'
                : 'pointer category'
            }
            onClick={() => history.push(category.name)}
          >
            {category.name}
          </div>
        );
      })}
    </div>
  );
};
export default CategoriesList;
