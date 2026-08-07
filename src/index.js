import React from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import './index.css';

const root = createRoot(document.querySelector('#root'));
root.render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
