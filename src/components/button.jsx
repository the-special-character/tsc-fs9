import React from 'react';
import PropTypes from 'prop-types';

function Button({ children, className, ...props }) {
  return (
    <button
      type="button"
      className={`rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-slate-400 disabled:cursor-wait ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
}
Button.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Button.defaultProps = {
  className: undefined,
};

export default Button;
