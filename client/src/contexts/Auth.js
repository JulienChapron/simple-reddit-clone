import React, { createContext, useState, useEffect } from 'react';
export const authContext = createContext({});

const Auth = ({ children }) => {
  const [auth, setAuth] = useState({ data:null, token: null});
  const setAuthToken = (user) => {
    setAuth({ data:user.data, token: user.token});
  };
  useEffect(() => {
    if(JSON.parse(window.localStorage.getItem('user'))!==null)
    setAuth(JSON.parse(window.localStorage.getItem('user')));
    else {
      setAuth({ data:null, token: null})
    }
  }, [window.location.href]);
  return (
    <authContext.Provider value={{ auth, setAuthToken }}>
      {children}
    </authContext.Provider>
  );
};
export default Auth;