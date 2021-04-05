import React from 'react';
import { useHistory } from 'react-router-dom';
import categories from '../assets/categories/Categories';

const CategoriesList = (props) => {
  let history = useHistory();

  return (
    <div className="card-reddit">
      <h5>Categories</h5>
      <hr />
      {['All Categories', ...categories].map((category, index) => {
        return (
          <div
            key={index}
            className={
              category === props.selectedCategory
                ? 'selected-category pointer'
                : 'pointer category'
            }
            onClick={() => history.push(category)}
          >
            {category}
          </div>
        );
      })}
    </div>
  );
};
export default CategoriesList;
