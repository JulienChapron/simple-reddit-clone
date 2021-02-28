import React, { useState, useEffect, useContext } from 'react';
import { getPublic } from '../../utils/RequestPublic';

const PostsList = (props) => {
  const [posts, setPosts] = useState([]);
  const getPosts = async () => {
    try {
      const response = await getPublic('posts/' + props.environment);
      setPosts(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPosts();
  }, [props.environment]);
  return (
    <div>
      {posts.map((post, index) => {
        return (
          <div className="card-reddit">
            <p>{post.title}</p>
            <p>{post.userId}</p>
            <p>{post.text}</p>
          </div>
        );
      })}
    </div>
  );
};
export default PostsList;
