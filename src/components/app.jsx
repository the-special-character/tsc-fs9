import React from 'react';
import PropTypes from 'prop-types';

function App({ title, desc, age, contacts }) {
  return (
    <>
      <h1>{title}</h1>
      <h2>{desc}</h2>
      {age ? <p>{age}</p> : <p>No age mentioned</p>}
      {contacts?.map((x) => (
        <p>{x}</p>
      ))}
    </>
  );
}

App.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  contacts: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default App;
