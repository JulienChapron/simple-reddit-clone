import React, { createContext, useState, useEffect } from 'react';
export const themeContext = createContext({});

const Theme = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const setThemeContext = (theme) => {
    setTheme(theme);
  };
  return (
    <themeContext.Provider value={{ theme, setThemeContext }}>
      {children}
    </themeContext.Provider>
  );
};
export default Theme;