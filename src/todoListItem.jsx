import React, { PureComponent, memo } from 'react';
import PropTypes from 'prop-types';

class TodoListItem extends PureComponent {
  render() {
    const { toggleComplete, deleteTodo, x, state } = this.props;
    // if (x.isDone) {
    //   throw new Error('error...');
    // }
    return (
      <section id="listItem1" className="flex items-center">
        <div>
          <label htmlFor="toggleComplete" className="sr-only">
            Toggle Complete
          </label>
          <input
            type="checkbox"
            name="toggleComplete"
            id="toggleComplete"
            checked={x.isDone}
            onChange={() => toggleComplete(x)}
          />
        </div>
        <p className={`flex-1 px-4 line-clamp-2 ${x.isDone ? 'line-through' : ''}`}>{x.text}</p>
        <button
          type="button"
          disabled={state?.stattus === 'LOADING'}
          className="btn disabled:bg-zinc-400 disabled:cursor-wait"
          onClick={() => deleteTodo(x)}
        >
          Delete
        </button>
      </section>
    );
  }
}

TodoListItem.propTypes = {
  toggleComplete: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  x: PropTypes.shape({
    id: PropTypes.number.isRequired,
    isDone: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  state: PropTypes.shape({
    task: PropTypes.string.isRequired,
    stattus: PropTypes.oneOf(['LOADING', 'ERROR']).isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired,
};

export default memo(TodoListItem);
