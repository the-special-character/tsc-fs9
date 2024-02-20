import './style.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import Header from './components/header';
import Banner from './components/banner';
import Footer from './components/footer';

// Clear the existing HTML content
document.body.innerHTML = '<div id="app"></div>';

// Render your React component instead
const root = createRoot(document.getElementById('app'));
root.render(
  <div>
    <Header />
    <Banner />
    <Footer />
  </div>,
);
