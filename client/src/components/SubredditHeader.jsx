import React, { useContext } from 'react';
import { Button, Container } from 'react-bootstrap';
import { methods } from '../utils/RequestPrivate';
import { authContext } from './../contexts/Auth';

const SubredditHeader = (props) => {
  const { auth } = useContext(authContext);
  const join = async () => {
    try {
      const response = await methods(
        `users/${auth.data.data.username}/subscribeSubreddit`,
        'POST',
        { id: 12 }
      );
      console.log(response.data, 'OK return join');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div style={{ padding: '0px' }}>
      <div
        style={{
          height: '70px',
          backgroundColor: props.backgrounColorCategory,
        }}
      />
      <div style={{ height: '90px', marginTop: '0px' }} className="card-reddit">
        <Container>
          <div style={{ display: 'flex' }}>
            <h2>{props.subreddit.title}</h2>
            <Button
              onClick={join}
              style={{
                marginLeft: '30px',
                borderRadius: '20px',
                padding: '0px 30px',
                background: 'none',
                color: props.backgrounColorCategory,
                border: '1px solid' + props.backgrounColorCategory,
              }}
            >
              Join
            </Button>
          </div>
          <p>subreddit/{props.subreddit.subreddit}</p>
        </Container>
      </div>
    </div>
  );
};
export default SubredditHeader;
