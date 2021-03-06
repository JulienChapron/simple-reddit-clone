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
    if (props.environment) getPosts();
  }, [props.environment]);
  return (
    <div>
      {posts.length
        ? posts.map((post, index) => {
            return (
              <div
                key={index}
                style={{ padding: '5px' }}
                className="card-reddit"
              >
                <p
                  style={{
                    fontSize: '12px',
                    color: 'grey',
                    fontWeight: 'bold',
                  }}
                >
                  Posted by user/{post.userId}
                </p>
                <p>{post.title}</p>
                <p>{post.text}</p>
              </div>
            );
          })
        : `hmm... ${props.environment} hasn't posted anything`}
    </div>
  );
};
export default PostsList;
