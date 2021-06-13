import React from 'react';
import { Link } from 'react-router-dom';
import SkeletonListSubreddit from '../../src/components/SkeletonListSubreddits';
const CategoryTop = (props) => {
  return (
    <div className="card-reddit">
      <h5>Today's Top Growing Subreddits in {props.selectedCategory}</h5>
      <hr />
     {props.loading ? <SkeletonListSubreddit /> : undefined}
      {props.subreddits.length ? (
        Object.values(props.subreddits).map((subreddit) => {
          return (
            <div key={subreddit.avatarUrl}>
              <Link to={`/subreddit/${subreddit.subreddit}`}>
                <div className="pointer categories">
                  <img
                    className="subreddit-thumbnail"
                    src={`http://localhost:4000/uploads/subreddits/avatar/${subreddit.avatarUrl}`}
                    alt="img-default"
                  />{' '}
                  subreddit/{subreddit.subreddit}
                </div>
              </Link>
            </div>
          );
        })
      ) : (
        <p>No subreddits in {props.selectedCategory}</p>
      )}
    </div>
  );
};
export default CategoryTop;
