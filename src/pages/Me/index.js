import React from 'react';
import { Navigate } from 'react-router-dom';

const Me = () => {
  const username = localStorage.getItem('myGithub');

  if (!username) {
    return <Navigate to="/" replace />;
  }

  return <Navigate to={`/user/${username}`} replace />;
};

export default Me;
