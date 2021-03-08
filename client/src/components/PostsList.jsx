import React, { useState, useEffect, useContext } from 'react';
import { getPublic } from '../utils/RequestPublic';
import SkeletonListPosts from './SkeletonListPosts';
import Moment from 'react-moment';
import { Button } from 'react-bootstrap';

const PostsList = (props) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const getPosts = async () => {
    try {
      const response = await getPublic('posts/' + props.environment);
      console.log(props.environment, response.data);
      setPosts(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (props.environment) getPosts();
  }, [props.environment]);
  return (
    <div>
      {!loading && posts !== undefined ? (
        posts.length ? (
          posts.map((post, index) => {
            return (
              <div
                key={index}
                style={{ padding: '5px' }}
                className="card-reddit"
              >
                <div style={{ display: 'flex', lineHeight: '30px' }}>
                  <img
                    style={{
                      verticalAlign: 'middle',
                      width: '30px',
                      height: '30px',
                      borderRadius: '100%',
                    }}
                    src={`http://localhost:4000/uploads/users/avatar/${post.userId.avatarUrl}`}
                    alt="user-avatar"
                  />
                  <p
                    style={{
                      fontSize: '12px',
                      color: 'grey',
                      fontWeight: 'bold',
                    }}
                  >
                    {props.environment.split('/')[0] === 'user' &&
                    post.subreddit !== null ? (
                      <span style={{ marginLeft: '10px' }}>
                        {post.subreddits.photoUrl}
                        <img
                          style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '100%',
                          }}
                          src={`http://localhost:4000/uploads/subreddits/photo/${post.subreddits[0].photoUrl}`}
                          alt="user-avatar"
                        />
                        subreddit/{post.subreddit}
                      </span>
                    ) : null}
                    <span style={{ marginLeft: '10px' }}>
                      Posted by user/{post.userId.username}
                    </span>
                    <span style={{ marginLeft: '10px' }}>
                      <Moment fromNow>{post.createdAt}</Moment>
                    </span>
                  </p>
                </div>
                <div>
                  <h4>{post.title}</h4>
                  <p>{post.text}</p>
                </div>
                <Button className="mt-1" variant="outline-secondary" size="sm">
                  {'0'} Comments
                </Button>
              </div>
            );
          })
        ) : (
          `hmm... ${props.environment} hasn't posted anything`
        )
      ) : (
        <SkeletonListPosts />
      )}
    </div>
  );
};
export default PostsList;
