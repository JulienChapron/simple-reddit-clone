import React, { useContext, useEffect, useState, useRef } from 'react';
import { Container, Col, Row, Form, Button } from 'react-bootstrap';
import UserCard from '../components/UserCard';
import { useParams } from 'react-router-dom';
import { getPublic } from '../utils/RequestPublic';
import { methods } from '../utils/RequestPrivate';
import Moment from 'react-moment';
import { authContext } from './../contexts/Auth';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

const PostView = () => {
  const messagesEndRef = useRef(null);
  const { auth } = useContext(authContext);
  let { id } = useParams();
  let { type } = useParams();
  let { name } = useParams();
  let history = useHistory();
  const [editPost, setEditPost] = useState(false);
  const [post, setPost] = useState(null);
  const [textPost, setTextPost] = useState('');
  const [text, setText] = useState('');
  const [comments, setComments] = useState([]);
  const handleChangeText = (e) => {
    setText(e.target.value);
  };
  const createComment = async () => {
    try {
      const data = {
        text: text,
        userId: auth.data.data._id,
        postId: post._id,
      };
      const response = await methods('comments/', 'POST', data);
      setComments([...comments, { ...response.data }]);
      setText('');
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
      console.log(error);
    }
  };
  const textChange = (e) => {
    setTextPost(e.target.value);
  };
  const updatePost = async () => {
    try {
      const data = {
        text: textPost,
      };
      const response = await methods(`posts/${id}`, 'PUT', data);
      setPost(response.data);
      setEditPost(false);
      set;
    } catch (error) {
      console.log(error);
    }
  };
  const getPost = async () => {
    try {
      const response = await getPublic(`posts/${id}`);
      setPost(response.data);
      setTextPost(response.data.text);
    } catch (error) {
      console.log(error);
    }
  };
  const getComments = async () => {
    try {
      const response = await methods(`comments/${id}/comments`, 'GET');
      setComments(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteComment = async (id) => {
    try {
      const response = await methods(`comments/${id}`, 'DELETE');
      setComments(
        comments.filter((comment) => comment.id !== response.data.id)
      );
    } catch (error) {
      console.log(error);
    }
  };
  const deletePost = async (e, id) => {
    e.stopPropagation();
    try {
      const response = await methods('posts/' + id, 'DELETE');
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPost();
    getComments();
  }, []);
  return (
    <Container>
      <div>
        <Row>
          <Col lg={8} md={12} sm={12}>
            {post !== null ? (
              <div
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
                    {type + name.split('/')[0] === 'user' &&
                    post.subreddit !== null &&
                    post.subreddits !== undefined ? (
                      <span style={{ marginRight: '10px' }}>
                        {post.subreddits.photoUrl ? (
                          <img
                            style={{
                              verticalAlign: 'middle',
                              width: '30px',
                              height: '30px',
                              borderRadius: '100%',
                            }}
                            src={`http://localhost:4000/uploads/subreddits/avatar/${post.subreddits[0].photoUrl}`}
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
                  {!editPost ? <p>{post.text}</p> : undefined}
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
                      autostart
                      autoPlay
                      type="video/mp4"
                      style={{ width: '100%', height: 'auto' }}
                      src={`http://localhost:4000/uploads/posts/videos/${post.videoUrl}`}
                      alt="photo-posts"
                    />
                  ) : undefined}
                </div>
                {editPost ? (
                  <div>
                    <Form.Control
                      className="theme-input"
                      as="textarea"
                      rows={3}
                      placeholder="Text"
                      value={textPost}
                      onChange={textChange}
                    />
                    <div className="text-right">
                      <Button
                        className="mt-3"
                        variant="outline-secondary"
                        size="sm"
                        onClick={() =>
                          setEditPost(false) & setTextPost(post.text)
                        }
                      >
                        Cancel
                      </Button>
                      <Button
                        className="ml-2 mt-3"
                        size="sm"
                        onClick={() => updatePost(post._id)}
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                ) : undefined}
                {!post.videoUrl & !post.imageUrl ? (
                  <Button
                    className="mt-3 mr-2"
                    variant="outline-secondary"
                    size="sm"
                    onClick={() => setEditPost(true)}
                  >
                    edit
                  </Button>
                ) : undefined}
                <Link to={'/subreddit/'+ post.subreddit}>
                <Button
                  className="mt-3"
                  onClick={(e) => deletePost(e, post._id)}
                  
                  variant="outline-secondary"
                  size="sm"
                >
                  Remove
                </Button></Link>
              </div>
            ) : undefined}
            <div className="card-reddit" style={{ marginBottom: '30px' }}>
              <Form.Label>
                Comment as{' '}
                <span className="text-danger">{auth.data.data.username}</span>
              </Form.Label>
              <Form.Control
                onChange={handleChangeText}
                value={text}
                as="textarea"
                rows={3}
              />
              <Button
                onClick={createComment}
                className="mt-3"
                variant="outline-secondary"
                size="sm"
                disabled={text ? false : true}
              >
                Comment
              </Button>
              {comments !== null && comments.length
                ? comments.map((comment, index) => {
                    return (
                      <div
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
                            <img
                              style={{
                                verticalAlign: 'middle',
                                width: '30px',
                                height: '30px',
                                borderRadius: '100%',
                              }}
                              src={`http://localhost:4000/uploads/users/avatar/${comment.userId.avatarUrl}`}
                              alt="photo-posts"
                            />
                            <span
                              style={{
                                marginLeft: '10px',
                                marginRight: '10px',
                              }}
                            >
                              {comment.userId.username}
                            </span>
                            <span>
                              <Moment fromNow>{comment.createdAt}</Moment>
                            </span>
                          </p>
                        </div>
                        <p>{comment.text}</p>
                        <Button
                          onClick={() => deleteComment(comment._id)}
                          className="mt-1"
                          variant="outline-secondary"
                          size="sm"
                        >
                          Remove
                        </Button>
                      </div>
                    );
                  })
                : undefined}
              <div ref={messagesEndRef} />
            </div>
          </Col>
          <Col lg={4} md={12} sm={12}>
            <UserCard environment={type + '/' + name} />
          </Col>
        </Row>
      </div>
    </Container>
  );
};
export default PostView;
