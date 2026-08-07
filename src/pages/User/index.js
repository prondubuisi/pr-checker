import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import SiteTitle from '../../components/SiteTitle';
import UsernameForm from '../../components/UsernameForm';
import PullRequests from './components/PullRequests';

const User = () => {
  const { username } = useParams();

  return (
    <Fragment>
      <Helmet>
        <title>{username}</title>
      </Helmet>
      <SiteTitle />
      <UsernameForm username={username} />
      <PullRequests username={username} />
    </Fragment>
  );
};

export default User;
