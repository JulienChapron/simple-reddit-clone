import React from 'react';

const SkeletonListPosts = ({ array = [1, 2, 3, 4, 5] }) => {
  return (
    <div>
      {array.map((item) => (
        <div className="card-reddit">
          <div style={{ display: 'flex' }}>
            <div class="skeleton-avatar"></div>
            <div class="skeleton-user"></div>
          </div>
          <div class="skeleton-title"></div>
          <div class="skeleton-media"></div>
        </div>
      ))}
    </div>
  );
};
export default SkeletonListPosts;
