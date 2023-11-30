import React, { Fragment } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
import './style.css';

const rootEle = document.getElementById('root');

const root = createRoot(rootEle);

root.render(
  <>
    <App title="hello" desc="abc" />
    <App title="world" desc="pqr" />
  </>,
);
