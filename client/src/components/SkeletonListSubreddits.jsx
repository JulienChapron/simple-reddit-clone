import React from 'react';

const SkeletonListSubreddits = ({ array = [1] }) => {
  return (
    <div>
      {array.map((item) => (
        <div style={{ display: 'flex', marginBottom: '20px' }}>
          <div className="skeleton-avatar"></div>
          <div
            style={{ width: '100%', marginLeft: '5px' }}
            className="skeleton-title"
          ></div>
        </div>
      ))}
    </div>
  );
};
export default SkeletonListSubreddits;
