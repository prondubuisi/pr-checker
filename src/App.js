import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GithubCorner from './components/GithubCorner';
import RegisterReminder from './components/RegisterReminder';
import PageWrapper from './components/PageWrapper';
import Footer from './components/Footer';
import Home from './pages/Home';
import User from './pages/User';
import Me from './pages/Me';
import NotFound from './pages/NotFound';
import Faq from './pages/Faq';

const App = () => (
  <Fragment>
    <Helmet titleTemplate="%s | Open Source Immersion Pull Request Checker" />
    <GithubCorner />
    <RegisterReminder />
    <PageWrapper>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/:username" element={<User />} />
          <Route path="/me" element={<Me />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </PageWrapper>
    <Footer />
  </Fragment>
);

export default App;
