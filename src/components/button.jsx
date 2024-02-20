import React from 'react';
import PropTypes from 'prop-types';

function Button({ children }) {
  return (
    <button
      type="button"
      className="bg-red-400 px-6 py-4 rounded-full text-white font-bold block"
    >
      {children}
    </button>
  );
}
Button.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Button;
