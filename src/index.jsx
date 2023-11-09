const React = require('react');
const { createRoot } = require('react-dom/client');
require('./style.css');

const root = createRoot(document.getElementById('root'));

root.render(
  <div>
    <h1 className="bg-red-400">Hello, world</h1>
    <h2>Hello team?</h2>
  </div>,
);
