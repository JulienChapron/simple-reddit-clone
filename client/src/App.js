import './App.css';
import React, { useState, useContext } from 'react';
import RoutesPublic from './router/RoutesPublic';
import RoutesPrivate from './router/RoutesPrivate';
import { authContext } from './contexts/Auth';
import Environment from './contexts/Environment';

function App() {
  const { auth } = useContext(authContext);
  console.log(auth, 'auth app');
  return (
    <div className="App">
      {auth.token ? (
        <Environment>
          <RoutesPrivate />
        </Environment>
      ) : (
        <RoutesPublic />
      )}
    </div>
  );
}

export default App;
