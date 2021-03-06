import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getPublic } from '../utils/RequestPublic';
import categories from '../assets/categories/Categories';

const CommunitiesRandom = () => {
  const [communitiesRandom, setCommunitiesRandom] = useState([]);
  const [categoryRandom, setCategoryRandom] = useState([]);
  const getCommunitiesRandom = async () => {
    try {
      const random = categories[Math.floor(Math.random() * categories.length)];
      setCategoryRandom(random);
      const response = await getPublic(
        'communities/category/' + random.toLowerCase()
      );
      setCommunitiesRandom(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCommunitiesRandom();
  }, []);
  return (
    <div style={{ padding: '0px' }} className="card-reddit">
      <div style={{ height: '90px' }}>
        <div
          style={{
            backgroundImage:
              'url(http://localhost:4000/uploads/communities/background/no-background.jpeg)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            height: '100%',
            width: '100%',
          }}
          alt="background"
        />
        <h5
          style={{
            marginTop: '-30px',
            color: '#fff',
            marginLeft: '10px',
          }}
        >
          {categoryRandom}
        </h5>
      </div>
      <div className="p-2">
        <div>
          {communitiesRandom.length ? (
            Object.values(communitiesRandom).map((community, index) => {
              return (
                <div key={index} className="pointer categories">
                  <img
                    className="community-thumbnail"
                    src={`http://localhost:4000/uploads/communities/photo/${community.photoUrl}`}
                    alt="img-default"
                  />{' '}
                  subreddit/{community.subreddit}
                </div>
              );
            })
          ) : (
            <p style={{ color: 'grey' }}>no communities</p>
          )}
        </div>
        <Button
          className="mt-2"
          as={Link}
          to="/communities"
          block
          variant="outline-secondary"
        >
          See All {categoryRandom}
        </Button>
      </div>
    </div>
  );
};
export default CommunitiesRandom;
