
export const getPublic = async (endpoint) => {
  const backendUrl = 'http://localhost:4000/api/v1/'+endpoint;
  const config = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };
  const res = await fetch(backendUrl, config);
  const data = await res.json();
  return data;
};