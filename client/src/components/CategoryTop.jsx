import React from 'react';
import { Link } from 'react-router-dom';

const CategoryTop = (props) => {
  return (
    <div className="card-reddit">
      <h5>Today's Top Growing Subreddits in {props.selectedCategory}</h5>
      <hr />
      {Object.values(props.subreddits).map((subreddit) => {
        return (
          <div key={subreddit.photoUrl}>
            {subreddit.subreddit ? (
              <Link to={`/subreddit/${subreddit.subreddit}`}>
                <div className="pointer categories">
                  <img
                    className="subreddit-thumbnail"
                    src={`http://localhost:4000/uploads/subreddits/photo/${subreddit.photoUrl}`}
                    alt="img-default"
                  />{' '}
                  subreddit/{subreddit.subreddit}
                </div>
              </Link>
            ) : (
              <p>No subreddit in {props.selectedCategory}</p>
            )}
          </div>
        );
      })}
    </div>
  );
};
export default CategoryTop;
