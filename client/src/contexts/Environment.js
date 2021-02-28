import React, { createContext, useState, useEffect } from 'react';
export const environmentContext = createContext({});

const Environment = ({ children }) => {
  const [environment, setEnvironment] = useState('');
  const setEnvironmentContext = (environment) => {
    setEnvironment(environment);
  };
  return (
    <environmentContext.Provider value={{ environment, setEnvironmentContext }}>
      {children}
    </environmentContext.Provider>
  );
};
export default Environment;