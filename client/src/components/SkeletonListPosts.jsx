import React from 'react';

const SkeletonListPosts = ({ array = [1, 2, 3, 4, 5] }) => {
  return (
    <div>
      {array.map((item) => (
        <div key={item} className="card-reddit">
          <div style={{ display: 'flex' }}>
            <div className="skeleton-avatar"></div>
            <div className="skeleton-user"></div>
          </div>
          <div className="skeleton-title"></div>
          <div className="skeleton-media"></div>
        </div>
      ))}
    </div>
  );
};
export default SkeletonListPosts;
