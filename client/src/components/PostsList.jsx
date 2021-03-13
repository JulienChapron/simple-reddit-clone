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
      if (props.environment === 'Home') {
        console.log(props.environment);
        const response = await getPublic('posts/new');
        console.log('subreddit', response.data);
        setPosts(response.data);
      } else {
        const response = await getPublic('posts/' + props.environment);
        console.log('user', response.data);
        setPosts(response.data);
      }
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
                style={{ padding: '10px' }}
                className="card-reddit"
              >
                <div style={{ display: 'flex', lineHeight: '30px' }}>
                  <p
                    style={{
                      fontSize: '12px',
                      color: 'grey',
                      fontWeight: 'bold',
                    }}
                  >
                    {props.environment.split('/')[0] === 'user' &&
                    post.subreddit !== null &&
                    post.subreddits !== undefined ? (
                      <span style={{ marginRight: '10px' }}>
                        {post.subreddits.photoUrl}
                        <img
                          style={{
                            verticalAlign: 'middle',
                            width: '30px',
                            height: '30px',
                            borderRadius: '100%',
                          }}
                          src={`http://localhost:4000/uploads/subreddits/photo/${post.subreddits[0].photoUrl}`}
                          alt="user-avatar"
                        />
                        subreddit/{post.subreddit}
                      </span>
                    ) : null}
                    <span style={{ marginRight: '10px' }}>
                      Posted by user/{post.userId.username}
                    </span>
                    <span>
                      <Moment fromNow>{post.createdAt}</Moment>
                    </span>
                  </p>
                </div>
                <div>
                  <h4>{post.title}</h4>
                  <p>{post.text}</p>
                  {post.linkUrl ? <p>{post.linkUrl}</p> : undefined}
                  {post.imageUrl ? (
                    <img
                      style={{ padding: '20px', width: '100%', height: 'auto' }}
                      src={`http://localhost:4000/uploads/posts/images/${post.imageUrl}`}
                      alt="photo-posts"
                    />
                  ) : undefined}
                  {post.videoUrl ? (
                    <video
                      controls
                      autostart
                      autoPlay
                      type="video/mp4"
                      style={{ padding: '20px', width: '100%', height: 'auto' }}
                      src={`http://localhost:4000/uploads/posts/videos/${post.videoUrl}`}
                      alt="photo-posts"
                    />
                  ) : undefined}
                </div>
                <Button className="mt-1" variant="outline-secondary" size="sm">
                  {'0'} Comments
                </Button>
                <Button className="mt-1 ml-2" variant="outline-secondary" size="sm">
                  Delete
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
