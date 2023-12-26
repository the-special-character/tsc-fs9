import React, { PureComponent, memo } from 'react';
import PropTypes from 'prop-types';

class TodoFilter extends PureComponent {
  render() {
    const { filterTodo } = this.props;
    return (
      <section id="filterTodo" className="flex">
        <button type="button" className="btn rounded-none flex-1" onClick={() => filterTodo('all')}>
          All
        </button>
        <button
          type="button"
          className="btn rounded-none flex-1"
          onClick={() => filterTodo('pending')}
        >
          Pending
        </button>
        <button
          type="button"
          className="btn rounded-none flex-1"
          onClick={() => filterTodo('completed')}
        >
          Completed
        </button>
      </section>
    );
  }
}

TodoFilter.propTypes = {
  filterTodo: PropTypes.func.isRequired,
};

export default memo(TodoFilter);
