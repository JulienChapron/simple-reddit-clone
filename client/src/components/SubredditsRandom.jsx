import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getPublic } from '../utils/RequestPublic';
import categories from '../assets/categories/Categories';

const SubredditsRandom = (props) => {
  const [subredditsRandom, setSubredditsRandom] = useState([]);
  const [categoryRandom, setCategoryRandom] = useState([]);
  const getSubredditsRandom = async () => {
    try {
      const random =
        categories[
          Math.floor(Math.random() * Object.keys(categories).length)
        ];
      setCategoryRandom(random);
      console.log(random.name.toLowerCase())
      const response = await getPublic(
        'subreddits/category/' + random.name.toLowerCase()
      );
      setSubredditsRandom(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSubredditsRandom();
  }, []);
  return (
    <div style={{ padding: '0px' }} className="card-reddit">
      <div style={{ height: '90px' }}>
        <div
          style={{
            backgroundColor:`${categoryRandom.color}`,
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
          Top {categoryRandom.name} Communities
        </h5>
      </div>
      <div className="p-2">
        <div>
          {subredditsRandom.length ? (
            Object.values(subredditsRandom).map((subreddit, index) => {
              return (
                <div key={subreddit._id} >
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
                </div>
              );
            })
          ) : (
            <p style={{ color: 'grey' }}>no subreddits</p>
          )}
        </div>
        {props.environment !== 'Home' ? (
          <Button
            className="mt-2"
            as={Link}
            to={`/subreddits/${categoryRandom.name}`}
            block
            variant="outline-secondary"
          >
            See All {categoryRandom.name}
          </Button>
        ) : (
          <Button
            as={Link}
            to={`/subreddits/${categoryRandom.name}`}
            block
            variant="outline-secondary"
            className="mt-2"
          >
            View All
          </Button>
        )}
      </div>
    </div>
  );
};
export default SubredditsRandom;
