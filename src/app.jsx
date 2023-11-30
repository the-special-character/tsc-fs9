import React from 'react';

const App = ({ title, desc }) => {
  return (
    <>
      <h1 className="bg-yellow-400 text-blue-600">{title}</h1>
      <h2>{desc}</h2>
      <input type="text" />
      <input type="checkbox" />
      <button>Submit</button>
    </>
  );
};

export default App;
