import React from 'react';
import PropTypes from 'prop-types';

function App({ title, desc, age, gender }) {
  return (
    <>
      <h1 className="bg-yellow-400 text-blue-600">{title}</h1>
      <h2>{desc}</h2>
      {age && <h3>{age}</h3>}
      {gender && <h4>{gender}</h4>}
      <input type="text" />
      <input type="checkbox" />
      <button type="button">Submit</button>
    </>
  );
}

App.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  age: PropTypes.number,
  gender: PropTypes.oneOf(['male', 'female']),
};

App.defaultProps = {
  age: undefined,
  gender: 'male',
};

export default App;
