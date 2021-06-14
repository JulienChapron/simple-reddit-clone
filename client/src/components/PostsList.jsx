import React, { useState, useEffect, useContext } from 'react';
import { getPublic } from '../utils/RequestPublic';
import SkeletonListPosts from './SkeletonListPosts';
import Moment from 'react-moment';
import { Button } from 'react-bootstrap';
import { methods } from '../utils/RequestPrivate';
import { useHistory } from 'react-router-dom';
import { authContext } from './../contexts/Auth';

const PostsList = (props) => {
  const { auth } = useContext(authContext);
  let history = useHistory();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const showPost = (id, title, subreddit) => {
    if (subreddit !== null)
      history.push('/subreddit/' + subreddit + '/comments/' + id + '/' + title);
    else
      history.push(
        '/user/' + auth.data.data.username + '/comments/' + id + '/' + title
      );
  };
  const deletePost = async (e, id) => {
    e.stopPropagation();
    try {
      const response = await methods('posts/' + id, 'DELETE');
      setPosts(posts.filter((x) => x._id !== response.data));
    } catch (error) {
      console.log(error);
    }
  };
  const getPosts = async () => {
    try {
      if (props.environment === 'Home') {
        const response = await getPublic('posts/new');
        setPosts(response.data);
      } else {
        const response = await getPublic('posts/' + props.environment);
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
    <div style={{ marginBottom: '20px' }}>
      {!loading && posts !== undefined ? (
        posts.length ? (
          posts.map((post, index) => {
            return (
              <div
                onClick={() => showPost(post._id, post.title, post.subreddit)}
                key={index}
                style={{ padding: '10px', cursor: 'pointer' }}
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
                        {post.subreddits.avatarUrl ? (
                          <img
                            style={{
                              verticalAlign: 'middle',
                              width: '30px',
                              height: '30px',
                              borderRadius: '100%',
                            }}
                            src={`http://localhost:4000/uploads/subreddits/avatar/${post.subreddits[0].avatarUrl}`}
                            alt="user-avatar"
                          />
                        ) : undefined}
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
                  {post.linkUrl ? (
                    <p href={post.linkUrl}>{post.linkUrl}</p>
                  ) : undefined}
                  {post.imageUrl ? (
                    <img
                      style={{ width: '100%', height: 'auto' }}
                      src={`http://localhost:4000/uploads/posts/images/${post.imageUrl}`}
                      alt="photo-posts"
                    />
                  ) : undefined}
                  {post.videoUrl ? (
                    <video
                      controls
                      autostart="true"
                      autoPlay
                      type="video/mp4"
                      style={{ padding: '20px', width: '100%', height: 'auto' }}
                      src={`http://localhost:4000/uploads/posts/videos/${post.videoUrl}`}
                      alt="photo-posts"
                    />
                  ) : undefined}
                </div>
                <div display="inline">
                  <Button
                    className="mt-3"
                    variant="outline-secondary"
                    size="sm"
                  >
                    {post.comments} Comments
                  </Button>
                  {auth.data.data._id === post.userId._id ||
                  auth.data.data._id === post.userId ? (
                    <span>
                      {!post.imageUrl & !post.videoUrl ? (
                        <Button
                          onClick={() =>
                            showPost(
                              post._id,
                              post.title,
                              post.subreddit,
                              'edit'
                            )
                          }
                          className="mt-3 ml-2"
                          variant="outline-secondary"
                          size="sm"
                        >
                          Edit
                        </Button>
                      ) : undefined}
                      <Button
                        onClick={(e) => deletePost(e, post._id)}
                        className="mt-3 ml-2"
                        variant="outline-secondary"
                        size="sm"
                      >
                        Remove
                      </Button>
                    </span>
                  ) : undefined}
                </div>
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
