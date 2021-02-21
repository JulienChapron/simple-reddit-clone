import axios from 'axios';

export const client = async (endpoint, { body, ...customConfig } = {}) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };
  if (body) {
    config.body = JSON.stringify(body);
  }
  if (customConfig.token) {
    config.headers.authorization = `Bearer ${customConfig.token}`;
  }
  if (!customConfig.token && user?.token) {
    config.headers.authorization = `Bearer ${user.token}`;
  }
  const res = await fetch(endpoint, config);
  const data = await res.json();
  return data;
};

export const authenticate = async (type, data) => {
  const backendUrl = 'http://localhost:4000/api/v1';
  try {
    const response = await client(`${backendUrl}/${type}`, {
      body: data,
    });
    if (response.token) {
      const token = response.token;
      const data = await client(`${backendUrl}/auth/me`, { token });
      localStorage.setItem('user', JSON.stringify({data:data, token:token }));
      return { data:data, token:token };
    } else if (response.error) {
      return response.error;
    } else {
      return response;
    }
  } catch (err) {
    console.log(err);
  }
};
