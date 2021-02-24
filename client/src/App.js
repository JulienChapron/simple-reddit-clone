import './App.css';
import React, { useState, useContext } from 'react';
import RoutesPublic from './router/RoutesPublic';
import RoutesPrivate from './router/RoutesPrivate';
import { authContext } from './contexts/Auth';
import Environment from './contexts/Environment';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './styles/theme';
import { GlobalStyles } from './styles/Global';
import { themeContext } from './contexts/Theme';

function App() {
  const { auth } = useContext(authContext);
  const {theme} = useContext(themeContext);

  return (
    <div className="App">
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      {auth.token ? (
        <Environment>
          <RoutesPrivate />
        </Environment>
      ) : (
        <RoutesPublic />
      )}
    </ThemeProvider>
    </div>
  );
}

export default App;
